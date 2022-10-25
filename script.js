let canvas = document.querySelector('.canvas')

//Receive input for the size of the canvas
let sizeCanvas = document.querySelector('#sizeCanvas');
sizeCanvas.addEventListener('input', () => {
  firstIteration = false;
  if (sizeCanvas.value < 1 || sizeCanvas.value > 64) {
    sizeCanvas.value = 32;
    console.log(sizeCanvas.value);
  }else{
    console.log(sizeCanvas.value);
  }
});

//First iteration
let firstIteration = true

if (firstIteration) {
  createPixel(sizeCanvas.value);
  createGrid(sizeCanvas.value);
}

//Pass number to the grid canvas
function createGrid(size) {
  canvas.setAttribute('style',`grid-template: repeat(${size},1fr)/repeat(${size},1fr)`);
}

//remove all children of the canvas

//Create div, total the number given
function createPixel(size) {
  let numberPixels = Math.pow(size,2);
  for (let i = 1; i < numberPixels; i++) {
    let pixel = document.createElement('div');
    canvas.appendChild(pixel);
  }
}