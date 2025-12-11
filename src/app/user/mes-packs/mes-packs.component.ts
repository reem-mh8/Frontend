import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { Pack } from '../Entity/Pack.Entity';

@Component({
  selector: 'app-mes-packs',
  templateUrl: './mes-packs.component.html',
  styleUrls: ['./mes-packs.component.css']
})
export class MesPacksComponent implements OnInit {
  MesPacks: Pack[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 4;

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est une salle de sport
    const userRole = this.service.getCurrentUserRole();
    if (userRole !== 'salle de sport') {
      alert("Accès refusé. Réservé aux salles de sport !");
      this.router.navigate(['/']);
      return;
    }

    // Récupérer l'ID de l'utilisateur connecté
    const currentUserId = this.service.getCurrentUserId();
    
    if (currentUserId) {
      // Récupère les packs de la salle de sport connectée (User avec rôle 'salle de sport')
      this.service.getAllPackbySalleDeSportId(currentUserId).subscribe(
        (data: Pack[]) => {
          console.log('Packs récupérés:', data);
          this.MesPacks = data;
        },
        error => {
          console.error('Erreur lors du chargement des packs:', error);
          alert('Erreur lors du chargement de vos packs');
        }
      );
    } else {
      alert('Vous devez être connecté pour accéder à cette page');
      this.router.navigate(['/login']);
    }
  }

  // Packs à afficher sur la page courante
  get packsToDisplay(): Pack[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.MesPacks.slice(start, end);
  }

  // Pagination
  totalPages(): number {
    return Math.ceil(this.MesPacks.length / this.itemsPerPage);
  }

  goToPage(page: number): void { 
    this.currentPage = page; 
  }

  prevPage(): void { 
    if (this.currentPage > 1) this.currentPage--; 
  }

  nextPage(): void { 
    if (this.currentPage < this.totalPages()) this.currentPage++; 
  }

  // Méthodes utilitaires pour l'affichage de la pagination
  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  getEndIndex(): number {
    const end = this.currentPage * this.itemsPerPage;
    return end > this.MesPacks.length ? this.MesPacks.length : end;
  }

  // Actions
  editPack(pack: Pack): void {
    this.router.navigate(['/edit-pack', pack.id]);
  }

  deletePack(pack: Pack): void {
    if (confirm(`Voulez-vous vraiment supprimer le pack "${pack.nom}" ?`)) {
      this.service.deletePack(pack.id!).subscribe(
        () => {
          // Supprimer le pack de la liste locale
          this.MesPacks = this.MesPacks.filter(p => p.id !== pack.id);
          
          // Ajuster la pagination si nécessaire
          if (this.currentPage > this.totalPages() && this.totalPages() > 0) {
            this.currentPage = this.totalPages();
          }
          
          alert('Pack supprimé avec succès !');
        },
        error => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression du pack');
        }
      );
    }
  }
}