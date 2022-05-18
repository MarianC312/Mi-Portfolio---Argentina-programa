import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SobremiServiceService } from 'src/app/servicio/sobremi-service.service';
import { EducacionModel } from '../../../modelo/educacion-model.model';
import { EducacionServiceService } from '../../../servicio/educacion-service.service';

@Component({
  selector: 'app-educacion-container',
  templateUrl: './educacion-container.component.html',
  styleUrls: ['./educacion-container.component.css']
})
export class EducacionContainerComponent implements OnInit {

  @Input() id: number;
  @Input() titulo: string;
  @Input() periodo: string;
  @Input() descripcion: string;
  @Input() contentEditable: boolean = false;
  @Input() editar: () => void;
  @Input() descartar: () => void;
  @Input() guardar: (sobremi: EducacionModel) => void;

  @Output("eliminar") eliminar: EventEmitter<any> = new EventEmitter();

  form:FormGroup;

  constructor(private formBuilder: FormBuilder, private educacionService: EducacionServiceService) { }

  ngOnInit(): void {
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

  onEnviar(event:Event){
    event.preventDefault;
    let aptitud: EducacionModel = {
      id: this.id,
      titulo: this.form.value.titulo,
      periodo: this.form.value.periodo,
      descripcion: this.form.value.descripcion
    };
    this.guardar(aptitud);
  }

}
