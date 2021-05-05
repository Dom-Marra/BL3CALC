import { Directive, ElementRef, Input } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';

@Directive({
  selector: '[ScaleText]'
})
export class ScaleTextDirective {

  private defaultSize: number;
  private lineHeight: number;
  @Input() ratio: number = 0.65;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.defaultSize = parseFloat(window.getComputedStyle(this.el.nativeElement).getPropertyValue('font-size'));
    this.lineHeight = parseFloat(window.getComputedStyle(this.el.nativeElement).getPropertyValue('line-height')) / this.defaultSize;

    let resiveObs = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      let height = (this.el.nativeElement as HTMLElement).clientHeight;
      let textHeight = parseFloat(window.getComputedStyle(this.el.nativeElement).getPropertyValue('line-height'));
      let currentRatio = textHeight/height;

      if (currentRatio > this.ratio) {
        let newFontSize = (height * this.ratio) / this.lineHeight;

        
        this.el.nativeElement.style.fontSize = newFontSize + "px";

      } else if (currentRatio < this.ratio) {
        let newFontSize = (height * this.ratio) / this.lineHeight;

        if (newFontSize > this.defaultSize) {
          newFontSize = this.defaultSize
        }

        
        this.el.nativeElement.style.fontSize = newFontSize + "px";
      }
    });

    resiveObs.observe(this.el.nativeElement);
  }

}
