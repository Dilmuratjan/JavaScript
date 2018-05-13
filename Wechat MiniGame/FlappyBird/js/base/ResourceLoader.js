//资源文件加载器，确保canvas在图片资源加载完成后才进行渲染
import { Resources } from "./Resources.js";

export class ResourceLoader {
    constructor() {
        console.log('ResourceLoader.constructor() called...');
        this.map = new Map(Resources);
        //console.log(this.map);
        for (let [key, value] of this.map) {
            //console.log(value);
            const image = wx.createImage();
            //wx.createImage();
            image.src = value;
            this.map.set(key, image);

        }
    }

    onLoaded(callback) {
        console.log('ResourceLoader.onLoad() called...');
        let loadedCount = 0;
        for (let value of this.map.values()) {
            value.onload = () => {
                loadedCount++;
                // console.log('images loading...');
                if (loadedCount >= this.map.size) {
                    //console.log('All images have been loaded...');
                    callback(this.map);
                }
            }
        }
    }

    static create() {
        console.log('ResourceLoader.create() called...');
        return new ResourceLoader();
    }
}