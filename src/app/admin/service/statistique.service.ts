import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  // L'URL de ton backend pour récupérer les stats
  private apiUrl = 'http://localhost:8081/api/statistiques/users';

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les stats
  getUserStats(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
