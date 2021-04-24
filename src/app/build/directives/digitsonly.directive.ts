import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[digitsonly]'
})
export class DigitsonlyDirective {

  @Input() maxValue: number;
  @Input() defaultZero: boolean = false;          //Whether the default value shall be zero after input

  private lastInput: number;                      //The last input                

  @HostListener('keydown')
  onKeyDown() {
    this.lastInput = this.el.nativeElement.value;
  }

  @HostListener('input')
  onInput() {
    let input = this.el.nativeElement.value;         //Set the inputs value

    if ((isNaN(input) || input == ' ') && !(input == '' && !this.defaultZero)) {    //If the input is NaN reset it to the previous value
      this.el.nativeElement.value = this.lastInput;
    }
  }

  @HostListener('change')
  onChange() {
    let input = this.el.nativeElement.value;          //Set the inputs value

    if (input == '' && this.defaultZero) {            //If the input is empty set it to 0, and the input var to 0
      this.el.nativeElement.value = 0;
      input = 0;
    } else if (input == '' && !this.defaultZero) {
      return;
    }

    let parseInput = parseInt(input);
    if (this.maxValue && parseInput > this.maxValue) parseInput = this.maxValue;
    this.el.nativeElement.value = parseInput;
  }
  
  constructor(private el: ElementRef) {
    (<HTMLInputElement> this.el.nativeElement).dispatchEvent(new Event('change'));
  }
}
