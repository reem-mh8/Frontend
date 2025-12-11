import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Entity/User.Entity';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-liste-clients',
  templateUrl: './liste-clients.component.html',
  styleUrls: ['./liste-clients.component.css']
})
export class ListeClientsComponent implements OnInit {

  listeClients: User[] = [];
  clientsToDisplay: User[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;
  currentUserRole: string | null = null;

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    // Récupérer le rôle de l'utilisateur connecté
    this.currentUserRole = this.service.getCurrentUserRole();
    
    // Vérification des rôles autorisés
    if (!this.isAuthorized()) {
      alert("Accès refusé. Cette page est réservée aux coachs !");
      this.router.navigate(['/']);
      return;
    }

    // Récupérer uniquement les utilisateurs avec rôle 'client'
    this.service.getUsersByRole('client').subscribe(clients => {
      this.listeClients = clients;
      this.totalPages = Math.ceil(this.listeClients.length / this.itemsPerPage);
      this.updateClientsToDisplay();
    });
  }

  // Vérifier si l'utilisateur est autorisé
  isAuthorized(): boolean {
    return this.currentUserRole === 'coach' || this.currentUserRole === 'salle de sport';
  }

  updateClientsToDisplay(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.clientsToDisplay = this.listeClients.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateClientsToDisplay();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateClientsToDisplay();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateClientsToDisplay();
    }
  }

  deleteClient(client: User) {
    if (confirm(`Voulez-vous supprimer le client ${client.nom} ${client.prenom} ?`)) {
      this.service.deleteUser(client.id!).subscribe(() => {
        this.listeClients = this.listeClients.filter(c => c.id !== client.id);
        this.totalPages = Math.ceil(this.listeClients.length / this.itemsPerPage);
        
        // Ajuster la page courante si nécessaire
        if (this.currentPage > this.totalPages && this.totalPages > 0) {
          this.currentPage = this.totalPages;
          this.updateClientsToDisplay();
        } else {
          this.updateClientsToDisplay();
        }
      });
    }
  }
}