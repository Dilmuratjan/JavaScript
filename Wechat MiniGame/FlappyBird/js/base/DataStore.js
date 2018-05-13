//变量缓存器，方便我们在不同的类中访问和修改变量
export class DataStore {
    static getInstance() {
        console.log('DataStore.getInstance() called...');
        if (!DataStore.instance) {
            DataStore.instance = new DataStore()
        }
        return DataStore.instance
    }

    constructor() {
        console.log('DataStore.constructor() called...');
        this.map = new Map();
    }

    put(key, value) {
        console.log('DataStore.put() called...');
        if (typeof value === 'function') {
            value = new value();
        }
        this.map.set(key, value);
        return this;
    }

    get(key) {
        console.log('DataStore.get() called...');
        return this.map.get(key);
    }

    destory() {
        console.log('DataStore.destory() called...');
        for (let value of this.map.values()) {
            value = null;
        }
    }
}