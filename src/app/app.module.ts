import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import { HomeComponent } from './home/home.component';
import { IndiaComponent } from './india/india.component';
import { CanadaComponent } from './canada/canada.component';
import { AustraliaComponent } from './australia/australia.component';
import { UsaComponent } from './usa/usa.component';
import { ChartService } from './chart.service';
import { HttpClientModule } from  '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndiaComponent,
    CanadaComponent,
    AustraliaComponent,
    UsaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    HttpClientModule
  ],
  providers: [ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
