import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'

var mongoStore=require('connect-mongo')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret:'i am ritik kumar',
    resave:false,
    saveUninitialized:false,
    store: mongoStore.create({mongoUrl:'mongodb://localhost/project'})
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000);
}
bootstrap();
