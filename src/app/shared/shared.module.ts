import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdgeBoxComponent } from './components/edge-box/edge-box.component';
import { ScaleTextDirective } from './directives/scale-text.directive';

@NgModule({
  declarations: [
    EdgeBoxComponent,
    ScaleTextDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EdgeBoxComponent,
    ScaleTextDirective
  ]
})
export class SharedModule { }
