import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../modelo/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../modelo/login-usuario';
import { JwtDTO } from '../modelo/jwt-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;
  url = this.apiURL + "/auth";

  constructor(private HttpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
    return this.HttpClient.post<any>(this.url + '/nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO>{
    return this.HttpClient.post<JwtDTO>(this.url + '/login', loginUsuario);
  }

  public refresh(dto: JwtDTO): Observable<JwtDTO>{
    return this.HttpClient.post<JwtDTO>(this.url + '/refresh', dto);
  }
}
