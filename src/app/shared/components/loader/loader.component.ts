import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() theme: 'accent' | 'primary' = 'primary';
  @Input() color: string = null;
  
  constructor() { }

  ngOnInit(): void {
  }

}
