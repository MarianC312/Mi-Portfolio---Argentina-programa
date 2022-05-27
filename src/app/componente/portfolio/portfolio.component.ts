import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../servicio/token.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  roles: string[];
  isAdmin: boolean = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin = true;
      }
    })
  }

}
