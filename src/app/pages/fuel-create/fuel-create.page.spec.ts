import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FuelCreatePage } from './fuel-create.page';

describe('FuelCreatePage', () => {
  let component: FuelCreatePage;
  let fixture: ComponentFixture<FuelCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
