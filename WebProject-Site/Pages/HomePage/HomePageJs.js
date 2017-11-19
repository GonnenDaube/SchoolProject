var userlocation;
var width;
var height;
var panelHeight;

function updateUserLocation() {
    userlocation = document.getElementById("contentDiv").scrollTop;
    var indicator = Math.floor((userlocation + panelHeight * 0.1) / panelHeight);
    updateIndicator(indicator);
}

function updateIndicator(indicator) {
    //gets indicator index (top to bottom)
    //sets to visible and all others to hidden
    document.getElementById("linkIcon" + indicator).style.visibility = "visible";
    for (var i = 0; i < 5; i++) {
        if(i != indicator)
            document.getElementById("linkIcon" + i).style.visibility = "hidden";
    }

}

function updatePageSize() {
    width = window.innerWidth;
    height = window.innerHeight;
    panelHeight = width * 9 / 16; //we want screen ratio of 16/9

    document.getElementById("welcomeDiv").style.width = width * 0.9 + "px";
    document.getElementById("welcomeDiv").style.height = panelHeight * 0.95 + "px";
    document.getElementById("welcomeDiv").style.top = panelHeight * 0.05 + "px";
    document.getElementById("welcomeDiv").style.left = width * 0.05 + "px";
    document.getElementById("welcomePos").style.top = -panelHeight * 0.05 + "px";// is used for smooth scrolling

    document.getElementById("loginDiv").style.width = width * 0.9 + "px";
    document.getElementById("loginDiv").style.height = panelHeight * 1 + "px";
    document.getElementById("loginDiv").style.top = panelHeight * 1 + "px";
    document.getElementById("loginDiv").style.left = width * 0.05 + "px";

    document.getElementById("signupDiv").style.width = width * 0.9 + "px";
    document.getElementById("signupDiv").style.height = panelHeight * 1 + "px";
    document.getElementById("signupDiv").style.top = panelHeight * 2 + "px";
    document.getElementById("signupDiv").style.left = width * 0.05 + "px";

    document.getElementById("aboutDiv").style.width = width * 0.9 + "px";
    document.getElementById("aboutDiv").style.height = panelHeight * 1 + "px";
    document.getElementById("aboutDiv").style.top = panelHeight * 3 + "px";
    document.getElementById("aboutDiv").style.left = width * 0.05 + "px";

    document.getElementById("termDiv").style.width = width * 0.9 + "px";
    document.getElementById("termDiv").style.height = panelHeight * 0.95 + "px";
    document.getElementById("termDiv").style.top = panelHeight * 4 + "px";
    document.getElementById("termDiv").style.left = width * 0.05 + "px";

    document.getElementById("Hidden_Element").style.top = panelHeight * 5 - 2 + "px";

    document.getElementById("contentDiv").style.visibility = "visible";

    var svgLines = document.getElementsByClassName("breakLine");
    var lines = document.getElementsByClassName("line");

    for (var i = 0; i < svgLines.length; i++) {
        svgLines[i].setAttribute("width", width * 0.8);
        lines[i].setAttribute("x2", width * 0.8);
    }

    var textBoxLines = document.getElementsByClassName("textboxLine");

    for (var i = 0; i < textBoxLines.length; i++) {
        textBoxLines[i].setAttribute("x2", width * 0.1);
    }

    var signUpLines = document.getElementsByClassName("signUpLine");

    for (var i = 0; i < signUpLines.length; i++) {
        signUpLines[i].setAttribute("y2", 0.5 * panelHeight);
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

if (window.location.href.includes("HomePage.aspx")) {
    addLoadEvent(updatePageSize);
    addResizeEvent(updatePageSize);
    addLoadEvent(updateUserLocation);
}

function startRegistration() {
    document.getElementById("signupframe").style.zIndex = 0;
    document.getElementById("stage0").classList.remove("stage0");
    document.getElementById("stage0").classList.add("stage0Hidden");
    document.getElementById("continue").classList.remove("hideTrans");
    document.getElementById("continue").classList.add("showTrans");
    document.getElementById("stage1").classList.remove("hideTrans");
    document.getElementById("stage1").classList.add("showTrans");
    document.getElementById("stageNumber").innerHTML = parseInt(document.getElementById("stageNumber").innerHTML) + 1;
}

function nextStep() {
    document.getElementById("stageNumber").innerHTML = parseInt(document.getElementById("stageNumber").innerHTML) + 1;
    var step = parseInt(document.getElementById("stageNumber").innerHTML);
    if (step == 2) {
        document.getElementById("stage1").style.left = "10%";
        document.getElementById("stage2").classList.remove("hideTrans");
        document.getElementById("stage2").classList.add("showTrans");
        document.getElementById("stage2").classList.add("transitionDelayhalfSec");

        document.getElementById("stage2Svg").classList.remove("hiddenSignUpLine");
        document.getElementById("stage2Svg").classList.add("stage2SignUpLine");
    }

    if (step == 3) {
        document.getElementById("stage2").classList.remove("transitionDelayhalfSec");
        document.getElementById("stage1").style.left = "3.5%";
        document.getElementById("stage2").style.left = "32.5%";
        document.getElementById("stage3").classList.remove("hideTrans");
        document.getElementById("stage3").classList.add("showTrans");
        document.getElementById("stage3").classList.add("transitionDelayhalfSec");

        document.getElementById("stage2Svg").classList.remove("stage2SignUpLine");
        document.getElementById("stage2Svg").classList.add("stage3-1SignUpLine");
        document.getElementById("stage3Svg").classList.remove("hiddenSignUpLine");
        document.getElementById("stage3Svg").classList.add("stage3-2SignUpLine");

        document.getElementById("continue").classList.add("hideTrans");
        document.getElementById("body_submitButton").classList.remove("hideTrans");
        document.getElementById("continue").classList.remove("showTrans");
        document.getElementById("body_submitButton").classList.add("showTrans");
    }
}

function selectOption(option) {
    if (isSelected(option)) {
        deselectOption(option);
    }
    else {
        document.getElementById(option).classList.remove("optionButton");
        document.getElementById(option).classList.add("selectedOption");
        document.getElementById("body_content_" + option).nodeValue = "True";
    }
}

function deselectOption(option) {
    document.getElementById(option).classList.add("optionButton");
    document.getElementById(option).classList.remove("selectedOption");
    document.getElementById("body_content_" + option).nodeValue = "False";
}

function isSelected(option) {
    if (document.getElementById(option).classList.contains("selectedOption"))
        return true;
    return false;
}