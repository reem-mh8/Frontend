import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Category } from '../Entity/Category.Entity';
import { Pack } from '../Entity/Pack.Entity';
import { SalleDeSport } from '../Entity/SalleDeSport.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouter-pack',
  templateUrl: './ajouter-pack.component.html',
  styleUrls: ['./ajouter-pack.component.css']
})
export class AjouterPackComponent {

  ajouterForm!: FormGroup;
  listCategory: Category[] = [];
  listSalle: SalleDeSport[] = [];
  imgURL: any = null;

   messageCommande: string = '';

  constructor(private fb: FormBuilder, private service: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.ajouterForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      category: ['', Validators.required],
      salleDeSport: ['', Validators.required],
      image: [null, Validators.required]
    });

    this.service.getCategories().subscribe(categories => this.listCategory = categories);
    this.service.getSalleDeSport().subscribe(salles => this.listSalle = salles);
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (!file.type.match(/image\/*/)) {
        Swal.fire('Erreur', 'Seules les images sont acceptées.', 'error');
        this.ajouterForm.get('image')?.setValue(null);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgURL = reader.result;
        this.ajouterForm.get('image')?.setValue(this.imgURL);
      };
    }
  }

  addPack() {
    if (this.ajouterForm.invalid) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs.', 'warning');
      return;
    }

    const data = this.ajouterForm.value;

    const newPack: Pack = {
      nom: data.nom,
      description: data.description,
      prix: data.prix,
      image: data.image,
      salleDeSport: { id: +data.salleDeSport } as SalleDeSport,
      category: { id: +data.category } as Category
    };

    this.service.addpack(newPack).subscribe(
      () => {
        Swal.fire('Succès', 'Pack ajouté avec succès !', 'success');
        this.router.navigate(['/listpack']);
      },
      (err) => {
        console.error(err);
        Swal.fire('Erreur', 'Service indisponible.', 'error');
      }
    );
  }
}
