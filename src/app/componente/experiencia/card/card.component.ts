import { Component, Input, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
import { ExperienciaModel } from '../../../modelo/experiencia-model.model';
import { ExperienciaServiceService } from '../../../servicio/experiencia-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
@Injectable()
export class CardComponent implements OnInit {

  constructor(private experienciaService: ExperienciaServiceService) { }
  @Input() id: number;
  @Input() descripcion: String;
  @Input() estado: boolean;
  @Input() logo: String;
  @Input() periodo: String;
  @Input() titulo: String;

  public contentEditable = false;


  @Output("eliminar") eliminar: EventEmitter<any> = new EventEmitter();
  //@Output("guardar") guardar: EventEmitter<any> = new EventEmitter();
  /*
  @Input() eliminar: (id: number) => void;
  */
  @Input() editar: () => void;
  @Input() descartar: () => void;
  @Input() guardar: (exp: ExperienciaModel) => void;


  ngOnInit(): void {
  }

  check(): void{
    if(this.contentEditable){

      let exp = {
        id: this.id,
        descripcion: document.getElementById("descripcion").innerText,
        logo: '',
        periodo: document.getElementById("periodo").innerText,
        titulo: document.getElementById("titulo").innerText
      }
      console.log("enviando data: ");

      console.log(exp);

      this.guardar(exp);
      //this.contentEditable = false;
    }else{
      this.editar();
    }
  }

}
