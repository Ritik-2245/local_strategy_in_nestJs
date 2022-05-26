import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { LocalAuthGuard } from "src/auth/local.auth.guard";
import { createUserDTO, resUserDTO, UserDbDTO } from "src/user/user.schema";
import { UserService } from "src/user/user.service";

@Controller('auth')
export class Login_signUpController{
    constructor(private userService:UserService,private authService:AuthService){

    }

    @Post('register')
    async Register(@Body() createDto:createUserDTO):Promise<resUserDTO|undefined>{
        try{
          // console.log(createDto)
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
      
      const {username,name,email,msg,...rest}= await this.userService.CreateUser(newUser)
      return {
        username,name,email,msg
      }
    }catch(e){
      console.log(e)
    }
    }
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async Login(@Request() req){
        return req.user
    }

    @UseGuards(AuthenticatedGuard)
    @Get('protected')
    async protected(@Request() req){
        return req.user
    }

    @UseGuards(AuthenticatedGuard)
    @Get('logout')
    async Logout(@Request() req){
      req.session.destroy()
      return 'khatam tata bye bye gaya'
    }
  

}