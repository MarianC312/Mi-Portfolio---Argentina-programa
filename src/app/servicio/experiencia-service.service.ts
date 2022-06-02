import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExperienciaModel } from '../modelo/experiencia-model.model';
import { tap } from 'rxjs';
import { PersonaServiceService } from './persona-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaServiceService {

  private data: ExperienciaModel[] = [];
  apiURL = environment.apiURL;
  private url: String = this.apiURL + "/experiencia";

  constructor(private HttpClient: HttpClient, private personaService: PersonaServiceService) {}

  get experienciaData(): ExperienciaModel[]{
    return this.data;
  }

  set experienciaData(expData: ExperienciaModel[]){
    this.data = expData;
  }

  fetchExperienciaData(force: boolean = false) {
    return this.HttpClient.get<[]>(this.url + '/ver').pipe(
      tap(response => {
        let respuesta: ExperienciaModel[]  = response;
        this.data = respuesta.filter(data => data.persona.id == this.personaService.getId());
      })
    )
  }

  eliminarExperiencia(id: number){
    this.HttpClient.delete(this.url + '/eliminar?experiencia_id=' + id).subscribe( response => {
      if(response){
        this.data = this.data.filter( data => data.id != id);
      }else{
        console.log("Error al borrar experiencia!");
      }
    });
  }

  agregarExperiencia(exp: ExperienciaModel){
    this.HttpClient.post(this.url + '/nueva?persona_id=' + this.personaService.getId(), exp).subscribe( response => {
      if(response){
        this.data.push(response);
      }
    });
  }

  editarExperiencia(exp: ExperienciaModel){
    this.HttpClient.put(this.url + '/editar?persona_id=' + this.personaService.getId(), exp).subscribe( response => {
      if(response){
        console.log(response);
        this.data = this.data.filter( data => data != response);
        this.data.push(response);
      }
    })
  }
}
