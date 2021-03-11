window.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector('#name').focus();
    renderOtherJobRole(false);
    renderColor(false);
    renderTotal(total);
    triedToSubmit = false;
    docDotQS = document.querySelector.bind(document);
});


let validator = {
    isntBlank: (el) => {
        return validator.helpers.verifyElementHasValue(el) && el.value.length > 0;
    },
    isValidEmail: (el) => {
        // Src: https://www.regular-expressions.info/email.html
        let pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return (    validator.helpers.verifyElementHasValue(el) &&
                    pattern.test(el.value)               );
    },
    atLeastOneSelected: (el1, el2, el3, el4, el5, el6, el7) => {
    
        return (el1.checked || el2.checked || el3.checked || el4.checked || el5.checked || el6.checked || el7.checked);
    },
    thirteenToSixteenDigits: (el) => {
        let pattern = /[0-9]{13,16}/
        return (    validator.helpers.verifyElementHasValue(el) &&
                    pattern.test(el.value) );
    },
    nDigits: (el, n) => {
        let pattern = `[0-9]{${n}}`;
        pattern = new RegExp(pattern);
        return (    validator.helpers.verifyElementHasValue(el) &&
                    pattern.test(el.value) );
    },  
    errors : {
        name: `<p class="error" id="name-error">Error: Name must be greater than zero characters.</p>`,
        email: `<p id="email-error" class="error">Error: must be a proper email.</p>` ,
        selectedPlan: `<p id="subscription-error" tabindex="0" class="error">Error: Must select at least one item</p>` ,
        creditCardNum:  `<p id="ccn-error" class="error">Error: Credit Card Must be 13 - 16 digits`,
        creditCardZip: `<p class="error" id="zip-error">Error: Zip Code must be 5 digits`,
        creditCardCVV: `<p class="error" id="cvv-error">Error: Cvv must be 3 digits`
    },
    helpers: {
        verifyElementHasValue: (el) => {
            return el && el.value;
        }
    }
}


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

function onCCNUMChange(e) {
    console.log("Credit card number has changed");
    if (e.target.value.length >= 13 && e.target.value.length <= 16) {
        console.log("Check!!");
        if (document.querySelector("#ccn-error")) {
            document.querySelector("#ccn-error").remove();
        }
    }
}

function onZipNUMChange(e) {
    console.log("Credit card number has changed");
    if (e.target.value.length === 5) {
        console.log("Check!!");
        if (document.querySelector("#zip-error")) {
            document.querySelector("#zip-error").remove();
        }
    }
}

function onCvvChange(e) {
    console.log("Credit card ewnumber has changed");
    if (e.target.value.length === 3) {
        console.log("Check!!");
        if (document.querySelector("#cvv-error")) {
            document.querySelector("#cvv-error").remove();
        }
    }
}



function totalChanged() {
    console.log("total changed");
}

function validateForm(event) {

    let focusGiven = false;

    // Validates an element, and appends an error messsage if 
    // there is not one already
    let validate = (elTag, errorTag, validatorName, errName, nparam) => {
        let el = docDotQS(elTag)

        if (!validator[validatorName](el, nparam)) {
            let errorEl = docDotQS(errorTag)
            if (!errorEl) {
                el.insertAdjacentHTML("afterend", validator.errors[errName]);
            }
            if (!focusGiven) {
                el.focus()
                focusGiven = true;
            }
        }
    }
   
    event.preventDefault();

    // Validation for name and email fields
    validate('#name', '#name-error', "isntBlank", "name");
    validate("#email", '#email-error', "isValidEmail", "email");

    // Validation that at least one subscription type exists
    selectOneOf = [ docDotQS("#select1"), docDotQS("#select2"), docDotQS("#select3"), docDotQS("#select4") , docDotQS("#select5"), docDotQS("#select6"), docDotQS("#select7") ];
    if (!validator.atLeastOneSelected(...selectOneOf)) {
        let subscriptionError = docDotQS('#subscription-error')
        if (!subscriptionError) {
            docDotQS("#activities").insertAdjacentHTML("afterend", validator.errors.selectedPlan);
        }
        if (!focusGiven) {
            subscriptionError.focus()
            focusGiven = true;
        }

    }

    // Credit Card Validation
    if (document.querySelector("#payment").value === "credit-card") { 
        validate("#cc-num", "#ccn-error", "thirteenToSixteenDigits", "creditCardNum");
        validate("#zip", "#zip-error", "nDigits", "creditCardZip", 5);
        validate("#cvv", "#cvv-error", "nDigits", "creditCardCVV", 3);                
    }

    // if any above fail, return, else submit form
    if (!focusGiven) {
        document.querySelector('#main-form').submit();
    }
  

}