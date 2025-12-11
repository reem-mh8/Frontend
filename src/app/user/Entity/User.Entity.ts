export class User {
  id?: number | null;
  nom!: string;
  prenom?: string | null;
  adresse?: string | null;
  email!: string;
  mp!: string;
  mobile?: string | null;
  age?: number | null;
  role!: string;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
