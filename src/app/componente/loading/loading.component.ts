import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from '../../servicio/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input() forceDisplay: boolean = false;
  @Input() class: string= 'text-primary';
  loading$ = this.loader.loading$;
  constructor(public loader: LoaderService) {}

  ngOnInit(): void {
  }

}
