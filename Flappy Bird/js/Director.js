//导演类
import {DataStore} from "./base/DataStore.js";

export class Director {
    constructor() {
        console.log('Director.constructor()');
        this.dataStore = DataStore.getInstance();
    }

    static getInstance() {
        console.log('getInstance()');
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    run() {
        console.log('Director.run()');
        const backgroundSprite = this.dataStore.get('background');
        backgroundSprite.draw()
    }
}