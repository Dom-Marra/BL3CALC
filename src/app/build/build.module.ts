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
import { DigitsonlyDirective } from './directives/digitsonly.directive';
import { StatfilterPipe } from './pipes/statfilter.pipe';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { EquippedSkillsComponent } from './components/equipped-skills/equipped-skills.component';
import { BuildDetailsComponent } from './components/build-details/build-details.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    SkilltreeComponent,
    StatsComponent,
    BuildComponent,
    TooltipComponent,
    DisplaySkillDirective,
    SkilltreesComponent,
    DigitsonlyDirective,
    StatfilterPipe,
    EquippedSkillsComponent,
    BuildDetailsComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    BuildRoutingModule,
    LayoutModule,
    MatInputModule,
    MatSlideToggleModule,
    NgScrollbarModule
  ],
  exports: [
    BuildComponent
  ]
})
export class BuildModule { }
