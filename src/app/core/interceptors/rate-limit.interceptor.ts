import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {retry} from "rxjs/operators";

@Injectable()
export class RateLimitInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            retry({ count: 5, delay: this.shouldRetry})
        );
    }
    
    private shouldRetry(error: HttpErrorResponse) {
        if (error.status === 429) {
            return timer(3000)
        }
        throw error;
    }
}
