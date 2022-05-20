import { Component, OnInit } from '@angular/core';
import { ProyectoModel } from '../../modelo/proyecto-model.model';
import { ProyectoServiceService } from '../../servicio/proyecto-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  proyectoData?: ProyectoModel[] = [];
  contentEditable: boolean = false;
  nuevaProyecto: boolean = false;
  form:FormGroup;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private proyectoService: ProyectoServiceService) { }

  ngOnInit(): void {
    this.loading = true;
    this.proyectoData = this.proyectoService.proyectoData;
    if(!this.proyectoData?.length){
      this.proyectoService.fetchProyectoData().pipe(
        finalize(() => this.loading = false)
      ).subscribe(() => {
        this.proyectoData = this.proyectoService.proyectoData;
      });
    }
    this.form = this.formBuilder.group(
      {
        titulo:['', [Validators.required,Validators.minLength(5)]],
        descripcion:['', [Validators.required,Validators.minLength(10)]],
        imagen:['', []],
        url_git:['', []],
        url_deploy:['', []]
      }
    );
  }

  get Titulo() { return this.form.get('titulo'); }
  get Descripcion() { return this.form.get('descripcion'); }
  get Imagen() { return this.form.get('imagen'); }
  get Git() { return this.form.get('url_git'); }
  get Deploy() { return this.form.get('url_deploy'); }

  public data() {
    console.log(this.proyectoData);
  }

  removerProyectoDelArrego(id: number){
    this.proyectoData = this.proyectoData.filter(value => value.id != id);
  }

  eliminarProyecto(id: number) {
    this.proyectoService.eliminarProyecto(id);
    this.removerProyectoDelArrego(id);
  }

  editarProyecto(proyecto: any): void{
    this.proyectoService.editarProyecto(proyecto);
    this.contentEditable = false;
  }

  onEnviar(event:Event){
    event.preventDefault;
    let proyecto: ProyectoModel = {
      titulo: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      imagen: this.form.value.imagen,
      url_git: this.form.value.url_git,
      url_deploy: this.form.value.url_deploy
    };
    this.proyectoService.agregarProyecto(proyecto);
  }
}
