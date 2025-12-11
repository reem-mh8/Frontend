import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coach } from '../Entity/Coach.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouter-coach',
  templateUrl: './ajouter-coach.component.html',
  styleUrls: ['./ajouter-coach.component.css']
})
export class AjouterCoachComponent {
messageCommande = "";
coachForm: FormGroup;

userFile: any;
public imagePath: any;
emailURL: any;
newCoach = new Coach();
public message!: string;

constructor(private services: CrudService, private router: Router, private fb: FormBuilder) {
  let formControls = {
    nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mp: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required])
  };
  this.coachForm = this.fb.group(formControls);
}

get nom() { return this.coachForm.get('nom'); }
get prenom() { return this.coachForm.get('prenom'); }
get email() { return this.coachForm.get('email'); }
get mp() { return this.coachForm.get('mp'); }
get mobile() { return this.coachForm.get('mobile'); }

addNewCoach() {
  let data = this.coachForm.value;
  console.log(data);
  let coach = new Coach(undefined, data.nom, data.prenom, data.email, data.mp, data.mobile);
  console.log(coach);

  if (!data.nom || !data.prenom || !data.email || !data.mp || !data.mobile) {
    this.messageCommande = `<div class="alert alert-danger" role="alert">
      Remplir tous les champs
    </div>`;
  } else {
    this.services.addCoach(coach).subscribe(
      res => {
        console.log(res);
        this.messageCommande = `<div class="alert alert-success" role="alert">
          Coach ajouté avec succès
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
