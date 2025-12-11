import { Category } from "./Category.Entity";
import { User } from "./User.Entity";

export class Pack {
  constructor(
      public id?: number,
      public nom?: string,
      public prix?: string,
      public image?: string,
      public description?: string,
      public user?: User,            // ✔ remplacé SalleDeSport par User
      public category?: Category     // ✔ garde category
  ) {}
}
