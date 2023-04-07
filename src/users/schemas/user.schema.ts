import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  userName: string;
  @Prop()
  email: string;
  @Prop()
  age: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
