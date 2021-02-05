let allButtons = document.querySelectorAll('.button');
let screen = document.querySelector('#screen');
let lastInput = document.querySelector('#lastInput');
let lastPress = '';

function inputChange(event){
  // this function only accepts numbers and operators
  let char = event.target.innerText;

  // if the last button press was a number and equals was just pressed
  // reset the screen (otherwise add to the screen)
  if(lastPress === '=' && char.match(/[0-9]/g)){
    screen.innerText = '';
  }
  lastPress = '';

  // handle numbers
  if(char.match(/[0-9]/g)){

    screen.innerText += char;
    lastInput = char;
  }

  // handle operators
  if((!char.match(/[0-9]/g)) ){
    screen.innerText += char;
  }
}

function clear(){
  if(screen.innerText != ''){
    screen.innerText = '';
  } 
  else {
    lastInput.innerText = '';
  }
}

function doMath(){
  lastPress = '=';
  let arrOfSigns = screen.innerText.match(/[^0-9]/g);
  let arrOfNums = screen.innerText.match(/\d+/g);
  
  let numOfLoops = arrOfSigns.length;
  
  for(let i = 0; i < numOfLoops; i++){
    let num1 = arrOfNums[0];
    let num2 = arrOfNums[1];
    let sign = arrOfSigns[0];
    

    console.log(arrOfNums)

    let newNum;

    if(sign && sign === '+'){
      newNum = Number(num1) + Number(num2);
    } else if(sign && sign === '-'){
      newNum = Number(num1) - Number(num2);
    } else if(sign && sign === 'x'){
      newNum = Number(num1) * Number(num2);
    } else if(sign && sign === '/'){
      newNum = Number(num1) / Number(num2);
    }
    // console.log(arrOfNums);

    arrOfNums.shift();
    arrOfNums.shift();
    arrOfSigns.shift();
    arrOfNums.unshift(newNum);

  
    screen.innerHTML = newNum;
  }
  lastInput.innerText = screen.innerText;
}



function addAllEventListeners(arr){

  for(let i = 0; i < arr.length; i++){
    // its a number
    if(arr[i].innerText.match(/[0-9]/) && arr[i].innerHTML != ''){
      arr[i].addEventListener('click', inputChange);
    } else if (arr[i].innerText === 'C'){
      arr[i].addEventListener('click', clear);
    } else if (arr[i].innerText === '='){
      arr[i].addEventListener('click', doMath);
    } else {
      arr[i].addEventListener('click', inputChange);
    }
  }
}

addAllEventListeners(allButtons);