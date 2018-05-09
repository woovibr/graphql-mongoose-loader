// @flow

import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

export const GroupSchema = new mongoose.Schema(
  {
    name: String,
    users: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    collection: 'Group',
  },
);

export default mongoose.model('Group', GroupSchema);
