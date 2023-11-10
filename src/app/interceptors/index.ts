import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

import { CacheInterceptor } from './cache.interceptor';
import { LoggerInterceptor } from './logger.interceptor';


/** Ordered list of all provided interceptors */
export const httpInterceptorProviders: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
];

// Interceptors' barrel
export { CacheInterceptor , LoggerInterceptor };
