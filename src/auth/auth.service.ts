import { Injectable, NotAcceptableException } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService{
  
    constructor(private userService:UserService){

    }

    async ValidateUser(username:string,password:string):Promise<any>{
  const user= await this.userService.FindOne({username});
if(!user)
   throw new NotAcceptableException('user not found')
    
   const a:boolean=this.userService.validatePassword(user.salt,user.hash,password)

   if(a)
   return user
   else
   throw new NotAcceptableException('wrong password')     
    }

}