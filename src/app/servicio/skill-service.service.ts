import { Injectable } from '@angular/core';
import { SkillModel } from '../modelo/skill-model.model';
import { PersonaServiceService } from './persona-service.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillServiceService {

  private data: SkillModel[] = [];
  apiURL = environment.apiURL;
  private url: String = this.apiURL + "/habilidad";

  constructor(private HttpClient: HttpClient, private personaService: PersonaServiceService) { }

  get skillData(): SkillModel[]{
    return this.data;
  }

  set skillData(skillData: SkillModel[]){
    this.data = skillData;
  }

  fetchSkillData(force: boolean = false) {
    return this.HttpClient.get<[]>(this.url + '/ver').pipe(
      tap(response => {
        let respuesta: SkillModel[]  = response;
        this.data = respuesta.filter(data => data.persona.id == this.personaService.getId());
      })
    )
  }

  eliminarSkill(id: number){
    this.HttpClient.delete(this.url + '/eliminar?habilidad_id=' + id).subscribe( response => {
      if(response){
        this.data = this.data.filter( data => data.id != id);
      }else{
        console.log("Error al borrar habilidad!");
      }
    });
  }

  agregarSkill(skill: SkillModel){
    this.HttpClient.post(this.url + '/nueva?persona_id=' + this.personaService.getId(), skill).subscribe( response => {
      if(response){
        this.data.push(response);
      }else{
        console.log("Error al crear nueva habilidad!");
      }
    });
  }

  editarSkill(skill: SkillModel){
    this.HttpClient.put(this.url + '/editar?persona_id=' + this.personaService.getId(), skill).subscribe( response => {
      if(response){
        this.data = this.data.filter( data => data != response);
        this.data.push(response);
      }else{
        console.log("Error al editar habilidad!");
      }
    })
  }
}
