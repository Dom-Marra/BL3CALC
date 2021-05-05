import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildComponent } from './build.component';
import { SkilltreesComponent } from './pages/skilltrees/skilltrees.component';
import { StatsComponent } from './pages/stats/stats.component';

const routes: Routes = [
  { path: '', component: BuildComponent,
    children: [
      { path: '', redirectTo: 'skilltrees', pathMatch: 'full'},
      { path: 'skilltrees', component: SkilltreesComponent},
      { path: 'stats', component: StatsComponent}
  ]}
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildRoutingModule { }
