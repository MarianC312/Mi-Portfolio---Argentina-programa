import { Component, OnInit } from '@angular/core';
import { ExperienciaModel } from 'src/app/modelo/experiencia-model.model';
import { ExperienciaServiceService } from '../../servicio/experiencia-service.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experienciaData: ExperienciaModel[] = [];
  contentEditable: boolean = false;

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

  eliminarExperiencia(id: bigint) {
    this.experienciaService.eliminarExperiencia(id);
    this.experienciaData = this.experienciaService.experienciaData;
  }

}
