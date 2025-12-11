import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSalleDeSportComponent } from './modifier-salle-de-sport.component';

describe('ModifierSalleDeSportComponent', () => {
  let component: ModifierSalleDeSportComponent;
  let fixture: ComponentFixture<ModifierSalleDeSportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierSalleDeSportComponent]
    });
    fixture = TestBed.createComponent(ModifierSalleDeSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
