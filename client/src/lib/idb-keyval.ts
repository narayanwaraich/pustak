import { get, set } from 'idb-keyval';
import { queryOptions } from '@tanstack/react-query';

export const getIDBValueOf = async (key: string) => {
  try {
    const value = await get(key);
    return value ?? null;
  } catch (err) {
    console.error(`Error getting the value of '${key}':`, err);
  }
};

export const setIDBValueOf = async (key: string, value: unknown) => {
  try {
    await set(key, value);
  } catch (err) {
    console.log(`Error storing the value of '${key}':`, err);
  }
};

export const getIDBQueryOptions = (key: string) => {
  return queryOptions({
    queryKey: [key],
    queryFn: () => getIDBValueOf(key),
  });
};
