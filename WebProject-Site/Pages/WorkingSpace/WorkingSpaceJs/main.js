'use strict';

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    }
    else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

if (window.location.href.includes("WorkingSpace.aspx")) {
    addLoadEvent(main);
}

var math_const = {
    PI: 3.14159265359,
}

var canvas_const = {
    WINDOW_HEIGHT: window.innerWidth * 0.39,
    WINDOW_WIDTH: window.innerWidth * 0.7,
};

var camera_const = {
    INITIAL_CAMERA_POSITION:[0.0, 0.0, -10.0],
    INITIAL_CAMERA_LOOKAT:[0.0, 0.0, 1.0],
    INITIAL_CAMERA_LOOKUP:[0.0, 1.0, 0.0],
    FOV: math_const.PI / 3, // 60 deg
}

var display;
var renderer;
var scene;
var playerInputDetector;
var fpsCounter;

function main() {
    init();
}

function init() {
    //init display
    display = new Display(canvas_const.WINDOW_HEIGHT, canvas_const.WINDOW_WIDTH);

    //init webgl
    const gl = display.canvas.getContext("experimental-webgl");

    if (!gl) {
        console.log("Unable to initialize WebGl. Your browser or machine may not support it.");
        return;
    }

    console.log("webgl initialization successful");

    //create fpsCounter
    fpsCounter = new FpsCounter();

    //create scene
    scene = new Scene(fpsCounter);

    //create camera
    scene.camera = new Camera(camera_const.INITIAL_CAMERA_POSITION, camera_const.INITIAL_CAMERA_LOOKAT, camera_const.INITIAL_CAMERA_LOOKUP, camera_const.FOV);

    //init PlayerInputDetector
    playerInputDetector = new PlayerInputDetector(scene, display);

}