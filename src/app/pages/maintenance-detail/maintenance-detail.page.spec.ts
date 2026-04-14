import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaintenanceDetailPage } from './maintenance-detail.page';

describe('MaintenanceDetailPage', () => {
  let component: MaintenanceDetailPage;
  let fixture: ComponentFixture<MaintenanceDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
