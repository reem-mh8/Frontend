import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Reservation } from '../Entity/Reservation.Entity';

@Component({
  selector: 'app-liste-reservation-client',
  templateUrl: './liste-reservation-client.component.html',
  styleUrls: ['./liste-reservation-client.component.css']
})
export class ListeReservationClientComponent {
  listeReseravtion:Reservation[];
  constructor(private service:CrudService,private router:Router, ) { }
  ngOnInit(): void {
    let datas=this.service.getClientInfo();
      this.service.getReservationByIdclient(datas.id).subscribe(client =>{
        this.listeReseravtion = client
       })
  } 
  isSessionCompleted(planningDate: Date, debut: string, fin: string): string {
    const today = new Date();
    const sessionDate = new Date(planningDate);
    const debutTime = new Date(sessionDate.toDateString() + " " + debut);
    const finTime = new Date(sessionDate.toDateString() + " " + fin);

    if (today < debutTime) {
        return 'Séance en attente';
    } else if (today >= debutTime && today <= finTime) {
        return 'Séance en cours';
    } else {
        return 'Séance terminée';
    }
}
}
