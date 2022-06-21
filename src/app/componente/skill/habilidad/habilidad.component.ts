import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SkillModel } from '../../../modelo/skill-model.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SkillServiceService } from '../../../servicio/skill-service.service';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.css']
})
export class HabilidadComponent implements OnInit {

  @Input() id: number;
  @Input() titulo: string;
  @Input() imagen: string;
  @Input() nivel: number;
  @Input() contentEditable: boolean = false;
  @Input() editar: () => void;
  @Input() descartar: () => void;
  @Input() guardar: (habilidad: SkillModel) => void;
  @Input() isAdmin: boolean = false;
  @Input() visible: boolean = true;
  nivelTexto: string;


  @Output("eliminar") eliminar: EventEmitter<any> = new EventEmitter();

  form:FormGroup;

  constructor(private formBuilder: FormBuilder, private skillService: SkillServiceService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        titulo:['', [Validators.required,Validators.minLength(3)]],
        nivel:['', [Validators.required,Validators.min(0),Validators.max(100)]],
        imagen:['', []]
      }
    );
    this.actualizarNivelTexto();
  }

  get Titulo() { return this.form.get('titulo'); }
  get Nivel() { return this.form.get('nivel'); }
  get Imagen() { return this.form.get('imagen'); }

  actualizarNivelTexto(): void {
    switch(true){
      case (this.nivel < 35):
        this.nivelTexto = 'Principante';
      break;
      case (this.nivel < 70):
        this.nivelTexto = 'Intermedio';
      break;
      case (this.nivel >= 70):
        this.nivelTexto = 'Avanzado';
      break;
      default:
        this.nivelTexto = '';
      break;
    }
  }

  onEnviar(event:Event){
    let habilidad: SkillModel = {
      id: this.id,
      titulo: this.form.value.titulo,
      nivel: this.form.value.nivel,
      imagen: this.form.value.imagen,
    };
    this.guardar(habilidad);
    this.actualizarNivelTexto();
  }

}
