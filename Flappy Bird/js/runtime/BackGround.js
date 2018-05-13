//背景类
import {Sprite} from "../base/Sprite.js";

export class BackGround extends Sprite {
    constructor() {
        console.log('Background.constructor called...');
        const image = Sprite.getImage('background');
        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
            980, 1741,
        );
    }
}