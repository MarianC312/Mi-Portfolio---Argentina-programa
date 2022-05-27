import { Injectable } from '@angular/core';
import { PersonaModel } from '../modelo/persona-model.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {

  private id: number = 1;
  private data: PersonaModel = null;
  private url: string = "https://immense-meadow-61678.herokuapp.com/persona";

  constructor(private HttpClient: HttpClient) { }

  fetchPersonaData(){
    return this.HttpClient.get(this.url + '/ver/id?persona_id=' + this.id).pipe(
      tap(response => {
        let respuesta: PersonaModel = response;
        this.data = respuesta;
      })
    );
  }

  get personaData(): PersonaModel{
    return this.data;
  }

  set personaData(perData: PersonaModel){
    this.data = perData;
  }

  getId(): number{
    return this.id;
  }

}
