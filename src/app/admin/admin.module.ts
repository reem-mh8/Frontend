import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from '../modules/auth/login/login.component';
import { AjouterAdminComponent } from './ajouter-admin/ajouter-admin.component';
import { AjouterCategoryComponent } from './ajouter-category/ajouter-category.component';
import { AjouterClientComponent } from './ajouter-client/ajouter-client.component';
import { AjouterCoachComponent } from './ajouter-coach/ajouter-coach.component';
import { AjouterPackComponent } from './ajouter-pack/ajouter-pack.component';
import { AjouterSalleComponent } from './ajouter-salle/ajouter-salle.component';
import { HomeComponent } from './home/home.component';
import { ListeAdminComponent } from './liste-admin/liste-admin.component';
import { ListeCategoryComponent } from './liste-category/liste-category.component';
import { ListeClientComponent } from './liste-client/liste-client.component';
import { ListeCoachComponent } from './liste-coach/liste-coach.component';
import { ListeContactComponent } from './liste-contact/liste-contact.component';
import { ListePackComponent } from './liste-pack/liste-pack.component';
import { ListeSalleDeSportComponent } from './liste-salle-de-sport/liste-salle-de-sport.component';
import { ModifierAdminComponent } from './modifier-admin/modifier-admin.component';
import { ModifierClientComponent } from './modifier-client/modifier-client.component';
import { ModifierCoachComponent } from './modifier-coach/modifier-coach.component';
import { ModifierSalleDeSportComponent } from './modifier-salle-de-sport/modifier-salle-de-sport.component';

@NgModule({
  declarations: [
    AdminComponent,    AjouterAdminComponent,
    ListeAdminComponent,
    HomeComponent,
    MenuComponent,

    LoginComponent,
    ModifierAdminComponent,
    
    ListeClientComponent,
    ListeCoachComponent,
    ListeSalleDeSportComponent,
    ListeContactComponent,
    ListePackComponent,
    AjouterClientComponent,
    AjouterCoachComponent,
    AjouterSalleComponent,
    NavHeaderComponent,
    ModifierClientComponent,
    ModifierCoachComponent,
    ModifierSalleDeSportComponent,
    AjouterCategoryComponent,
    ListeCategoryComponent,
    AjouterPackComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    HttpClientModule, BrowserModule,
    RouterModule
  ]
})
export class AdminModule {}
