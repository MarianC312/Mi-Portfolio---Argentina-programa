import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
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
  nuevaExperiencia: boolean = false;
  loading: boolean = false;
  @Input() isAdmin: boolean = false;

  constructor(private experienciaService: ExperienciaServiceService) { }

  ngOnInit(): void {
    this.loading = true;
    this.experienciaData = this.experienciaService.experienciaData;
    if(!this.experienciaData?.length){
      this.experienciaService.fetchExperienciaData().pipe(
        finalize(() => this.loading = false)
      ).subscribe(() => {
        this.experienciaData = this.experienciaService.experienciaData;
      });
    }else{
      this.loading = false;
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

  cargarNuevaExperiencia(): void{
    this.nuevaExperiencia = true;
    //this.scroll('nueva-experiencia');
  }

  scroll(id: string) {
    let element = document.getElementById(id);
    element.scrollIntoView();
  }

  cancelarCargarNuevaExperiencia(): void{
    this.nuevaExperiencia = false;
    this.scroll('experiencias');
  }

  editarExperiencia(exp: any): void{
    this.experienciaService.editarExperiencia(exp);
    this.contentEditable = false;
  }

  fetchExperiencias(): void{
    /*
    this.experienciaData = [];
    this.experienciaService.fetchExperienciaData().subscribe(() => {
      this.experienciaData = this.experienciaService.experienciaData;
    });
    */
    this.nuevaExperiencia = false;
    //this.scroll('experiencias');
  }

  /*
  agregarExperiencia(exp: ExperienciaModel): void{

    this.experienciaData.push({
      id: exp.id,
      descripcion: exp.descripcion,
      logo: exp.logo,
      periodo: exp.periodo,
      titulo: exp.titulo
    });
  }
  */

}
