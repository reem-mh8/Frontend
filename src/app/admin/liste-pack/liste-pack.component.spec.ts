import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePackComponent } from './liste-pack.component';

describe('ListePackComponent', () => {
  let component: ListePackComponent;
  let fixture: ComponentFixture<ListePackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListePackComponent]
    });
    fixture = TestBed.createComponent(ListePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
