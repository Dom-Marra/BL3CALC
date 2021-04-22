import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdgeBoxComponent } from './components/edge-box/edge-box.component';

@NgModule({
  declarations: [
    EdgeBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EdgeBoxComponent
  ]
})
export class SharedModule { }
