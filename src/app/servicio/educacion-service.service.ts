import { Injectable } from '@angular/core';
import { EducacionModel } from '../modelo/educacion-model.model';
import { HttpClient } from '@angular/common/http';
import { PersonaServiceService } from './persona-service.service';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducacionServiceService {

  private data: EducacionModel[] = [];
  apiURL = environment.apiURL;
  url: String = this.apiURL + "/educacion";

  constructor(private HttpClient: HttpClient, private personaService: PersonaServiceService) { }

  get educacionData(): EducacionModel[]{
    return this.data;
  }

  set educacionData(eduData: EducacionModel[]){
    this.data = eduData;
  }

  fetchEducacionData(force: boolean = false) {
    return this.HttpClient.get<[]>(this.url + '/ver').pipe(
      tap(response => {
        let respuesta: EducacionModel[]  = response;
        this.data = respuesta.filter(data => data.persona.id == this.personaService.getId());
      })
    )
  }

  eliminarEducacion(id: number){
    this.HttpClient.delete(this.url + '/eliminar?educacion_id=' + id).subscribe( response => {
      if(response){
        this.data = this.data.filter( data => data.id != id);
      }else{
        console.log("Error al borrar educación!");
      }
    });
  }

  agregarEducacion(edu: EducacionModel){
    this.HttpClient.post(this.url + '/nueva?persona_id=' + this.personaService.getId(), edu).subscribe( response => {
      if(response){
        this.data.push(response);
      }else{
        console.log("Error al crear nueva educación!");
      }
    });
  }

  editarEducacion(edu: EducacionModel){
    this.HttpClient.put(this.url + '/editar?persona_id=' + this.personaService.getId(), edu).subscribe( response => {
      if(response){
        this.data = this.data.filter( data => data != response);
        this.data.push(response);
      }else{
        console.log("Error al editar educación!");
      }
    })
  }
}
