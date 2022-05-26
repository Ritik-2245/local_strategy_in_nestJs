import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { resUserDTO, UserDbDTO, UserDocument } from "./user.schema";
import * as crypto from 'crypto'

@Injectable()
export class UserService{
    constructor(@InjectModel('user','user') private userModel:Model<UserDocument>,@InjectConnection('user') private connection:Connection){}
    
    async CreateUser(userDto:UserDbDTO):Promise<resUserDTO|undefined>{
         
        try{
   const user=new this.userModel(userDto)
//    console.log(user,'user')
  const res=await user.save()
//   console.log(res,'res')
  return res
        }catch(e){
            // console.log(e)
         throw new InternalServerErrorException(e)
        }
    }

    generatePassword(ps:string):{salt:string,hash:string}{
   const salt=crypto.randomBytes(32).toString('hex')
   const hash=crypto.pbkdf2Sync(ps,salt,31322,64,'sha512').toString('hex')
   return {salt,hash} 
    }
    
    validatePassword(salt:string,hash:string,ps:string):boolean{
   const createdhash=crypto.pbkdf2Sync(ps,salt,31322,64,'sha512').toString('hex')
   return hash===createdhash
    }
  
    async FindOne(search:any):Promise<UserDbDTO|undefined>{
     try{
   const user=await this.userModel.findOne(search).exec()
        return user
     }
     catch(e){
         throw new InternalServerErrorException(e)
     }
    }
}