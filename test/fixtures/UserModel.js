// @flow

import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    collection: 'User',
  },
);

export default mongoose.model('User', UserSchema);
