import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.css']
})
export class SobremiComponent implements OnInit {

  public asset: {[key:string]:string} = {
      "code": "Programador",
      "exclamation": "Efusivo",
      "book": "Lector",
      "music": "*Guitarrero",
      "film": "Entusiasta del cine",
      "users": "Amiguero",
      "gamepad": "#Gammer",
      "tree": "Respetuoso del medio ambiente"
    };

  constructor() { }

  ngOnInit(): void {
  }

}
