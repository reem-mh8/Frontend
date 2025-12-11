export class SalleDeSport{
  prenom: string;
  constructor(
    public id?:number,
      public nom?:string,
      public adresse?:string,
      public email?:string,
      public mp?:string,
      public mobile?:string,
      public etat?:boolean,
  ){}
}