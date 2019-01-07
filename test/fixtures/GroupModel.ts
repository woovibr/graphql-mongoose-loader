import mongoose, { Document, Model, Types } from 'mongoose';

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

export interface IGroup extends Document {
  name: string,
  users: Types.ObjectId[]
}

const GroupModel: Model<IGroup> = mongoose.model('Group', GroupSchema);

export default GroupModel;
