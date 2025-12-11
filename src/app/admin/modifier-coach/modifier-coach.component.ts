import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Coach } from '../Entity/Coach.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-modifier-coach',
  templateUrl: './modifier-coach.component.html',
  styleUrls: ['./modifier-coach.component.css']
})
export class ModifierCoachComponent {
id: number;
messageCommande = "";
coachForm: FormGroup;

userFile: any;
public imagePath: any;
emailURL: any;
newCoach = new Coach();
public message!: string;

constructor(
  private services: CrudService,
  private router: Router,
  private fb: FormBuilder,
  private rout: ActivatedRoute
) {
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

ngOnInit(): void {
  let idEvent = this.rout.snapshot.params['id'];
  this.id = idEvent;
  this.services.findCoachById(idEvent).subscribe((result) => {
    let coach = result;
    console.log(coach);
    this.coachForm.patchValue({
      nom: coach.nom,
      prenom: coach.prenom,
      email: coach.email,
      mp: coach.mp,
      mobile: coach.mobile
    });
  });
}

updateCoach() {
  let data = this.coachForm.value;
  let coach = new Coach(
    this.id,
    data.nom,
    data.prenom,
    data.email,
    data.mp,
    data.mobile
  );
  console.log(coach);
  console.log(data);
  this.services.updateCoach(this.id, coach).subscribe((res) => {
    console.log(res);
    this.router.navigate(['/coach']).then(() => window.location.reload());
  });
}

}
