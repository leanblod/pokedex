import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Optional, booleanAttribute } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

@Directive({
  selector: 'input[detailField], select[detailField]',
})
export class DetailFieldDirective implements OnInit, OnDestroy {

  @Input({ transform: (value: unknown) => value??new Subject<boolean> }) allowEdition?: Subject<boolean>;
  @Input({transform: booleanAttribute}) editAllOnClick: boolean = false;
  private makeEditableSubscription?: Subscription;

  constructor(
    private el: ElementRef<HTMLInputElement|HTMLSelectElement>,
    @Optional() private control: NgControl | null,
  ) { }

  ngOnInit(): void {
    this.makeEditableSubscription = this.allowEdition?.subscribe(this.setAllowEdition.bind(this));
  }

  ngOnDestroy(): void {
    this.makeEditableSubscription?.unsubscribe();
  }

  @HostListener('click')
  onClick() {
    if(this.editAllOnClick) {
      this.allowEdition?.next(true);
    } else {
      this.setAllowEdition(true);
    }
  }

  private setAllowEdition(allowEdition: boolean) {
    if(allowEdition) {
      this.el.nativeElement.removeAttribute('readonly');
      this.control?.control?.markAsTouched();
    } else {
      this.el.nativeElement.setAttribute('readonly','true');
    }
  }

}
