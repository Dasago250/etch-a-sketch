
//Receive input for the size of the canvas
let sizeCanvas = document.querySelector('#sizeCanvas');
sizeCanvas.addEventListener('input', () => {
  if (sizeCanvas.value < 1 || sizeCanvas.value > 64) {
    sizeCanvas.value = 32;
    console.log(sizeCanvas.value);
  }else{
    console.log(sizeCanvas.value);
  }
});

//First iteration

//Pass number to the grid canvas

//remove all children of the canvas

//Create div, total the number given
