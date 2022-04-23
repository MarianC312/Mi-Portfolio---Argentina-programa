import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExperienciaModel } from '../modelo/experiencia-model.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaServiceService {

  private data: ExperienciaModel[] = [];
  private url: String = "http://localhost:8080";

  constructor(private HttpClient: HttpClient) {}

  get experienciaData(): ExperienciaModel[]{
    return this.data;
  }

  set experienciaData(expData: ExperienciaModel[]){
    this.data = expData;
  }

  fetchExperienciaData(force: boolean = false) {
    return this.HttpClient.get<[]>(this.url + '/ver/experiencias').pipe(
      tap(response => {
        console.log(response);
        this.data = response;
      })
    )
  }

  eliminarExperiencia(id: number){
    this.HttpClient.delete(this.url + '/borrar/experiencia/?id=' + id).subscribe( data => {
      console.log(data);
    });
    this.data = this.data.filter( data => data.id != id);
  }

  agregarExperiencia(exp: ExperienciaModel){
    this.HttpClient.post(this.url + '/nueva/experiencia', exp).subscribe( response => {
      if(response){
        this.data.push(response);
      }
    });
  }

  editarExperiencia(exp: ExperienciaModel){
    this.HttpClient.put(this.url + '/editar/experiencia', exp).subscribe( response => {
      if(response){
        console.log(response);
        this.data = this.data.filter( data => data != response);
        this.data.push(response);
      }
    })
  }
}
