import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthServiceInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log("intercept called");
        const token = localStorage.getItem('authToken');
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        return next.handle(req);
    }
}