let result = 0

const variables = {
    num1: undefined,
    num2: undefined,
    operator: undefined,
    hasOperator: false
};

const operators = ["-", "+", "/", "*"];

const buttons = [...document.querySelectorAll("button")];



for (let ref of buttons) {

    ref.addEventListener("click", e => {
        if (!Number.isNaN(Number(e.target.textContent))) {
            if (!variables.hasOperator) {
                result = (result * 10) + Number(e.target.textContent);
                variables.num1 = result;
                display(result);
            } else {
                result = (result * 10) + Number(e.target.textContent);
                variables.num2 = result;
                display(result);
            }
        } else if (operators.includes(e.target.textContent)) {
            result = 0;
            variables.hasOperator = true;
            console.log("HIIII")
            variables.operator = e.target.textContent;
        } else if (e.target.textContent === "Clear") {
            variables.num1 = undefined;
            variables.num2 = undefined;
            variables.operator = undefined;
        } else if (e.target.textContent === "=") {
            let equals = operate(variables.num1, variables.num2, variables.operator);
            variables.num1 = equals;
            variables.num2 = undefined;
            display(equals);
        }
        console.log(variables);
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