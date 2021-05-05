import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdgeBoxComponent } from './components/edge-box/edge-box.component';
import { ScaleTextDirective } from './directives/scale-text.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@NgModule({
  declarations: [
    EdgeBoxComponent,
    ScaleTextDirective,
    LoaderComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EdgeBoxComponent,
    ScaleTextDirective,
    LoaderComponent,
    SnackbarComponent
  ]
})
export class SharedModule { }
