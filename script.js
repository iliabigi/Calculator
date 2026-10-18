const buttons = [...document.querySelectorAll("button")];
for (let ref of buttons) {
    ref.addEventListener("click", e => {
        // console.log(Number(e.target.textContent))
        if (!Number.isNaN(Number(e.target.textContent))) {
            (variables.num1 === undefined) ? variables.num1 = Number(e.target.textContent)
                                           : (variables.num2 === undefined) ? 
                                           variables.num2 = Number(e.target.textContent)
                                           : operate(variables.num1, variables.num2);
        } else if (typeof e.target.textContent === "string") {
            variables.operator = e.target.textContent;
        }
        console.log(variables);
    })
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

function operate() {

}