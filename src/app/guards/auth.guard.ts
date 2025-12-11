import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CrudService } from '../service/crud.service'; // AJOUTER cette importation

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private crudService: CrudService // AJOUTER cette injection
  ) {}
  
  canActivate(): boolean {
    // MODIFIER la vérification
    if (!this.crudService.isUserLoggedIn()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    
    const currentPath = window.location.pathname;
    const userRole = this.crudService.getCurrentUserRole();
    const normalizedRole = userRole ? userRole.toLowerCase() : '';
    
    // AJOUTER vérification pour routes admin
    if (currentPath.startsWith('/admin')) {
      if (normalizedRole !== 'admin') {
        const redirectPath = this.crudService.redirectByRole();
        this.router.navigate([redirectPath]);
        return false;
      }
    }
    
    // AJOUTER vérification pour routes user
    if (currentPath.startsWith('/user')) {
      const allowedRoles = ['client', 'coach', 'salle de sport', 'salle_de_sport'];
      const normalizedAllowedRoles = allowedRoles.map(r => r.toLowerCase());
      
      if (!normalizedAllowedRoles.includes(normalizedRole)) {
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    return true;
  }
}