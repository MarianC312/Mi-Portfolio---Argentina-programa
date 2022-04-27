import { Component, OnInit } from '@angular/core';
import { PersonaModel } from '../../modelo/persona-model.model';
import { PersonaServiceService } from '../../servicio/persona-service.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personaData?: PersonaModel;

  constructor(private personaService: PersonaServiceService) { }

  ngOnInit(): void {
    this.personaData = this.personaService.personaData;
    if(!this.personaData){
      this.personaService.fetchPersonaData().subscribe(() => {
        this.personaData = this.personaService.personaData;
      });
    }
    console.log(this.personaService.personaData);

  }

}
