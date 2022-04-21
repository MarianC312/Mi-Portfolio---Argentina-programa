import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private fragment: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });
  }

  scroll(id: string) {
    let yOffset = -200;
    let element = document.getElementById(id);
    let y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({top: y, behavior: 'smooth'});

    //let el = document.getElementById(id);
    //el.scrollIntoView({behavior: 'smooth'});
  }

  ngAfterViewInit(): void {
    this.scroll(this.fragment);
  }
}
