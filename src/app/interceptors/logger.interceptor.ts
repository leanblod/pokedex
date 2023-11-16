import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoggerService } from '@services/logger.service';

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {

  constructor(
    private readonly service: LoggerService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.debug('%cRequest:\n','color: blue; font-size: 1.5em; font-width: bold;',request);
    return next.handle(request).pipe(
      tap({
        next: (response) => this.service.debug.success('Response', response),
        error: (error) => this.service.debug.failed('Response error', error),
      })
    );
  }

}
