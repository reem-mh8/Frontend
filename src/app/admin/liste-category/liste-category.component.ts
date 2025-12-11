import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Category } from '../Entity/Category.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-category',
  templateUrl: './liste-category.component.html',
  styleUrls: ['./liste-category.component.css']
})
export class ListeCategoryComponent {
  listeCategories: Category[] = []; 

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.service.getCategories().subscribe(categories => {
      this.listeCategories = categories;
    });
  }

  // ✅ Suppression d'une catégorie avec SweetAlert2
deleteCategory(category: Category) {
  Swal.fire({
    title: 'Êtes-vous sûr(e) ?',
    text: `Voulez-vous supprimer la catégorie "${category.nom}" ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Oui, supprimer !',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.service.deleteCategory(category.id).subscribe(
        () => {
          // 🔥 Mise à jour locale sans recharger la page
          this.listeCategories = this.listeCategories.filter(c => c.id !== category.id);

          Swal.fire({
            icon: 'success',
            title: 'Supprimée !',
            text: 'La catégorie a été supprimée avec succès.',
            confirmButtonColor: '#16a34a'
          });
        },
        (err) => {
          console.error('Erreur DELETE:', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Impossible de supprimer la catégorie.',
            confirmButtonColor: '#d33'
          });
        }
      );
    }
  });
}


  // ✅ Activation/désactivation d'une catégorie - VERSION SIMPLIFIÉE
  updateCategoryEtat(category: Category) {
    console.log(category);
    
    // Comme votre Category n'a pas d'état, on va ajouter la propriété dynamiquement
    // ou gérer l'état différemment selon votre logique métier
    
    // Option 1: Si vous voulez quand même gérer un état
    const categoryWithEtat = { ...category, etat: !(category as any).etat };
    
    this.service.updateCategory(categoryWithEtat, category.id).subscribe(
      res => {
        console.log(res);
        
        // Mettre à jour la catégorie dans la liste
        const index = this.listeCategories.findIndex(c => c.id === category.id);
        if (index !== -1) {
          this.listeCategories[index] = categoryWithEtat as Category;
        }
        
        Swal.fire({
          title: "Succès !",
          text: `La catégorie a été ${(categoryWithEtat as any).etat ? 'activée' : 'désactivée'} avec succès.`,
          icon: "success",
          showConfirmButton: false,
          timer: 3000
        });
      },
      err => console.log(err)
    );
  }
}