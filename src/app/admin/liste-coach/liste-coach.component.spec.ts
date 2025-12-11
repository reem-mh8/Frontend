import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCoachComponent } from './liste-coach.component';

describe('ListeCoachComponent', () => {
  let component: ListeCoachComponent;
  let fixture: ComponentFixture<ListeCoachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCoachComponent]
    });
    fixture = TestBed.createComponent(ListeCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
