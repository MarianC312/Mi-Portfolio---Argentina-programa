import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExperienciaModel } from '../modelo/experiencia-model.model';
import { tap } from 'rxjs';
import { PersonaServiceService } from './persona-service.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaServiceService {

  private data: ExperienciaModel[] = [];
  private url: String = "http://localhost:8080";

  constructor(private HttpClient: HttpClient, private personaService: PersonaServiceService) {}

  get experienciaData(): ExperienciaModel[]{
    return this.data;
  }

  set experienciaData(expData: ExperienciaModel[]){
    this.data = expData;
  }

  fetchExperienciaData(force: boolean = false) {
    return this.HttpClient.get<[]>(this.url + '/ver/experiencias').pipe(
      tap(response => {
        let respuesta: ExperienciaModel[]  = response;
        this.data = respuesta.filter(data => data.persona.id == this.personaService.getId());
      })
    )
  }

  eliminarExperiencia(id: number){
    this.HttpClient.delete(this.url + '/eliminar/experiencia?experiencia_id=' + id).subscribe( response => {
      if(response){
        this.data = this.data.filter( data => data.id != id);
      }else{
        console.log("Error al borrar experiencia!");
      }
    });
  }

  agregarExperiencia(exp: ExperienciaModel){
    this.HttpClient.post(this.url + '/nueva/experiencia?persona_id=' + this.personaService.getId(), exp).subscribe( response => {
      if(response){
        this.data.push(response);
      }
    });
  }

  editarExperiencia(exp: ExperienciaModel){
    this.HttpClient.put(this.url + '/editar/experiencia?persona_id=' + this.personaService.getId(), exp).subscribe( response => {
      if(response){
        console.log(response);
        this.data = this.data.filter( data => data != response);
        this.data.push(response);
      }
    })
  }
}
