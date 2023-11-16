import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncValidationMessageComponent } from './async-validation-message.component';

describe('AsyncValidationMessageComponent', () => {
  let component: AsyncValidationMessageComponent;
  let fixture: ComponentFixture<AsyncValidationMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsyncValidationMessageComponent]
    });
    fixture = TestBed.createComponent(AsyncValidationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
