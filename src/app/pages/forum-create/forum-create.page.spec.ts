import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForumCreatePage } from './forum-create.page';

describe('ForumCreatePage', () => {
  let component: ForumCreatePage;
  let fixture: ComponentFixture<ForumCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
