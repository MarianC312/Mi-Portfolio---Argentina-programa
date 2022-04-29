import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AptitudComponent } from './aptitud.component';

describe('AptitudComponent', () => {
  let component: AptitudComponent;
  let fixture: ComponentFixture<AptitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AptitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AptitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
