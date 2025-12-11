import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SalleDeSport } from '../Entity/SalleDeSport.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouter-salle',
  templateUrl: './ajouter-salle.component.html',
  styleUrls: ['./ajouter-salle.component.css']
})
export class AjouterSalleComponent {
messageCommande = "";
salleDeSportForm: FormGroup;

userFile: any;
public imagePath: any;
emailURL: any;
newSalleDeSport = new SalleDeSport();
public message!: string;

constructor(private services: CrudService, private router: Router, private fb: FormBuilder) {
  let formControls = {
    nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    adresse: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mp: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required])
  };
  this.salleDeSportForm = this.fb.group(formControls);
}

get nom() { return this.salleDeSportForm.get('nom'); }
get adresse() { return this.salleDeSportForm.get('adresse'); }
get email() { return this.salleDeSportForm.get('email'); }
get mp() { return this.salleDeSportForm.get('mp'); }
get mobile() { return this.salleDeSportForm.get('mobile'); }

addNewSalleDeSport() {
  let data = this.salleDeSportForm.value;
  console.log(data);
  let salledesport = new SalleDeSport(undefined, data.nom, data.adresse, data.email, data.mp, data.mobile);
  console.log(salledesport);

  if (!data.nom || !data.adresse || !data.email || !data.mp || !data.mobile) {
    this.messageCommande = `<div class="alert alert-danger" role="alert">
      Remplir tous les champs
    </div>`;
  } else {
    this.services.addSalleDeSport(salledesport).subscribe(
      res => {
        console.log(res);
        this.messageCommande = `<div class="alert alert-success" role="alert">
          Salle de sport ajoutée avec succès
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
