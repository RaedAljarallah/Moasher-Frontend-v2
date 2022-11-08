import { environment } from "src/environments/environment";

export const ReturnUrlType = 'returnUrl';
export const QueryParameterNames = {
    ReturnUrl: ReturnUrlType,
    Message: 'message'
};
export const LogoutActions = {
    LogoutCallback: 'logout-callback',
    Logout: 'logout',
    LoggedOut: 'logged-out'
};
export const LoginActions = {
    Login: 'login',
    LoginCallback: 'login-callback',
    LoginFailed: 'login-failed'
};


let applicationPaths: ApplicationPathsType = {
    DefaultLoginRedirectPath: '/',
    Login: `accounts/${LoginActions.Login}`,
    LoginFailed: `accounts/${LoginActions.LoginFailed}`,
    LoginCallback: `accounts/${LoginActions.LoginCallback}`,
    LogOut: `accounts/${LogoutActions.Logout}`,
    LoggedOut: `accounts/${LogoutActions.LoggedOut}`,
    LogOutCallback: `accounts/${LogoutActions.LogoutCallback}`,
    Activation: 'accounts/activation',
    ChangePassword: 'accounts/change-password',
    LoginPathComponents: [],
    LoginFailedPathComponents: [],
    LoginCallbackPathComponents: [],
    LogOutPathComponents: [],
    LoggedOutPathComponents: [],
    LogOutCallbackPathComponents: [],
    ActivationPathComponents: [],
    ChangePasswordPathComponents: []
};


applicationPaths = {
    ...applicationPaths,
    LoginPathComponents: applicationPaths.Login.split('/'),
    LoginFailedPathComponents: applicationPaths.LoginFailed.split('/'),
    LogOutPathComponents: applicationPaths.LogOut.split('/'),
    LoggedOutPathComponents: applicationPaths.LoggedOut.split('/'),
    LogOutCallbackPathComponents: applicationPaths.LogOutCallback.split('/'),
    ActivationPathComponents: applicationPaths.Activation.split('/'),
    ChangePasswordPathComponents: applicationPaths.ChangePassword.split('/')
};

export const ApplicationPaths: ApplicationPathsType = applicationPaths;


let userManagerSetting: IUserManagerSetting = {
    authority: environment.oidc.authorityUrl,
    client_id: environment.oidc.client_id,
    redirect_uri: `${environment.oidc.baseUrl}/${applicationPaths.LoginCallback}`,
    post_logout_redirect_uri: `${environment.oidc.baseUrl}/${applicationPaths.LogOutCallback}`,
    response_type: environment.oidc.response_type,
    scope: environment.oidc.scope,
    automaticSilentRenew: true,
    includeIdTokenInSilentRenew: true
}

export const UserManagerSetting: IUserManagerSetting = userManagerSetting;

export interface IUserManagerSetting {
    authority: string;
    client_id: string;
    redirect_uri: string;
    post_logout_redirect_uri: string;
    response_type: string;
    scope: string;
    automaticSilentRenew: boolean;
    includeIdTokenInSilentRenew: boolean;
}


interface ApplicationPathsType {
    readonly DefaultLoginRedirectPath: string;
    readonly Login: string;
    readonly LoginFailed: string;
    readonly LoginCallback: string;
    readonly LogOut: string;
    readonly LoggedOut: string;
    readonly LogOutCallback: string;
    readonly Activation: string;
    readonly ChangePassword: string;
    readonly LoginPathComponents: string[];
    readonly LoginFailedPathComponents: string[];
    readonly LoginCallbackPathComponents: string[];
    readonly LogOutPathComponents: string[];
    readonly LoggedOutPathComponents: string[];
    readonly LogOutCallbackPathComponents: string[];
    readonly ActivationPathComponents: string[];
    readonly ChangePasswordPathComponents: string[];
}