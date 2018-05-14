//变量缓存器
export class DataStore {
    static getInstance() {
        console.log('DataStore.getInstance()');
        if (!DataStore.instance) {
            DataStore.instance = new DataStore()
        }
        return DataStore.instance
    }

    constructor() {
        console.log('DataStore.constructor()');
        this.map = new Map();
    }

    put(key, value) {
        console.log('DataStore.put()');
        if (typeof value === 'function') {
            value = new value();
        }
        this.map.set(key, value);
        return this;
    }

    get(key) {
        console.log('DataStore.get()');
        return this.map.get(key);
    }

    destory() {
        console.log('DataStore.destory()');
        for (let value of this.map.values()) {
            value = null;
        }
    }
}