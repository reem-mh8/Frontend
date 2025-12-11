import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  // MODIFIER la structure pour avoir AdminComponent comme parent
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'home', component: HomeComponent }, // AJOUTER cette route
      { path: 'ajouter-admin', component: AjouterAdminComponent },
      { path: 'liste-admin', component: ListeAdminComponent },
      { path: 'modifier-admin/:id', component: ModifierAdminComponent },
      { path: 'liste-client', component: ListeClientComponent },
      { path: 'liste-coach', component: ListeCoachComponent },
      { path: 'liste-salle-de-sport', component: ListeSalleDeSportComponent },
      { path: 'liste-contact', component: ListeContactComponent },
      { path: 'liste-pack', component: ListePackComponent },
      { path: 'ajouter-client', component: AjouterClientComponent },
      { path: 'ajouter-coach', component: AjouterCoachComponent },
      { path: 'ajouter-salle', component: AjouterSalleComponent },
      { path: 'modifier-client', component: ModifierClientComponent },
      { path: 'modifier-coach', component: ModifierCoachComponent },
      { path: 'modifier-salle-de-sport', component: ModifierSalleDeSportComponent },
      { path: 'ajouter-category', component: AjouterCategoryComponent },
      { path: 'liste-category', component: ListeCategoryComponent },
      { path: 'nav-header', component:NavHeaderComponent},
      { path: 'menu', component:MenuComponent},
      { path: 'ajouter-pack', component: AjouterPackComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' } // AJOUTER cette redirection
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
