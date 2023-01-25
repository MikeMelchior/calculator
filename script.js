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

const operate = (operator, x, y) => {
    switch(operator) {
        case '+':
            operationString = `${x} + ${y} =`;
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

// set operation string variable to display in upper portion of calculator
    // set operation string after operation in operate function;





const calculatorNumberButtons = document.querySelectorAll('.number');
const calculatorDisplay = document.querySelector('.display-text');
const capturedNumberDisplay = document.querySelector('.captured-number');
const calculatorDecimalButton = document.querySelector('.decimal');
const calculatorOperatorButtons = document.querySelectorAll('.operator');
const calculatorEqualsButton = document.querySelector('.equals');
const calculatorClearButton = document.querySelector('.clear-button');

let operationString = ''
// let capturedNum = null;
// let currentNum = null;
// let lastNum = null;
let x = null;
let y = null;
let answer = null;
let currentOperator = null;
let answered = false;






const clearCalculator = () => {
    capturedNum = null;
    currentOperator = null;
    answered = false;
    calculatorDisplay.textContent = 0;
    capturedNumberDisplay.textContent = ''
}

const checkDecimal = () => {
    if (calculatorDisplay.textContent.split('').includes('.')) {
        console.log('includes decimal');
        return;
    };
    updateDisplay('.');
}


const setCurrentNum = () => {
    currentNum = parseInt(calculatorDisplay.textContent);
    return currentNum;
}




const updateDisplay = (num) => {
    if (calculatorDisplay.textContent == '0') {
        calculatorDisplay.textContent = '';
    }
    calculatorDisplay.textContent += num;
    
};







const updateCapturedNumberDisplay = (text) => {
    capturedNumberDisplay.textContent = text; 
}



const checkOperator = (operator) => {
    currentOperator = operator;
};

const calculatorOperation = (operator) => {







    
    // update captured number //
    
    // show answer
    
    // erase current operator??
    // 
    // may need to establish an 'answered' flag so that you cannot add numbers
    // onto the end of the answer displayed from the previous operation

    //
};







calculatorClearButton.addEventListener('click', clearCalculator);
calculatorDecimalButton.addEventListener('click', checkDecimal);


calculatorNumberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        return updateDisplay(button.textContent);
    });
});



calculatorOperatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        checkOperator(button.textContent);
        calculatorOperation(currentOperator);
        
    })
});

calculatorEqualsButton.addEventListener('click', () => {
    calculatorOperation(currentOperator);
});

