import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {retry, concatMap} from "rxjs/operators";

@Injectable()
export class RateLimitInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            retry({ count: 5, delay: this.shouldRetry})
        );
    }
    
    private shouldRetry(error: any) {
        if (error.status === 429) {
            return timer(1000)
        }
        throw error;
    }
}
