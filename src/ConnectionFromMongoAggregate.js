// @flow
import { calculateOffsets, getPageInfo, offsetToCursor } from './ConnectionFromMongoCursor';

import type { ConnectionOptions } from './ConnectionFromMongoCursor';

const cloneAggregate = aggregate => aggregate._model.aggregate(aggregate.pipeline());

const connectionFromMongoAggregate = async ({
  aggregate,
  context,
  args = {},
  loader,
}: ConnectionOptions) => {
  // https://github.com/Automattic/mongoose/blob/367261e6c83e7e367cf0d3fbd2edea4c64bf1ee2/lib/aggregate.js#L46
  const clonedAggregate = cloneAggregate(aggregate);

  const resultCount = await cloneAggregate(aggregate).count('total');
  const totalCount = resultCount.length ? resultCount[0].total : 0;

  const {
    first,
    last,
    before,
    after,
    skip,
    limit,
    beforeOffset,
    afterOffset,
    startOffset,
    endOffset,
    startCursorOffset,
    endCursorOffset,
  } = calculateOffsets({ args, totalCount });

  // If supplied slice is too large, trim it down before mapping over it.
  clonedAggregate.skip(skip);
  clonedAggregate.limit(limit);

  //avoid large objects retrieval from collection
  const slice = await clonedAggregate.project('_id');

  const edges = slice.map((value, index) => ({
    cursor: offsetToCursor(startOffset + index),
    node: loader(context, value._id),
  }));

  return {
    edges,
    count: totalCount,
    endCursorOffset,
    startCursorOffset,
    pageInfo: getPageInfo({
      edges,
      before,
      after,
      first,
      last,
      afterOffset,
      beforeOffset,
      startOffset,
      endOffset,
      totalCount,
      startCursorOffset,
      endCursorOffset,
    }),
  };
};

export default connectionFromMongoAggregate;
