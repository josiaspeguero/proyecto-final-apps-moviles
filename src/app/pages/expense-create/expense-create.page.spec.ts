import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseCreatePage } from './expense-create.page';

describe('ExpenseCreatePage', () => {
  let component: ExpenseCreatePage;
  let fixture: ComponentFixture<ExpenseCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
