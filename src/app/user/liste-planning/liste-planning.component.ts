import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Planning } from '../Entity/Planning.Entity';

@Component({
  selector: 'app-liste-planning',
  templateUrl: './liste-planning.component.html',
  styleUrls: ['./liste-planning.component.css']
})
export class ListePlanningComponent {

  listePlanning: Planning[] = [];
  message = "";
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 4;

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    const coachData = this.service.getClientInfo(); // Ou getCoachInfo() si tu as
    if (coachData && coachData.id) {
      this.getPlanningByCoach(coachData.id);
    } else {
      this.message = `<div class="alert alert-warning">Aucun coach connecté.</div>`;
    }
  }

  // 🔹 Récupérer les plannings du coach
  getPlanningByCoach(idCoach: number): void {
    this.service.getPlanning(idCoach).subscribe(data => {
      this.listePlanning = data;
    });
  }

  // 🔹 Plannings paginés à afficher
  get planningToDisplay(): Planning[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.listePlanning.slice(start, end);
  }

  // Pagination helpers
  totalPages(): number {
    return Math.ceil(this.listePlanning.length / this.itemsPerPage);
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
    return Math.min(this.currentPage * this.itemsPerPage, this.listePlanning.length);
  }

    reserverPlanning(planning: Planning) {
    alert(`Vous avez choisi de réserver le planning : ${planning.nom}`);
  }

 
}
