import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  private readonly CHARACTER_OFFSET:number = 2;

  @Input()
  allocatedPoints: number;

  constructor() { 
    
  }

  ngOnInit() {
  }

}
