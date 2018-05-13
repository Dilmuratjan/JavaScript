//导演类
import {DataStore} from "./base/DataStore.js";

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
        const backgroundSprite = this.dataStore.get('background')
        backgroundSprite.draw()
    }
}