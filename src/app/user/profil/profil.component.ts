import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Client } from '../Entity/Client.Entity';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  // Variable pour stocker les informations du client
  client: Client | null = null;

  // Injection du service CRUD
  constructor(private crudService: CrudService) { }

  // Initialisation du composant
  ngOnInit(): void {
    // Récupération des infos du client depuis le token ou le stockage local
    const data = this.crudService.getClientInfo();

    if (data && data.id) {
      const id = data.id; // ID du client connecté

      // Appel au backend pour récupérer les informations complètes du client
      this.crudService.getClientById(id).subscribe({
        next: (result: Client) => {
          this.client = result; // Stocke les données du client
        },
        error: (err) => {
          console.error("Erreur lors du chargement du client", err);
        }
      });
    } else {
      console.warn("Aucune donnée de client trouvée !");
    }
  }

}
