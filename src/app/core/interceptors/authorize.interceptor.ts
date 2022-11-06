import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {AuthorizeService} from "../services/authorize.service";

@Injectable({
    providedIn: 'root'
})
export class AuthorizeInterceptor implements HttpInterceptor {
    constructor(private authorize: AuthorizeService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authorize.getAccessToken()
            .pipe(mergeMap(token => this.processRequestWithToken(token, req, next)));
    }

    private processRequestWithToken(token: string | null, req: HttpRequest<any>, next: HttpHandler) {
        if (!!token && this.isSameOriginUrl(req)) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(req);
    }

    private isSameOriginUrl(req: any): boolean {
        return req.url.startsWith(`${environment.apiBaseUrl}`);
    }
}