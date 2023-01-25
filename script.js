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
    if (y == 0) {
        return 'ERR';
    }
    return x / y;
};

const plusMinus = (x) => {
    return -x;
}

const percentage = (x) => {
    return x / 100;
}

const operate = (operator, x, y) => {
    switch(operator) {
        case '+':
            operationString = `${x} + ${y} =`;
            return add(x, y);
            break;
        case '-':
            operationString = `${x} - ${y} =`;
            return subtract(x, y);
            break
        case '*':
            operationString = `${x} * ${y} =`;
            return multiply(x, y);
            break;
        case '/':
            operationString = `${x} / ${y} =`;
            return divide(x, y);
            break;
        case '+/-':
            return plusMinus(x);
            break;
        case '%':
            operationString = `0.01 * ${y} =`;
            return percentage(x);
            break;
    }
}



const calculatorNumberButtons = document.querySelectorAll('.number');
const calculatorDisplay = document.querySelector('.display-text');
const answerDisplay = document.querySelector('.captured-number');
const calculatorDecimalButton = document.querySelector('.decimal');
const calculatorOperatorButtons = document.querySelectorAll('.operator');
const calculatorEqualsButton = document.querySelector('.equals');
const calculatorClearButton = document.querySelector('.clear-button');
const calculatorBackspaceButton = document.querySelector('.backspace');
const calculatorPlusMinusButton = document.querySelector('.plus-minus');


let operationString = ''
let x = null;
let currentOperator = null;
let answered = false;
let beginFlag = true;
let newNum = false;
let repeat = false;



const clearCalculator = () => {
    x = null;
    currentOperator = null;
    answered = false;
    calculatorDisplay.textContent = 0;
    answerDisplay.textContent = '';
    beginFlag = true;

}

const checkDecimal = () => {
    if (calculatorDisplay.textContent.split('').includes('.')) {
        console.log('includes decimal');
        return;
    };
    updateDisplay('.');
};

const getDisplayedNumber = () => {
    return parseInt(calculatorDisplay.textContent);
};

const backspace = () => {
    calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, calculatorDisplay.textContent.length - 1);
};

const makeNegative = () => {
    calculatorDisplay.textContent = parseInt(getDisplayedNumber()) * -1;
};

const updateDisplay = (num) => {
    if (beginFlag) {
        beginFlag = false;
        calculatorDisplay.textContent = '' + num;
        return;
    };
    if (newNum == true) {
        calculatorDisplay.textContent = '';
        calculatorDisplay.textContent += num;
        newNum = false;
        return;
    };
    if (newNum == false) {
        calculatorDisplay.textContent += num;
    };  
};

const getX = () => {
    return x;
};

const declareNewNum = () => {
    newNum = true;
};

const setOperator = (operator) => {
    currentOperator = operator;
};


const setNumbers = () => {
    if (x == null){
            x = getDisplayedNumber();
            return;
        };

    if (answered == true) {
        x = getDisplayedNumber();
        answered = false;
        return;
    };
};




const shouldCalculatorOperate = () => {
    if (answered == false && x!=null) {
        calculatorDisplay.textContent = operate(currentOperator, getX(), getDisplayedNumber());
        answerDisplay.textContent = operationString;
        answered = true;
    }
    setNumbers();
}









calculatorClearButton.addEventListener('click', clearCalculator);
calculatorDecimalButton.addEventListener('click', checkDecimal);
calculatorBackspaceButton.addEventListener('click', backspace);
calculatorPlusMinusButton.addEventListener('click', makeNegative);



calculatorNumberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        updateDisplay(button.textContent);
    });
});



calculatorOperatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        declareNewNum();
        shouldCalculatorOperate();
        setOperator(button.textContent);        
    })
});

calculatorEqualsButton.addEventListener('click', () => {
    shouldCalculatorOperate();
    repeat = true;
});

