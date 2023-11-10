import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.info('%cRequest:\n','color: blue; font-size: 1.5em; font-width: bold;',request);
    return next.handle(request).pipe(
      tap({
        next(response) {
          console.info('%cResponse:\n','color: green; font-size: 1.5em; font-width: bold;',response);
        },
        error(error) {
          console.info('%cResponse:\n','color: red; font-size: 1.5em; font-width: bold;',error);
        }
      })
    );
  }
}
