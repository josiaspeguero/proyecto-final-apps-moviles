import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiresPage } from './tires.page';

describe('TiresPage', () => {
  let component: TiresPage;
  let fixture: ComponentFixture<TiresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TiresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
