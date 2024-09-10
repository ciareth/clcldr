let display = document.getElementById('display');
let buttons = Array.from(document.querySelectorAll('button'));
let currentInput = '';
let operator = null;
let previousInput = '';
let resultDisplayed = false;

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if (value === 'C') {
            display.value = '';
            currentInput = '';
            previousInput = '';
            operator = null;
            resultDisplayed = false;
        } else if (value === '=') {
            if (operator && currentInput && previousInput) {
                display.value = evaluate();
                previousInput = display.value;
                currentInput = '';
                operator = null;
                resultDisplayed = true; // Mark that the result is displayed
            }
        } else if ('+-*/%'.includes(value)) {
            if (resultDisplayed) {
                previousInput = display.value; // Continue with the previous result
                resultDisplayed = false;
            } else {
                previousInput = currentInput;
            }
            operator = value;
            display.value = previousInput + ' ' + operator; // Show the operation
            currentInput = '';
        } else {
            if (resultDisplayed) {
                display.value = value; // Reset display with new number
                resultDisplayed = false;
            } else {
                currentInput += value;
                display.value = currentInput;
            }
        }
    });
});

function evaluate() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch (operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : 'Error';
        case '%': return num1 % num2;
        default: return '';
    }
}





