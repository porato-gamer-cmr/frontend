import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ContainerComponent } from './container/container.component';
import { ProduitsComponent } from './produits/produits.component';
import { ReapprovComponent } from './reapprov/reapprov.component';
import { ProduitsService } from './services/produits.service';
import { ApprovService } from './services/approv.service';
import { ApprovComponent } from './approv/approv.component';

const appRoutes: Routes = [
  {path: 'produits', component: ProduitsComponent},
  {path: 'approv', component: ApprovComponent},
  {path: 'reapprov', component: ReapprovComponent},
  {path: '', component: ProduitsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    ProduitsComponent,
    ApprovComponent,
    ReapprovComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [ProduitsService, ApprovService],
  bootstrap: [AppComponent]
})
export class AppModule { }
