import { Category } from "./Category.Entity";
import { SalleDeSport } from "./SalleDeSport.Entity";

export class Pack{
  constructor(
      public id?:number,
      public nom?:string,
      public prix?:string,
      public image?:string,
      public description?:string,
      public salleDeSport?:SalleDeSport,
      public category?:Category
  ){}
}