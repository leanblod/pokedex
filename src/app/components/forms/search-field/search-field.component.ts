import { Component, Input, TemplateRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'poke-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useClass: SearchFieldComponent,
    },
  ],
})
export class SearchFieldComponent<Data> implements ControlValueAccessor, Validator {

  @Input() optionTemplate?: TemplateRef<{data: Data}>;

  @Input() parseLabel = (data: Data|null)=>(data??'') as string;

  @Input() value: Data | null = null;

  @Input({
    transform:
      (value: string|number) => new FormControl<string>(
        value.toString(),
        {nonNullable: true},
      ),
  }) search: FormControl<string> = new FormControl<string>('', {nonNullable: true});

  @Input() options: Data[] | null = null;

  save(value: Data|null) {
    this.touch();
    this.value = value;
    this.onChange(this.value);
    console.log(`Cambiando valor ${value}`);
  }


  private onTouch: ()=>unknown = ()=>{};
  private touched = false;

  private onChange: (value:Data|null)=>unknown = ()=>{};

  touch() {
    if(!this.touched) {
      this.onTouch();
      this.touched = true;
      console.log('fue tocado');
    }
  }

  // Control Value Accessor
  writeValue(value: Data): void {
    console.log(`Escribiendo valor: ${value}`);
    this.value = value;
  }

  registerOnChange(onChange: (value:Data|null)=>unknown): void {
    this.onChange = onChange;
    console.log('Guardó on Change');
  }

  registerOnTouched(onTouch:()=>unknown): void {
    this.onTouch = onTouch;
    console.log('Guardó onTouch');
  }

  setDisabledState?(isDisabled: boolean): void {
    this.search[isDisabled ? 'disable' : 'enable']();
  }


  private onValidatorChange: ()=>void = ()=>{};

  // Validator
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null;
  }

  registerOnValidatorChange?(onValidatorChange: () => void): void {
    this.onValidatorChange = onValidatorChange;
  }
}
