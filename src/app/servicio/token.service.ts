import { Injectable } from '@angular/core';
import { SkillServiceService } from './skill-service.service';
import { Router } from '@angular/router';
import { SecurityService } from './security.service';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor(private router: Router, private securityService: SecurityService) { }

  public setToken(token: string): void{
    const tokenEnc = this.securityService.convertir(token, "enc");
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, tokenEnc);
  }

  public getToken(): string{
    const tokenDec = (localStorage.getItem(TOKEN_KEY)) ? this.securityService.convertir(localStorage.getItem(TOKEN_KEY), "dec") : "";
    return tokenDec;
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
    setTimeout(() => { this.router.navigate(['/login']); }, 750);
    const elements = document.getElementsByClassName("modal-backdrop");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
  }
}
