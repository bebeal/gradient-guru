// Determines if an object is empty, false for anything else.
export const isEmptyObject = (obj?: object) => (obj ? Object.keys(obj)?.length === 0 : false);

// Determines if a value is an empty collection (object, array, string, map, set), false for anything else.
export const isEmpty = (value: any) => {
  if (value == null) {
    return true;
  }
  if (Array.isArray(value) || typeof value === 'string') {
    return value.length === 0;
  }
  if (Object.prototype.toString.call(value) === '[object Map]' || Object.prototype.toString.call(value) === '[object Set]') {
    return value.size === 0;
  }
  if (Object.prototype.toString.call(value) === '[object Object]') {
    return isEmptyObject(value);
  }
  return false;
};

export const arrayToObject = (arr: string[], value: any = true): { [key: string]: boolean } => {
  const result = arr.reduce((obj, item) => ({ ...obj, [item]: value }), {});
  return result;
};

// filter out keys from object
export const omit = (obj: Record<any, any>, keys: any[] = []) => {
  return Object.keys(obj).reduce((acc: any, key: any) => {
    if (!keys.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

// filter obj to only include keys
export const pick = (obj: Record<any, any>, keys: any[] = []) => {
  return Object.keys(obj).reduce((acc: any, key: any) => {
    if (keys.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

// sort object by
// 1. type (boolean, number, string, object)
// 2. key (lexicographically)
// 3. key length (ascending)
export const sortObject = (object: any, typesOverride?: any, order: string[] = ['readonly', 'boolean', 'number', 'string', 'object']) => {
  return Object.fromEntries(
    Object.entries(object).sort(([keyA, valueA], [keyB, valueB]) => {
      const typeIndexA = order.indexOf(typesOverride?.[keyA] ?? typeof valueA);
      const typeIndexB = order.indexOf(typesOverride?.[keyB] ?? typeof valueB);

      if (typeIndexA === typeIndexB) {
        const lexicographicOrder = keyA.localeCompare(keyB);
        if (lexicographicOrder === 0) {
          return keyA.length - keyB.length;
        }
        return lexicographicOrder;
      }

      return typeIndexA - typeIndexB;
    }),
  );
};
