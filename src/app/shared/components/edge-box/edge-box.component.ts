import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';

@Component({
  selector: 'app-edge-box',
  templateUrl: './edge-box.component.html',
  styleUrls: ['./edge-box.component.scss']
})
export class EdgeBoxComponent implements OnInit {

  private static counter = 0;
  
  public data: string = '';
  public height: number;
  public width: number;
  public bgID: string = 'bgImage-' + EdgeBoxComponent.counter++;
  public shadowID: string = 'shadow-' + EdgeBoxComponent.counter++;
  private _color: string;
  public edgeLength: number = 0;

  @ViewChild('box') box: ElementRef;
  @ViewChild('svg') bg: ElementRef;
  @Input() theme: 'primary' | 'accent' | 'warn' | null = null;
  @Input() set color(color: string) {
    if (this.bg) this.bg.nativeElement.style.fill = color;
    this._color = color;
  }
  @Input() noPadding: boolean = false;
  @Input() bgImage: string = null;
  @Input() edgeRatio: number = 0.2;
  @Input() minEdge: number = 10;
  @Input() allCorners: boolean = false;
  @Input() topLeft: boolean = true;
  @Input() bottomLeft: boolean = false;
  @Input() topRight: boolean = false;
  @Input() bottomRight: boolean = true;
  @Input() dropShadow: boolean = false;


  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this._color) this.bg.nativeElement.style.fill = this._color;

    let heightObs = new ResizeObserver(() => {
      this.height = this.box.nativeElement.offsetHeight;
      this.width = this.box.nativeElement.offsetWidth;

      this.edgeLength = Math.min(this.box.nativeElement.offsetHeight * this.edgeRatio, this.box.nativeElement.offsetWidth * this.edgeRatio);
      this.edgeLength = Math.max(this.edgeLength, this.minEdge);
      
      this.data = `m ${this.edgeLength} 0
                  h ${!this.topRight ? this.width - this.edgeLength : this.width - (this.edgeLength * 2)}
                  ${this.topRight ? 'l ' + this.edgeLength + ' '  + this.edgeLength : ''} 
                  v ${!this.topRight ? this.height - this.edgeLength : this.height - (this.edgeLength * 2)} 
                  l ${this.edgeLength * -1} ${this.edgeLength} 
                  h ${(!this.bottomLeft ? this.box.nativeElement.offsetWidth - this.edgeLength : this.box.nativeElement.offsetWidth - (this.edgeLength * 2)) * -1} 
                  ${this.bottomLeft ? 'l ' + (this.edgeLength * -1) + ' '  + (this.edgeLength * -1) : ''}
                  v ${(!this.bottomLeft ? this.box.nativeElement.offsetHeight - this.edgeLength : this.box.nativeElement.offsetHeight - (this.edgeLength * 2)) * -1} 
                  z`;

      this.cd.detectChanges();
    });

    heightObs.observe(this.box.nativeElement);
  }

}
