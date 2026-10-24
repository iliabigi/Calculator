const calcVariables = {
    num1: undefined,
    num2: undefined,
    operator: undefined,
    hasOperator: false
};

const operators = ["-", "+", "/", "*"];

const buttons = [...document.querySelectorAll("button")];

const calcDisplay = document.querySelector("#display");
const calcMessageDisplay = document.querySelector("#displayText")
const num1Display = document.querySelector("#num1");
const operatorDisplay = document.querySelector("#operator");
const num2Display = document.querySelector("#num2");
const displayText = num1Display.textContent;
const screen = document.querySelector("body");

let SWITCH = false;
let decimalPoint = false;
let decimalPower = 1;
let result = 0
console.log(SWITCH)


screen.addEventListener("keydown", e => {
    console.log(e.key);
    const findButton = buttons.find(val => val.dataset.key === e.key);

    if (e.key === "Enter") {
        e.preventDefault();
    }

    findButton.focus();
    findButton.click();
})


for (let ref of buttons) {

    ref.addEventListener("click", e => {
        if (e.target.textContent === "wake up") {
            result = 0;
            SWITCH = true;
            displayMessage("hello... what can I do for ya?")
        }

        if (e.target.textContent === "bye") {
            result = 0;
            SWITCH = false;

            num1Display.textContent = displayText;
            num2Display.textContent = displayText;
            operatorDisplay.textContent = displayText;
            displayMessage("alrighty I'm going to bed now :>");
            setTimeout(displayMessage, 5000, "");
        }

        if (e.target.textContent === ".") {
            decimalPoint = true;
        }

        if (SWITCH) {
            if (!Number.isNaN(Number(e.target.textContent))) {
                if (!calcVariables.hasOperator) {
                    if (!decimalPoint) {
                        result = (result * 10) + Number(e.target.textContent);
                        calcVariables.num1 = result;
                        display(result);
                    } else {
                        result = ((result * (10 ** decimalPower)) + Number(e.target.textContent)) / (10 ** decimalPower);
                        calcVariables.num1 = result;
                        decimalPower++;
                        display(result);
                    }
                } else {
                    if (!decimalPoint) {
                        result = (result * 10) + Number(e.target.textContent);
                        calcVariables.num2 = result;
                        display(result);
                    } else {
                        result = ((result * (10 ** decimalPower)) + Number(e.target.textContent)) / (10 ** decimalPower);
                        calcVariables.num2 = result;
                        decimalPower++;
                        display(result);
                    }
                    
                }

            } else if (operators.includes(e.target.textContent)) {
                decimalPoint = false;
                decimalPower = 1;
                calcVariables.operator = e.target.textContent;
                num1Display.textContent = calcVariables.num1;
                operatorDisplay.textContent = calcVariables.operator

                if (calcVariables.num2 !== undefined && calcVariables.hasOperator === true) {
                    let equals = operate(calcVariables.num1, calcVariables.num2, calcVariables.operator);
                    //In case there's an undefined in the numbers
                    if (equals === "undefined detected") undefinedHandler();
                    //In case user divides by 0
                    else if (equals === Infinity) {
                        displayMessage("oi mate you can't do that... I'll ignore it just this once");
                        display(calcVariables.num1);
                        calcVariables.num2 = undefined;
                        num2Display.textContent = displayText;
                        result = 0;
                    } else {
                        calcVariables.num1 = equals;
                        num2Display.textContent = calcVariables.num2;
                        display(calcVariables.num1);
                    }
                }  

                calcVariables.hasOperator = true;
                result = 0;

            } else if (e.target.textContent === "AC") {
                calcVariables.num1 = undefined;
                calcVariables.num2 = undefined;
                calcVariables.operator = undefined;
                calcVariables.hasOperator = false;

                num1Display.textContent = displayText;
                num2Display.textContent = displayText;
                operatorDisplay.textContent = displayText;

                decimalPoint = false;
                decimalPower = 1;
                result = 0;
                display("");
                displayMessage("Cleaning everything.");

            } else if (e.target.textContent === "C") {
                decimalPoint = false;
                decimalPower = 1;
                (calcVariables.num2 === undefined) ? calcVariables.num1 = undefined : calcVariables.num2 = undefined;
                (calcVariables.num1 === undefined) ? num1Display.textContent = displayText : num2Display.textContent = displayText;

                displayMessage("Enter your number:");
                result = 0;

            } else if (e.target.textContent === "=") {
                decimalPoint = false;
                decimalPower = 1;
                num1Display.textContent = calcVariables.num1;
                num2Display.textContent = calcVariables.num2;
                let equals = operate(calcVariables.num1, calcVariables.num2, calcVariables.operator);
                //In case there's an undefined in the equation
                if (equals === "undefined detected") undefinedHandler();
                //In case user divides by 0
                else if (equals === Infinity) {
                    displayMessage("oi mate you can't do that... I'll ignore it just this once");
                    display(calcVariables.num1);
                    calcVariables.num2 = undefined;
                    calcVariables.hasOperator = false
                    operatorDisplay.textContent = displayText;
                    num2Display.textContent = displayText;
                    result = 0;
                } else {
                    calcVariables.num1 = equals;
                    calcVariables.hasOperator = false


                    display(equals);
                    result = 0;
                }
            }
    
            // console.log(calcVariables);
        }

        if (!SWITCH && calcMessageDisplay.textContent === "") {
            displayMessage("The calculator is sleeping... maybe try waking it up?")
        }
    })
}

function display(num) {
    calcDisplay.textContent = num;
}

function displayMessage(num) {
    calcMessageDisplay.textContent = num;
}

//If any of the numbers are undefined
//The calculator will reset it self
function undefinedHandler() {
    calcVariables.num1 = undefined;
    calcVariables.num2 = undefined;
    calcVariables.hasOperator = false;

    num1Display.textContent = displayText;
    num2Display.textContent = displayText;
    operatorDisplay.textContent = displayText;

    result = 0;

    displayMessage("cmon man no operations on undefined stuff!");
    display("");
    setTimeout(displayMessage, 1000, "cleaning my data.");
    setTimeout(displayMessage, 3000, "");
} 

function operate(number1, number2, operator) {
    if (number1 === undefined || number2 === undefined) {
        return "undefined detected";
    }

    if (operator === "+") {
        return number1 + number2;
    } else if (operator === "-") {
        return number1 - number2;
    } else if (operator === "*") {
        return number1 * number2;
    } else {
        return number1 / number2;
    }
}
