'use strict';

class Display {

    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.canvas = document.getElementById("canvas");
        this.canvas.setAttribute("height", height);
        this.canvas.setAttribute("width", width);
        this.fpsLabel = document.getElementById("fpsLabel");
    }

    updateCanvas(gl) {
        gl.clearColor(0.5, 0.88, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    setFpsCounter(fps) {
        let str = fps + ' FPS';
        this.fpsLabel.innerHTML = str;
    }
}