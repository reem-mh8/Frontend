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

  constructor(private servive: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.servive.getSalleDeSport().subscribe(salleDeSport => {
      this.listeSalleDeSport = salleDeSport;
    });
  }

  // ✅ Nouveau code avec SweetAlert2
  DeleteSalleDeSport(salleDeSport: SalleDeSport) {
  Swal.fire({
    title: 'Êtes-vous sûr(e) ?',
    text: `Voulez-vous supprimer cette salle de sport avec l'ID ${salleDeSport.id} ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Oui, supprimer !',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.servive.onDeleteSalleDeSport(salleDeSport.id).subscribe(() => {

        // ✅ Deuxième popup après suppression réussie
        Swal.fire({
          icon: 'success',
          title: 'Supprimée !',
          text: 'La salle de sport a été supprimée.',
          confirmButtonColor: '#16a34a', // bouton vert SanteSynchro
          confirmButtonText: 'OK',
          background: '#f9fdf9', // fond légèrement vert clair
          color: '#166534', // texte vert foncé
          iconColor: '#16a34a' // couleur de l’icône verte
        }).then(() => {
          // Après que l'utilisateur clique sur OK
          this.router.navigate(['/liste-salle-de-sport']).then(() => window.location.reload());
        });

      });
    }
  });
}


  updatesalleetat(salle: SalleDeSport) {
    console.log(salle);
    let index = this.listeSalleDeSport.indexOf(salle);
    if (salle.etat == true) {
      let newSalle = new SalleDeSport(salle.id, salle.nom, salle.adresse, salle.email, salle.mp, salle.mobile, false)
      this.servive.updateSalle(newSalle, salle.id).subscribe(
        res => {
          console.log(res)
          this.listeSalleDeSport[index] = newSalle
          Swal.fire({
            icon: "error",
            title: "Compte désactivé",
            text: "Le compte a été désactivé avec succès.",
            showConfirmButton: false,
            timer: 3000
          });
        },
        err => console.log(err)
      )
    } else {
      let newSalle = new SalleDeSport(salle.id, salle.nom, salle.adresse, salle.email, salle.mp, salle.mobile, true)
      this.servive.updateSalle(newSalle, salle.id).subscribe(
        res => {
          console.log(res)
          this.listeSalleDeSport[index] = newSalle
          Swal.fire({
            title: "Succès !",
            text: "Le compte de responsable de salle a été activé avec succès.",
            icon: "success",
            showConfirmButton: false,
            timer: 3000
          });
        },
        err => console.log(err)
      )
    }
  }

}
