import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { StatusCodes } from '../../../shared/constants/status-codes/status-codes.constant';
import { ACCESS_TOKEN } from '../../../shared/constants/auth/token/token.constant';
import { AuthRoutes } from '../../../shared/constants/auth/routes/routes.constants';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === StatusCodes.UNAUTHORIZED) {
        localStorage.removeItem(ACCESS_TOKEN);
        router.navigate([`/${AuthRoutes.LOGIN}`]);
      }

      return throwError(() => error);
    })
  );
};
