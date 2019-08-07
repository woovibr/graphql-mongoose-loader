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
  keys: ReadonlyArray<string>,
  lean: boolean = true,
  keyField: string = '_id'
) {
  const results = lean ? await model.find({ [keyField]: { $in: keys } }).lean() : await model.find({ [keyField]: { $in: keys } });

  return normalizeResults(keys, keyField, cacheKeyFn)(results);
}
