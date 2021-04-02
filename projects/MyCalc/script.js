const calculator = { 
                    displayValue:"0",
                    operator:null,
                    waitingForSecondOperand: false,
                    firstOperand:null
                 };

const keys = document.querySelector('.calculator-buttons');
keys.addEventListener('click',(event)=>{
    const {target} = event;
    
    if(!target.type === 'button'){
        console.log('not a button!');
        return;
        
    }else if(target.classList=='operator'){
         handleOperators(target.value);
        
    }else if(target.classList=='decimal'){
        
        handleDecimal(target.value);
    
    }else if(target.classList=='back-trace'){
        backTrace();
    }else if(target.classList=='all-clear'){
        clearAll(target.value);
    }else{
        
        inputDigit(target.value);
    }

});


function updateDisplay(){
    const screen = document.querySelector('.calculator-screen');
    screen.value = calculator.displayValue;
}
function inputDigit(digit){
    const {displayValue,waitingForSecondOperand} = calculator;
   
    if(waitingForSecondOperand===true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }else{
    calculator.displayValue = displayValue === '0'?digit:displayValue+digit;
    }
    updateDisplay();
    console.log(calculator);
};
function handleDecimal(dot){
    
    if(calculator.waitingForSecondOperand === true){
        calculator.waitingForSecondOperand =false;
        calculator.displayValue = "0."
        
        
    }
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue+=dot;
    }
    
    updateDisplay();
}
function handleOperators(nextOperator){
    const{firstOperand,operator,displayValue}=calculator;

    const inputValue = parseFloat(displayValue);

    if(calculator.waitingForSecondOperand&&operator){
        calculator.operator = nextOperator;
        console.log(calculator)
        return;
    }

    if(firstOperand == null && !isNaN(inputValue)){
    calculator.firstOperand = inputValue;
    console.log(calculator.firstOperand);
    }else if(operator){
        const result = calculate(firstOperand,inputValue,operator);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
        


    }
    
    calculator.waitingForSecondOperand=true;
    calculator.operator = nextOperator;
    console.log(calculator);
    updateDisplay();
}
function calculate(firstOperand,secondOperand,operator){
   return (operator==="+")?firstOperand+secondOperand:
   (operator==="-")?firstOperand-secondOperand:
   (operator==="/")?firstOperand/secondOperand:
   (operator==="*")?firstOperand*secondOperand:
   secondOperand;

//    if (operator === '+') {
//     return firstOperand + secondOperand;
//   } else if (operator === '-') {
//     return firstOperand - secondOperand;
//   } else if (operator === '*') {
//     return firstOperand * secondOperand;
//   } else if (operator === '/') {
//     return firstOperand / secondOperand;
//   }

//   return secondOperand;

    
};

function clearAll(){
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
    updateDisplay();
}

function backTrace(){
    const {displayValue,firstOperand} = calculator;
    if(calculator.displayValue === "0"){
        return;
    }
    
    if(calculator.waitingForSecondOperand===false){
    calculator.displayValue = displayValue.substring(0,displayValue.length-1);
    }else if(calculator.displayValue === ""&& calculator.waitingForSecondOperand === true){
        clearAll();
        
    
}else{
    calculator.firstOperand = firstOperand.toString();
    calculator.firstOperand = calculator.firstOperand.substring(0,calculator.length-1);
    calculator.firstOperand = Number(calculator.firstOperand);
    calculator.displayValue = displayValue.substring(0,displayValue.length-1);
    updateDisplay();

}
    console.log(firstOperand);
    console.log(calculator)
    updateDisplay();
}







updateDisplay();
