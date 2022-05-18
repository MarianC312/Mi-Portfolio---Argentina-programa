import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducacionContainerComponent } from './educacion-container.component';

describe('EducacionContainerComponent', () => {
  let component: EducacionContainerComponent;
  let fixture: ComponentFixture<EducacionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducacionContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducacionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
