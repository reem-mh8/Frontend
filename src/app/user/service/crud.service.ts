import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../Entity/Admin.Entity';
import { Client } from '../Entity/Client.Entity';
import { Coach } from '../Entity/Coach.Entity';
import { SalleDeSport } from '../Entity/SalleDeSport.Entity';
import { Contact } from '../Entity/Contact.Entity';
import { Pack } from '../Entity/Pack.Entity';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SavePack } from '../Entity/SavePack.Entity';
import { Category } from '../Entity/Category.Entity';
import { Planning } from '../Entity/Planning.Entity';
import { Reservation } from '../Entity/Reservation.Entity';

@Injectable({ providedIn: 'root' })
export class CrudService {
  baseUrl: any;
  findClientById(id: number): Observable<Client> {
  return this.http.get<Client>(`${this.baseUrl}/client/${id}`);
}
  apiUrl = 'http://localhost:8081/api';
  loginClientUrl = 'http://localhost:8081/api/client/login';
  loginCoachUrl = 'http://localhost:8081/api/coach/login';
  loginSalleDeSportUrl = 'http://localhost:8081/api/salleDeSport/login';
  loginGoogleUrl = 'http://localhost:8081/api/client/login-google';

  constructor(private http: HttpClient) {}

    getUserInfo() {
    const token = localStorage.getItem("myTokenSalle");
    const helper = new JwtHelperService();

    if (!token) return null;

    const decodedToken = helper.decodeToken(token);
    return decodedToken?.data;
  }

  addpack(savepack: SavePack) {
    return this.http.post<any>(this.apiUrl + "/pack", savepack);
  }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + "/category");
  }

  getAdmin(): Observable<Admin[]> {
  return this.http.get<Admin[]>(this.apiUrl + "/admin");
}
 addadmin(admin: Admin) {
  return this.http.post<any>(this.apiUrl + "/admin", admin);
}


  getClient(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/client`);
  }

  getClientById(id: number): Observable<Client> {
  return this.http.get<Client>(`${this.apiUrl}/client/${id}`);
}

  getCoach(): Observable<Coach[]> {
    return this.http.get<Coach[]>(`${this.apiUrl}/coach`);
  }

  getPack(): Observable<Pack[]> {
    return this.http.get<Pack[]>(`${this.apiUrl}/pack`);
  }

  reserverFromApi(rq: any) {
    return this.http.post<any>(`${this.apiUrl}/abonnement`, rq);
  }

  getClientInfo() {
    const token = localStorage.getItem("myTokenClient");
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.data;
  }

  getSalleDeSport(): Observable<SalleDeSport[]> {
    return this.http.get<SalleDeSport[]>(`${this.apiUrl}/salleDeSport`);
  }

  getReservationByIdclient(id: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservation/get-all-by-id-client/${id}`);
  }

  getPlanning(id: number): Observable<Planning[]> {
    return this.http.get<Planning[]>(`${this.apiUrl}/planning/get-all-by-id-coach/${id}`);
  }

  reserverseanceFromApi(rq: any) {
    return this.http.post<any>(`${this.apiUrl}/reservation`, rq);
  }

  getCoachInfo() {
    const token = localStorage.getItem("myTokenCoach");
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.data;
  }

  isCoachIn(): boolean {
  const token = localStorage.getItem("myTokenCoach");
  return !!token;
}

isSalleIn(): boolean {
  const token = localStorage.getItem("myTokenSalle");
  return !!token;
}

isClientIn(): boolean {
  const token = localStorage.getItem("myTokenClient");
  return !!token;
}

loginClient(client: Client) {
  return this.http.post<any>(this.loginClientUrl, client);
}

loginCoach(coach: Coach) {
  return this.http.post<any>(this.loginCoachUrl, coach);
}

loginSalleDeSport(salleDeSport: SalleDeSport) {
  return this.http.post<any>(this.loginSalleDeSportUrl, salleDeSport);
}

signInWithGoogle(idToken: string) {
  const params = new HttpParams().set('id_token', idToken);
  return this.http.post<any>(this.loginGoogleUrl, null, { params });
}

addclient(client: Client) {
  return this.http.post<any>(this.apiUrl + "/client", client);
}

addCoach(coach: Coach) {
  return this.http.post<any>(this.apiUrl + "/coach", coach);
}

addSalleDeSport(salleDeSport: SalleDeSport) {
  return this.http.post<any>(this.apiUrl + "/salleDeSport", salleDeSport);
}

// -------------------- CONTACT --------------------

addContact(contact: Contact) {
  return this.http.post<any>(this.apiUrl + '/contact', contact);
}

getContact() {
  return this.http.get<any>(this.apiUrl + '/contact');
}

onDeleteContact(id: number) {
  return this.http.delete<any>(`${this.apiUrl}/contact/${id}`);
}

// -------------------- DELETE CLIENT --------------------

onDeleteClient(id: number) {
  return this.http.delete<any>(`${this.apiUrl}/client/${id}`);
}

// -------------------- DELETE ADMIN --------------------

onDeleteAdmin(id: number) {
  return this.http.delete<any>(`${this.apiUrl}/admin/${id}`);
}

// ------------------ ADMIN ------------------

loginAdmin(admin: Admin) {
  return this.http.post<any>(this.apiUrl + '/admin/login', admin);
}

findAdminById(id: number) {
  return this.http.get<any>(`${this.apiUrl}/admin/${id}`);
}

updateAdmin(id: number, admin: Admin) {
  return this.http.put<any>(`${this.apiUrl}/admin/${id}`, admin);
}

// ------------------ SALLE DE SPORT ------------------

onDeleteSalleDeSport(id: number) {
  return this.http.delete<any>(`${this.apiUrl}/salle-de-sport/${id}`);
}

updateSalle(salle: SalleDeSport, id: number) {
  return this.http.put<any>(`${this.apiUrl}/salle-de-sport/${id}`, salle);
}

// ------------------ PACKS ------------------

getAllPackbySalleDeSportId() {
  return this.http.get<any>(this.apiUrl + '/pack/salle');
}

addPlanning(planning: any) {
  return this.http.post<any>(this.apiUrl + '/planning', planning);
}



onDeleteCoach(id : number){
    const url =`${this.apiUrl+"/coach"}/${id}`
    return this.http.delete(url )
}

// ------------------ PACK ------------------
deletePack(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/pack/${id}`);
}

updateClient(id:number,client: Client) {
    const url = `${this.apiUrl+"/client"}/${id}`
    return this.http.put<any>(url,client);
  }

  // -------------------- CATEGORY --------------------



addCategory(category: Category): Observable<Category> {
  return this.http.post<Category>(this.apiUrl + "/category", category);
}

// Dans crud.service.ts
getCoachById(id: number): Observable<Coach> {
  return this.http.get<Coach>(`${this.apiUrl}/coach/${id}`);
}

updateCoach(id: number, coach: Coach): Observable<any> {
  return this.http.put(`${this.apiUrl}/coachs/${id}`, coach);
}

// Dans votre CrudService
getSalleDeSportById(id: number): Observable<SalleDeSport> {
  return this.http.get<SalleDeSport>(`${this.apiUrl}/salles/${id}`);
}

updateSalleDeSport(id: number, salle: SalleDeSport): Observable<any> {
  return this.http.put(`${this.apiUrl}/salles/${id}`, salle);
}
}
