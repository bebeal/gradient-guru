
// Simple weakmap cache for objects
export class MapCache<K, V> {
  private objectCache = new WeakMap<object, V>();
  private primitiveCache = new Map<string | number | symbol, V>();

  constructor() {
    this.objectCache = new WeakMap();
    this.primitiveCache = new Map();
  }

  get(item: K, cb: (item: K) => V): V {
    if (typeof item === 'object' && item !== null) {
        // Handling for objects
        if (!this.objectCache.has(item)) {
            this.objectCache.set(item, cb(item));
        }
        return this.objectCache.get(item)!;
    } else if (typeof item === 'string' || typeof item === 'number' || typeof item === 'symbol') {
        // Handling for primitives
        if (!this.primitiveCache.has(item)) {
            this.primitiveCache.set(item, cb(item));
        }
        return this.primitiveCache.get(item)!;
    } else {
        throw new Error('Unsupported key type');
    }
  }
}
