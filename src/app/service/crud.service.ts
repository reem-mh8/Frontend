import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../user/Entity/User.Entity';
import { Pack } from '../user/Entity/Pack.Entity';
import { Category } from '../user/Entity/Category.Entity';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseURL = 'http://localhost:8081/user';
  private packURL = 'http://localhost:8081/pack';
  private categoryURL = 'http://localhost:8081/category';
  private reservationURL = 'http://localhost:8081/reservation';
  private planningURL = 'http://localhost:8081/planning';
  private paiementURL = 'http://localhost:8081/paiement';

  constructor(private http: HttpClient) {}

  // ======================================================
  // ================   AUTHENTIFICATION   ================
  // ======================================================

  register(user: any): Observable<any> {
    return this.http.post(this.baseURL, user);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, credentials);
  }

  // 🔥 TOKEN + USER CONNECTÉ
  setCurrentUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    if (user.token) {
      localStorage.setItem('auth_token', user.token);
    }
  }

  getCurrentUser(): any {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }

  getCurrentUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  getCurrentUserId(): number | null {
    const user = this.getCurrentUser();
    return user ? user.id : null;
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
  }

  // ======================================================
  // ================   ROLES & PERMISSIONS   =============
  // ======================================================

  isUserLoggedIn(): boolean {
    return this.getCurrentUserRole() !== null;
  }

  isAdmin(): boolean {
    const role = this.getCurrentUserRole();
    return role === 'admin' || role === 'ADMIN';
  }

  isClient(): boolean {
    const role = this.getCurrentUserRole();
    return role === 'client' || role === 'CLIENT';
  }

  isCoach(): boolean {
    const role = this.getCurrentUserRole();
    return role === 'coach' || role === 'COACH';
  }

  isSalle(): boolean {
    const role = this.getCurrentUserRole();
    return role === 'salle de sport' || role === 'SALLE_DE_SPORT' || role === 'SALLE_SPORT';
  }

  //  Nouvelle méthode demandée : redirection selon rôle
  redirectByRole(): string {
    const role = this.getCurrentUserRole();
    
    // Normaliser le rôle
    const normalizedRole = role ? role.toLowerCase() : '';
    
    if (normalizedRole === 'admin') {
      return '/admin/home';  // module Admin
    }
    if (normalizedRole === 'client' || normalizedRole === 'coach' || 
        normalizedRole === 'salle de sport' || normalizedRole === 'salle_de_sport') {
      return '/user/home';   // module User
    }
    return '/auth/login';
  }

  // ======================================================
  // ======================= USERS =========================
  // ======================================================

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`);
  }

  getClients(): Observable<User[]> {
    return this.getAllUsers().pipe(
      map(users => users.filter(u => u.role === 'client'))
    );
  }

  getCoaches(): Observable<User[]> {
    return this.getAllUsers().pipe(
      map(users => users.filter(u => u.role === 'coach'))
    );
  }

  getSallesDeSport(): Observable<User[]> {
    return this.getAllUsers().pipe(
      map(users => users.filter(u => u.role === 'salle de sport'))
    );
  }

  getUsersByRole(role: string): Observable<User[]> {
    return this.getAllUsers().pipe(
      map(users => users.filter(u => u.role === role))
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  // ======================================================
  // ======================= PACKS =========================
  // ======================================================

  addpack(pack: Pack): Observable<any> {
    return this.http.post(`${this.packURL}`, pack);
  }

  getAllPacks(): Observable<Pack[]> {
    return this.http.get<Pack[]>(`${this.packURL}`);
  }

  getPackById(id: number): Observable<Pack> {
    return this.http.get<Pack>(`${this.packURL}/${id}`);
  }

  updatePack(id: number, pack: Pack): Observable<any> {
    return this.http.put(`${this.packURL}/${id}`, pack);
  }

  deletePack(id: number): Observable<any> {
    return this.http.delete(`${this.packURL}/${id}`);
  }

  getAllPackbySalleDeSportId(userId: number): Observable<Pack[]> {
    return this.http.get<Pack[]>(`${this.packURL}/get-all-by-id-User/${userId}`);
  }

  // ======================================================
  // ==================== RESERVATIONS =====================
  // ======================================================

  reserverFromApi(data: any): Observable<any> {
    return this.http.post(`${this.reservationURL}`, data);
  }

  getAllReservations(): Observable<any> {
    return this.http.get(`${this.reservationURL}`);
  }

  getReservationById(id: number): Observable<any> {
    return this.http.get(`${this.reservationURL}/${id}`);
  }

  getReservationsByClientId(clientId: number): Observable<any> {
    return this.http.get(`${this.reservationURL}/client/${clientId}`);
  }

  getReservationsByCoachId(coachId: number): Observable<any> {
    return this.http.get(`${this.reservationURL}/coach/${coachId}`);
  }

  updateReservation(id: number, data: any): Observable<any> {
    return this.http.put(`${this.reservationURL}/${id}`, data);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.reservationURL}/${id}`);
  }

  // ======================================================
  // ====================== CATEGORIES =====================
  // ======================================================

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoryURL}`);
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post(`${this.categoryURL}`, category);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.categoryURL}/${id}`);
  }

  updateCategory(id: number, category: Category): Observable<any> {
    return this.http.put(`${this.categoryURL}/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.categoryURL}/${id}`);
  }

  // ======================================================
  // ======================= PLANNING ======================
  // ======================================================

  getAllPlannings(): Observable<any> {
    return this.http.get(`${this.planningURL}`);
  }

  getPlanningById(id: number): Observable<any> {
    return this.http.get(`${this.planningURL}/${id}`);
  }

  getPlanningByCoachId(coachId: number): Observable<any> {
    return this.http.get(`${this.planningURL}/coach/${coachId}`);
  }

  addPlanning(data: any): Observable<any> {
    return this.http.post(`${this.planningURL}`, data);
  }

  updatePlanning(id: number, data: any): Observable<any> {
    return this.http.put(`${this.planningURL}/${id}`, data);
  }

  deletePlanning(id: number): Observable<any> {
    return this.http.delete(`${this.planningURL}/${id}`);
  }

  // ======================================================
  // ======================== PAYMENT ======================
  // ======================================================

  processPayment(data: any): Observable<any> {
    return this.http.post(`${this.paiementURL}`, data);
  }

  getPaymentByReservationId(reservationId: number): Observable<any> {
    return this.http.get(`${this.paiementURL}/reservation/${reservationId}`);
  }

  // ======================================================
  // ===================== PERMISSIONS =====================
  // ======================================================

  canDeleteUser(targetUserRole: string): boolean {
    const current = this.getCurrentUserRole();

    if (current === 'coach' && targetUserRole === 'client') return true;
    if (current === 'salle de sport' && (targetUserRole === 'client' || targetUserRole === 'coach')) return true;
    if (current === 'admin') return true;

    return false;
  }

  canAccessClientsPage(): boolean {
    const r = this.getCurrentUserRole();
    return r === 'coach' || r === 'salle de sport';
  }

  canAccessCoachesPage(): boolean {
    const r = this.getCurrentUserRole();
    return r === 'client' || r === 'salle de sport';
  }

  canAccessPacksPage(): boolean {
    const r = this.getCurrentUserRole();
    return r === 'client' || r === 'salle de sport';
  }

  canAccessMyPacksPage(): boolean {
    return this.getCurrentUserRole() === 'salle de sport';
  }

  getClientInfo(): any {
    return this.getCurrentUser();
  }
}