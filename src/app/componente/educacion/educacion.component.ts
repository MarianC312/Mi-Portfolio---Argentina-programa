import { Component, OnInit } from '@angular/core';
import { EducacionModel } from '../../modelo/educacion-model.model';
import { EducacionServiceService } from '../../servicio/educacion-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public data?: EducacionModel[] = [];
  contentEditable: boolean = false;
  nuevaEducacion: boolean = false;
  form:FormGroup;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private educacionService: EducacionServiceService) { }

  ngOnInit(): void {
    this.loading = true;
    this.data = this.educacionService.educacionData;
    if(!this.data?.length){
      this.educacionService.fetchEducacionData().pipe(
        finalize(() => this.loading = false)
      ).subscribe(() => {
        this.data = this.educacionService.educacionData;
      });
    }else{
      this.loading = true;
    }
    this.form = this.formBuilder.group(
      {
        titulo:['', [Validators.required,Validators.minLength(8)]],
        periodo:['', [Validators.required,Validators.minLength(4)]],
        descripcion:['', [Validators.required,Validators.minLength(8)]]
      }
    );
  }

  get Titulo() { return this.form.get('titulo'); }
  get Periodo() { return this.form.get('periodo'); }
  get Descripcion() { return this.form.get('descripcion'); }

  editarContenido(): void {
    this.contentEditable = !this.contentEditable;
  }

  descartarEditarContenido(): void {
    this.contentEditable = false;
  }

  removerEducacionDelArrego(id: number){
    this.data = this.data.filter(value => value.id != id);
  }

  eliminarEducacion(id: number) {
    this.educacionService.eliminarEducacion(id);
    this.removerEducacionDelArrego(id);
  }

  editarEducacion(educacion: any): void{
    this.educacionService.editarEducacion(educacion);
    this.contentEditable = false;
  }

  onEnviar(event:Event){
    event.preventDefault;
    let educacion: EducacionModel = {
      titulo: this.form.value.titulo,
      periodo: this.form.value.periodo,
      descripcion: this.form.value.descripcion
    };
    this.educacionService.agregarEducacion(educacion);
  }

}
