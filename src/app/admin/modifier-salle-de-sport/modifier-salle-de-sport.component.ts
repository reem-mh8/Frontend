import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SalleDeSport } from '../Entity/SalleDeSport.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-modifier-salle-de-sport',
  templateUrl: './modifier-salle-de-sport.component.html',
  styleUrls: ['./modifier-salle-de-sport.component.css']
})
export class ModifierSalleDeSportComponent {
id: number;
messageCommande = "";
salleDeSportForm: FormGroup;

userFile: any;
public imagePath: any;
emailURL: any;
newSalleDeSport = new SalleDeSport();
public message!: string;

constructor(
  private services: CrudService,
  private router: Router,
  private fb: FormBuilder,
  private rout: ActivatedRoute
) {
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

ngOnInit(): void {
  let idEvent = this.rout.snapshot.params['id'];
  this.id = idEvent;
  this.services.findSalleDeSportById(idEvent).subscribe((result) => {
    let salleDeSport = result;
    console.log(salleDeSport);
    this.salleDeSportForm.patchValue({
      nom: salleDeSport.nom,
      adresse: salleDeSport.adresse,
      email: salleDeSport.email,
      mp: salleDeSport.mp,
      mobile: salleDeSport.mobile
    });
  });
}

updateSalleDeSport() {
  let data = this.salleDeSportForm.value;
  let salleDeSport = new SalleDeSport(
    this.id,
    data.nom,
    data.adresse,
    data.email,
    data.mp,
    data.mobile
  );
  console.log(salleDeSport);
  console.log(data);
  this.services.updateSalleDeSport(this.id, salleDeSport).subscribe((res) => {
    console.log(res);
    this.router.navigate(['/salleDeSport']).then(() => window.location.reload());
  });
}

}
