import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { ProduitsComponent } from './produits/produits.component';
import { ReapprovComponent } from './reapprov/reapprov.component';

const appRoutes: Routes = [
  {path: 'produits', component: ProduitsComponent},
  {path: 'reapprov', component: ReapprovComponent},
  {path: '', component: ProduitsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    ProduitsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
