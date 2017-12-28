var dial_wrapper;
var dial_circle;

var dialMovementEnabled = false;

var clickPoint;

function enableDialMovement() {
    dialMovementEnabled = true;
    clickPoint = [event.clientX, event.clientY];
    return false;
}

function disableDialMovement() {
    dialMovementEnabled = false;
}

function moveDial() {
    if (dialMovementEnabled) {
        let currentPos = [event.clientX, event.clientY];
        let difference = [currentPos[0] - clickPoint[0], currentPos[1] - clickPoint[1]];

        clickPoint = [currentPos[0], currentPos[1]];

        let currentDialPosX = Number(dial_wrapper.style.left.replace("px", ""));
        let currentDialPosY = Number(dial_wrapper.style.top.replace("px", ""));
        dial_wrapper.style.left = (currentDialPosX + difference[0]) + "px";
        dial_wrapper.style.top = (currentDialPosY + difference[1]) + "px";
        console.log(dial_wrapper.style.left);
    }
}

if (window.location.href.includes("WorkingSpace.aspx")) {
    addLoadEvent(dialLoad);
    addResizeEvent(resizeDial);
}

function dialLoad() {
    dial_wrapper = document.getElementById("dial-wrapper");

    dial_circle = document.getElementById("main-dial-circle");
    dial_circle.children[0].onmousedown = enableDialMovement;
    dial_circle.children[0].onmouseup = disableDialMovement;

    let dial_rect = dial_circle.getBoundingClientRect();

    dial_circle.children[0].setAttribute("cx", dial_rect.width / 2);
    dial_circle.children[0].setAttribute("cy", dial_rect.height / 2);
    dial_circle.children[0].setAttribute("r", dial_rect.width / 2);
    

    var body = document.getElementsByTagName("BODY")[0];
    body.onmousemove = moveDial;
}

function resizeDial() {
    let dial_rect = dial_circle.getBoundingClientRect();

    dial_circle.children[0].setAttribute("cx", dial_rect.width / 2);
    dial_circle.children[0].setAttribute("cy", dial_rect.height / 2);
    dial_circle.children[0].setAttribute("r", dial_rect.width / 2);
}


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