//导演类
import {DataStore} from "./base/DataStore.js";

export class Director {
    constructor() {
        console.log('Director.constructor()');
        this.dataStore = DataStore.getInstance();
        this.movespeed = 2;
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
        this.dataStore.get('background').draw();
        this.dataStore.get('land').draw();
        requestAnimationFrame(()=>this.run());
    }
}