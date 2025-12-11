import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalleDeSportRegisterComponent } from './salle-de-sport-register.component';

describe('SalleDeSportRegisterComponent', () => {
  let component: SalleDeSportRegisterComponent;
  let fixture: ComponentFixture<SalleDeSportRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalleDeSportRegisterComponent]
    });
    fixture = TestBed.createComponent(SalleDeSportRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
