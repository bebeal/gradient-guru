
// Simple cache to store and reuse values based on a key.
export class MapCache<K, V> {
  private cache = new Map<K, V>();

  get(key: K, factory: () => V): V {
    if (!this.cache.has(key)) {
      this.cache.set(key, factory());
    }
    return this.cache.get(key)!;
  }
}
