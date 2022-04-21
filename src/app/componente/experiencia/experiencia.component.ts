import { Component, Input, OnInit } from '@angular/core';
import { ExperienciaModel } from 'src/app/modelo/experiencia-model.model';
import { ExperienciaServiceService } from '../../servicio/experiencia-service.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experienciaData?: ExperienciaModel[] = [];
  contentEditable: boolean = false;
  @Input() nuevaExperiencia: boolean = false;

  constructor(private experienciaService: ExperienciaServiceService) { }

  ngOnInit(): void {
    this.experienciaData = this.experienciaService.experienciaData;
    if(!this.experienciaData?.length){
      this.experienciaService.fetchExperienciaData().subscribe(() => {
        this.experienciaData = this.experienciaService.experienciaData;
      });
    }
  }

  editarContenido(): void {
    this.contentEditable = !this.contentEditable;
  }

  descartarEditarContenido(): void {
    this.contentEditable = false;
  }

  eliminarExperiencia(id: number) {
    this.experienciaService.eliminarExperiencia(id);
    this.removerExperienciaDelArrego(id);
  }

  removerExperienciaDelArrego(id: number){
    this.experienciaData = this.experienciaData.filter(value => value.id != id);
  }

  agregarExperiencia(): void{

    this.experienciaData.push({
      id: null,
      descripcion: null,
      logo: null,
      periodo: null,
      titulo: null
    });

  }

}
