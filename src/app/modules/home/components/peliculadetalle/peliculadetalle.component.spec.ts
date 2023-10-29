import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculadetalleComponent } from './peliculadetalle.component';

describe('PeliculadetalleComponent', () => {
  let component: PeliculadetalleComponent;
  let fixture: ComponentFixture<PeliculadetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeliculadetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculadetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
