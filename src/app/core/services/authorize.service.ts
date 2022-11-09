import {Injectable} from '@angular/core';
import {User, UserManager} from "oidc-client-ts";
import {Router} from "@angular/router";
import {ApplicationPaths, QueryParameterNames, UserManagerSetting} from "../constants/api-authorization.constants";
import {BehaviorSubject, from, Observable, concat, lastValueFrom} from "rxjs";
import {filter, map, take, tap} from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import {ApiService} from "./api.service";

export type IAuthenticationResult =
    SuccessAuthenticationResult |
    FailureAuthenticationResult |
    RedirectAuthenticationResult;

export interface SuccessAuthenticationResult {
    status: AuthenticationResultStatus.Success;
    state: any;
}

export interface FailureAuthenticationResult {
    status: AuthenticationResultStatus.Fail;
    message: string;
}

export interface RedirectAuthenticationResult {
    status: AuthenticationResultStatus.Redirect;
}

export enum AuthenticationResultStatus {
    Success,
    Redirect,
    Fail
}

export interface IUser {
    name?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthorizeService {
    private userManager: UserManager;
    private userSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

    constructor(private router: Router, private api: ApiService) {
        this.userManager = new UserManager(UserManagerSetting);
        this.userManager.events.addUserSignedOut(async () => {
            await this.logOut();
        });

        this.userManager.events.addAccessTokenExpired(async () => {
            await this.logOut();
        })
    }

    public isAuthenticated(): Observable<boolean> {
        return this.getUser().pipe(map(u => !!u));
    }

    public async activateUser(userId: string) {
        const params = {userId: userId};
        await this.userManager.signinRedirect({
            prompt: 'activation',
            redirect_uri: UserManagerSetting.redirect_uri,
            extraQueryParams: params
        });
    }

    public async resetPassword(token: string, userId: string): Promise<void> {
        const params = {token: token, userId: userId};
        await this.userManager.signinRedirect({
            prompt: 'reset-password',
            redirect_uri: UserManagerSetting.redirect_uri,
            extraQueryParams: params
        });
    }

    public getUser(): Observable<IUser | null> {
        return concat(
            this.userSubject.pipe(take(1), filter(u => !!u)),
            this.getUserFromStorage().pipe(filter(u => !!u), tap(u => this.userSubject.next(u))),
            this.userSubject.asObservable()
        );
    }

    public getAccessToken(): Observable<string | null> {
        return from(this.userManager.getUser())
            .pipe(
                map(u => u && u.access_token)
            );
    }

    public getUserName(): Observable<string | null | undefined> {
        return from(this.userManager.getUser()).pipe(
            map(u => u && jwt_decode<{ name: string }>(u.access_token).name)
        );
    }

    public getUserRole(): Observable<string | null | undefined> {
        return from(this.userManager.getUser()).pipe(
            map(u => u && jwt_decode<{ role: string }>(u.access_token).role)
        )
    }

    public async signIn(state: any): Promise<IAuthenticationResult> {
        let user: User | null = null;
        try {
            user = await this.userManager.signinSilent(this.createArguments());
            this.userSubject.next(user!.profile);
            return this.success(state);
        } catch (silentError) {
            console.log('Silent authentication error: ', silentError);
            try {
                await this.userManager.signinRedirect(this.createArguments(state));
                return this.redirect();
            } catch (redirectError: any) {
                console.log('Redirect authentication error: ', redirectError);
                return this.error(redirectError);
            }
        }
    }

    public async completeSignIn(url: string): Promise<IAuthenticationResult> {
        try {
            const user = await this.userManager.signinCallback(url);
            this.userSubject.next(user! && user.profile);
            return this.success(user && user.state);
        } catch (error) {
            console.log('There was an error signing in: ', error);
            return this.error('There was an error signing in.');
        }
    }

    public async signOut(state: any): Promise<IAuthenticationResult> {
        try {
            await this.revokeToken();
            await this.userManager.signoutRedirect(this.createArguments(state));
            return this.redirect();
        } catch (redirectSignOutError: any) {
            console.log('Redirect signout error: ', redirectSignOutError);
            return this.error(redirectSignOutError);
        }
    }

    public async completeSignOut(url: string): Promise<IAuthenticationResult> {
        try {
            await this.userManager.signoutCallback(url);
            this.userSubject.next(null);
            return this.success(true);
        } catch (error: any) {
            console.log(`There was an error trying to log out '${error}'.`);
            return this.error(error);
        }
    }

    private async revokeToken(): Promise<void> {
        const token = await lastValueFrom(this.getAccessToken());
        if (token) {
            const request = jwt_decode<{ jti: string, exp: number }>(token);
            const invalidToken$ = this.api.post<{ jti: string, expiration: number }, any>('invalid-tokens', {
                jti: request.jti,
                expiration: request.exp
            });
            await lastValueFrom(invalidToken$);
        }
    }

    private createArguments(state?: any): any {
        return {useReplaceToNavigate: true, data: state};
    }

    private error(message: string): IAuthenticationResult {
        return {status: AuthenticationResultStatus.Fail, message};
    }

    private success(state: any): IAuthenticationResult {
        return {status: AuthenticationResultStatus.Success, state};
    }

    private redirect(): IAuthenticationResult {
        return {status: AuthenticationResultStatus.Redirect};
    }

    private getUserFromStorage(): Observable<IUser | null> {
        return from(this.userManager.getUser())
            .pipe(
                map(u => u && u.profile)
            );
    }

    private async logOut() {
        await this.userManager.removeUser();
        this.userSubject.next(null);
        await this.router.navigate(ApplicationPaths.LoginPathComponents, {
            queryParams: {
                [QueryParameterNames.ReturnUrl]: this.router.routerState.snapshot.url ?? ApplicationPaths.DefaultLoginRedirectPath
            }
        });
    }
}
