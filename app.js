window.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector('#name').focus();
    document.querySelector("#other-job-role").style.display = "none";
});

function onTitleChange (e) {
    if (e.target.value === "other") {
        document.querySelector("#other-job-role").style.display = "";
    } else {
        document.querySelector("#other-job-role").style.display = "none";
    }
} 