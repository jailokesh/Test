import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndiaComponent } from './india/india.component';
import { AustraliaComponent } from './australia/australia.component'; 
import { CanadaComponent } from './canada/canada.component';
import { UsaComponent } from './usa/usa.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/india', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, 
    children: [
      { path:'india', component: IndiaComponent},
      { path:'australia', component: AustraliaComponent}, 
      { path:'canada', component: CanadaComponent}, 
      { path:'usa', component: UsaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
