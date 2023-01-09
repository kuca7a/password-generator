const slider = document.getElementById("password-range");
const output = document.getElementById("password-length");

slider.oninput = function(){
    output.innerHTML = this.value;
}

// generator functions

const resultElement = document.getElementById('result');
const lengthElement = document.getElementById('password-range');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generateElement = document.getElementById('generate');
const clipboardElement = document.getElementById('clipboard');

const randomFunction = {
    upper: getUpper,
    lower: getLower,
    number: getNumber,
    symbol: getSymbol
};

generateElement.addEventListener('click', () => {
    
    const length = +lengthElement.value;
    const hasLower = lowercaseElement.checked;
    const hasUpper = uppercaseElement.checked;
    const hasNumber = numbersElement.checked;
    const hasSymbols = symbolsElement.checked;

    resultElement.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbols, length);
})

function generatePassword(lower, upper, number, symbol, length){

    let newPassword = '';

    const optionsCount = lower + upper + number + symbol;

    // console.log('optionsCount: ' + optionsCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    // console.log('typesArr: ' + typesArr);

    if(optionsCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i+= optionsCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName: ' + funcName)

            newPassword += randomFunction[funcName]();
        });
    }

    const finalPassword = newPassword.slice(0, length);

    return finalPassword;
}   

clipboardElement.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultElement.innerText;

    if(!password){
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
})

function getUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getSymbol(){
    const symbols = '!?"£$%^&*#@=<>:;,./';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
