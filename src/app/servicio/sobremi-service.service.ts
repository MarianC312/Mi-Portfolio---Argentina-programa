import { Injectable } from '@angular/core';
import { SobremiModel } from '../modelo/sobremi-model.model';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PersonaServiceService } from './persona-service.service';

@Injectable({
  providedIn: 'root'
})
export class SobremiServiceService {

  private data: SobremiModel[] = [];
  private url: string = "http://localhost:8080";

  constructor(private HttpClient: HttpClient, private personaService: PersonaServiceService) { }

  get sobremiData(): SobremiModel[]{
    return this.data;
  }

  set sobremiData(aptData: SobremiModel[]){
    this.data = aptData;
  }

  fetchSobremiData(force: boolean = false) {
    return this.HttpClient.get<[]>(this.url + '/ver/sobremi').pipe(
      tap(response => {
        let respuesta: SobremiModel[]  = response;
        this.data = respuesta.filter(data => data.persona.id == this.personaService.getId());
      })
    )
  }

  eliminarAptitud(id: number){
    this.HttpClient.delete(this.url + '/eliminar/sobremi?sobremi_id=' + id).subscribe( response => {
      if(response){
        this.data = this.data.filter( data => data.id != id);
      }else{
        console.log("Error al borrar aptitud!");
      }
    });
  }

  editarAptitud(aptitud: SobremiModel){
    this.HttpClient.put(this.url + '/editar/sobremi?persona_id=' + this.personaService.getId(), aptitud).subscribe( response => {
      if(response){
        console.log(response);
        this.data = this.data.filter( data => data != response);
        this.data.push(response);
      }
    })
  }

  agregarAptitud(aptitud: SobremiModel){
    this.HttpClient.post(this.url + '/nueva/sobremi?persona_id=' + this.personaService.getId(), aptitud).subscribe( response => {
      if(response){
        this.data.push(response);
      }
    });
  }

}
