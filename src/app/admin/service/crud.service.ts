import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../Entity/Admin.Entity';
import { Observable } from 'rxjs';
import { Client } from '../Entity/Client.Entity';
import { Coach } from '../Entity/Coach.Entity';
import { SalleDeSport } from '../Entity/SalleDeSport.Entity'
import { Pack } from '../Entity/Pack.Entity';
import { Contact } from '../Entity/Contact.Entity';
import { Category } from '../Entity/Category.Entity';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  apiUrl=' http://localhost:8081/api'
  loginUserUrl='http://localhost:8081/api/admin/login'
  
  

  constructor(private http:HttpClient) { }

  //crud pour l'admin
  addadmin(admin:Admin){
    return this.http.post<any>(this.apiUrl+"/admin", admin);
  }
  getAdmin(): Observable<Admin[]>{
    return this.http.get<Admin[]>(this.apiUrl +"/admin");
  }

  onDeleteAdmin(id : number){
    const url =`${this.apiUrl+"/admin"}/${id}`
    return this.http.delete(url )
  }
  loginAdmin(admin:Admin){
    return this.http.post<any>(this.loginUserUrl, admin);
  }
  findAdminById(id : number): Observable<Admin> {
    const url = `${this.apiUrl + "/admin"}/${id}`;
    return this.http.get<Admin>(url)
  }
  updateAdmin(id:number,admin: Admin) {
    const url = `${this.apiUrl+"/admin"}/${id}`
    return this.http.put<any>(url,admin);
  }


  //crud pour client
  getClient(): Observable<Client[]>{
    return this.http.get<Client[]>(this.apiUrl +"/client");
  }

  onDeleteClient(id : number){
    const url =`${this.apiUrl+"/client"}/${id}`
    return this.http.delete(url )
  }

  findClientById(id : number): Observable<Client> {
    const url = `${this.apiUrl + "/client"}/${id}`;
    return this.http.get<Client>(url)
  }
  updateClient(id:number,client: Client) {
    const url = `${this.apiUrl+"/client"}/${id}`
    return this.http.put<any>(url,client);
  }


  //crud pour coach
getCoach(): Observable<Coach[]>{
    return this.http.get<Coach[]>(this.apiUrl +"/coach");
}

onDeleteCoach(id : number){
    const url =`${this.apiUrl+"/coach"}/${id}`
    return this.http.delete(url )
}

findCoachById(id : number): Observable<Coach> {
    const url = `${this.apiUrl + "/coach"}/${id}`;
    return this.http.get<Coach>(url)
}
updateCoach(id:number, coach: Coach) {
    const url = `${this.apiUrl+"/coach"}/${id}`
    return this.http.put<any>(url, coach);
}


//crud pour salle de sport 
getSalleDeSport(): Observable<SalleDeSport[]> {
  return this.http.get<SalleDeSport[]>(this.apiUrl + "/salleDeSport");
}

onDeleteSalleDeSport(id: number) {
  const url = `${this.apiUrl + "/salleDeSport"}/${id}`;
  return this.http.delete(url);
}



findSalleDeSportById(id: number): Observable<SalleDeSport> {
  const url = `${this.apiUrl + "/salleDeSport"}/${id}`;
  return this.http.get<SalleDeSport>(url);
}

updateSalleDeSport(id: number, salleDeSport: SalleDeSport) {
  const url = `${this.apiUrl + "/salleDeSport"}/${id}`;
  return this.http.put<any>(url, salleDeSport);
}

updateSalle(salle: SalleDeSport,id:number) {
  const url = `${this.apiUrl+"/salleDeSport"}/${id}`
  return this.http.put<any>(url,salle);
}

/*getUserInfo()
 {
   var token = localStorage.getItem("myToken");
   const helper = new JwtHelperService();

   const decodedToken = helper.decodeToken(token);
    
   // Other functions
   const expirationDate = helper.getTokenExpirationDate(token);
   const isExpired = helper.isTokenExpired(token);
   //var decoded:any = jwt_decode(token);
   var decoded:any
   return decodedToken?.data
 }   */

// crud pour ListePack

getPack(): Observable<Pack[]> {
  return this.http.get<Pack[]>(this.apiUrl + "/pack");
}

onDeletePack(id: number) {
  const url = `${this.apiUrl + "/pack"}/${id}`;
  return this.http.delete(url);
}

//pour contact
getContact(): Observable<Contact[]> {
  return this.http.get<Contact[]>(this.apiUrl + "/contact");
}

onDeleteContact(id: number) {
  const url = `${this.apiUrl}/contact/${id}`;
  return this.http.delete(url);
}

// Ajout des utilisateurs

addclient(client: Client) {
  return this.http.post<any>(this.apiUrl + "/client", client);
}

addCoach(coach: Coach) {
  return this.http.post<any>(this.apiUrl + "/coach", coach);
}

addSalleDeSport(salleDeSport: SalleDeSport) {
  return this.http.post<any>(this.apiUrl + "/salleDeSport", salleDeSport);
}

// CRUD Category
getCategories(): Observable<Category[]> {
  return this.http.get<Category[]>(`${this.apiUrl}/category`);
}

addCategory(category: Category): Observable<any> {
  return this.http.post(`${this.apiUrl}/category`, category);
}

deleteCategory(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/category/${id}`);
}

updateCategory(category: Category, id: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/category/${id}`, category);
}


 // Ajouter un pack
  addpack(pack: Pack): Observable<Pack> {
    return this.http.post<Pack>(`${this.apiUrl}/pack`, pack);
  }


}