import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SimplebarAngularModule } from 'simplebar-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SkilltreeComponent } from './skilltree/skilltree.component';
import { StatsComponent } from './stats/stats.component';
import { BuildComponent } from './build/build.component';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    SkilltreeComponent,
    StatsComponent,
    BuildComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    SimplebarAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
