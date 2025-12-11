import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

import { FullCalendarModule } from '@fullcalendar/angular';

// Components
import { AboutComponent } from './about/about.component';
import { AjouterPackComponent } from './ajouter-pack/ajouter-pack.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
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
import { SalleDeSportRegisterComponent } from './salle-de-sport-register/salle-de-sport-register.component';
import { VideoCallComponent } from './video-call/video-call.component';

@NgModule({
  declarations: [
    UserComponent,
    AboutComponent,
    ContactComponent,
    AjouterPackComponent,
    ListePackComponent,
    VideoCallComponent,
    MesPacksComponent,
    PaiementComponent,
    PlanningComponent,
    PlanningClientComponent,
    ListeReservationClientComponent,
    FooterComponent,
    ListeSalleDeSportComponent,
    HeaderComponent,
    HomeComponent,
    ListeCoachComponent,
    BlankLayoutComponent,
    MainLayoutComponent,
    ListePlanningComponent,
    ProfilComponent,
    ModifierProfilComponent,
    ListeClientsComponent,
    SalleDeSportRegisterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule
  ]
})
export class UserModule { }
