import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { PersonaModel } from '../../modelo/persona-model.model';
import { PersonaServiceService } from '../../servicio/persona-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../../servicio/loader.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personaData?: PersonaModel;
  //personaData.imagen = 'https://i.ibb.co/3WJhSDc/photo-2022-06-09-09-13-32.jpg';
  loading: boolean = false;
  completarPerfil: boolean = false;
  form:FormGroup;
  @Input() isAdmin: boolean = false;

  constructor(private formBuilder: FormBuilder, private personaService: PersonaServiceService, private loader: LoaderService) { }

  ngOnInit(): void {
    this.loading = true;
    this.personaData = this.personaService.personaData;
    if(!this.personaData){
      this.personaService.fetchPersonaData().pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(() => {
        this.personaData = this.personaService.personaData;
      });
    }else{
      this.loading = false;
    }
    this.form = this.formBuilder.group(
      {
        nombre:['', [Validators.required,Validators.minLength(3)]],
        apellido:['', [Validators.required,Validators.minLength(3)]],
        imagen:['', []],
        facebook:['', []],
        twitter:['', []],
        instagram:['', []],
        cafecito:['', []],
        email:['', []],
        telefono:['', []]
      }
    );
  }

  get Nombre() { return this.form.get('nombre'); }
  get Apellido() { return this.form.get('apellido'); }
  get Imagen() { return this.form.get('imagen'); }
  get Facebook() { return this.form.get('facebook'); }
  get Twitter() { return this.form.get('twitter'); }
  get Cafecito() { return this.form.get('cafecito'); }
  get Instagram() { return this.form.get('instagram'); }
  get Email() { return this.form.get('email'); }
  get Telefono() { return this.form.get('telefono'); }

  onEnviar(event:Event){
    let persona: PersonaModel = {
      id: this.personaData.id,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      imagen: this.form.value.imagen,
      facebook: this.form.value.facebook,
      twitter: this.form.value.twitter,
      instagram: this.form.value.instagram,
      email: this.form.value.email,
      telefono: this.form.value.telefono
    };
    this.personaService.editarPersona(persona);
  }

  testLoading(): void{
    this.loading = !this.loading;
  }

}

