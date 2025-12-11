import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Coach } from '../Entity/Coach.Entity';
import { CrudService } from '../service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-coach',
  templateUrl: './liste-coach.component.html',
  styleUrls: ['./liste-coach.component.css']
})
export class ListeCoachComponent {
  listeCoach: Coach[] = []; 

  constructor(private servive: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.servive.getCoach().subscribe(coach => {
      this.listeCoach = coach;
    });
  }

  // ✅ Nouveau code avec SweetAlert2
  DeleteCoach(coach: Coach) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: `Voulez-vous supprimer ce coach avec l'ID ${coach.id} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servive.onDeleteCoach(coach.id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Supprimé !',
            text: 'Le coach a été supprimé avec succès.',
            confirmButtonColor: '#16a34a',
            confirmButtonText: 'OK',
            background: '#f9fdf9',
            color: '#166534',
            iconColor: '#16a34a'
          }).then(() => {
            this.router.navigate(['/liste-coach']).then(() => window.location.reload());
          });
        });
      }
    });
  }
}
