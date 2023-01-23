const add = (x, y) => {
    return x + y;
};

const subtract = (x, y) => {
    return x - y;
};

const multiply = (x, y) => {
    return x * y;
};

const divide = (x, y) => {
    return x / y;
};

const operate = (operator, x, y) => {
    switch(operator) {
        case '+':
            return add(x, y);
            break;
        case '-':
            return subtract(x, y);
            break
        case '*':
            return multiply(x, y);
            break;
        case '/':
            return divide(x, y);
            break
    }
}