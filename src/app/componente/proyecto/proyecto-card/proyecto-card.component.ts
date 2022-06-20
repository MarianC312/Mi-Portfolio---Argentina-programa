import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProyectoModel } from '../../../modelo/proyecto-model.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProyectoServiceService } from '../../../servicio/proyecto-service.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-proyecto-card',
  templateUrl: './proyecto-card.component.html',
  styleUrls: ['./proyecto-card.component.css']
})
export class ProyectoCardComponent implements OnInit {

  @Input() id: number;
  @Input() titulo: string;
  @Input() imagen: string;
  @Input() descripcion: string;
  @Input() url_deploy: string;
  @Input() url_git: string;
  @Input() contentEditable: boolean = false;
  @Input() editar: () => void;
  @Input() descartar: () => void;
  @Input() guardar: (habilidad: ProyectoModel) => boolean;
  @Input() isAdmin: boolean = false;
  loading: boolean = false;

  @Output("eliminar") eliminar: EventEmitter<any> = new EventEmitter();

  form:FormGroup;

  constructor(private formBuilder: FormBuilder, private proyectoService: ProyectoServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
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

  onEnviar(event:Event){
    this.loading = true;
    let proyecto: ProyectoModel = {
      id: this.id,
      titulo: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      imagen: this.form.value.imagen,
      url_git: this.form.value.url_git,
      url_deploy: this.form.value.url_deploy
    };
    this.guardar(proyecto);
    this.loading = false;
  }
}
