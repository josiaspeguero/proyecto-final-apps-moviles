import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaintenancesPage } from './maintenances.page';

describe('MaintenancesPage', () => {
  let component: MaintenancesPage;
  let fixture: ComponentFixture<MaintenancesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
