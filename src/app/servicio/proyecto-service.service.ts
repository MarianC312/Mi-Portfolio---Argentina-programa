import { Injectable } from '@angular/core';
import { ProyectoModel } from '../modelo/proyecto-model.model';
import { HttpClient } from '@angular/common/http';
import { PersonaServiceService } from './persona-service.service';
import { tap, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoServiceService {

  private data: ProyectoModel[] = [];
  apiURL = environment.apiURL;
  private url: String = this.apiURL + "/proyecto";

  constructor(private HttpClient: HttpClient, private personaService: PersonaServiceService) { }

  get proyectoData(): ProyectoModel[]{
    return this.data;
  }

  set proyectoData(skillData: ProyectoModel[]){
    this.data = skillData;
  }

  fetchProyectoData(force: boolean = false) {
    return this.HttpClient.get<[]>(this.url + '/ver').pipe(
      tap(response => {
        let respuesta: ProyectoModel[]  = response;
        this.data = respuesta.filter(data => data.persona.id == this.personaService.getId());
      })
    )
  }

  eliminarProyecto(id: number){
    this.HttpClient.delete(this.url + '/eliminar?educacion_id=' + id).subscribe( response => {
      if(response){
        this.data = this.data.filter( data => data.id != id);
      }else{
        console.log("Error al borrar proyecto!");
      }
    });
  }

  agregarProyecto(proy: ProyectoModel){
    this.HttpClient.post(this.url + '/nueva?persona_id=' + this.personaService.getId(), proy).subscribe( response => {
      if(response){
        this.data.push(response);
      }else{
        console.log("Error al crear nueva proyecto!");
      }
    });
  }

  editarProyecto(proy: ProyectoModel): boolean{
    this.HttpClient.put(this.url + '/editar?persona_id=' + this.personaService.getId(), proy).subscribe(
      (response) => {
        this.data = this.data.filter( data => data != response);
        this.data.push(response);
        return true;
      },
      (error) => {
        console.log(error);
      }
    )
    return false;
  }

}
