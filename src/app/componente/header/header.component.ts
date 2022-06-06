import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TokenService } from '../../servicio/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private fragment: string;
  isLogged: boolean = false;
  nombreUsuario: string;
  constructor(private route: ActivatedRoute, private tokenService: TokenService) {}

  ngOnInit(): void {
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

  onLogOut(): void{
    this.tokenService.logOut();
  }
}
