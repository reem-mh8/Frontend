import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Category } from '../Entity/Category.Entity';
import { SavePack } from '../Entity/SavePack.Entity';

@Component({
  selector: 'app-ajouter-pack',
  templateUrl: './ajouter-pack.component.html',
  styleUrls: ['./ajouter-pack.component.css']
})
export class AjouterPackComponent {
  AjouterForm!: FormGroup;
  messageCommande = "";
  imgURL: any = null;
  listcategory: Category[] = [];

  constructor(private fb: FormBuilder, private services: CrudService, private router: Router) {
    // Formulaire sans salleDeSport, car pack sera lié à l'utilisateur connecté
    this.AjouterForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      categorie: ['', Validators.required],
      image: ['']   // URL d'image (optionnelle)
    });
  }

  ngOnInit(): void {
    this.services.getCategory().subscribe(category => this.listcategory = category);
  }

  previewImage() {
    const url = this.AjouterForm.get('image')?.value;
    this.imgURL = url ? url : null;
  }

  addNewAjouter() {
    if (this.AjouterForm.invalid) {
      this.messageCommande = `<div class="alert alert-danger">Veuillez remplir tous les champs obligatoires.</div>`;
      return;
    }

    const data = this.AjouterForm.value;
    const user = this.services.getUserInfo(); // utilisateur connecté

    const model: SavePack = {
      id: null,
      nom: data.nom,
      description: data.description,
      prix: data.prix,
      image: data.image || null,
      idCategory: +data.categorie,
      idUser: user.id // lié automatiquement à l'utilisateur "salle de sport"
    };

    this.services.addpack(model).subscribe(
      () => {
        this.messageCommande = `<div class="alert alert-success">Pack ajouté avec succès !</div>`;
        setTimeout(() => this.router.navigate(['/listpack']), 1000);
      },
      () => {
        this.messageCommande = `<div class="alert alert-warning">Service indisponible.</div>`;
      }
    );
  }

  cancel() {
    this.router.navigate(['/listpack']);
  }
}
