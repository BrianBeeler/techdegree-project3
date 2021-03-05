window.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector('#name').focus();
    document.querySelector("#other-job-role").style.display = "none";
    enableColor(false);
});

function onTitleChange (e) {
    if (e.target.value === "other") {
        document.querySelector("#other-job-role").style.display = "";
    } else {
        document.querySelector("#other-job-role").style.display = "none";
    }
} 

function onDesignSelect (e) {
    if (e.target.value === "js puns") {
        enableColor();
        showColors();
    } else if (e.target.value === "heart js") {
        enableColor();
        showColors("heart js");
    } else {
        enableColor(false);
    }

}

function enableColor(enable=true) {
    if (enable) {
        document.querySelector("#shirt-colors").style.display = "";
    } else {
        document.querySelector("#shirt-colors").style.display = "none";
    }

}

function showColors(colorsToShow = 'js puns') {

    let colorsToHide;

    if (colorsToShow === 'js puns') {
        colorsToHide = "heart js";
    } else {
        colorsToHide = 'js puns';
    }

    let hidden = document.querySelectorAll(`[data-theme='${colorsToHide}']`);
    let shown = document.querySelectorAll(`[data-theme='${colorsToShow}'`);

    for (let i = 0; i<hidden.length; i++) {
        hidden[i].style.display = "none";
    }
    for (let j = 0; j< shown.length; j++) {
        shown[j].style.display = "";
    }

}