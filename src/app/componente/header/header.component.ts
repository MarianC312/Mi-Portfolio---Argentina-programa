import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TokenService } from '../../servicio/token.service';
import { PersonaModel } from '../../modelo/persona-model.model';
import { PersonaServiceService } from '../../servicio/persona-service.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private fragment: string;
  isLogged: boolean = false;
  nombreUsuario: string;
  personaData?: PersonaModel;
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private tokenService: TokenService, private personaService: PersonaServiceService) {}

  ngOnInit(): void {
    this.loadData();
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });
    this.isLogged = this.tokenService.isLogged();
    this.nombreUsuario = this.tokenService.getUserName();
  }

  scroll(id: string) {
    console.log(id);
    let yOffset = -70;
    let element = document.getElementById(id);
    let y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({top: y, behavior: 'smooth'});


    /*
    //let el = document.getElementById(id);
    //el.scrollIntoView({behavior: 'smooth'});
    */
  }

  ngAfterViewInit(): void {
    this.scroll(this.fragment);
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
        result => {
          console.log(result);
          this.personaData = this.personaService.personaData;
          setTimeout(() => { this.loadData(); }, 10000);
      },
      error => {
        console.log(error);
        setTimeout(() => { this.loadData(); }, 5000);
      }
      );
    }else{
      this.loading = false;
    }
  }

  onLogOut(): void{
    this.tokenService.logOut();
  }
}
