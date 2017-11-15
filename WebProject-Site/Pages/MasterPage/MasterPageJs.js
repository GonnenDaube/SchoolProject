var dropped = false;
var width = 0;
var buttonWidth = 0;
var buttonHeight = 0;

function updateUpperBarSize() {
    width = window.innerWidth;
    buttonWidth = width / 6;
    buttonHeight = width / 20;

    document.getElementById("homePage_drop").style.left = (width / 2 - (buttonWidth * 1.5)) + "px";
    document.getElementById("homePage_btn").style.width = buttonWidth + "px";
    document.getElementById("homePage_btn").style.height = buttonHeight + "px";
    document.getElementById("homePage_btn").style.fontSize = buttonHeight / 4 + "px";

    document.getElementById("workingSpace").style.left = (width / 2 - (buttonWidth * 0.5)) + "px";
    document.getElementById("workingSpace_btn").style.width = buttonWidth + "px";
    document.getElementById("workingSpace_btn").style.height = buttonHeight + "px";
    document.getElementById("workingSpace_btn").style.fontSize = buttonHeight / 4 + "px";
    document.getElementById("library").style.left = (width / 2 + (buttonWidth * 0.5)) + "px";
    document.getElementById("library_btn").style.width = buttonWidth + "px";
    document.getElementById("library_btn").style.height = buttonHeight + "px";
    document.getElementById("library_btn").style.fontSize = buttonHeight / 4 + "px";

    var links = document.getElementsByTagName("a");
    document.getElementById("dropdownList").style.visibility = 'hidden';
    for(var i = 0; i < links.length; i++){
        links[i].style.height = buttonHeight + "px";
        links[i].style.width = buttonWidth + "px";
        links[i].style.top = "0px";
        links[i].style.fontSize = buttonHeight / 4 + "px";
    }

    if (window.location.href.includes("HomePage.aspx"))
        document.getElementById("homePageDropIcon").style.visibility = "visible";
    else if (window.location.href.includes("WorkingSpace.aspx"))
        document.getElementById("workingspaceLinkIcon").style.visibility = "visible";
    else if (window.location.href.includes("Library.aspx"))
        document.getElementById("libraryLinkIcon").style.visibility = "visible";

    document.getElementById("Upper_Bar").style.visibility = "visible";
}

function dropbtnClick() {
    if (!window.location.href.includes("HomePage.aspx")) {
        window.location.href = "/Pages/HomePage/HomePage.aspx";
    }
    else {
        dropped = !dropped;

        var children = document.getElementById("dropdownList").children;
        if (!dropped) {
            document.getElementById("dropdownList").style.visibility = 'hidden';
            document.getElementById("homePageDropIcon").classList.add("dropIconRetract");
            document.getElementById("homePageDropIcon").classList.remove("dropIconExpand");
        }
        else {
            document.getElementById("dropdownList").style.visibility = 'visible';
            document.getElementById("homePageDropIcon").classList.add("dropIconExpand");
            document.getElementById("homePageDropIcon").classList.remove("dropIconRetract");
        }
        for (var i = 0; i < children.length; i++) {
            if (!dropped) {
                children[i].style.top = "0px";
            }
            else {
                children[i].style.top = buttonHeight * (i + 1) + "px";
            }
        }
    }
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