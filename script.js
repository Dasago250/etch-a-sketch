const canvas = document.querySelector('.canvas')
//Input number
const sizeCanvas = document.querySelector('#sizeCanvas');

//Color selection
const colorSelector = document.querySelector('#color');
let colorChoice = "";
const colorButton = document.querySelector('.defaultColor');
colorButton.addEventListener('click',() =>{
  colorChoice = "";
})

//Random Color
const randomColorButton = document.querySelector('.randomColor');
randomColorButton.addEventListener('click',() =>{
  colorChoice = "random";
})

//Shade
const shadeButton = document.querySelector('.shade');
shadeButton.addEventListener('click',() =>{
  colorChoice = "shade";
})

//First iteration
let firstIteration = true

if (firstIteration) {
  createPixel(sizeCanvas.value);
  createGrid(sizeCanvas.value);
  changeColor();   
}


//Receive input for the size of the canvas
sizeCanvas.addEventListener('input', () => {
  firstIteration = false;
  if (sizeCanvas.value < 1 || sizeCanvas.value > 64) {
    sizeCanvas.value = 32;
  }
  createGrid(sizeCanvas.value);
  removePixels();
  createPixel(sizeCanvas.value);
  changeColor();   
});


//Pass number to the grid canvas
function createGrid(size) {
  canvas.setAttribute('style',`grid-template: repeat(${size},1fr)/repeat(${size},1fr)`);
}             

//remove all children of the canvas
function removePixels() {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
}
//Create div, total the number given
function createPixel(size) {
  let numberPixels = Math.pow(size,2);
  for (let i = 0; i < numberPixels; i++) {
    let pixel = document.createElement('div');
    pixel.setAttribute('class', 'pixel');
    pixel.style.backgroundColor = 'rgb(255,255,255)'
    canvas.appendChild(pixel);
  }
}

//Change background color pixel
function changeColor() {
  const pixels  = document.querySelectorAll('.pixel');

  pixels.forEach(pixel =>{
    pixel.addEventListener('mouseenter',() =>{
      switch (colorChoice) {
        case "random":
          pixel.style.backgroundColor = `#${randomColor()}`
          break;
        case "shade":
          pixel.style.backgroundColor = Shade(pixel.style.backgroundColor);
          break;
        default:
          pixel.style.backgroundColor = colorSelector.value;
          break;
      }
    })
  })
}

//Random Color
function randomColor() {
  let randomColor = Math.floor(Math.random()*16777215).toString(16);
  return randomColor;
}

//Shade
function Shade(rgb) {
  // Our rgb to int array function again
  const rgbIntArray = rgb.replace(/ /g, '').slice(4, -1).split(',').map(e => parseInt(e));
  //grab the values in order of magnitude 
  const [lowest,middle,highest]=getLowestMiddleHighest(rgbIntArray);
  
  if(highest.val===0){
    return rgb;
  }

  const returnArray = [];

  returnArray[highest.index] = highest.val-(Math.min(highest.val,25.5));
  const decreaseFraction  =(highest.val-returnArray[highest.index])/ (highest.val);
  returnArray[middle.index]= middle.val -middle.val*decreaseFraction; 
  returnArray[lowest.index]= lowest.val -lowest.val*decreaseFraction;              
                            
  // Convert the array back into an rgb string
  return (`rgb(${returnArray.join()}) `);
}
//Check the order from highest to lowest in the rbg of the pixel
function getLowestMiddleHighest(rgbIntArray) {
  let highest = {val:-1,index:-1};
  let lowest = {val:Infinity,index:-1};

  rgbIntArray.map((val,index)=>{
    if(val>highest.val){
      highest = {val:val,index:index};
    }
    if(val<lowest.val){
       lowest = {val:val,index:index};
    }
  });
  if(lowest.index===highest.index){
    lowest.index=highest.index+1;
  }
  let middle = {index: (3 - highest.index - lowest.index)};
  middle.val = rgbIntArray[middle.index];
  console.log([lowest,middle,highest]);
  return [lowest,middle,highest];
}