import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Planning } from '../Entity/Planning.Entity';
import { CrudService } from '../service/crud.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-planning-client',
  templateUrl: './planning-client.component.html',
  styleUrls: ['./planning-client.component.css']
})
export class PlanningClientComponent {
    listeplanning: Planning[];
  p:number=1;
  collection:any[];
  id:number;
  messageCommande="";
  
  constructor(private service :CrudService,private router:Router,private fb:FormBuilder,private route:ActivatedRoute) {
   
  }
   
  
ngOnInit(): void {
  
  let idEvent = this.route.snapshot.params['id'];
  this.id = idEvent;
  this.loadPlanning();

  

}
confirmReservation(idPlanning: number) {
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "Voulez-vous réserver cette séance?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, réserver!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.reserver(idPlanning);
    }
  });
}

reserver(idPlanning: number) {
  this.messageCommande = `<div class="alert alert-primary" role="alert">
    Veuillez patienter ...
  </div>`;
  let datas = this.service.getClientInfo();
  if (!datas) {
    this.connexion();
    return;
  }
  let rq: any = {};
  rq.idPlanning = idPlanning;
  rq.idClient = datas.id;

  this.service.reserverseanceFromApi(rq).subscribe(
    (data: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Félicitations !',
        text: 'Réservé avec succès',
      });
    },
    (error: any) => {
      if (error.status === 409) {
        if (error.error === 'Client has already reserved this planning.') {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Vous avez déjà réservé ce planning !',
          });
        } else if (error.error === 'This planning has already been reserved the maximum number of times.') {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Ce planning a atteint sa capacité maximale de réservations !',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Problème de serveur',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Problème de serveur',
        });
      }
    }
  );
}
    connexion()
    {
      this.router.navigate(['/loginclient']).then(() => {
        window.location.reload();
      });

    }


    loadPlanning(): void {
      this.service.getPlanning(this.id).subscribe(data => {
        const currentTime = new Date();
        const today = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
    
        this.listeplanning = data.filter(planning => {
          
          const sessionDate = new Date(planning.date);
          const sessionDateOnly = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());
          
          if (sessionDateOnly.getTime() < today.getTime()) {
            return false;
          }
    
          if (sessionDateOnly.getTime() === today.getTime()) {
            const debutTime = new Date(sessionDate);
            const [hours, minutes] = planning.debut.split(':').map(Number);
            debutTime.setHours(hours, minutes, 0, 0);
    
            if (currentTime.getTime() >= debutTime.getTime()) {
              return false;
            }
          }
    
          return true;
        });
      });
    }
}
