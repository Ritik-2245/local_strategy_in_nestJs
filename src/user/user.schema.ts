import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail } from "class-validator";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    name: string;

    @Prop({ unique: true })
    username:string;

    @IsEmail()
    @Prop({ unique: true })
    email: string;

    @Prop()
    salt: string;

    @Prop()
    hash: string;

    @Prop({ default: () => Date.now(), immutable: false })
    createAt: Date
}


export const UserSchema = SchemaFactory.createForClass(User)

export interface createUserDTO {
    name: string,
    email: string,
    username: string,
    password: string
}

export interface UserDbDTO{
    name: string,
    email: string,
    username: string,
    salt:string,
    hash:string

}
export interface resUserDTO{
    name: string,
    email: string,
    username: string,
    msg?:string
}