import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../Entity/Category.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouter-category',
  templateUrl: './ajouter-category.component.html',
  styleUrls: ['./ajouter-category.component.css']
})
export class AjouterCategoryComponent {
messageCommande = "";
categoryForm: FormGroup;

newCategory = new Category();

constructor(private services: CrudService, private router: Router, private fb: FormBuilder) {
  let formControls = {
    nom: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
  };
  this.categoryForm = this.fb.group(formControls);
}

get nom() { return this.categoryForm.get('nom'); }

addNewCategory() {
  let data = this.categoryForm.value;
  console.log(data);
  
  let category = new Category(undefined, data.nom);
  console.log(category);

  if (!data.nom) {
    this.messageCommande = `<div class="alert alert-danger" role="alert">
      Le nom de la catégorie est obligatoire
    </div>`;
  } else {
    this.services.addCategory(category).subscribe(
      res => {
        console.log(res);
        this.messageCommande = `<div class="alert alert-success" role="alert">
          Catégorie ajoutée avec succès
        </div>`;
        this.router.navigate(['/home']).then(() => { 
          window.location.reload(); 
        });
      },
      err => {
        this.messageCommande = `<div class="alert alert-warning" role="alert">
          Cette catégorie existe déjà !!!
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
