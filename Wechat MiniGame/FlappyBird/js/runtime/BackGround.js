//背景
import { Sprite } from "../base/Sprite.js";

export class BackGround extends Sprite {
    constructor() {
        console.log('Background.constructor called...');
        const image = Sprite.getImage('background');
        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
            414, 736,
        );
    }
}