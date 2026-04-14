import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncomeCreatePage } from './income-create.page';

describe('IncomeCreatePage', () => {
  let component: IncomeCreatePage;
  let fixture: ComponentFixture<IncomeCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
