/**
 * Helper to batch queries on mongoose
 */

function indexResults(results: any[], indexField: string, cacheKey = cacheKeyFn) {
  const indexedResults = new Map();
  results.forEach(res => {
    indexedResults.set(cacheKey(res[indexField]), res);
  });
  return indexedResults;
}

function normalizeResults(keys : ReadonlyArray<string>, indexField: string, cacheKey = cacheKeyFn) {
  return (results: any[]) => {
    const indexedResults = indexResults(results, indexField, cacheKey);
    return keys.map(
      val => indexedResults.get(cacheKey(val)) || new Error(`Key not found : ${val}`),
    );
  };
}

export const cacheKeyFn = (key: string) : string => key.toString();

type MongooseProjection = object | string;
type Mongoose$Document = {
  find(criteria?: object, projection?: MongooseProjection, options?: object): any,
};

export default async function mongooseLoader(
  model: Mongoose$Document,
  ids: ReadonlyArray<string>,
) {
  const results = await model.find({ _id: { $in: ids } });

  return normalizeResults(ids, '_id', cacheKeyFn)(results);
}
