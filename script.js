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