import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, Observable, throwError } from 'rxjs';
import { TokenService } from '../token.service';
import { JwtDTO } from '../../modelo/jwt-dto';
import { AuthService } from '../auth.service';

const AUTHORIZATION = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class ProdInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!this.tokenService.isLogged()){
      return next.handle(req);
    }

    let intReq = req;
    const token = this.tokenService.getToken();
    intReq = this.addToken(req, token);
    return next.handle(intReq).pipe(catchError((error: HttpErrorResponse) => {
      if(error.status === 401){
        const dto: JwtDTO = new JwtDTO(this.tokenService.getToken());
        return this.authService.refresh(dto).pipe(concatMap((data: any) => {
          this.tokenService.setToken(data.token);
          intReq = this.addToken(req, data.token);
          return next.handle(intReq);
        }));
      }else{
        this.tokenService.logOut();
      }
      return throwError(error);
    }));
  }

  private addToken(req: HttpRequest<any>, token: String): HttpRequest<any>{
    return req.clone({headers: req.headers.set(AUTHORIZATION, 'Bearer ' + token)});
  }
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true}];
