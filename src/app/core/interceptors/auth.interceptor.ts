import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '../services/config.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const configService = inject(ConfigService);
  const apiToken = configService.apiToken;

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  return next(authReq);
};
