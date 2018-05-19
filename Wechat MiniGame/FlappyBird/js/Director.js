//导演类
import { DataStore } from "./base/DataStore.js";

export class Director {
    constructor() {
        console.log('Director.constructor() called...');
        this.dataStore = DataStore.getInstance();
    }

    static getInstance() {
        console.log('getInstance() called...')
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    run() {
        console.log('Director.run() called...');
        this.dataStore.get('background').draw();
        this.dataStore.get('land').draw();
        requestAnimationFrame(()=>this.run);
    }
}