import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../Entity/Client.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.component.html',
  styleUrls: ['./ajouter-client.component.css']
})
export class AjouterClientComponent {

  messageCommande=""
clientForm: FormGroup

userFile: any;
public imagePath: any;
emailURL: any;
newClient = new Client();
public message!: string;

constructor(private services: CrudService, private router: Router, private fb: FormBuilder) {
  let formControls = {
    nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mp: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required])
  };
  this.clientForm = this.fb.group(formControls);
}

get nom() { return this.clientForm.get('nom'); }
get prenom() { return this.clientForm.get('prenom'); }
get email() { return this.clientForm.get('email'); }
get mp() { return this.clientForm.get('mp'); }
get mobile() { return this.clientForm.get('mobile'); }
get age() { return this.clientForm.get('age'); }

addNewClient() {
  let data = this.clientForm.value;
  console.log(data);
  let client = new Client(undefined, data.nom, data.prenom, data.email, data.mp, data.mobile, data.age);
  console.log(client);

  if (!data.nom || !data.prenom || !data.email || !data.mp || !data.mobile || !data.age) {
    this.messageCommande = `<div class="alert alert-danger" role="alert">
      Remplir tous les champs
    </div>`;
  } else {
    this.services.addclient(client).subscribe(
      res => {
        console.log(res);
        this.messageCommande = `<div class="alert alert-success" role="alert">
          Client ajouté avec succès
        </div>`;
        this.router.navigate(['/home']).then(() => { window.location.reload(); });
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
