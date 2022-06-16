import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, map, Observable, throwError, finalize } from 'rxjs';
import { TokenService } from '../token.service';
import { JwtDTO } from '../../modelo/jwt-dto';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../loader.service';

const AUTHORIZATION = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class ProdInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService, private authService: AuthService, private toastr: ToastrService, private loader: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loader.show();
    if(!this.tokenService.isLogged()){
      this.loader.hide();
      return next.handle(req);
    }
    let intReq = req;
    const token = this.tokenService.getToken();
    intReq = this.addToken(req, token);
    return next.handle(intReq).pipe(
      finalize(() => {
        this.loader.hide();
      }),
      map(response => {
        this.toastr.success('Correcto!', 'OK');
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401){
          const dto: JwtDTO = new JwtDTO(this.tokenService.getToken());
          return this.authService.refresh(dto).pipe(concatMap((data: any) => {
            this.tokenService.setToken(data.token);
            this.toastr.success('Correcto!', 'OK');
            return next.handle(intReq).pipe(
              finalize(() => {
                this.loader.hide();
              })
            );
          }));
        }else{
          this.toastr.error('Ocurrió un error. Saliendo...', 'ERROR');
          this.tokenService.logOut();
        }
        return throwError(error);
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: String): HttpRequest<any>{
    return req.clone({headers: req.headers.set(AUTHORIZATION, 'Bearer ' + token)});
  }
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true}];
