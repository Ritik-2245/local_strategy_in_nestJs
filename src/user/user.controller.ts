import { Body, Controller, Post } from "@nestjs/common";
import { createUserDTO, resUserDTO, UserDbDTO } from "./user.schema";
import { UserService } from "./user.service";

@Controller('user')
export class UserConrtoller{
  constructor(private userService:UserService){}
  
  @Post('register')
  async Register(@Body() createDto:createUserDTO):Promise<resUserDTO|undefined>{
      try{
        console.log(createDto)
        const user= await this.userService.FindOne({username:createDto.username})
        // console.log(user)
    if(user!==null)
       return {username:createDto.username,email:createDto.email,name:createDto.name,msg:'user with same username already exist'}

    const saltHash=this.userService.generatePassword(createDto.password)
    
   
    const newUser:UserDbDTO={
      username:createDto.username,
      name:createDto.name,
      email:createDto.email,
      salt:saltHash.salt,
      hash:saltHash.hash
    }
    // console.log(newUser)
    
    return await this.userService.CreateUser(newUser)
  }catch(e){
    console.log(e)
  }
  }



}