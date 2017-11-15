var userlocation;
var width;
var height;

function updateUserLocation() {
    userlocation = document.getElementById("contentDiv").scrollTop;
    var indicator = Math.floor((userlocation + height * 0.1) / height);
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

function changeCompletionBar(percent) {
    document.getElementById("completion-barTxt").innerHTML = percent + "%";
    var barwidth = document.getElementById("completion-bar").getAttribute("width");
    document.getElementById("completion-bar").getElementsByTagName("rect")[0].setAttribute("width", (barwidth * percent/100));
}

function updatePageSize() {
    width = window.innerWidth;
    height = window.innerHeight;

    document.getElementById("welcomeDiv").style.width = width * 0.9 + "px";
    document.getElementById("welcomeDiv").style.height = height * 0.95 + "px";
    document.getElementById("welcomeDiv").style.top = height * 0.05 + "px";
    document.getElementById("welcomeDiv").style.left = width * 0.05 + "px";
    document.getElementById("welcomePos").style.top = -height * 0.05 + "px";// is used for smooth scrolling

    document.getElementById("loginDiv").style.width = width * 0.9 + "px";
    document.getElementById("loginDiv").style.height = height * 1 + "px";
    document.getElementById("loginDiv").style.top = height * 1 + "px";
    document.getElementById("loginDiv").style.left = width * 0.05 + "px";

    document.getElementById("signupDiv").style.width = width * 0.9 + "px";
    document.getElementById("signupDiv").style.height = height * 1 + "px";
    document.getElementById("signupDiv").style.top = height * 2 + "px";
    document.getElementById("signupDiv").style.left = width * 0.05 + "px";

    document.getElementById("aboutDiv").style.width = width * 0.9 + "px";
    document.getElementById("aboutDiv").style.height = height * 1 + "px";
    document.getElementById("aboutDiv").style.top = height * 3 + "px";
    document.getElementById("aboutDiv").style.left = width * 0.05 + "px";

    document.getElementById("termDiv").style.width = width * 0.9 + "px";
    document.getElementById("termDiv").style.height = height * 0.95 + "px";
    document.getElementById("termDiv").style.top = height * 4 + "px";
    document.getElementById("termDiv").style.left = width * 0.05 + "px";

    document.getElementById("Hidden_Element").style.top = height * 5 - 2 + "px";

    document.getElementById("contentDiv").style.visibility = "visible";

    var svgLines = document.getElementsByClassName("breakLine");
    var lines = document.getElementsByClassName("line");

    for (var i = 0; i < svgLines.length; i++) {
        svgLines[i].setAttribute("width", width * 0.8);
        lines[i].setAttribute("x2", width * 0.8);
    }

    document.getElementById("completion-bar").setAttribute("height", width * 0.03);
    document.getElementById("completion-bar").setAttribute("width", width * 0.6);
    document.getElementById("completion-bar").getElementsByTagName("rect")[1].setAttribute("height", width * 0.03);
    document.getElementById("completion-bar").getElementsByTagName("rect")[1].setAttribute("width", width * 0.6);
    document.getElementById("completion-bar").getElementsByTagName("rect")[0].setAttribute("height", width * 0.03);
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
