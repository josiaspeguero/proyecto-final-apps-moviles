import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaintenanceCreatePage } from './maintenance-create.page';

describe('MaintenanceCreatePage', () => {
  let component: MaintenanceCreatePage;
  let fixture: ComponentFixture<MaintenanceCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
