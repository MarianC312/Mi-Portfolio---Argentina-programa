import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva-experiencia',
  templateUrl: './nueva-experiencia.component.html',
  styleUrls: ['./nueva-experiencia.component.css']
})
export class NuevaExperienciaComponent implements OnInit {

  form:FormGroup;

  constructor(private formBuilder:FormBuilder) {
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

  onEnviar(event:Event){
    event.preventDefault;
    console.log(this.form.value);

    /*
    this.autenticacionService.IniciarSesion(this.form.value).subscribe(data => {
      console.log("DATA: " + JSON.stringify(data));
      this.ruta.navigate(['/portfolio']);
    });
    */
  }

}
