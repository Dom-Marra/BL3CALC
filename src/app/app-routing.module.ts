import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'build/amara', pathMatch: 'full'},
  {path: 'build', redirectTo: 'build/amara', pathMatch: 'full'},
  {path: 'build/:character', loadChildren: () => import('./build/build.module').then(m => m.BuildModule)},
  {path: 'build/:character/:build', loadChildren: () => import('./build/build.module').then(m => m.BuildModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
