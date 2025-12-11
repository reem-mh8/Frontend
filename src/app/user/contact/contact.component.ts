import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../Entity/Contact.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  messageCommande = "";
contactForm: FormGroup;

userFile: any;
public imagePath: any;
emailURL: any;
newContact = new Contact(); // Supprimez `public message!: string;`

constructor(private services: CrudService, private router: Router, private fb: FormBuilder) {
  let formControls = {
    nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    sujet: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required])
  };
  this.contactForm = this.fb.group(formControls);
}

get nom() { return this.contactForm.get('nom'); }
get email() { return this.contactForm.get('email'); }
get sujet() { return this.contactForm.get('sujet'); }
get message() { return this.contactForm.get('message'); } // Gardez seulement ce getter
get mobile() { return this.contactForm.get('mobile'); }

addNewContact() {
  let data = this.contactForm.value;
  console.log(data);
  let contact = new Contact(undefined, data.nom, data.email, data.sujet, data.message, data.mobile);
  console.log(contact);

  if (!data.nom || !data.email || !data.sujet || !data.message || !data.mobile) {
    this.messageCommande = `<div class="alert alert-danger" role="alert">
      Remplir tous les champs
    </div>`;
  } else {
    this.services.addContact(contact).subscribe(
      res => {
        console.log(res);
        this.messageCommande = `<div class="alert alert-success" role="alert">
          Contact ajouté avec succès
        </div>`;
        this.router.navigate(['/liste-contact']).then(() => { window.location.reload(); });
      },
      err => {
        this.messageCommande = `<div class="alert alert-warning" role="alert">
          EMAIL EXISTE déjà !!!
        </div>`;
      }
    );
    setTimeout(() => {
      this.messageCommande = "";
    }, 3000);
  }
}

ngOnInit(): void { }
}
