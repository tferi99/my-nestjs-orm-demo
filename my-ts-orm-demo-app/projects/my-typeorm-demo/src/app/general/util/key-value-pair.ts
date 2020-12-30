export class KeyValuePair<K, V> {
  key: K;
  value: V;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export function stringEnumToKeyValuePairArray(enumObject: any, withEmpty: boolean = false): KeyValuePair<string, string>[] {
  const arr: KeyValuePair<string, string>[] = [];

  if (withEmpty) {
    arr.push(new KeyValuePair<string, string>('', ''));
  }

  for (const n in enumObject) {
    if (typeof enumObject[n] === 'string') {
      const key = n;
      const value: string = enumObject[n];
      arr.push(new KeyValuePair<string, string>(key, value));
    }
  }
  return arr;
}

export function numberEnumToKeyValuePairArray(enumObject: any, withEmpty: boolean = false): KeyValuePair<string, number>[] {
  const arr: KeyValuePair<string, number>[] = [];

  if (withEmpty) {
    arr.push(new KeyValuePair<string, number>('', null));
  }

  for (const n in enumObject) {
    if (typeof enumObject[n] === 'number') {
      const key = n;
      const value: number = enumObject[n];
      arr.push(new KeyValuePair<string, number>(key, value));
    }
  }
  return arr;
}
