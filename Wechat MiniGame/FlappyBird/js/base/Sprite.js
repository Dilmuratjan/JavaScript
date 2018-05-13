//精灵的基类，负责初始化精灵加载的资源和大小以及位置

export class Sprite {

    constructor(ctx = null,//
        img = null,
        srcX = 0,
        srcY = 0,
        srcW = 0,
        srcH = 0,
        x = 0,
        y = 0,
        width = 0,
        height = 0, ) {
        console.log('Sprite.constructor() called...');
        this.ctx = ctx;
        this.img = img;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcW = srcW;
        this.srcH = srcH;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        //window.innerWidth,
        //window.innerHeight,
        //image.width,
        //image.height,
    }

    /**
     * img 传入Image对象
     * scX 要剪裁的起始X坐标
     * scY 要剪裁的起始Y坐标
     * scW 剪裁的宽度
     * scH 剪裁的高度
     * x 放置的x坐标
     * y 放置的y坐标
     * width 要使用的宽度
     * height 要使用的高度
     */
    draw() {
        console.log('Sprite.draw() called...');
        this.ctx.drawImage(
            this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.x,
            this.y,
            this.width,
            this.height,
        );
    }
}