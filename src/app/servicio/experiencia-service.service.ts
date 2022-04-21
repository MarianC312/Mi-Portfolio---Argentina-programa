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

  fetchExperienciaData() {
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
}
