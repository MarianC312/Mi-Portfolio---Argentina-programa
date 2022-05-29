import { Component, OnInit } from '@angular/core';
import { PersonaModel } from '../../modelo/persona-model.model';
import { PersonaServiceService } from '../../servicio/persona-service.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

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
    }else{
      this.loading = false;
    }
  }

}
