var dropped = false;
var width = 0;
var buttonWidth = 0;
var buttonHeight = 0;
var shouldClose = true;

function updateUpperBarSize() {
    width = window.innerWidth;
    buttonWidth = width / 6;
    buttonHeight = width / 20;
    if (window.location.href.includes("HomePage.aspx")){
        document.getElementById("homePageDropIcon").style.visibility = "visible";
        document.getElementById("dropdown_content").style.visibility = "visible";
    }
    else if (window.location.href.includes("WorkingSpace.aspx"))
        document.getElementById("workingspaceLinkIcon").style.visibility = "visible";
    else if (window.location.href.includes("Library.aspx"))
        document.getElementById("libraryLinkIcon").style.visibility = "visible";
}
function closeDropDown(isclick) {
    if (!window.location.href.includes("HomePage.aspx")) {
        window.location.href = "/Pages/HomePage/HomePage.aspx";
    }
    else {
        var children = document.getElementById("dropdownList").children;
        document.getElementById("dropdownList").style.visibility = 'hidden';
        document.getElementById("homePageDropIcon").classList.add("dropIconRetract");
        document.getElementById("homePageDropIcon").classList.remove("dropIconExpand");
        for (var i = 0; i < children.length; i++) {
            children[i].style.top = "0px";
        }
        dropped = false;
    }
}
function linkButton(location) {
    window.location = location;
}
function openDropDown() {
    if (!window.location.href.includes("HomePage.aspx")) {
        window.location.href = "/Pages/HomePage/HomePage.aspx";
    }
    else {
        var children = document.getElementById("dropdownList").children;
        document.getElementById("dropdownList").style.visibility = 'visible';
        document.getElementById("homePageDropIcon").classList.add("dropIconExpand");
        document.getElementById("homePageDropIcon").classList.remove("dropIconRetract");
        for (var i = 0; i < children.length; i++) {
            children[i].style.top = buttonHeight * (i + 1) + "px";
        }
        dropped = true;
    }
}

function dropbtnClick() {
    if (!dropped) {
        openDropDown();
    }
    else {
        closeDropDown(true);
    }
}

function ShouldntClose() {
    shouldClose = false;
    alert('shouldClose = ' + shoudlClose);
}

function buttonLinkClick(link) {
    window.location.href = link;
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
addResizeEvent(updateUpperBarSize);