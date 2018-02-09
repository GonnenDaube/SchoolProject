var star0;
var star1;
var star2;
var star3;
var star4;
var stars;
var selected;
var userRate;

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

if (window.location.href.includes("AssetPage.aspx")) {
    addLoadEvent(rateSetUp);
    addLoadEvent(resizeBreakLine);
    addResizeEvent(resizeBreakLine);
}

function rateSetUp() {
    star0 = document.getElementById("body_star0");
    star1 = document.getElementById("body_star1");
    star2 = document.getElementById("body_star2");
    star3 = document.getElementById("body_star3");
    star4 = document.getElementById("body_star4");

    selected = 0;

    stars = new Array();
    stars.push(star0);
    stars.push(star1);
    stars.push(star2);
    stars.push(star3);
    stars.push(star4);

    star0.onmouseenter = function () { showStars(1); };
    star1.onmouseenter = function () { showStars(2); };
    star2.onmouseenter = function () { showStars(3); };
    star3.onmouseenter = function () { showStars(4); };
    star4.onmouseenter = function () { showStars(5); };

    star0.onmouseleave = function () { hideStars(1); };
    star1.onmouseleave = function () { hideStars(2); };
    star2.onmouseleave = function () { hideStars(3); };
    star3.onmouseleave = function () { hideStars(4); };
    star4.onmouseleave = function () { hideStars(5); };

    star0.onclick = function () { selectStars(1); return false; };
    star1.onclick = function () { selectStars(2); return false; };
    star2.onclick = function () { selectStars(3); return false; };
    star3.onclick = function () { selectStars(4); return false; };
    star4.onclick = function () { selectStars(5); return false; };

    userRate = document.getElementById("body_user_rate");
}

function resizeBreakLine() {
    var lineSVG = document.getElementById("breakLineSVG");
    let height = lineSVG.clientHeight;
    var line = document.getElementById("rate-break-line").setAttribute("y2", height);
}

function showStars(num) {
    for (let i = 0; i < num; i++) {
        if (i > selected - 1) {
            if (document.getElementById("checked" + i).classList.contains('hidden')) {
                document.getElementById("checked" + i).classList.remove('hidden');
                document.getElementById("checked" + i).classList.add('shown');
                document.getElementById("checked" + i).classList.add('star-hover');
            }
        }
    }
}

function hideStars(num) {
    for (let i = 0; i < num; i++) {
        if (i > selected - 1) {
            if (document.getElementById("checked" + i).classList.contains('shown')) {
                document.getElementById("checked" + i).classList.remove('shown');
                document.getElementById("checked" + i).classList.add('hidden');
                document.getElementById("checked" + i).classList.remove('star-hover');
            }
        }
    }
}

function selectStars(num) {
    for(let i = 0; i < 5; i++){
        if (document.getElementById("checked" + i).classList.contains('shown')) {
            document.getElementById("checked" + i).classList.remove('shown');
            document.getElementById("checked" + i).classList.add('hidden');
        }
        if (document.getElementById("checked" + i).classList.contains('star-hover')) {
            document.getElementById("checked" + i).classList.remove('star-hover');
        }
        if(document.getElementById("selected" + i).classList.contains('shown')){
            document.getElementById("selected" + i).classList.remove('shown');
            document.getElementById("selected" + i).classList.add('hidden');
        }
    }
    for (let i = 0; i < num; i++) {
        if (document.getElementById("checked" + i).classList.contains('hidden')) {
            document.getElementById("checked" + i).classList.remove('hidden');
            document.getElementById("checked" + i).classList.add('shown');
        }
        if (document.getElementById("selected" + i).classList.contains('hidden')) {
            document.getElementById("selected" + i).classList.remove('hidden');
            document.getElementById("selected" + i).classList.add('shown');
        }
    }
    selected = num;
}