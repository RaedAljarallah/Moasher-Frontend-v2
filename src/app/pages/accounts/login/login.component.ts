import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthenticationResultStatus, AuthorizeService} from "../../../core/services/authorize.service";
import {ActivatedRoute, Router} from "@angular/router";
import {
    ApplicationPaths,
    LoginActions,
    QueryParameterNames,
    ReturnUrlType
} from "../../../core/constants/api-authorization.constants";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
    public message = new BehaviorSubject<string | null | undefined>(null);
    constructor(private authorizeService: AuthorizeService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    public async ngOnInit(): Promise<void> {
        const action = this.activatedRoute.snapshot.url[1];
        switch (action.path) {
            case LoginActions.Login:
                await this.login(this.getReturnUrl());
                break;
            case LoginActions.LoginCallback:
                await this.processLoginCallback();
                break;
            case LoginActions.LoginFailed:
                const message = this.activatedRoute.snapshot.queryParamMap.get(QueryParameterNames.Message);
                this.message.next(message);
                break;
            default:
                throw new Error(`Invalid action '${action}'`);
        }
    }

    private async login(returnUrl: string): Promise<void> {
        const state: INavigationState = { returnUrl };
        const result = await this.authorizeService.signIn(state);
        this.message.next(undefined);
        switch (result.status) {
            case AuthenticationResultStatus.Redirect:
                break;
            case AuthenticationResultStatus.Success:
                await this.navigateToReturnUrl(returnUrl);
                break;
            case AuthenticationResultStatus.Fail:
                await this.router.navigate(ApplicationPaths.LoginFailedPathComponents, {
                    queryParams: { [QueryParameterNames.Message]: result.message }
                });
                break;
            default:
                throw new Error(`Invalid status result ${(result as any).status}.`);
        }
    }

    private async processLoginCallback(): Promise<void> {
        const url = window.location.href;
        const result = await this.authorizeService.completeSignIn(url);
        switch (result.status) {
            case AuthenticationResultStatus.Redirect:
                // There should not be any redirects as completeSignIn never redirects.
                throw new Error('Should not redirect.');
            case AuthenticationResultStatus.Success:
                await this.navigateToReturnUrl(this.getReturnUrl(result.state));
                break;
            case AuthenticationResultStatus.Fail:
                this.message.next(result.message);
                break;
        }
    }

    private async navigateToReturnUrl(returnUrl: string) {
        // It's important that we do a replace here so that we remove the callback uri with the
        // fragment containing the tokens from the browser history.
        await this.router.navigateByUrl(returnUrl, {
            replaceUrl: true
        });
    }

    private getReturnUrl(state?: INavigationState): string {
        const fromQuery = (this.activatedRoute.snapshot.queryParams as INavigationState).returnUrl;
        // If the url is coming from the query string, check that is either
        // a relative url or an absolute url
        if (!this.isValidReturnUrl(fromQuery)) {
            // This is an extra check to prevent open redirects.
            throw new Error('Invalid return url. The return url needs to have the same origin as the current page.');
        }
        return (state && state.returnUrl) ||
            fromQuery ||
            ApplicationPaths.DefaultLoginRedirectPath;
    }

    private isValidReturnUrl(returnUrl: string): boolean {
        if (returnUrl && returnUrl === ApplicationPaths.DefaultLoginRedirectPath) {
            return true;
        }

        return !(returnUrl && !(returnUrl.startsWith(`${window.location.origin}/`) || /\/[^\/].*/.test(returnUrl)));
        
    }
}

interface INavigationState {
    [ReturnUrlType]: string;
}
