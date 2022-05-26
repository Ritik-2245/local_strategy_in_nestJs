import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { Login_signUpController } from './login_signUp.controller';

@Module({imports:[AuthModule,UserModule]
  ,controllers:[Login_signUpController]
})
export class LoginSignUpModule {}
