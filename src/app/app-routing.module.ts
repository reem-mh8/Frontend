import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Import du guard
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // MODIFIER pour pointer vers auth/login
  
  { 
    path: 'auth', 
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) 
  },
  
  { 
    path: 'admin', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
  },
  
  { 
    path: 'user', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule) 
  },
  
  { path: '**', redirectTo: 'auth/login' } // MODIFIER pour rediriger vers auth/login
];

@NgModule({
  imports: [RouterModule.forRoot(routes),ReactiveFormsModule, FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }