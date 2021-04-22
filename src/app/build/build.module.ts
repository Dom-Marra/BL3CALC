import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildRoutingModule } from  './build-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BuildComponent } from './build.component'
import { SkilltreeComponent } from './components/skilltree/skilltree.component';
import { StatsComponent } from './pages/stats/stats.component';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { TooltipComponent, DisplaySkillDirective } from './components/tooltip/tooltip.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { SkilltreesComponent } from './pages/skilltrees/skilltrees.component';

@NgModule({
  declarations: [
    SkilltreeComponent,
    StatsComponent,
    BuildComponent,
    TooltipComponent,
    DisplaySkillDirective,
    SkilltreesComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    BuildRoutingModule,
    LayoutModule
  ],
  exports: [
    BuildComponent
  ]
})
export class BuildModule { }
