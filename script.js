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
const operationDisplayText = document.querySelector('.captured-number');
const calculatorDecimalButton = document.querySelector('.decimal');
const calculatorOperatorButtons = document.querySelectorAll('.operator');
const calculatorEqualsButton = document.querySelector('.equals');
const calculatorClearButton = document.querySelector('.clear-button');
const calculatorBackspaceButton = document.querySelector('.backspace');
const calculatorPlusMinusButton = document.querySelector('.plus-minus');
const calculatorPercentButton = document.querySelector('.percent');




let operationString = ''
let x = null;
let y = null;
let currentOperator = null;
let answered = false;
let beginFlag = true;
let newNum = false;
let repeat = false;


const clearCalculator = () => {
    x = null;
    y = null;
    currentOperator = null;
    answered = false;
    calculatorDisplay.textContent = 0;
    operationDisplayText.textContent = '';
    operationString = '',
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
    return parseFloat(calculatorDisplay.textContent);
};

const backspace = () => {
    calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, calculatorDisplay.textContent.length - 1);
    checkDisplay();
    setX(); 
};

const makeNegative = () => {
    calculatorDisplay.textContent = parseFloat(getDisplayedNumber()) * -1;
};

const makePercentage = () => {
    calculatorDisplay.textContent = parseFloat(getDisplayedNumber()) / 100;
    setX();
}

const giveErrorMessage = () => {
    clearCalculator();
    calculatorDisplay.textContent = 'You messed up';
}

const setX = () => {
    x = getDisplayedNumber();
};

const checkDisplay = () => {
    if (isNaN(calculatorDisplay.textContent)) {
        calculatorDisplay.textContent = 0;
    }
}

const getY = () => {
    return y;
};

const getAnswer = () => {
    return answer;
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







/////////////////////////////////////////////////////////////////////////







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
    }

    operationDisplayText.textContent = `${x} ${operator}`;
    
}


const equalsOperation = () => {
    if (x == null || currentOperator == null) {
        return;
    };

    if (y == null) {
        y = getDisplayedNumber()
        calculatorDisplay.textContent = operate(currentOperator, x, y);
        operationDisplayText.textContent = `${x} ${currentOperator} ${y} =`
        x = getDisplayedNumber();
        answered = true;
        return;
    }
    calculatorDisplay.textContent = operate(currentOperator, x, y);
    operationDisplayText.textContent = `${x} ${currentOperator} ${y} =`
    x = getDisplayedNumber();
    answered = true;


    // if == err clear()
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
    equalsOperation();
});



