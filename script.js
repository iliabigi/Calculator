const buttons = [...document.querySelectorAll("button")];
for (let ref of buttons) {
    ref.addEventListener("click", e => {
        // console.log(Number(e.target.textContent))
        if (!Number.isNaN(Number(e.target.textContent))) {
            if (variables.num1 === undefined) {
                variables.num1 = Number(e.target.textContent);
                display(variables.num1);

            } else if (variables.num2 === undefined) {
                variables.num2 = Number(e.target.textContent);
                display(variables.num2);

            } else {
                console.log("test")
                console.log("test2")
                variables.num1 = operate(variables.num1, variables.num2, variables.operator);
                variables.num2 = Number(e.target.textContent);
            }
        } else if (operators.includes(e.target.textContent)) {
            console.log("HIIII")
            variables.operator = e.target.textContent;
        } else if (e.target.textContent === "Clear") {
            variables.num1 = undefined;
            variables.num2 = undefined;
            variables.operator = undefined;
        } else if (e.target.textContent === "=") {
            display(operate(variables.num1, variables.num2, variables.operator));
        }
        console.log(variables);
    })
}

function display(num) {
    const calcDisplay = document.querySelector("#display");
    calcDisplay.textContent = num;
}


// console.log(Number("+"))
// console.log(typeof ("2"));

const variables = {
    num1: undefined,
    num2: undefined,
    operator: undefined
};

const operators = ["-", "+", "/", "*"];

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