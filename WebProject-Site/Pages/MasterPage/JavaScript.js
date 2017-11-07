var dropped = false;
var width = 0;
var buttonWidth = 0;
var buttonHeight = 0;

function updateUpperBar() {
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

    var children = document.getElementById("dropdownList").children;
    document.getElementById("dropdownList").style.visibility = 'hidden';
    for(var i = 0; i < children.length; i++){
        children[i].style.height = buttonHeight + "px";
        children[i].style.width = buttonWidth + "px";
        children[i].style.top = "0px";
    }
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
        }
        else {
            document.getElementById("dropdownList").style.visibility = 'visible';
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

window.onload = updateUpperBar;
window.onresize = updateUpperBar;