import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  _id: string;
  @Prop({ required: true, type: String })
  firstName: string;
  @Prop({ required: true, type: String })
  lastName: string;
  @Prop({ required: true, type: String })
  userName: string;
  @Prop({
    required: true,
    type: String,
    lowercase: true,
  })
  email: string;
  @Prop({ required: false, type: Date })
  birthDate: Date;
  @Prop({ required: true, type: String, minlength: 6 })
  password: string;
  @Prop({ type: String })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1, userName: 1 }, { unique: true });
