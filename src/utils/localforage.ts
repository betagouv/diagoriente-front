import localforage from 'localforage';

export async function setItem(key: string, value: any) {
  try {
    await localforage.setItem(key, JSON.stringify(value));
  } catch (e) {
    throw e;
  }
}

export async function getItem(key: string) {
  try {
    const itemString = await localforage.getItem(key);
    const item = JSON.parse(itemString);
  } catch (e) {
    throw e;
  }
}
