import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExperienciaServiceService } from '../../../servicio/experiencia-service.service';

@Component({
  selector: 'app-nueva-experiencia',
  templateUrl: './nueva-experiencia.component.html',
  styleUrls: ['./nueva-experiencia.component.css']
})
export class NuevaExperienciaComponent implements OnInit {

  form:FormGroup;
  @Input() isAdmin: boolean = false;

  constructor(private formBuilder:FormBuilder, private experienciaService:ExperienciaServiceService) {
    this.form = this.formBuilder.group(
      {
        titulo:['', [Validators.required,Validators.minLength(5),Validators.maxLength(45)]],
        periodo:['', [Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
        logo:['', []],
        descripcion:['', [Validators.required,Validators.minLength(5),Validators.maxLength(1000)]]
      }
    );
  }

  ngOnInit(): void {
  }

  get Titulo() { return this.form.get('titulo'); }
  get Periodo() { return this.form.get('periodo'); }
  get Logo() { return this.form.get('logo'); }
  get Descripcion() { return this.form.get('descripcion'); }

  @Output("cancelar") cancelar: EventEmitter<any> = new EventEmitter();
  @Output("fetch") fetch: EventEmitter<any> = new EventEmitter();

  onEnviar(event:Event){
    this.experienciaService.agregarExperiencia(this.form.value);
    this.fetch.emit();
  }

}
