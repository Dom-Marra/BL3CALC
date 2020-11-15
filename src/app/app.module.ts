import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FeatherModule } from 'angular-feather';
import { Menu, X } from 'angular-feather/icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SkilltreeComponent } from './skilltree/skilltree.component';
import { StatsComponent } from './stats/stats.component';
import { BuildComponent } from './build/build.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { ApiKey } from './api-key';

const icons = {
  Menu,
  X
}

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
    BrowserAnimationsModule,
    HttpClientModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ],
  providers: [ApiKey],
  bootstrap: [AppComponent]
})
export class AppModule { }
