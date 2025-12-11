import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../Entity/Client.Entity';
import { CrudService } from '../service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.component.html',
  styleUrls: ['./liste-client.component.css']
})
export class ListeClientComponent {
  listeClient: Client[] = []; 

  constructor(private servive: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.servive.getClient().subscribe(client => {
      this.listeClient = client;
    });
  }

  // ✅ Nouveau code avec SweetAlert2
  DeleteClient(client: Client) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: `Voulez-vous supprimer ce client avec l'ID ${client.id} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servive.onDeleteClient(client.id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Supprimé !',
            text: 'Le client a été supprimé avec succès.',
            confirmButtonColor: '#16a34a',
            confirmButtonText: 'OK',
            background: '#f9fdf9',
            color: '#166534',
            iconColor: '#16a34a'
          }).then(() => {
            this.router.navigate(['/liste-client']).then(() => window.location.reload());
          });
        });
      }
    });
  }
}
