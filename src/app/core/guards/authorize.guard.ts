import {Injectable} from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {AuthorizeService} from "../services/authorize.service";
import {ApplicationPaths, QueryParameterNames} from "../constants/api-authorization.constants";

@Injectable({
    providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
    constructor(private authorize: AuthorizeService, private router: Router) {
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authorize.isAuthenticated()
            .pipe(tap(isAuthenticated => this.handleAuthorization(isAuthenticated, state)));
    }

    private async handleAuthorization(isAuthenticated: boolean, state: RouterStateSnapshot) {
        if (!isAuthenticated) {
            await this.router.navigate(ApplicationPaths.LoginPathComponents, {
                queryParams: {
                    [QueryParameterNames.ReturnUrl]: state.url
                }
            });
        }
    }
}
