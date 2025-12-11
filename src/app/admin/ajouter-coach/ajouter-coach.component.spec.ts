import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCoachComponent } from './ajouter-coach.component';

describe('AjouterCoachComponent', () => {
  let component: AjouterCoachComponent;
  let fixture: ComponentFixture<AjouterCoachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterCoachComponent]
    });
    fixture = TestBed.createComponent(AjouterCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
