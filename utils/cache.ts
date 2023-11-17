
export class MapCache<T extends object, K> {
	/** The map of items to their cached values. */
	cache = new WeakMap<T, K>()

  constructor() {
    this.cache = new WeakMap();
  }

	/**
	 * Get the cached value for a given record. If the record is not present in the map, the callback
	 * will be used to create the value (with the result being stored in the cache for next time).
	 *
	 * @param item - The item to get.
	 * @param cb - The callback to use to create the value when a cached value is not found.
	 */
	get<P extends T>(item: P, cb: (item: P) => K) {
    if (!this.cache.has(item)) {
      this.cache.set(item, cb(item));
    }

		return this.cache.get(item)!
	}
}
