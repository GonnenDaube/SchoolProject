

function scrollToElement(id, transition) {
    var height = window.innerHeight;
    var elementLocation = 0;
    var userLocation = document.documentElement.scrollTop;
    switch (id) {
        case "welcome":
            elementLocation = 0;
            break;
        case "login":
            elementLocation = height * 1;
            break;
        case "signup":
            elementLocation = height * 2;
            break;
        case "about":
            elementLocation = height * 3;
            break;
        case "terms":
            elementLocation = height * 4;
            break;
    }
    window.scrollBy(0, (elementLocation - userLocation));
}

function updatePageSize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    document.getElementById("welcomeDiv").style.width = width * 0.9 + "px";
    document.getElementById("welcomeDiv").style.height = height * 0.9 + "px";
    document.getElementById("welcomeDiv").style.top = height * 0.05 + "px";
    document.getElementById("welcomeDiv").style.left = width * 0.05 + "px";

    document.getElementById("loginDiv").style.width = width * 0.9 + "px";
    document.getElementById("loginDiv").style.height = height * 0.9 + "px";
    document.getElementById("loginDiv").style.top = height * 1.05 + "px";
    document.getElementById("loginDiv").style.left = width * 0.05 + "px";

    document.getElementById("signupDiv").style.width = width * 0.9 + "px";
    document.getElementById("signupDiv").style.height = height * 0.9 + "px";
    document.getElementById("signupDiv").style.top = height * 2.05 + "px";
    document.getElementById("signupDiv").style.left = width * 0.05 + "px";

    document.getElementById("aboutDiv").style.width = width * 0.9 + "px";
    document.getElementById("aboutDiv").style.height = height * 0.9 + "px";
    document.getElementById("aboutDiv").style.top = height * 3.05 + "px";
    document.getElementById("aboutDiv").style.left = width * 0.05 + "px";

    document.getElementById("termDiv").style.width = width * 0.9 + "px";
    document.getElementById("termDiv").style.height = height * 0.9 + "px";
    document.getElementById("termDiv").style.top = height * 4.05 + "px";
    document.getElementById("termDiv").style.left = width * 0.05 + "px";

    document.getElementById("Hidden_Element").style.top = height * 5 - 2 + "px";

    document.getElementById("contentDiv").style.visibility = "visible";
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
}
