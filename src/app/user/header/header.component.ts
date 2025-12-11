import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userRole: string | null = null;
  userName: string | null = null;

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    // Récupérer le rôle de l'utilisateur
    this.userRole = this.service.getCurrentUserRole();
    
    // Récupérer le nom de l'utilisateur si connecté
    if (this.userRole) {
      const currentUser = this.service.getCurrentUser();
      this.userName = currentUser ? `${currentUser.nom} ${currentUser.prenom}` : null;
    }
  }

  // Méthodes de vérification (pour compatibilité si nécessaire)
  isClient(): boolean {
    return this.userRole === 'client';
  }

  isCoach(): boolean {
    return this.userRole === 'coach';
  }

  isSalle(): boolean {
    return this.userRole === 'salle de sport';
  }

  isLoggedIn(): boolean {
    return this.userRole !== null;
  }

  logout(): void {
    console.log("Déconnexion en cours...");
    localStorage.clear();
    this.userRole = null;
    this.userName = null;
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}