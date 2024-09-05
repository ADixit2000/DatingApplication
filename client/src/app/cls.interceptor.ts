import { HttpInterceptorFn } from '@angular/common/http';

export const clsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
