import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { PersonaModel } from '../../modelo/persona-model.model';
import { PersonaServiceService } from '../../servicio/persona-service.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personaData?: PersonaModel;
  loading: boolean = false;

  constructor(private personaService: PersonaServiceService) { }

  ngOnInit(): void {
    this.loading = true;
    this.personaData = this.personaService.personaData;
    if(!this.personaData){
      this.personaService.fetchPersonaData().pipe(
        finalize(() => this.loading = false)
      ).subscribe(() => {
        this.personaData = this.personaService.personaData;
      });
    }
  }

}

