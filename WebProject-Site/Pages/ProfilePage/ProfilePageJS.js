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

if (window.location.href.includes("ProfilePage.aspx")) {
    addLoadEvent(fileSetUp);
    addLoadEvent(graphSetUp);
    addResizeEvent(graphSetUp);
}

var files;
var graphs;

function fileSetUp() {
    files = document.getElementsByClassName("asset-file-div");
}

function graphSetUp() {
    graphs = document.getElementsByClassName("asset-graph");

    let width, height;
    let rect = graphs[0].getBoundingClientRect();

    width = rect.width;
    height = rect.height;

    let str;
    let x, y;
    x = [];
    y = [];
    let count;

    //resize graph values to 100%
    for (let i = 0; i < graphs.length; i++) {
        str = graphs[i].children[0].getAttribute('points');
        count = 0;

        while(str.length != 0){
            x[count] = Number(str.substring(0, str.indexOf(',')));
            str = str.substring(str.indexOf(',') + 1);
            y[count] = Number(str.substring(0, str.indexOf(' ')));
            str = str.substring(str.indexOf(' ') + 1);

            count++;
        }

        //last x is 100%, biggest y is 100%
        let coex = 0.8 * width / Math.max(...x);
        let coey = 0.8 * height / Math.max(...y);

        for (let k = 0; k < x.length; k++) {
            str += 0.1 * width + coex * x[k] + "," + (0.9 * height - coey * y[k]) + " ";
        }

        graphs[i].children[0].setAttribute('points', str);

        graphs[i].children[1].setAttribute('points', (0.1 * width) + "," + (0.05 * height) + " " + (0.1 * width) + "," + (0.9 * height) + " " + (0.95 * width) + "," + (0.9 * height));

        for (let k = 2; k < graphs[i].children.length / 2 + 1; k++) {
            let max_size = (graphs[i].children.length - 2) / 2;
            graphs[i].children[k].setAttribute('points', (0.1 * width) + "," + (k - 1) * 0.9 * height / (max_size + 1) + " " + 0.9 * width + "," + (k - 1) * 0.9 * height / (max_size + 1));
        }

        for (let k = graphs[i].children.length / 2 + 1; k < graphs[i].children.length; k++) {
            let max_size = (graphs[i].children.length - 2) / 2;
            graphs[i].children[k].setAttribute('points', (1.5 + (k - (graphs[i].children.length / 2 + 1))) * 0.9 * width / (max_size + 1) + "," + 0.1 * height + " " + (1.5 +(k - (graphs[i].children.length / 2 + 1))) * 0.9 * width / (max_size + 1) + "," + 0.9 * height);
        }
    }
}

function putInfront(k) {
    for (let i = 0; i < k; i++) {
        files[i].classList.add("asset-rotated");
        files[i].classList.add("asset-back-down-div");
        files[i].classList.remove("asset-back-up-div");
    }

    for (let i = k; i < files.length; i++) {
        files[i].classList.remove("asset-rotated");
        files[i].classList.add("asset-back-up-div");
        files[i].classList.remove("asset-back-down-div");
    }
    files[k].classList.remove("asset-back-up-div");
    files[k].classList.remove("asset-back-down-div");
    
    resetZIndex();
    files[k].style.zIndex = files.length + 1;
}

function resetZIndex() {
    for (let i = 0; i < files.length; i++) {
        files[i].style.zIndex = files.length - i;
    }
}