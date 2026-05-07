import { HttpInterceptorFn } from '@angular/common/http';
import { AUTH_ROUTE, AuthRoutes } from '../../../shared/constants/auth/routes/routes.constants';
import { ACCESS_TOKEN } from '../../../shared/constants/auth/token/token.constant';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (req.url.includes(`/${AUTH_ROUTE}/${AuthRoutes.LOGIN}`) || req.url.includes(`/${AUTH_ROUTE}/${AuthRoutes.REGISTER}`)) {
    return next(req);
  }

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(clonedReq);
  }

  return next(req);
};
