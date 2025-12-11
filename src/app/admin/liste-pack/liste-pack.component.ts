import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Pack } from '../Entity/Pack.Entity';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-pack',
  templateUrl: './liste-pack.component.html',
  styleUrls: ['./liste-pack.component.css']
})
export class ListePackComponent {
  listePack: Pack[] = []; 

  constructor(private service: CrudService, private router: Router) {}
  
  ngOnInit(): void {
    this.service.getPack().subscribe(pack => {
      this.listePack = pack;
    });
  }
  
  // ✅ Nouveau code avec SweetAlert2
  DeletePack(pack: Pack) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: `Voulez-vous supprimer ce pack avec l'ID ${pack.id} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeletePack(pack.id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Supprimé !',
            text: 'Le pack a été supprimé avec succès.',
            confirmButtonColor: '#16a34a',
            confirmButtonText: 'OK',
            background: '#f9fdf9',
            color: '#166534',
            iconColor: '#16a34a'
          }).then(() => {
            this.router.navigate(['/liste-pack']).then(() => window.location.reload());
          });
        });
      }
    });
  }
}
