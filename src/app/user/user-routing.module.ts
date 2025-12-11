import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AboutComponent } from './about/about.component';
import { AjouterPackComponent } from './ajouter-pack/ajouter-pack.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ListeClientsComponent } from './liste-clients/liste-clients.component';
import { ListeCoachComponent } from './liste-coach/liste-coach.component';
import { ListePackComponent } from './liste-pack/liste-pack.component';
import { ListePlanningComponent } from './liste-planning/liste-planning.component';
import { ListeReservationClientComponent } from './liste-reservation-client/liste-reservation-client.component';
import { ListeSalleDeSportComponent } from './liste-salle-de-sport/liste-salle-de-sport.component';
import { MesPacksComponent } from './mes-packs/mes-packs.component';
import { ModifierProfilComponent } from './modifier-profil/modifier-profil.component';
import { PaiementComponent } from './paiement/paiement.component';
import { PlanningClientComponent } from './planning-client/planning-client.component';
import { PlanningComponent } from './planning/planning.component';
import { ProfilComponent } from './profil/profil.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { SalleDeSportRegisterComponent } from './salle-de-sport-register/salle-de-sport-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent }, // S'ASSURER que cette route existe
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'ajouter-pack', component: AjouterPackComponent },
      { path: 'video-call', component: VideoCallComponent },
      { path: 'mes-packs', component: MesPacksComponent },
      { path: 'paiement/:id', component: PaiementComponent },
      { path: 'planning', component: PlanningComponent },
      { path: 'planningclient/:id', component: PlanningClientComponent },
      { path: 'liste-reservation-client', component: ListeReservationClientComponent },
      { path: 'liste-pack', component: ListePackComponent },
      { path: 'liste-salle-de-sport', component: ListeSalleDeSportComponent },
      { path: 'liste-coach', component: ListeCoachComponent },
      { path: 'liste-planning', component: ListePlanningComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'modifier-profil', component: ModifierProfilComponent },
      { path: 'liste-clients', component: ListeClientsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' } // AJOUTER cette redirection
    ]
  },
  // ... reste inchangé
];;

@NgModule({
  imports: [RouterModule.forChild(routes), ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
