type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;
  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }
  add<T>(key: string, val: T): void {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val,
    };
    this.#cache.set(key, entry);
  }
  get<T>(key: string) {
    const entry: CacheEntry<T> | undefined = this.#cache.get(key);
    return entry;
  }
  #reap() {
    const newMap = new Map<string, CacheEntry<any>>();
    for (const [key, entry] of this.#cache) {
      if (Date.now() - entry.createdAt < this.#interval) {
        newMap.set(key, entry);
      }
    }
    this.#cache = newMap
  }
  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }
  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
