
import { Planning } from "./Planning.Entity";
import { User } from "./User.Entity";

export class Reservation{  
  constructor(
      public id?:number,
      public  planning?:Planning,
      public User?:User
  ){}
}