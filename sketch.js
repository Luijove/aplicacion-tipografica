//var input;
var font;
let puntos;
var r = 0;
let slider, slider1, slider2, slider3;
var textTyped = "";
let val;
let str;
let spc;
let size;
let msg, msg1, msg2, msg3, msg4, msg5;
let BgcolorSlider;
let textcolorSlider;
let button;
let sel;
let form;
let xStart = 180;
let canvasWidth = 600;
let canvasHeight = 400;

function preload() {
  font = loadFont("Montserrat.otf");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  //Crear elementos de texto en el DOM

  msg = createP("Shape");
  msg.position(0, height);
  msg1 = createP("Kerning");
  msg1.position(85, height);
  msg2 = createP("Size");
  msg2.position(170, height);
  msg3 = createP("BGcolor");
  msg3.position(150, height + 35);
  msg4 = createP("Txtcolor");
  msg4.position(150, height + 55);
  msg5 = createP("X Position");
  msg5.position(150, height + 75);

  //Crear sliders en el DOM

  BgcolorSlider = createSlider(0, 16777215, 0);
  BgcolorSlider.position(0, height + 50);
  textcolorSlider = createSlider(0, 16777215, 16777215);
  textcolorSlider.position(0, height + 70);
  slider = createSlider(1, 60, 10);
  slider.style("width", "80px");
  slider1 = createSlider(1, 10, 1);
  slider1.style("width", "80px");
  slider2 = createSlider(40, 130, 70);
  slider2.style("width", "80px");
  slider3 = createSlider(180, 320, 200);
  slider3.position(0, height + 90);

  //Selector de formas en el DOM

  sel = createSelect();
  sel.option("Rectangle");
  sel.option("Circle");
  sel.option("Line");
  sel.changed(changeForm);

  //Se crea un botón para guardar la imagen creada en el canvas en formato PNG

  button = createButton("save image");
  button.mousePressed(saveTypo);
}

function draw() {
  // Calcula el ancho del texto introducido

  let textWidth = font.textBounds(textTyped, 0, 0, size).w;

  // Si el ancho del texto es mayor que el ancho del canvas,
  // ajusta el tamaño del canvas para que el texto quepa

  if (textWidth > canvasWidth) {
    canvasWidth = textWidth;
    resizeCanvas(canvasWidth, canvasHeight);
  }

  let t = (BgcolorSlider.value() >> 16) & 255;
  let g = (BgcolorSlider.value() >> 8) & 255;
  let b = BgcolorSlider.value() & 255;

  background(t, g, b);

  //Crear elementos tipográficos fijos en el canvas

  let f = (textcolorSlider.value() >> 16) & 255;
  let v = (textcolorSlider.value() >> 8) & 255;
  let s = (textcolorSlider.value() >> 4) & 255;
  textFont(font);
  noFill();

  spc = slider1.value();

  //Añade espacio entre los caracteres creados a partir de textToPoints

  str = addLetterSpacing(textTyped, spc);
  size = slider2.value();

  // Convierte la tipografía en una serie de puntos

  puntos = font.textToPoints(str, slider3.value(), height / 2, size, {
    sampleFactor: 1,
  });

  //Recorre todos los puntos del array para utilizarlos como objetos

  for (let i = 0; i < puntos.length; i++) {
    strokeWeight(0.1);
    stroke(f, v, s);

    push();
    val = slider.value();
    translate(puntos[i].x - (size + 110), puntos[i].y + 30);

    //rotación dependiendo de las pulsaciones de ratón

    rotate(r);
if (mouseIsPressed){
if (mouseButton === RIGHT)
  r ++;

}
    // Función que cambia de forma geométrica cuando se elige en el selector

    changeForm();

    pop();
  }
}
//Función para crear espacio entre caracteres

function addLetterSpacing(input, amount, spacer) {
  // 'spacer' los caracteres unicode a usar
  // (can be passed in as an optional argument, or it
  // will use the unicode 'hair space' one by default)
  spacerCharacter = "\u200A" || spacer;

  // Divide el string en una serie de caracteres
  let characters = input.split("");

  // Crea espacios usando la funcion repeat()
  spacerCharacter = spacerCharacter.repeat(amount);

  // usa join() para combinar caracteres con spacer y devolver un string
  return characters.join(spacerCharacter);
}

//Funciones para interactuar por medio del teclado

function keyPressed() {
  //Borrar texto
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
      loop();
    }
  }
}
function keyTyped() {
  //Añadir texto
  if (keyCode >= 32) {
    textTyped += key;
    loop();
  }
}
//función creada para rotar los elementos que forman los caracteres

function mousePressed() {
  if (mouseX < width && mouseX < height && mouseY < width && mouseY < height) {
    r += 0.5;
  }
}
//Función para seleccionar la forma elegida en el selector del DOM

function changeForm() {
  let valor = sel.value();
  if (valor == "Rectangle") {
    rect(val / 2, 0, val);
  } else if (valor == "Circle") {
    circle(0, 0, val);
  } else if (valor == "Line") {
    line(val, val, -val, -val);
  }
}
// función para guardar imagen

function saveTypo() {
  save("WRIT.png");
}
