import { Module } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { url } from 'inspector';
import { Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoginSignUpModule } from './login_sign-up/login_sign-up.module';

@Module({
  imports: [AuthModule, UserModule,MongooseModule.forRoot('mongodb://localhost/project',{connectionName:'user'}), LoginSignUpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

   constructor(@InjectConnection('user') private connection:Connection){
     if(connection)
     console.log('connected')
   } 
}
