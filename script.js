let displayValue = '';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;

function appendToDisplay(value) {
    // Prevent multiple decimals
    if (value === '.' && displayValue.includes('.')) return;
    displayValue += value;
    document.getElementById('display').value = displayValue;
}

function clearDisplay() {
    displayValue = '';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    document.getElementById('display').value = '';
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                alert("Error: Cannot divide by zero!");
                return null;
            }
            return a / b;
        default:
            return null;
    }
}

function calculateResult() {
    if (displayValue === '' || firstOperand === null || currentOperator === null) return;

    secondOperand = parseFloat(displayValue);
    const result = operate(currentOperator, firstOperand, secondOperand);
    if (result !== null) {
        displayValue = result.toString();
        document.getElementById('display').value = displayValue;
        firstOperand = result; // Use result as the first operand for the next operation
        currentOperator = null; // Reset operator after calculation
    }
}

function setOperator(operator) {
    if (displayValue === '') return;

    if (firstOperand === null) {
        firstOperand = parseFloat(displayValue);
    } else if (currentOperator) {
        secondOperand = parseFloat(displayValue);
        const result = operate(currentOperator, firstOperand, secondOperand);
        if (result !== null) {
            displayValue = result.toString();
            document.getElementById('display').value = displayValue;
            firstOperand = result; // Use result as the first operand for the next operation
        }
    }
    currentOperator = operator;
    displayValue = ''; // Clear display for the next number input
}

// Event listeners for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculateResult();
        } else if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else {
            appendToDisplay(value);
        }
    });
});