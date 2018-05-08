// @flow

import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

export const UserSchema = new mongoose.Schema({
  name: String,
  group: {
    type: ObjectId,
    ref: 'Group',
  },
});

export default mongoose.model('User', UserSchema);
