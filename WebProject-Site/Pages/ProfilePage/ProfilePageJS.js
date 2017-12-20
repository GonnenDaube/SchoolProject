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

if (window.location.href.includes("ProfilePage.aspx")) {
    addLoadEvent(fileSetUp);
}

var files;

function fileSetUp() {
    files = document.getElementsByClassName("asset-file-div");
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