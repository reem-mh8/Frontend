import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCoachComponent } from './modifier-coach.component';

describe('ModifierCoachComponent', () => {
  let component: ModifierCoachComponent;
  let fixture: ComponentFixture<ModifierCoachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierCoachComponent]
    });
    fixture = TestBed.createComponent(ModifierCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
