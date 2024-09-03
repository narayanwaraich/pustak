import { get, set } from 'idb-keyval';

export const getIDBValueOf = async (key: string) => {
  try {
    const value = await get(key);
    return value;
  } catch (err) {
    console.error(`Error getting the value of '${key}':`, err);
  }
};

export const setIDBValueOf = async (key: string, value: unknown) => {
  try {
    console.log(key);
    console.log(value);
    console.log(await set(key, value));
    await set(key, value);
  } catch (err) {
    console.log(`Error storing the value of '${key}':`, err);
  }
};
