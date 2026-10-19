const calcVariables = {
    num1: undefined,
    num2: undefined,
    operator: undefined,
    hasOperator: false
};

const operators = ["-", "+", "/", "*"];

const buttons = [...document.querySelectorAll("button")];

let result = 0


for (let ref of buttons) {

    ref.addEventListener("click", e => {
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
            result = 0;
            calcVariables.hasOperator = true;
            calcVariables.operator = e.target.textContent;
        } else if (e.target.textContent === "Clear") {
            calcVariables.num1 = undefined;
            calcVariables.num2 = undefined;
            calcVariables.operator = undefined;
            calcVariables.hasOperator = false;

            result = 0;
            display(0);
        } else if (e.target.textContent === "=") {
            let equals = operate(calcVariables.num1, calcVariables.num2, calcVariables.operator);
            calcVariables.num1 = equals;
            calcVariables.num2 = undefined;

            result = 0;
            display(equals);
        }
        console.log(calcVariables);
    })
}

function display(num) {
    const calcDisplay = document.querySelector("#display");
    calcDisplay.textContent = num;
}

function add(expression) {
    const elements = expression.split(" ");
    return +elements[0] + +elements[2];
}

function subtract(expression) {
    const elements = expression.split(" ");
    return +elements[0] - +elements[2];
}

function multiply(expression) {
    const elements = expression.split(" ");
    return +elements[0] * +elements[2];
}

function divide(expression) {
    const elements = expression.split(" ");
    return +elements[0] / +elements[2];
}

function operate(number1, number2, operator) {
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