import { inject } from '@angular/core';
import { DetailFieldDirective } from './detail-field.directive';

describe('EditOnTouchDirective', () => {
  it('should create an instance', () => {
    const directive = inject(DetailFieldDirective);
    expect(directive).toBeTruthy();
  });
});
