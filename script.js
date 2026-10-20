const calcVariables = {
    num1: undefined,
    num2: undefined,
    operator: undefined,
    hasOperator: false
};

const operators = ["-", "+", "/", "*"];

const buttons = [...document.querySelectorAll("button")];

const calcDisplay = document.querySelector("#display");

let SWITCH = false
let result = 0
console.log(SWITCH)

for (let ref of buttons) {

    ref.addEventListener("click", e => {

        if (e.target.textContent === "wake up") {
            SWITCH = true;
            display("hello... what can I do for ya?")
        }

        if (e.target.textContent === "bye") {
            SWITCH = false;
            display("alrighty I'm going to bed now :>");
            setTimeout(display, 5000, "");
        }

        if (SWITCH) {
            if (!Number.isNaN(Number(e.target.textContent))) {
                if (!calcVariables.hasOperator) {
                    result = (result * 10) + Number(e.target.textContent);
                    calcVariables.num1 = result;
                    display(result);
                } else {
                    result = (result * 10) + Number(e.target.textContent);
                    calcVariables.num2 = result;
                    display(result);
                }
            } else if (operators.includes(e.target.textContent)) {
                if (calcVariables.num2 !== undefined && calcVariables.hasOperator === true) {
                    let equals = operate(calcVariables.num1, calcVariables.num2, calcVariables.operator);
                    //In case there's an undefined in the numbers
                    if (equals === "undefined detected") undefinedHandler();
                    //In case user divides by 0
                    else if (equals === Infinity) {
                        display("oi mate you can't do that... I'll ignore just this once");
                        setTimeout(display, 1000, calcVariables.num1);
                        calcVariables.num2 = undefined;
                        result = 0;
                    } else {
                        calcVariables.num1 = equals;
                        display(calcVariables.num1);
                    }
                }
                calcVariables.hasOperator = true;
                calcVariables.operator = e.target.textContent;
                result = 0;
            } else if (e.target.textContent === "AC") {
                calcVariables.num1 = undefined;
                calcVariables.num2 = undefined;
                calcVariables.operator = undefined;
                calcVariables.hasOperator = false;

                result = 0;
                display("Cleaning everything.");
            } else if (e.target.textContent === "C") {
                (calcVariables.num2 === undefined) ? calcVariables.num1 = undefined : calcVariables.num2 = undefined;
                display("Enter your number:");
                result = 0;
            } else if (e.target.textContent === "=") {
                let equals = operate(calcVariables.num1, calcVariables.num2, calcVariables.operator);
                //In case there's an undefined in the equation
                if (equals === "undefined detected") undefinedHandler();
                //In case user divides by 0
                else if (equals === Infinity) {
                    display("oi mate you can't do that... I'll ignore just this once");
                    setTimeout(display, 1000, calcVariables.num1);
                    calcVariables.num2 = undefined;
                    calcVariables.hasOperator = false
                    result = 0;
                } else {
                    calcVariables.num1 = equals;
                    calcVariables.hasOperator = false

                    display(equals);
                    result = 0;
                }
            }
                
            console.log(calcVariables);
        }

        if (!SWITCH && calcDisplay.textContent === "") {
            display("the calculator is sleeping... maybe try waking it up? ")
        }
    })
}

function display(num) {
    calcDisplay.textContent = num;
}

//If any of the numbers are undefined
//The calculator will reset it self
function undefinedHandler() {
    calcVariables.num1 = undefined;
    calcVariables.num2 = undefined;
    calcVariables.hasOperator = false
    result = 0;

    display("cmon man you can't do operations on undefined stuff!");
    setTimeout(display, 1000, "cleaning my data.");
    setTimeout(display, 3000, "");
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
