# GraphQL Mongoose Loader

## Install
```
npm i @entria/graphql-mongoose-loader
```

## Batch

Add batch to your GraphQL resolvers/loaders

Define a mongoose schema for your model
```jsx
import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      hidden: true,
    },
  },
  {
    collection: 'User',
  },
);

export default mongoose.model('User', Schema);
```

Create a Dataloader for it

```jsx
import { mongooseLoader } from '@entria/graphql-mongoose-loader';
import UserModel from './User';

export const getLoader = () => new DataLoader(ids => mongooseLoader(UserModel, ids));
```

## Connection from Mongoose Cursor

Create a connection from mongoose cursor

```jsx
import { connectionFromMongoCursor } from '@entria/graphql-mongoose-loader';

export const loadUsers = async (context: GraphQLContext, args: ConnectionArgs) => {
  const where = args.search
    ? {
        name: {
          $regex: new RegExp(`^${args.search}`, 'ig'),
        },
      }
    : {};
  const users = UserModel.find(where, { _id: 1 }).sort({
    createdAt: -1,
  });

  return connectionFromMongoCursor({
    cursor: users,
    context,
    args,
    loader: load,
  });
};
```
