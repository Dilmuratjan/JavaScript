//背景
import { Sprite } from "../base/Sprite.js";

export class BackGround extends Sprite {
    constructor(ctx, image) {
        console.log('Background.constructor called...');
        super(ctx, image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            414,
            736,
        );
    }
}