import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../Entity/Client.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-modifier-client',
  templateUrl: './modifier-client.component.html',
  styleUrls: ['./modifier-client.component.css']
})
export class ModifierClientComponent {
id: number;
messageCommande = "";
clientForm: FormGroup;

userFile: any;
public imagePath: any;
emailURL: any;
newClient = new Client();
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

ngOnInit(): void {
  let idEvent = this.rout.snapshot.params['id'];
  this.id = idEvent;
  this.services.findClientById(idEvent).subscribe((result) => {
    let client = result;
    console.log(client);
    this.clientForm.patchValue({
      nom: client.nom,
      prenom: client.prenom,
      email: client.email,
      mp: client.mp,
      mobile: client.mobile,
      age: client.age
    });
  });
}

updateClient() {
  let data = this.clientForm.value;
  let client = new Client(
    this.id,
    data.nom,
    data.prenom,
    data.email,
    data.mp,
    data.mobile,
    data.age
  );
  console.log(client);
  console.log(data);
  this.services.updateClient(this.id, client).subscribe((res) => {
    console.log(res);
    this.router.navigate(['/client']).then(() => window.location.reload());
  });
}

}
