import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Entity/User.Entity';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-liste-coach',
  templateUrl: './liste-coach.component.html',
  styleUrls: ['./liste-coach.component.css']
})
export class ListeCoachComponent implements OnInit {

  listeCoach: User[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;
  coachesToDisplay: User[] = [];
  currentUserRole: string | null = null;

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    // Récupérer le rôle de l'utilisateur connecté
    this.currentUserRole = this.service.getCurrentUserRole();
    
    // Vérification des rôles autorisés
    if (!this.isAuthorized()) {
      alert("Accès refusé. Cette page est réservée aux clients et aux salles de sport !");
      this.router.navigate(['/']);
      return;
    }

    // Récupérer uniquement les utilisateurs avec rôle 'coach'
    this.service.getUsersByRole('coach').subscribe(coaches => {
      this.listeCoach = coaches;
      this.totalPages = Math.ceil(this.listeCoach.length / this.itemsPerPage);
      this.updateCoachesToDisplay();
    });
  }

  // Vérifier si l'utilisateur est autorisé
  isAuthorized(): boolean {
    return this.currentUserRole === 'client' || this.currentUserRole === 'salle de sport';
  }

  updateCoachesToDisplay(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.coachesToDisplay = this.listeCoach.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateCoachesToDisplay();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCoachesToDisplay();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateCoachesToDisplay();
    }
  }

  deleteCoach(coach: User) {
    if (confirm(`Voulez-vous supprimer le coach ${coach.nom} ${coach.prenom} ?`)) {
      this.service.deleteUser(coach.id!).subscribe(() => {
        this.listeCoach = this.listeCoach.filter(c => c.id !== coach.id);
        this.totalPages = Math.ceil(this.listeCoach.length / this.itemsPerPage);
        
        // Ajuster la page courante si nécessaire
        if (this.currentPage > this.totalPages && this.totalPages > 0) {
          this.currentPage = this.totalPages;
          this.updateCoachesToDisplay();
        } else {
          this.updateCoachesToDisplay();
        }
      });
    }
  }

  contactCoach(coach: User) {
    // Implémenter la logique de contact
    alert(`Contactez ${coach.nom} ${coach.prenom} à ${coach.email} ou ${coach.mobile}`);
  }
}