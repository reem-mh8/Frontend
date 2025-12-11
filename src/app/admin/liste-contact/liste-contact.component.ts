import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../Entity/Contact.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-contact',
  templateUrl: './liste-contact.component.html',
  styleUrls: ['./liste-contact.component.css']
})
export class ListeContactComponent {
  listeContact: Contact[] = []; 

  constructor(private servive: CrudService, private router: Router) {}
  
  ngOnInit(): void {
    this.servive.getContact().subscribe(contact => {
      this.listeContact = contact;
    });
  }
  
  DeleteContact(contact: Contact) {
    if (confirm("Voulez-vous supprimer le contact avec l'ID " + contact.id + "?")) {
      this.servive.onDeleteContact(contact.id).subscribe(() => {
        this.router.navigate(['/liste-contact']).then(() => window.location.reload());
      });
    }
  }
}
