import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { SobremiModel } from '../../modelo/sobremi-model.model';
import { SobremiServiceService } from '../../servicio/sobremi-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { LoaderService } from '../../servicio/loader.service';

@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.css']
})
export class SobremiComponent implements OnInit {

  public data?: SobremiModel[] = [];
  contentEditable: boolean = false;
  nuevaAptitud: boolean = false;
  form:FormGroup;
  @Input() isAdmin: boolean = false;
  loading: boolean = false;
  public listaIcono: String[] = ["code","music","heart","star","check","times","cog","home","flag","book","camera","picture-o","play","trophy","exclamation","users","globe","suitcase","smile-o","thumbs-up"]

  constructor(private formBuilder: FormBuilder, private sobremiService: SobremiServiceService, private loader: LoaderService) { }

  ngOnInit(): void {

    this.loading = true;
    this.data = this.sobremiService.sobremiData;
    if(!this.data?.length){
      this.sobremiService.fetchSobremiData().pipe(
        finalize(() => {
          this.loading = false;
          this.loader.hide();
        })
      ).subscribe(() => {
        this.data = this.sobremiService.sobremiData;
      });
    }else{
        this.loading = false;
        this.loader.hide();
    }
    this.form = this.formBuilder.group(
      {
        icono:['', []],
        titulo:['', [Validators.required,Validators.minLength(3)]]
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
    let aptitud: SobremiModel = {
      icono: this.form.value.icono,
      titulo: this.form.value.titulo
    };
    this.sobremiService.agregarAptitud(aptitud);
  }

}
