var colorSelector;
var saturSelector;
var brightSelector;
var colorBar;
var saturBar;
var brightBar;
var finalColor;

var colorEnabled = false;
var saturEnabled = false;
var brightEnabled = false;

function enableColorSelectorPositionChange() {
    colorEnabled = true;
}

function enableSaturSelectorPositionChange() {
    saturEnabled = true;
}

function enableBrightSelectorPositionChange() {
    brightEnabled = true;
}

function disableColorSelectorPositionChange() {
    colorEnabled = false;
}

function disableSaturSelectorPositionChange() {
    saturEnabled = false;
}

function disableBrightSelectorPositionChange() {
    brightEnabled = false;
}

function moveColorSelector() {
    if (colorEnabled) {
        var colorPosY = colorBar.getBoundingClientRect().top;
        var colorHeight = colorBar.getBoundingClientRect().bottom - colorPosY;

        var selectorNewPos = 100 * (event.clientY - colorPosY) / colorHeight;
        if (selectorNewPos > 100)
            selectorNewPos = 100;
        if (selectorNewPos < 0)
            selectorNewPos = 0;

        colorSelector.style.top = selectorNewPos - 1 + "%";

        updateColor();
    }
}

function moveSaturSelector() {
    if (saturEnabled) {
        var colorPosY = saturBar.getBoundingClientRect().top;
        var colorHeight = saturBar.getBoundingClientRect().bottom - colorPosY;

        var selectorNewPos = 100 * (event.clientY - colorPosY) / colorHeight;
        if (selectorNewPos > 100)
            selectorNewPos = 100;
        if (selectorNewPos < 0)
            selectorNewPos = 0;

        saturSelector.style.top = selectorNewPos - 1 + "%";

        updateColor();
    }
}

function moveBrightSelector() {
    if (brightEnabled) {
        var colorPosY = brightBar.getBoundingClientRect().top;
        var colorHeight = brightBar.getBoundingClientRect().bottom - colorPosY;

        var selectorNewPos = 100 * (event.clientY - colorPosY) / colorHeight;
        if (selectorNewPos > 100)
            selectorNewPos = 100;
        if (selectorNewPos < 0)
            selectorNewPos = 0;

        brightSelector.style.top = selectorNewPos - 1 + "%";

        updateColor();
    }
}

if (window.location.href.includes("WorkingSpace.aspx")) {
    addLoadEvent(colorPickerLoad);
}

function colorPickerLoad() {
    colorBar = document.getElementById("color");
    saturBar = document.getElementById("saturation");
    brightBar = document.getElementById("brightness");

    colorSelector = colorBar.children[0];
    saturSelector = saturBar.children[0];
    brightSelector = brightBar.children[0];
    
    finalColor = document.getElementById("final-color");

    updateColor();
}

function updateColor() {

    //color
    let rgbPercent = colorSelector.style.top;
    let rgbNum = parseInt(rgbPercent.substring(0, rgbPercent.length - 1)) + 1;//offset to zero

    let red = 0;
    let green = 0;
    let blue = 0;

    if (rgbNum <= 16.66) {
        red = 255;
        green = 255 * rgbNum / 16.66;
        blue = 0;
    }
    else if (rgbNum <= 33.33) {
        green = 255;
        red = 255 * (33.33 - rgbNum) / 16.66;
        blue = 0;
    }
    else if (rgbNum <= 50) {
        red = 0;
        blue = 255 * (rgbNum - 33.33) / 16.66;
        green = 255;
    }
    else if (rgbNum <= 66.66) {
        red = 0;
        blue = 255;
        green = 255 * (66.66 - rgbNum) / 16.66;
    }
    else if (rgbNum <= 83.32) {
        red = 255 * (rgbNum - 66.66) / 16.66;
        blue = 255;
        green = 0;
    }
    else {
        red = 255;
        blue = 255 * (100 - rgbNum) / 16.66;
        green = 0;
    }

    //saturation
    saturBar.setAttribute("style", "background:linear-gradient(rgb(" + Math.round(red) + "," + Math.round(green) + "," + Math.round(blue) + "), rgb(255,255,255));");

    let saturPercent = saturSelector.style.top;
    let saturNum = parseInt(saturPercent.substring(0, saturPercent.length - 1)) + 1;//offset to zero
    saturNum = 100 - saturNum;
    saturNum = saturNum / 100;

    var p = Math.sqrt(red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114);

    red = 2 * p + (red - 2 * p) * saturNum;
    green = 2 * p + (green - 2 * p) * saturNum;
    blue = 2 * p + (blue - 2 * p) * saturNum;

    //brightness
    brightBar.setAttribute("style", "background:linear-gradient(rgb(" + Math.round(red) + "," + Math.round(green) + "," + Math.round(blue) + "), rgb(0,0,0));");

    let brightPercent = brightSelector.style.top;
    let brightNum = parseInt(brightPercent.substring(0, brightPercent.length - 1)) + 1;//offset to zero
    brightNum = 100 - brightNum;
    brightNum = brightNum / 100;

    red = brightNum * red;
    green = brightNum * green;
    blue = brightNum * blue;

    //update color
    finalColor.setAttribute("style", "fill:rgb(" + Math.round(red) + "," + Math.round(green) + "," + Math.round(blue) + ");");
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