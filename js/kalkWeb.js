// helpers
function isNumericDigit(digit) {
  return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(digit);
}

function isOperator(digit) {
  return ['÷', '+', 'x', '-', '='].includes(digit);
}


let display = ['0'];

const [displayElement] = document.getElementsByClassName('screen');
const buttons = document.getElementsByTagName('button');

function updateDisplayValue() {
  displayElement.innerText = display.join('');
}

function handleClear() {
  display = ['0'];
  updateDisplayValue();
}

function getCurrentEntry() {
  return display[display.length - 1];
}

function setCurrentEntry(value) {
  display[display.length - 1] = value;
}

function handleCalculateResult() {
  const currentEntry = getCurrentEntry();
  if (isOperator(currentEntry)) return;
  if (display.length < 3) return;

  display.forEach((entry, i) => {
    if (entry === '÷') display[i] = '/';
    if (entry === 'x') display[i] = '*';
  });

  const result = eval(display.join(''));

  display = [];
  display[0] = `${result}`;
  updateDisplayValue();
}

function handleOperatorClick(operator) {
  if (operator === '=') return handleCalculateResult();

  const currentEntry = getCurrentEntry();
  const isCurrentEntryAOperator = isOperator(currentEntry);

  if (isCurrentEntryAOperator) {
    setCurrentEntry(operator);
    return updateDisplayValue();
  }

  if (currentEntry[currentEntry.length - 1] === '.') {
    setCurrentEntry(`${currentEntry}0`);
  }
  
  display.push(operator);
  updateDisplayValue();
  console.log(display)
}

function handleNumericDigitClick(number) {
  let currentEntry = getCurrentEntry();

  if (isOperator(currentEntry)) {
    display.push(number);
    return updateDisplayValue();
  }

  let newValue = '';

  if (currentEntry === '0') {
    newValue = number;
  } else {
    newValue = `${currentEntry}${number}`
  }

  setCurrentEntry(newValue);
  updateDisplayValue();
}

function handleDecimalPointClick() {
  const currentEntry = getCurrentEntry();
  if (currentEntry.includes('.')) return;
  if (isOperator(currentEntry)) return;

  setCurrentEntry(`${currentEntry}.`);
}

function handleButtonClick(digit) {
  if (digit === 'C') return handleClear();
  if (digit === '.') return handleDecimalPointClick();
  if (isOperator(digit)) return handleOperatorClick(digit);
  if (isNumericDigit(digit)) return handleNumericDigitClick(digit);
}

Array.from(buttons).forEach((item) => {
  item.addEventListener('click', (event) => {
    const buttonValue = event.target.innerText;
    handleButtonClick(buttonValue);
  })
})
