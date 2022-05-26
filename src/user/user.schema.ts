import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsString, Matches, MinLength, Validate } from "class-validator";
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

export class createUserDTO {
    name: string;
    email: string;
    username: string;

    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:'password should contain lower,upper,special character and number'})
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