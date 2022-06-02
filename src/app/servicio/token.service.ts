import { Injectable } from '@angular/core';
import { SkillServiceService } from './skill-service.service';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor(private router: Router) { }

  public setToken(token: string): void{
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string{
    return localStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean{
    if(this.getToken()){
      return true;
    }else{
      return false;
    }
  }

  public getUserName(): string{
    if(!this.isLogged()){
      return null;
    }
    const token = this.getToken();
    const payload = token.split(".")[1];
    const payloadDec = atob(payload);
    const values = JSON.parse(payloadDec);
    const username = values.sub;
    return username;
  }

  public isAdmin(): boolean{
    if(!this.isLogged()){
      return false;
    }
    const token = this.getToken();
    const payload = token.split(".")[1];
    const payloadDec = atob(payload);
    const values = JSON.parse(payloadDec);
    const roles = values.roles;
    if(roles.indexOf("ROLE_ADMIN") < 0){
      return false;
    }else{
      return true;
    }
  }

  public logOut(): void{
    window.localStorage.clear();
    //window.location.href = 'https://marianocampos.netlify.app/';
    this.router.navigate(['/login']);
  }
}
