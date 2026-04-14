import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogDetailPage } from './catalog-detail.page';

describe('CatalogDetailPage', () => {
  let component: CatalogDetailPage;
  let fixture: ComponentFixture<CatalogDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
