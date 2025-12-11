
import { User } from "./User.Entity";


export class Planning{  
    constructor(
        public id?:number,
        public nom?:string,
        public date?:Date,
        public debut?:string,
        public fin?:string,
        public user?:User,
        
    ){}
}
