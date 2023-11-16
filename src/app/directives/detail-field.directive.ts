import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormControlStatus, NgControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

@Directive({
  selector: 'input[detailField], select[detailField]',
})
export class DetailFieldDirective implements OnInit, OnDestroy {

  @Input() allowEdition: Subject<boolean> = new Subject<boolean>();
  @Input() editAllOnClick: boolean = true;
  private makeEditableSubscription?: Subscription;

  constructor(
    private el: ElementRef<HTMLInputElement|HTMLSelectElement>,
    @Optional() private control: NgControl | null,
  ) { }

  ngOnInit(): void {
    this.control?.control?.statusChanges.subscribe(this.setStatus.bind(this));
    this.makeEditableSubscription = this.allowEdition.subscribe(this.setAllowEdition.bind(this));
  }

  ngOnDestroy(): void {
    this.makeEditableSubscription?.unsubscribe();
  }

  @HostListener('click')
  onClick() {
    if(this.editAllOnClick) {
      this.allowEdition.next(true);
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

  private setStatus(status: FormControlStatus) {
    const classList = this.el.nativeElement.classList;
    switch(status) {
      case 'VALID':
        classList.remove('invalid');
        classList.remove('pending');
        break;

      case 'INVALID':
        classList.add('invalid');
        classList.remove('pending');
        break;

      case 'PENDING':
        classList.remove('invalid');
        classList.add('pending');
    }
  }

}
