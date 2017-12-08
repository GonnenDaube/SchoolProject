'use strict';

class Display {

    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.canvas = document.getElementById("canvas");
        this.canvasView = document.getElementById("canvas-view");
        this.canvas.setAttribute("height", height);
        this.canvas.setAttribute("width", width);
        this.fpsLabel = document.getElementById("fpsLabel");
    }

    updateCanvas(gl) {
        gl.clearColor(255/255, 248/255, 233/255, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    setFpsCounter(fps) {
        let str = fps + ' FPS';
        this.fpsLabel.innerHTML = str;
    }

    updateDisplay(height, width){
        this.height = height;
        this.width = width;
        this.canvas.setAttribute("height", height);
        this.canvas.setAttribute("width", width);
    }
}

export default Display;