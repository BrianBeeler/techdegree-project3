window.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector('#name').focus();
    renderOtherJobRole(false);
    renderColor(false);
    renderTotal(total);
});

function onTitleChange (e) {
    if (e.target.value === "other") {
        renderOtherJobRole();
    } else {
        renderOtherJobRole(false);
    }
} 

function onDesignSelect (e) {
    if (e.target.value === "js puns") {
        renderColor();
        showColors();
    } else if (e.target.value === "heart js") {
        renderColor();
        showColors("heart js");
    } else {
        renderColor(false);
    }

}

function renderOtherJobRole(enable = true) {
    if (enable) {
        document.querySelector("#other-job-role").style.display = "";
    } else {
        document.querySelector("#other-job-role").style.display = "none";
    }
  
}

function renderColor(enable=true) {
    if (enable) {
        document.querySelector("#shirt-colors").style.display = "";
    } else {
        document.querySelector("#shirt-colors").style.display = "none";
    }

}

function renderTotal(total) {
    document.querySelector('#activities-cost').innerHTML = `Total: $${total}`;
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

let total = 0;

function addEvents() {
    total = 0;
    let activities = document.querySelectorAll("[type='radio']:checked ~ .activity-cost");

    for (i=0; i < activities.length; i++) {
        total+= +(activities[i].innerText.substring(1))
    }
    renderTotal(total);
}

function removeSelection(e) {
    e.preventDefault();
    let activities = document.querySelectorAll("[type='radio']:checked");
    for (i=0; i < activities.length; i++) {
        activities[i].checked = false;
    }
    button = document.querySelector("#activities-button");
    button.focus();
    total = 0;
    renderTotal(0);
}

function preventDef(e) { 
    console.log("mouse down prevented");
    e.preventDefault();
}

function validateForm(event) {
    console.log("called")

    event.preventDefault();

    let name = document.querySelector("#name")
    
    if (name.value.length === 0) {
        name.focus();
        document.querySelector("#name").insertAdjacentHTML("afterend", `<p class="error">Error: Name must be greater than zero characters.</p>`)
        return
    }
    
    // Src: https://www.w3resource.com/javascript/form/email-validation.php
    let emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    let emailValidation =  emailPattern.test(document.querySelector("#email").value);

    if (!emailValidation) {
        // Focus to email
        document.querySelector("#email").focus();
        return
    }

    if (document.querySelector('#activities-cost').innerText === "Total: $0") {
        let el = document.createElement("p");
        el.innerHTML = "Hint: Must select at least one activity.";
        document.querySelector("#activities").appendChild(el);
        el.tabIndex = 0;
        el.focus()

        // Add hint
        return
    };

    if (document.querySelector("#payment").value === "credit-card") {
        
        let creditCardNum = document.querySelector("#cc-num");
        let zipCode = document.querySelector("#zip")
        let cvvNum = document.querySelector("#cvv");


        if (creditCardNum.value.length < 13 || creditCardNum.value.length > 16) {
            // focuse to credit card num field
            creditCardNum.focus()

            return
        }

        if (zipCode.value.length !== 5) {
            zipCode.focus();
            // focus to 5 digit zip
            return
        }

        if (cvvNum.value.length !== 3) {
            cvvNum.focus();
            // focus too cvv field
            return
        }
        // 13 - 16 card number
        // 5 digit zip code
        // 3 digit cvv

        debugger;
    }

    // Ensure name field isn't blank

    // "Email" field is a proper email address

    // if credit card selected
        // 13 - 16 card number
        // 5 digit zip code
        // 3 digit cvv

    // if any above fail, return, else submit form



}