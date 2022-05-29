import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../modelo/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../modelo/login-usuario';
import { JwtDTO } from '../modelo/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = "https://immense-meadow-61678.herokuapp.com/auth";

  constructor(private HttpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
    return this.HttpClient.post<any>(this.authURL + '/nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO>{
    return this.HttpClient.post<JwtDTO>(this.authURL + '/login', loginUsuario);
  }
}
