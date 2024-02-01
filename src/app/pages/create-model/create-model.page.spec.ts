import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateModelPage } from './create-model.page';

describe('CreateModelPage', () => {
  let component: CreateModelPage;
  let fixture: ComponentFixture<CreateModelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
