import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { Pack } from '../Entity/Pack.Entity';

@Component({
  selector: 'app-liste-pack',
  templateUrl: './liste-pack.component.html',
  styleUrls: ['./liste-pack.component.css']
})
export class ListePackComponent implements OnInit {
  messageCommande = "";
  listePack: Pack[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 4; // packs par page

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadPacks();
  }

  loadPacks(): void {
    this.service.getAllPacks().subscribe(
      (packs: Pack[]) => {
        this.listePack = packs;
        console.log('Packs chargés:', this.listePack);
      },
      error => {
        console.error('Erreur lors du chargement des packs:', error);
        this.messageCommande = `<div class="alert alert-danger">Erreur de chargement des packs</div>`;
      }
    );
  }

  // Packs à afficher sur la page courante
  get packsToDisplay(): Pack[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.listePack.slice(start, end);
  }

  // Pagination
  totalPages(): number {
    return Math.ceil(this.listePack.length / this.itemsPerPage);
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

  getPageEnd(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.listePack.length);
  }

  // Méthode pour obtenir le nom de la salle de sport
  getSalleDeSportName(pack: Pack): string {
    if (pack.user) {
      return `${pack.user.nom} ${pack.user.prenom || ''}`;
    }
    return 'Non attribuée';
  }

  reserver(event: any): void {
    this.messageCommande = `<div class="alert alert-primary" role="alert">Veuillez patienter ...</div>`;
    
    // Vérifier si l'utilisateur est connecté
    const currentUser = this.service.getCurrentUser();
    if (!currentUser) {
      this.connexion();
      return;
    }

    // Vérifier si l'utilisateur est un client
    if (currentUser.role !== 'client') {
      this.messageCommande = `<div class="alert alert-warning">Réservé aux clients seulement</div>`;
      return;
    }

    const rq = { idClient: currentUser.id, idPack: event.id };

    this.service.reserverFromApi(rq).subscribe(
      (data: any) => {
        const ids = data.id;
        this.messageCommande = `<div class="alert alert-success">Réservé avec succès</div>`;
        this.router.navigate([`/paiement/${ids}`]);
      },
      error => {
        if (error.status === 409) {
          this.messageCommande = `<div class="alert alert-warning">Vous avez déjà réservé ce pack !</div>`;
        } else {
          this.messageCommande = `<div class="alert alert-danger">Problème de serveur</div>`;
        }
      }
    );
  }

  connexion(): void {
    this.router.navigate(['/login']);
  }
}