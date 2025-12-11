import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../../../service/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  messageCommande = '';

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mp: ['', [Validators.required]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get mp() { return this.loginForm.get('mp'); }

  login(): void {
    if (this.loginForm.invalid) {
      this.messageCommande = `<div class="alert alert-danger">Veuillez remplir tous les champs correctement.</div>`;
      return;
    }

    const credentials = {
      email: this.loginForm.value.email,
      mp: this.loginForm.value.mp
    };

    this.service.loginUser(credentials).subscribe({
      next: (res: any) => {
        console.log('Login response:', res);
        
        // Sauvegarder l'utilisateur dans le service
        this.service.setCurrentUser(res);
        
        // Récupérer le rôle
        const role = res?.role || res?.user?.role;
        
        // Redirection selon le rôle
        let redirectPath = '/auth/login'; // Par défaut
        
        if (role) {
          // Normaliser le rôle
          const normalizedRole = role.toString().toLowerCase().trim();
          
          if (normalizedRole === 'admin') {
            redirectPath = '/admin/home';
          } else if (normalizedRole === 'client' || normalizedRole === 'coach' || 
                     normalizedRole === 'salle de sport' || normalizedRole === 'salle_de_sport' || 
                     normalizedRole === 'salle sport' || normalizedRole === 'sallesport') {
            redirectPath = '/user/home';
          }
        }
        
        console.log('Redirecting to:', redirectPath);
        this.router.navigate([redirectPath]);
      },
      error: (err) => {
        console.error('Login error', err);
        const errMsg = err?.error?.message || 'Email ou mot de passe incorrect.';
        this.messageCommande = `<div class="alert alert-danger">${errMsg}</div>`;
      }
    });
  }
}