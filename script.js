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
    if (y==0 && x==0) {
        return 0;
    }
    if (y == 0) {
        return 'ERR';
    }
    return x / y;
};

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
    };
};



const calculatorNumberButtons = document.querySelectorAll('.number');
const calculatorDisplay = document.querySelector('.display-text');
const operationDisplayText = document.querySelector('.captured-number');
const calculatorDecimalButton = document.querySelector('.decimal');
const calculatorOperatorButtons = document.querySelectorAll('.operator');
const calculatorEqualsButton = document.querySelector('.equals');
const calculatorClearButton = document.querySelector('.clear-button');
const calculatorBackspaceButton = document.querySelector('.backspace');
const calculatorPlusMinusButton = document.querySelector('.plus-minus');
const calculatorPercentButton = document.querySelector('.percent');




let operationString = '';
let x = null;
let y = null;
let currentOperator = null;
let beginFlag = true;
let newNum = false;


const clearCalculator = () => {
    x = null;
    y = null;
    currentOperator = null;
    calculatorDisplay.textContent = 0;
    operationDisplayText.textContent = '';
    operationString = '',
    beginFlag = true;
};

const checkDecimal = () => {
    if (calculatorDisplay.textContent.split('').includes('.')) {
        console.log('includes decimal');
        return;
    };
    updateDisplay('.');
};

const getDisplayedNumber = () => {
    return parseFloat(calculatorDisplay.textContent);
};

const backspace = () => {
    calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, calculatorDisplay.textContent.length - 1);
    checkDisplay();
};

const makeNegative = () => {
    calculatorDisplay.textContent = parseFloat(getDisplayedNumber()) * -1;
};

const makePercentage = () => {
    calculatorDisplay.textContent = parseFloat(getDisplayedNumber()) / 100;
    setX();
};

const giveErrorMessage = () => {
    clearCalculator();
    calculatorDisplay.textContent = 'You messed up';
};

const checkForError = () => {
    if (calculatorDisplay.textContent == 'ERR') {
        giveErrorMessage()
    }
};

const setX = () => {
    x = getDisplayedNumber();
};

const checkDisplay = () => {
    if (calculatorDisplay.textContent == '') {
        calculatorDisplay.textContent = 0;
        newNum = true;
    }
};

const declareNewNum = () => {
    newNum = true;
};

const setOperator = (operator) => {
    currentOperator = operator;
    declareNewNum();
};

const updateDisplay = (num) => {
    if (beginFlag) {
        beginFlag = false;
        newNum = false;
        calculatorDisplay.textContent = '' + num;
        return;
    };
    if (newNum == true) {
        y = null;
        calculatorDisplay.textContent = '';
        calculatorDisplay.textContent += num;
        newNum = false;
        return;
    };
    if (newNum == false) {
        calculatorDisplay.textContent += num;
    };  
};

const shouldCalculatorOperate = (operator) => {
    if (x == null){
        x = getDisplayedNumber();
        operationDisplayText.textContent = `${x} ${operator}`;
        return;
    };

    if (currentOperator == null) {
        operationDisplayText.textContent = `${x} ${operator}`;
        return;
    } 

    if (y == null) {
        y = getDisplayedNumber();
        calculatorDisplay.textContent = operate(currentOperator, x, y);
        operationDisplayText.textContent = `${x} ${currentOperator} ${y} =`;
        x = getDisplayedNumber();
        checkForError();
    }

    operationDisplayText.textContent = `${x} ${operator}`;
    checkForError();
};

const equalsButtonOperation = () => {
    if (x == null || currentOperator == null) {
        return;
    };

    if (y == null) {
        y = getDisplayedNumber()
        calculatorDisplay.textContent = operate(currentOperator, x, y);
        operationDisplayText.textContent = `${x} ${currentOperator} ${y} =`
        x = getDisplayedNumber();
        checkForError();
        return;
    }
    calculatorDisplay.textContent = operate(currentOperator, x, y);
    operationDisplayText.textContent = `${x} ${currentOperator} ${y} =`
    x = getDisplayedNumber();

    checkForError();
}






calculatorClearButton.addEventListener('click', clearCalculator);
calculatorDecimalButton.addEventListener('click', checkDecimal);
calculatorBackspaceButton.addEventListener('click', backspace);

calculatorPlusMinusButton.addEventListener('click', makeNegative);
calculatorPercentButton.addEventListener('click', makePercentage);

calculatorNumberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        updateDisplay(button.textContent);
    });
});

calculatorOperatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        shouldCalculatorOperate(button.textContent);
        setOperator(button.textContent);
    });
});

calculatorEqualsButton.addEventListener('click', () => {
    declareNewNum();
    equalsButtonOperation();
});

document.addEventListener('keydown', (e) => {
    // console.log(e.keyCode)
    switch(e.keyCode) {
        case 96:
            updateDisplay(0);
            break;
        case 97:
            updateDisplay(1);
            break;
        case 98:
            updateDisplay(2);
            break;
        case 99:
            updateDisplay(3);
            break;
        case 100:
            updateDisplay(4);
            break;
        case 101:
            updateDisplay(5);
            break;
        case 102:
            updateDisplay(6);
            break;
        case 103:
            updateDisplay(7);
            break;
        case 104:
            updateDisplay(8);
            break;
        case 105:
            updateDisplay(9);
            break;
        case 110:
            checkDecimal();
            break;
        case 13:
            declareNewNum();
            equalsButtonOperation();
            break;
        case 107:
            shouldCalculatorOperate('+');
            setOperator('+'); 
            break;
        case 109:
            shouldCalculatorOperate('-');
            setOperator('-'); 
            break;
        case 106:
            shouldCalculatorOperate('*');
            setOperator('*'); 
            break;
        case 111:
            shouldCalculatorOperate('/');
            setOperator('/'); 
            break;
        case 8:
            backspace();
            break;
        case 46:
            clearCalculator();
            break;
        case 53:
            makePercentage();
            break;
        case 189:
            makeNegative();
            break;
    };
});

