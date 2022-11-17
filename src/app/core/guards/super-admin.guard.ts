import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthorizeService} from "../services/authorize.service";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
    constructor(private authorize: AuthorizeService, private router: Router) {
    }
    
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authorize.isSuperAdmin()
            .pipe(tap(isSuperAdmin => this.handleAuthorization(isSuperAdmin)))
    }

    private async handleAuthorization(isSuperAdmin: boolean) {
        if (!isSuperAdmin) {
            await this.router.navigate(['page-not-found']);
        }
    }

}
