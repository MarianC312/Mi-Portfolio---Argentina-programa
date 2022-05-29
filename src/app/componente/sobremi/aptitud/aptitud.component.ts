import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SobremiModel } from '../../../modelo/sobremi-model.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SobremiServiceService } from '../../../servicio/sobremi-service.service';
//import { PersonaServiceService } from '../../../servicio/persona-service.service';


@Component({
  selector: 'app-aptitud',
  templateUrl: './aptitud.component.html',
  styleUrls: ['./aptitud.component.css']
})
export class AptitudComponent implements OnInit {

  @Input() id: number;
  @Input() titulo: string;
  @Input() icono: string;
  @Input() contentEditable: boolean = false;
  @Input() editar: () => void;
  @Input() descartar: () => void;
  @Input() guardar: (sobremi: SobremiModel) => void;
  @Input() isAdmin: boolean = false;

  @Output("eliminar") eliminar: EventEmitter<any> = new EventEmitter();

  form:FormGroup;

  public listaIcono: String[] = ["code","music","heart","star","check","times","cog","home","flag","book","camera","picture-o","play","trophy","exclamation","users","globe","suitcase","smile-o","thumbs-up"]

  constructor(private formBuilder: FormBuilder, private sobremiService: SobremiServiceService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        icono:['', [Validators.required]],
        titulo:['', [Validators.required]]
      }
    );
  }

  /*
  check(): void{
    if(this.contentEditable){

      let aptitud = {
        id: this.id,
        icono: document.getElementById("icono").innerText,
        titulo: document.getElementById("titulo").innerText
      }
      this.guardar(aptitud);
      //this.contentEditable = false;
    }else{
      this.editar();
    }
  }
  */

  get Icono() { return this.form.get('icono'); }
  get Titulo() { return this.form.get('titulo'); }

  onEnviar(event:Event){
    event.preventDefault;
    let aptitud: SobremiModel = {
      id: this.id,
      icono: this.form.value.icono,
      titulo: this.form.value.titulo
    };
    this.guardar(aptitud);
  }

}
