import { Injectable } from '@angular/core';
import { PersonaModel } from '../modelo/persona-model.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {

  private id: number = 1;
  private data: PersonaModel = null;
  apiURL = environment.apiURL;
  private url: string = this.apiURL + "/persona";

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

  editarPersona(pers: PersonaModel){
    this.HttpClient.put(this.url + '/editar?persona_id=' + this.getId(), pers).subscribe( response => {
      if(response){
        this.data = response;
      }else{
        console.log("Error al editar persona!");
      }
    })
  }

}
