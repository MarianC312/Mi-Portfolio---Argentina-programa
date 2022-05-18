import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoCardComponent } from './proyecto-card.component';

describe('ProyectoCardComponent', () => {
  let component: ProyectoCardComponent;
  let fixture: ComponentFixture<ProyectoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
