export class SavePack {
  constructor(
      public id?: number,
      public nom?: string,
      public prix?: string,
      public image?: string,
      public description?: string,
      public idUser?: number,        // ✔ remplace idSalleDeSport
      public idCategory?: number
  ) {}
}
