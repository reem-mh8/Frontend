import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SalleDeSport } from '../Entity/SalleDeSport.Entity';
import { CrudService } from '../service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-salle-de-sport',
  templateUrl: './liste-salle-de-sport.component.html',
  styleUrls: ['./liste-salle-de-sport.component.css']
})
export class ListeSalleDeSportComponent {

  listeSalleDeSport: SalleDeSport[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 4; // salles par page

  constructor(private servive: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.servive.getSalleDeSport().subscribe(salle => {
      this.listeSalleDeSport = salle;
    });
  }

  // Salles à afficher sur la page courante
  get sallesToDisplay(): SalleDeSport[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.listeSalleDeSport.slice(start, end);
  }

  // Pagination
  totalPages(): number {
    return Math.ceil(this.listeSalleDeSport.length / this.itemsPerPage);
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
    return Math.min(this.currentPage * this.itemsPerPage, this.listeSalleDeSport.length);
  }

  DeleteSalleDeSport(salle: SalleDeSport) {
    if (confirm("Voulez-vous supprimer la salle de sport " + salle.nom + "?")) {
      this.servive.onDeleteSalleDeSport(salle.id).subscribe(() => {
        this.listeSalleDeSport = this.listeSalleDeSport.filter(s => s !== salle);
      });
    }
  }

  updatesalleetat(salle: SalleDeSport) {
    const index = this.listeSalleDeSport.indexOf(salle);
    const newEtat = !salle.etat;
    const newSalle = { ...salle, etat: newEtat };

    this.servive.updateSalle(newSalle, salle.id).subscribe(
      res => {
        this.listeSalleDeSport[index] = newSalle;
        Swal.fire({
          icon: newEtat ? 'success' : 'error',
          title: newEtat ? 'Compte activé' : 'Compte désactivé',
          text: newEtat ? 'Le compte de responsable de salle a été activé avec succès.' :
                          'Le compte a été désactivé avec succès.',
          showConfirmButton: false,
          timer: 3000
        });
      },
      err => console.log(err)
    );
  }

}
