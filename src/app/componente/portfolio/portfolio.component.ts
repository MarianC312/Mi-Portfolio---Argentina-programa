import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../servicio/token.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
  }

}
