import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCategoryComponent } from './liste-category.component';

describe('ListeCategoryComponent', () => {
  let component: ListeCategoryComponent;
  let fixture: ComponentFixture<ListeCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCategoryComponent]
    });
    fixture = TestBed.createComponent(ListeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
