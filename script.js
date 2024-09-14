const displayEl = document.querySelector('.display');
const keypadEl = document.querySelector('.keypad');

// const OPERANDS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

const INITIAL_VALUE_OPERATOR = '';
const INITIAL_VALUE_NUMBERS = [0];

let inputNumbers;
let inputOperator;

clear();

keypadEl.addEventListener('mousedown', function (e) {
  const keypadButton = e.target.closest('.key');
  if (!keypadButton) return;
  e.target.classList.add('keypress');
});

keypadEl.addEventListener('mouseup', function (e) {
  const keypadButton = e.target.closest('.key');
  if (!keypadButton) return;
  e.target.classList.remove('keypress');
});

keypadEl.addEventListener('click', handleKeypadClick);

function handleKeypadClick(e) {
  const keypadButton = e.target.closest('.key');
  if (!keypadButton) return;
  const keyFunction = keypadButton.dataset.function;
  if (keyFunction === 'clear') return clear();
  switch (keyFunction) {
    case 'clear':
      return clear();
    case 'sign':
      return updateSign();
    case 'percentage':
      return handlePercentage();
    case 'operator':
      return handleOperator(e.target.dataset.key);
    case 'number':
      return handleNumber(e.target.dataset.key);
    case 'decimal':
      return handleDecimal();
    case 'equals':
      return doCalc();
  }
  // if (OPERANDS.includes(key)) updateDisplay(displayEl.textContent + key);
  // if (key === 'sign') updateDisplay(+displayEl.textContent * -1);
}

function updateDisplay(value) {
  displayEl.textContent = Number.parseFloat(value);
}

function clear() {
  inputNumbers = [...INITIAL_VALUE_NUMBERS];
  inputOperator = INITIAL_VALUE_OPERATOR;

  updateDisplay(inputNumbers.at(0));
}

function updateSign() {
  const num = Number.parseFloat(inputNumbers.at(-1));
  if (num === 0) return;
  if (num < 0) updateInputNumbers(`${inputNumbers.at(-1).slice(1)}`);
  if (num > 0) updateInputNumbers(`-${inputNumbers.at(-1)}`);
  updateDisplay(inputNumbers.at(-1));
}

function handlePercentage() {
  updateInputNumbers(Number.parseFloat(inputNumbers.at(-1)) / 100);
  updateDisplay(inputNumbers.at(-1));
}

function handleNumber(number) {
  updateInputNumbers(`${inputNumbers.at(-1) ?? ''}${number}`);
  updateDisplay(inputNumbers.at(-1));
}

function handleOperator(operator) {
  if (inputNumbers.length === 2 && inputNumbers.at(-1)) {
    doCalc();
  }
  inputOperator = operator;
  inputNumbers[inputNumbers.length] = null;
}

function handleDecimal() {
  if (inputNumbers.at(-1).split('').includes('.')) return;
  updateInputNumbers(inputNumbers.at(-1) + '.');
}

function updateInputNumbers(value) {
  inputNumbers[inputNumbers.length - 1] = value;
}

function doCalc() {
  const [operand1, operand2] = inputNumbers;
  const num1 = Number.parseFloat(operand1);
  const num2 = Number.parseFloat(operand2);

  let result = '';
  switch (inputOperator) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = subtract(num1, num2);
      break;
    case 'x':
      result = multiply(num1, num2);
      break;
    case '/':
      result = divide(num1, num2);
      break;
  }
  inputNumbers[0] = Number.parseFloat(result).toFixed(2);
  inputNumbers.pop();
  updateDisplay(inputNumbers.at(-1));
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
