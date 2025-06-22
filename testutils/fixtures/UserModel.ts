import mongoose, { Document, Model } from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: String,
    userName: String
  },
  {
    collection: 'User',
  },
);

export interface IUser {
  name: string,
  userName: string
}

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
