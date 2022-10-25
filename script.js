const canvas = document.querySelector('.canvas')
//Input number
const sizeCanvas = document.querySelector('#sizeCanvas');
//Color selection
const colorSelector = document.querySelector('#color');

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
    canvas.appendChild(pixel);
  }
}

//Change background color pixel
function changeColor() {
  const pixels  = document.querySelectorAll('.pixel');

  pixels.forEach(pixel =>{
    pixel.addEventListener('mouseenter',() =>{
      pixel.style.backgroundColor = colorSelector.value;
    })
  })
}
