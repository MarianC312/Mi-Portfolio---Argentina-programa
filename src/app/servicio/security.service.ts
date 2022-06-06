import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

const PRIVATE_KEY = "aGEO1.5#%!4263r/*,1ef@13";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  public convertir(texto: string, accion: string): string{
    if(texto.length > 0){
      let textoEnc: string;
      if(accion === "enc"){
        textoEnc = CryptoJS.AES.encrypt(texto.trim(), PRIVATE_KEY).toString();
      }else{
        textoEnc = CryptoJS.AES.decrypt(texto.trim(), PRIVATE_KEY).toString(CryptoJS.enc.Utf8);
      }
      return textoEnc;
    }else{
      return null;
    }
  }
}
