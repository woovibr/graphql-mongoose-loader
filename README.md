# GraphQL Mongoose Loader [![CircleCI](https://circleci.com/gh/entria/graphql-mongoose-loader/tree/master.svg?style=svg)](https://circleci.com/gh/entria/graphql-mongoose-loader/tree/master)

## Install
```
npm i @entria/graphql-mongoose-loader --save
yarn add @entria/graphql-mongoose-loader
```

## Mongoose Dataloader Batch

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

export const loadUsers = async (context: GraphQLContext, args: ConnectionArguments) => {
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

## Connection from Mongoose Aggregate

Create a connection from mongoose aggregate

```jsx
import { connectionFromMongoAggregate } from '@entria/graphql-mongoose-loader';

export const loadUsersThatHaveGroup = async (context: GraphQLContext, args: ConnectionArguments) => {
  const aggregate = GroupModel.aggregate([
    {
      $lookup: {
        from: 'User',
        localField: 'users',
        foreignField: '_id',
        as: 'users',
      },
    },
    {
      // remove empty groups
      $match: { users: { $exists: true, $ne: [] } },
    },
    {
      // promote each user to a new document
      $unwind: '$users',
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $replaceRoot: { newRoot: '$users' },
    },
  ]);

  return connectionFromMongoAggregate({
    aggregate,
    context,
    args,
    loader: load,
  });
};
```
