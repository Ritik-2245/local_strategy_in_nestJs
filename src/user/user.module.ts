import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserConrtoller } from './user.controller';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'user',schema:UserSchema}],'user')],
  controllers:[UserConrtoller],
  providers:[UserService]
})
export class UserModule {}
