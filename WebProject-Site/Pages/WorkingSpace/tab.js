var canvasTab;
var canvas;
var detailsTab;
var details;

if (window.location.href.includes("WorkingSpace.aspx")) {
    addLoadEvent(tabLoad);
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

function tabLoad() {
    canvasTab = document.getElementById("canvas-tab");
    detailsTab = document.getElementById("desc-tab");
    canvas = document.getElementById("canvas-view");
    details = document.getElementById("details-view");

    canvasTab.onclick = putCanvasInFront;
    detailsTab.onclick = putDetailsInFront;
}


function putCanvasInFront() {
    canvas.style.zIndex = 2;
    details.style.zIndex = 1;
}

function putDetailsInFront() {
    canvas.style.zIndex = 1;
    details.style.zIndex = 2;
}