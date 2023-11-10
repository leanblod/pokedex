import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  // private readonly cache: Map<HttpRequest<unknown>, HttpResponse<unknown>> = new Map();

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    /* TODO - Implement cache */
    return next.handle(request);
      // .pipe(
      //   tap({
      //     next: (response) => {
      //       switch(response.type){
      //         case HttpEventType.ResponseHeader:
      //           // Handling cached responses
      //           if(response.status === HttpStatusCode.NotModified) {
      //             return this.cache.get(request)
      //           }
      //           break;
      //       }
      //       return response;
      //     },
      //   })
      // );
  }
}
