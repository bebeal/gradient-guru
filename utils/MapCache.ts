
// Simple weakmap cache for objects
export class MapCache<T extends object, K> {
	cache = new WeakMap<T, K>()

  constructor() {
    this.cache = new WeakMap();
  }

	get<P extends T>(item: P, cb: (item: P) => K) {
    if (!this.cache.has(item)) {
      this.cache.set(item, cb(item));
    }

		return this.cache.get(item)!
	}
}
