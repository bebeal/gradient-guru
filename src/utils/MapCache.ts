// Simple cache to store and reuse values based on a key.
const debug = 0;

export class MapCache<K, V> {
  cache = new Map<K, V>();

  size = this.cache.size;

  has(key: K): boolean {
    return this.cache.has(key);
  }

  get(key: K, factory?: () => V | Promise<V>): V {
    if (!this.cache.has(key)) {
      debug && console.log('cache miss', key);
      this.cache.set(key, factory?.() as V);
    }
    return this.cache.get(key)!;
  }

  set(key: K, value: V): V {
    this.cache.set(key, value);
    return this.cache.get(key)!;
  }
}
