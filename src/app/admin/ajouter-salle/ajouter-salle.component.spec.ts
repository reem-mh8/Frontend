import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSalleComponent } from './ajouter-salle.component';

describe('AjouterSalleComponent', () => {
  let component: AjouterSalleComponent;
  let fixture: ComponentFixture<AjouterSalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterSalleComponent]
    });
    fixture = TestBed.createComponent(AjouterSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
