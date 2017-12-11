import * as glMatrix from '/Resources/3DJS/libs/glMatrix/gl-matrix.js';
import Camera from '/Resources/3DJS/classes/graphics/Camera.js';
import Display from '/Resources/3DJS/classes/graphics/Display.js';
import Renderer from '/Resources/3DJS/classes/graphics/Renderer.js';
import Object3D from '/Resources/3DJS/classes/objects/Object3D.js';
import Frame from '/Resources/3DJS/classes/objects/Frame.js';
import Sphere from '/Resources/3DJS/classes/objects/Sphere.js';
import TriangleObject from '/Resources/3DJS/classes/objects/TriangleObject.js';
import Model from '/Resources/3DJS/classes/objects/Model.js';
import GLSLProgram from '/Resources/3DJS/classes/shaders/GLSLProgram.js';
import FrameShader from '/Resources/3DJS/classes/shaders/FrameShader.js';
import SphereShader from '/Resources/3DJS/classes/shaders/SphereShader.js';
import TriangleShader from '/Resources/3DJS/classes/shaders/TriangleShader.js';
import FpsCounter from '/Resources/3DJS/classes/FpsCounter.js';
import PlayerInputDetector from '/Resources/3DJS/classes/PlayerInputDetector.js';
import Scene from '/Resources/3DJS/classes/Scene.js';

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

function addResizeEvent(func) {
    var oldonresize = window.onresize;
    if (typeof window.onresize != 'function') {
        window.onresize = func;
    }
    else {
        window.onresize = function () {
            if (oldonresize) {
                oldonresize();
            }
            func();
        }
    }
}

if (window.location.href.includes("WorkingSpace.aspx")) {
    addLoadEvent(main);
    addResizeEvent(updateDisplay);
}

var canvas_const = {
    WINDOW_HEIGHT: 0.375,
    WINDOW_WIDTH: 0.8,
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
var leftButtons;
var rightButtons;
var currentMode;
var gl;

function main() {
    init();

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
    display = new Display(canvas_const.WINDOW_HEIGHT * window.innerWidth, canvas_const.WINDOW_WIDTH * window.innerWidth);

    //init webgl
    gl = display.canvas.getContext("webgl2");

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

    //event set up
    window.onkeydown = keydown_callback;
    window.onkeyup = keyup_callback;
    window.onmousemove = mouse_callback;
    display.canvasView.onclick = resume;
    display.canvasView.onmousedown = mousedown;
    display.canvasView.onmouseup = mouseup;
    display.canvasView.oncontextmenu = contextmenu;
    document.getElementById("add-vertex").onclick = addVertex;

    leftButtons = document.getElementById('left-btn-coll').getElementsByTagName('button');
    rightButtons = document.getElementById('right-btn-coll').getElementsByTagName('button');

    for(let i = 0; i < leftButtons.length; i++){
        leftButtons[i].onclick = setCreationMode;
    }

    for(let i = 0; i < rightButtons.length; i++){
        rightButtons[i].onclick = setDrawMode;
    }

    //init renderer
    renderer = new Renderer(gl, canvas_const, scene);
}

function addVertex(){
    let x = parseFloat(document.getElementById("x-val").value);
    let y = parseFloat(document.getElementById("y-val").value);
    let z = parseFloat(document.getElementById("z-val").value);
    let position = [x, y, z];
    let normal = [1.0, 1.0, 1.0];
    let color = document.getElementById("final-color").style.backgroundColor;
    let r = parseFloat(color.substring(color.indexOf('(') + 1, color.indexOf(',')));
    let g = parseFloat(color.substring(color.indexOf(',') + 1,color.indexOf(',',color.indexOf(',') + 1)));
    let b = parseFloat(color.substring(color.lastIndexOf(',') + 1, color.indexOf(')')));
    color = [r, g, b];
    let mode;
    switch(currentMode){
        case 'triangle-mode':
            mode = gl.TRIANGLES;
            break;
        case 'triangle-strip-mode':
            mode = gl.TRIANGLE_STRIP;
            break;
        case 'line-mode':
            mode = gl.LINES;
            break;
        case 'line-strip-mode':
            mode = gl.LINE_STRIP;
            break;
    }

    //add vertex to selected object
    if(scene.selectedObject == null){
        scene.addObject(new TriangleObject(gl, renderer.triangleShader));   
    }
    scene.selectedObject.addVertex(position, color, normal, mode, gl);
}

function keydown_callback(){
    playerInputDetector.key_callback_down(event);
}

function keyup_callback(){
    playerInputDetector.key_callback_up(event);
}

function mouse_callback(){

    if(playerInputDetector.first || playerInputDetector.isPaused || !playerInputDetector.mouseRotation){
        playerInputDetector.setMousePosition(event);
        playerInputDetector.first = false;
    }
    else{
        playerInputDetector.mouse_callback(event);
    }
}

function mousedown(){
    if(event.which == 3){// right mouse button is being clicked
        playerInputDetector.enableRotation();
    }
}

function mouseup(){
    if(event.which == 3){// right mouse button is released
        playerInputDetector.disableRotation();
    }
}

function resume(){
    playerInputDetector.isPaused = false;
    playerInputDetector.removePauseLabel();
}

function updateDisplay(){
    display.updateDisplay(canvas_const.WINDOW_HEIGHT * window.innerWidth, canvas_const.WINDOW_WIDTH * window.innerWidth);
}

function contextmenu(){
    return false;
}

function setCreationMode(){
    currentMode = this.getAttribute('id');

    for(let i = 0; i < leftButtons.length; i++){
        if(leftButtons[i].classList.contains('checkable-left'))
            leftButtons[i].classList.remove('checkable-left');
    }

    this.classList.add('checkable-left');
}

function setDrawMode(){
    currentMode = this.getAttribute('id');

    for(let i = 0; i < rightButtons.length; i++){
        if(rightButtons[i].classList.contains('checkable-right'))
            rightButtons[i].classList.remove('checkable-right');
    }

    this.classList.add('checkable-right');
}