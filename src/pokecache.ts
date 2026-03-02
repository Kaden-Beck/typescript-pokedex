export type CacheEntry<T> = {
    createdAt: number,
    val: T
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    
    add<T>(key: string, val: T) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val
        })
    }

    get<T>(key: string): T | undefined {
        let result = this.#cache.get(key);
        return result?.val;
    } 

    #reap(){
        const expiration = Date.now() - this.#interval;
        
        for (const entry of this.#cache) {
            if (entry[1].createdAt < expiration) {
                this.#cache.delete(entry[0])
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval)
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined
    }
}