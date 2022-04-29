import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SobremiModel } from '../../modelo/sobremi-model.model';
import { SobremiServiceService } from '../../servicio/sobremi-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.css']
})
export class SobremiComponent implements OnInit {

  public data?: SobremiModel[] = [];
  contentEditable: boolean = false;
  nuevaExperiencia: boolean = false;
  form:FormGroup;
  public listaIcono: String[] = ["code","music","heart","star","check","times","cog","home","flag","book","camera","picture-o","play","trophy","exclamation","users","globe","suitcase","smile-o","thumbs-up"]

  constructor(private formBuilder: FormBuilder, private sobremiService: SobremiServiceService) { }

  ngOnInit(): void {
    this.data = this.sobremiService.sobremiData;
    if(!this.data?.length){
      this.sobremiService.fetchSobremiData().subscribe(() => {
        this.data = this.sobremiService.sobremiData;
      });
    }
    this.form = this.formBuilder.group(
      {
        icono:['', [Validators.required]],
        titulo:['', [Validators.required,Validators.minLength(8)]]
      }
    );
  }

  get Icono() { return this.form.get('icono'); }
  get Titulo() { return this.form.get('titulo'); }

  editarContenido(): void {
    this.contentEditable = !this.contentEditable;
  }

  descartarEditarContenido(): void {
    this.contentEditable = false;
  }

  removerAptitudDelArrego(id: number){
    this.data = this.data.filter(value => value.id != id);
  }

  eliminarAptitud(id: number) {
    this.sobremiService.eliminarAptitud(id);
    this.removerAptitudDelArrego(id);
  }

  editarAptitud(aptitud: any): void{
    this.sobremiService.editarAptitud(aptitud);
    this.contentEditable = false;
  }

  onEnviar(event:Event){
    event.preventDefault;
    let aptitud: SobremiModel = {
      icono: this.form.value.icono,
      titulo: this.form.value.titulo
    };
    this.sobremiService.agregarAptitud(aptitud);
  }

}