// @flow

import mongoose from 'mongoose';

export const GroupSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.model('Group', GroupSchema);
