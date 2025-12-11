import { Component } from '@angular/core';
import { Admin } from '../Entity/Admin.Entity';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-admin',
  templateUrl: './liste-admin.component.html',
  styleUrls: ['./liste-admin.component.css']
})
export class ListeAdminComponent {
  listeAdmin: Admin[] = []; 

  constructor(private servive: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.servive.getAdmin().subscribe(admin => {
      this.listeAdmin = admin;
    });
  }

  // ✅ Nouveau code avec SweetAlert2
  DeleteAdmin(admin: Admin) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: `Voulez-vous supprimer cet administrateur avec l'ID ${admin.id} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servive.onDeleteAdmin(admin.id).subscribe(() => {
          // ✅ Deuxième popup après suppression réussie
          Swal.fire({
            icon: 'success',
            title: 'Supprimé !',
            text: 'L’administrateur a été supprimé avec succès.',
            confirmButtonColor: '#16a34a',
            confirmButtonText: 'OK',
            background: '#f9fdf9',
            color: '#166534',
            iconColor: '#16a34a'
          }).then(() => {
            this.router.navigate(['/liste-admin']).then(() => window.location.reload());
          });
        });
      }
    });
  }
}
