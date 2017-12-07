﻿import * as glMatrix from './libs/glMatrix/gl-matrix.js';
import Camera from './classes/graphics/Camera.js';
import Display from './classes/graphics/Display.js';
import Renderer from './classes/graphics/Renderer.js';
import Object3D from './classes/objects/Object3D.js';
import Frame from './classes/objects/Frame.js';
import Sphere from './classes/objects/Sphere.js';
import Model from './classes/objects/Model.js';
import GLSLProgram from './classes/shaders/GLSLProgram.js';
import FrameShader from './classes/shaders/FrameShader.js';
import SphereShader from './classes/shaders/SphereShader.js';
import FpsCounter from './classes/FpsCounter.js';
import PlayerInputDetector from './classes/PlayerInputDetector.js';
import Scene from './classes/Scene.js';

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

var canvas_const = {
    WINDOW_HEIGHT: window.innerWidth * 0.375,
    WINDOW_WIDTH: window.innerWidth * 0.8,
};

var camera_const = {
    INITIAL_CAMERA_POSITION:[0.0, 0.0, -10.0],
    INITIAL_CAMERA_LOOKAT:[0.0, 0.0, 1.0],
    INITIAL_CAMERA_LOOKUP:[0.0, 1.0, 0.0],
    FOV: Math.PI / 3, // 60 deg
}

var display;
var renderer;
var scene;
var playerInputDetector;
var fpsCounter;

function main() {
    let gl = init();

    var loop = function(timestamp){
        renderer.renderSceneToFramebuffer(display, gl);

        if(playerInputDetector.isPaused){
            renderer.addBlurEffect(display, gl);
        }

        renderer.renderFramebuffertoViewPort(display, gl);

        fpsCounter.updateFps(timestamp);

        scene.updateScene();

        display.setFpsCounter(fpsCounter.fps);

        window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
}

function init() {

    //init display
    display = new Display(canvas_const.WINDOW_HEIGHT, canvas_const.WINDOW_WIDTH);

    //init webgl
    const gl = display.canvas.getContext("webgl2");

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
    scene.camera = new Camera(camera_const);

    //init PlayerInputDetector
    playerInputDetector = new PlayerInputDetector(scene, display);

    window.onkeydown = keydown_callback;
    window.onkeyup = keyup_callback;
    window.onmousemove = mouse_callback;
    display.canvasView.onclick = resume;

    //init renderer
    renderer = new Renderer(gl, canvas_const, scene);

    //add all objects to scene
    for (var i = 0; i < 5; i++) {
        for(var j = 0; j< 5; j++){
            for(var k = 0; k < 5; k++){
                scene.addObject(new Sphere(gl, 1, [i * 5, j * 5, k * 5], renderer.sphereShader));
            }
        }
    }

    return gl;
}

function keydown_callback(){
    playerInputDetector.key_callback_down(event);
}

function keyup_callback(){
    playerInputDetector.key_callback_up(event);
}

function mouse_callback(){

    if(playerInputDetector.first || playerInputDetector.isPaused){
        playerInputDetector.setMousePosition(event);
        playerInputDetector.first = false;
    }
    else{
        playerInputDetector.mouse_callback(event);
    }
}

function resume(){
    playerInputDetector.isPaused = false;
    playerInputDetector.removePauseLabel();
}