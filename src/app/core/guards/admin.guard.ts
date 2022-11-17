import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import {AuthorizeService} from "../services/authorize.service";
import {ApplicationPaths, QueryParameterNames} from "../constants/api-authorization.constants";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authorize: AuthorizeService, private router: Router) {
    }
    
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authorize.isAdmin()
            .pipe(tap(isAdmin => this.handleAuthorization(isAdmin)));
    }

    private async handleAuthorization(isAdmin: boolean) {
        if (!isAdmin) {
            await this.router.navigate(['page-not-found']);
        }
    }

}
