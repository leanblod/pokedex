import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { FormControlDirective, FormControlName } from '@angular/forms';

@Component({
  selector: 'poke-detail-field',
  templateUrl: './detail-field.component.html',
  styleUrls: ['./detail-field.component.scss']
})
export class DetailFieldComponent implements OnInit {

  @Input() label?: string;

  @ContentChild(FormControlName, {static: true})
  formControlName?: FormControlName;

  @ContentChild(FormControlDirective, {static: true})
  formControl?: FormControlDirective;

  control?: FormControlName | FormControlDirective;

  ngOnInit(): void {
    this.control = this.formControlName??this.formControl;
  }

  resetControl() {
    this.control?.control?.reset();
    this.control?.control?.markAsTouched();
  }

}
