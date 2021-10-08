import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OnboardingStatus, UserType } from 'src/user/user.dto';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    type: UserType

    @Prop({ required: true })
    onboard: OnboardingStatus    
}

export const UserSchema = SchemaFactory.createForClass(User);