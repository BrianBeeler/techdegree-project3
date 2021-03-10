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
    if (total > 0) {
        if (document.querySelector('#subscription-error') ) {
            document.querySelector('#subscription-error').remove();
        }
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



function onNameChange(e) {

    console.log("On name change fired", e.target.value);

    if (e.target.value.length > 0) {
        if (document.querySelector("#name-error")) {
            document.querySelector("#name-error").remove();
        }
   
    }
}

function onEmailChange(e) {
    console.log('Email changes');
    if (e.target.value ) {
        let emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        let emailValidation =  emailPattern.test(e.target.value);
        console.log(emailValidation);
        if (emailValidation) {
            if (document.querySelector("#email-error")) {
                document.querySelector("#email-error").remove();
            }
            
        }
    }
}

function totalChanged() {
    console.log("total changed");
}

function validateForm(event) {
    console.log("called")

    event.preventDefault();

    let name = document.querySelector("#name")
    
    if (name.value.length === 0) {
        name.focus();
        document.querySelector("#name").insertAdjacentHTML("afterend", `<p class="error" id="name-error">Error: Name must be greater than zero characters.</p>`)
  
    }
    
    // Src: https://www.regular-expressions.info/email.html
    let emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    let emailValidation =  emailPattern.test(document.querySelector("#email").value);

    if (!emailValidation) {
        // Focus to email
        document.querySelector("#email").focus();
        document.querySelector("#email").insertAdjacentHTML("afterend", `<p id="email-error" class="error">Error: must be a proper email.</p>`)

    }

    if (document.querySelector('#activities-cost').innerText === "Total: $0") {
        if (!document.querySelector('#subscription-error')) {
            document.querySelector("#activities").insertAdjacentHTML("afterend", `<p id="subscription-error" class="error">Error: Must select at least one item</p>`)
        }
       
        let suberror = document.querySelector('#subscription-error');
        suberror.tabindex = 0;
        suberror.focus();
        // Add hint
  
    };

    if (document.querySelector("#payment").value === "credit-card") {
        
        let creditCardNum = document.querySelector("#cc-num");
        let zipCode = document.querySelector("#zip")
        let cvvNum = document.querySelector("#cvv");


        if (creditCardNum.value.length < 13 || creditCardNum.value.length > 16) {
            // focuse to credit card num field
            creditCardNum.insertAdjacentHTML("afterend", `<p class="error">Error: Credit Card Must be 13 - 16 characters`);
            creditCardNum.focus();

     
        }

        if (zipCode.value.length !== 5) {
            zipCode.insertAdjacentHTML("afterend", `<p class="error">Error: Zip Code must be 5 characters`);
            zipCode.focus();
            // focus to 5 digit zip
  
        }

        if (cvvNum.value.length !== 3) {
            cvvNum.insertAdjacentHTML("afterend", `<p class="error">Error: cvv must be 3 characters`);
            cvvNum.focus();
            // focus too cvv field
   
        }
        // 13 - 16 card number
        // 5 digit zip code
        // 3 digit cvv
        
        
    }

    // Ensure name field isn't blank

    // "Email" field is a proper email address

    // if credit card selected
        // 13 - 16 card number
        // 5 digit zip code
        // 3 digit cvv

    // if any above fail, return, else submit form
    return
    document.querySelector('#main-form').submit();

}