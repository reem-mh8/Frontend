import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private crud: CrudService) {
    this.registerForm = this.fb.group({
      role: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: [''],
      adresse: [''],
      email: ['', Validators.required],
      mp: ['', Validators.required],
      mobile: [''],
      age: ['']
    });
  }

  get role() {
    return this.registerForm.get('role')?.value;
  }

  register() {
    let data = this.registerForm.value;

    // Suppression des champs inutiles selon le rôle
    if (data.role === 'coach') {
      delete data.adresse;
      delete data.age;
    }

    if (data.role === 'salle') {
      delete data.prenom;
      delete data.age;
    }

    if (data.role === 'admin') {
      delete data.mobile;
      delete data.adresse;
      delete data.age;
    }

    this.crud.register(data).subscribe(
      res => {
        Swal.fire('Succès', 'Inscription réussie', 'success');
      },
      err => {
        Swal.fire('Erreur', err.error.message, 'error');
      }
    );
  }
}
