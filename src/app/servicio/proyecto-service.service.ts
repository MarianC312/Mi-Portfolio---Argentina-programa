import { Injectable } from '@angular/core';
import { ProyectoModel } from '../modelo/proyecto-model.model';
import { HttpClient } from '@angular/common/http';
import { PersonaServiceService } from './persona-service.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoServiceService {

  private data: ProyectoModel[] = [];
  private url: String = "https://immense-meadow-61678.herokuapp.com/proyecto";

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

  editarProyecto(proy: ProyectoModel){
    console.log(proy);

    this.HttpClient.put(this.url + '/editar?persona_id=' + this.personaService.getId(), proy).subscribe( response => {
      if(response){
        this.data = this.data.filter( data => data != response);
        this.data.push(response);
      }else{
        console.log("Error al editar proyecto!");
      }
    })
  }

}
