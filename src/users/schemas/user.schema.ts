import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User extends Document {
  _id: string;
  @Prop({ required: true, type: String })
  firstName: string;
  @Prop({ required: true, type: String })
  lastName: string;
  @Prop({ required: true, type: String })
  userName: string;
  @Prop({ required: true, type: String, lowercase: true, index: true })
  email: string;
  @Prop({ required: false, type: String })
  birthDate: string;
  @Prop({ required: true, type: String, minlength: 6 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
