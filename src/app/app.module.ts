import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule, FooterComponent, HeaderComponent } from './shared';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { SelectedRetailerComponent } from './shared/layout/selected-retailer.component';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([]);

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, SelectedRetailerComponent],
  imports: [BrowserModule, SharedModule, HomeModule, rootRouting],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
