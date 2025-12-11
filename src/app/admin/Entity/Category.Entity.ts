export class Category {
  etat: boolean = true; // ou false selon ton besoin
  dateCreation: any = new Date(); // ou null si tu veux initialiser plus tard

  constructor(
      public id?: number,
      public nom?: string,
  ) {}
}
