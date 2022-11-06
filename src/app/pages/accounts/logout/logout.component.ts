import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, lastValueFrom } from "rxjs";
import {AuthenticationResultStatus, AuthorizeService} from "../../../core/services/authorize.service";
import {ActivatedRoute, Router} from "@angular/router";
import {
    ApplicationPaths,
    LogoutActions,
    QueryParameterNames,
    ReturnUrlType
} from "../../../core/constants/api-authorization.constants";
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styles: []
})
export class LogoutComponent implements OnInit {
    public message = new BehaviorSubject<string | null>(null);
    
    constructor(private authorizeService: AuthorizeService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    public async ngOnInit(): Promise<void> {
        const action = this.activatedRoute.snapshot.url[0];
        switch (action.path) {
            case LogoutActions.Logout:
                if (!!window.history.state.local) {
                    await this.logout(this.getReturnUrl());
                } else {
                    // This prevents regular links to <app>/authentication/logout from triggering a logout
                    this.message.next('The logout was not initiated from within the page.');
                }

                break;
            case LogoutActions.LogoutCallback:
                await this.processLogoutCallback();
                break;
            case LogoutActions.LoggedOut:
                await this.router.navigate(ApplicationPaths.LoginPathComponents, {
                    queryParams: {
                        [QueryParameterNames.ReturnUrl]: ApplicationPaths.DefaultLoginRedirectPath
                    }
                });
                //this.message.next('You successfully logged out!');
                break;
            default:
                throw new Error(`Invalid action '${action}'`);
        }
    }

    private async logout(returnUrl: string): Promise<void> {
        const state: INavigationState = { returnUrl };
        const isAuthenticated$ = this.authorizeService.isAuthenticated().pipe(take(1));
        const isAuthenticated = await lastValueFrom(isAuthenticated$);
        
        if (isAuthenticated) {
            const result = await this.authorizeService.signOut(state);
            switch (result.status) {
                case AuthenticationResultStatus.Redirect:
                    break;
                case AuthenticationResultStatus.Success:
                    await this.navigateToReturnUrl(returnUrl);
                    break;
                case AuthenticationResultStatus.Fail:
                    this.message.next(result.message);
                    break;
                default:
                    throw new Error('Invalid authentication result status.');
            }
        } else {
            this.message.next('You successfully logged out!');
        }
    }

    private async processLogoutCallback(): Promise<void> {
        const url = window.location.href;
        const result = await this.authorizeService.completeSignOut(url);
        switch (result.status) {
            case AuthenticationResultStatus.Redirect:
                // There should not be any redirects as the only time completeAuthentication finishes
                // is when we are doing a redirect sign in flow.
                throw new Error('Should not redirect.');
            case AuthenticationResultStatus.Success:
                await this.navigateToReturnUrl(this.getReturnUrl(result.state));
                break;
            case AuthenticationResultStatus.Fail:
                this.message.next(result.message);
                break;
            default:
                throw new Error('Invalid authentication result status.');
        }
    }

    private async navigateToReturnUrl(returnUrl: string) {
        await this.router.navigateByUrl(returnUrl, {
            replaceUrl: true
        });
    }

    private getReturnUrl(state?: INavigationState): string {
        const fromQuery = (this.activatedRoute.snapshot.queryParams as INavigationState).returnUrl;
        // If the url is coming from the query string, check that is either
        // a relative url or an absolute url
        if (fromQuery &&
            !(fromQuery.startsWith(`${window.location.origin}/`) ||
                /\/[^\/].*/.test(fromQuery))) {
            // This is an extra check to prevent open redirects.
            throw new Error('Invalid return url. The return url needs to have the same origin as the current page.');
        }
        return (state && state.returnUrl) ||
            fromQuery ||
            ApplicationPaths.LoggedOut;
    }
}

interface INavigationState {
    [ReturnUrlType]: string;
}
