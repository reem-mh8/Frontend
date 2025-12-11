import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../Entity/Client.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.css']
})
export class ModifierProfilComponent implements OnInit {
  id!: number;
  ModifierForm!: FormGroup;
  message: string = '';

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder,
    private rout: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.rout.snapshot.params['id'];

    // Création du formulaire
    this.ModifierForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(4)]],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mp: ['', Validators.required],
      mobile: ['', Validators.required],
      age: ['', Validators.required]
    });

    // Pré-remplir le formulaire avec les données du client
    this.services.findClientById(this.id).subscribe(result => {
      this.ModifierForm.patchValue({
        nom: result.nom,
        prenom: result.prenom,
        email: result.email,
        mp: result.mp,
        mobile: result.mobile,
        age: result.age
      });
    });
  }

  // Méthode appelée par le HTML pour mettre à jour le profil
  modifierClient() {
    if (this.ModifierForm.invalid) return;

    const data = this.ModifierForm.value;
    const client = new Client(
      this.id,
      data.nom,
      data.prenom,
      data.email,
      data.mp,
      data.mobile,
      data.age
    );

    this.services.updateClient(this.id, client).subscribe(res => {
      this.message = 'Profil modifié avec succès !';
      this.router.navigate(['/profil']);
    });
  }

  // Getters pour le formulaire
  get nom() { return this.ModifierForm.get('nom'); }
  get prenom() { return this.ModifierForm.get('prenom'); }
  get email() { return this.ModifierForm.get('email'); }
  get mp() { return this.ModifierForm.get('mp'); }
  get mobile() { return this.ModifierForm.get('mobile'); }
  get age() { return this.ModifierForm.get('age'); }
}
