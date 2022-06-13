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
    this.loadData();
  }

  ngOnChanges(){
    this.loadData();
  }

  loadData(){
    this.loading = true;
    this.personaData = this.personaService.personaData;
    if(!this.personaData){
      this.personaService.fetchPersonaData().pipe(
        finalize(() => this.loading = false)
      ).subscribe(
      (result) => {
          console.log(result);
          this.personaData = this.personaService.personaData;
          setTimeout(() => { this.loadData(); }, 10000);
      },
      (error) => {
        console.log(error);
        setTimeout(() => { this.loadData(); }, 5000);
      }
      );
    }else{
      this.loading = false;
    }
  }

}
