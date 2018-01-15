import * as glMatrix from '/Resources/3DJS/libs/glMatrix/gl-matrix.js';
import Camera from '/Resources/3DJS/classes/graphics/Camera.js';
import Display from '/Resources/3DJS/classes/graphics/Display.js';
import Renderer from '/Resources/3DJS/classes/graphics/Renderer.js';
import Object3D from '/Resources/3DJS/classes/objects/Object3D.js';
import Frame from '/Resources/3DJS/classes/objects/Frame.js';
import Sphere from '/Resources/3DJS/classes/objects/Sphere.js';
import TriangleObject from '/Resources/3DJS/classes/objects/TriangleObject.js';
import PreviewObject from '/Resources/3DJS/classes/objects/PreviewObject.js';
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
var gl;
var action;
var mode;
var selector_div;

function main() {
    init();

    var loop = function(timestamp){
        renderer.renderSceneToFramebuffer(display, gl, mode);

        if(playerInputDetector.isPaused){
            renderer.addBlurEffect(display, gl);
        }

        renderer.renderFramebuffertoViewPort(display, gl);

        fpsCounter.updateFps(timestamp);

        scene.updateScene(false);

        display.setFpsCounter(fpsCounter.fps);

        checkForModeChange();

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
    mode = "solid-mode";
    action = "vertex-selector";
    selector_div = document.getElementById("vertex-selector-div");

    window.onkeydown = keydown_callback;
    window.onkeyup = keyup_callback;
    window.onmousemove = mouse_callback;
    display.canvasView.onclick = resume;
    display.canvasView.onmousedown = mousedown;
    display.canvasView.onmouseup = mouseup;
    selector_div.onmouseup = mouseup;
    display.canvasView.oncontextmenu = contextmenu;

    //init renderer
    renderer = new Renderer(gl, canvas_const, scene);

    //for(let i = 0; i < 20; i++){
    //    for(let k = 0; k < 20; k++){
    //        for(let j = 0; j < 20; j++){
    //            scene.addObject(new Sphere(gl, 1.0, [i*5, k*5, j*5], [0, 1, 0], renderer.sphereShader));
    //        }
    //    }
    //}
}

function checkForModeChange(){
    if(document.getElementById(mode).getAttribute("class").includes("deselected-group-btn")){
        updateMode();
    }
    if(document.getElementById(action).getAttribute("class").includes("deselected-group-btn")){
        updateAction();
    }
}

function updateMode(){
    if(!document.getElementById("solid-mode").getAttribute("class").includes("deselected-group-btn")){
        mode = "solid-mode";
    }
    else if(!document.getElementById("lighting-mode").getAttribute("class").includes("deselected-group-btn")){
        mode = "lighting-mode";
    }
    else if(!document.getElementById("wireframe-mode").getAttribute("class").includes("deselected-group-btn")){
        mode = "wireframe-mode";
    }
    else if(!document.getElementById("normal-mode").getAttribute("class").includes("deselected-group-btn")){
        mode = "normal-mode";
    }
}

function updateAction(){
    if(!document.getElementById("vertex-extruder").getAttribute("class").includes("deselected-group-btn")){
        action = "vertex-extruder";
    }
    else if(!document.getElementById("vertex-adder").getAttribute("class").includes("deselected-group-btn")){
        action = "vertex-adder";
    }
    else if(!document.getElementById("vertex-selector").getAttribute("class").includes("deselected-group-btn")){
        action = "vertex-selector";
    }
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

    if(playerInputDetector.selector){
        playerInputDetector.updateSelector(selector_div);
    }
}

function mousedown(){
    if(event.which == 3){// right mouse button is being clicked
        playerInputDetector.enableRotation();
    }
    if(event.which == 1){// left mouse button is being clicked
        if(action == "vertex-selector"){
            selector_div.style.visibility = "visible";
            selector_div.style.left = event.clientX + "px";
            selector_div.style.top = event.clientY + "px";
            selector_div.style.height = "0px";
            selector_div.style.width = "0px";
            playerInputDetector.clickPos = [event.clientX, event.clientY];
            playerInputDetector.enableSelector();
        }
        if(action == "vertex-adder"){
            //get requested position
            let canvasRect = display.canvasView.getBoundingClientRect();
            let clickPoint = [event.clientX - canvasRect.left, event.clientY - canvasRect.top];
            let position = scene.camera.convert2DpointTo3Dpoint(clickPoint, 10.0, [canvasRect.width, canvasRect.height]);
            let pos = [position[0], position[1], position[2]];

            //get requested color
            let color = document.getElementById("final-color").style.fill;
            let r = parseFloat(color.substring(color.indexOf('(') + 1, color.indexOf(',')));
            let g = parseFloat(color.substring(color.indexOf(',') + 1,color.indexOf(',',color.indexOf(',') + 1)));
            let b = parseFloat(color.substring(color.lastIndexOf(',') + 1, color.indexOf(')')));
            color = [r/255.0, g/255.0, b/255.0];

            //set normal vector to (1,1,1) as default
            let normal = [1.0, 1.0, 1.0];

            //add vertex to main object
            if(scene.main == null){
                scene.main = new TriangleObject(gl, renderer.triangleShader);
            }
            scene.main.addVertex(pos, color, normal, gl);

            if(scene.main.model.numVertices % 3 == 1){
                scene.addPreviewObject(new PreviewObject(gl, pos, [1, 0, 1], renderer.previewShader));
                console.log("added point");
            }
            if(scene.main.model.numVertices % 3 == 2){
                scene.previewObject.addSecondVertex(pos, [1, 0, 1]);
                console.log("added preview line");
            }
            if(scene.main.model.numVertices % 3 == 0){
                scene.deletePreviewObject();
                console.log("deleted preview");
            }
        }
    }
}

function mouseup(){
    if(event.which == 3){// right mouse button is released
        playerInputDetector.disableRotation();
    }
    if(event.which == 1){// left mouse button is being released
        if(action == "vertex-selector"){
            selector_div.style.visibility = "hidden";
            playerInputDetector.disableSelector();
        }
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