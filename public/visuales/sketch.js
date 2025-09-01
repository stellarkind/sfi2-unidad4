let socket;
let circleX = 200, circleY = 200;
let squareX = 100, squareY = 100;

let nave1Color, nave2Color;
let mode = "normal"; // normal | outline | blink | mirror

// Audio
let song, fft;
let spectrum = [];

function preload() {
  song = loadSound("delos.mp3"); // el mp3 debe estar en la carpeta visuales/
}

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100);
  nave1Color = color(200, 80, 80);
  nave2Color = color(300, 80, 80);

  fft = new p5.FFT();

  socket = io();
  socket.on("message", (data) => {
    try {
      let parsedData = JSON.parse(data);

      if (parsedData.type === "touch") {
        circleX = parsedData.x;
        circleY = parsedData.y;
      } else if (parsedData.type === "touch-2") {
        squareX = parsedData.x;
        squareY = parsedData.y;
      } else if (parsedData.type === "color-1") {
        nave1Color = color(parsedData.hue, 80, 100);
      } else if (parsedData.type === "color-2") {
        nave2Color = color(parsedData.hue, 80, 100);
      } else if (parsedData.type === "mode") {
        mode = parsedData.value;
      }
    } catch (e) {
      console.error("Error parsing JSON:", e);
    }
  });

  if (!song.isPlaying()) {
    song.loop();
  }
}

function draw() {
  spectrum = fft.analyze();

  // Dividimos en rangos de frecuencia
  let bass = fft.getEnergy("bass");
  let mid = fft.getEnergy("mid");
  let treble = fft.getEnergy("treble");

  // Fondo reactivo
  background(bass, 60, map(mid, 0, 255, 20, 100));

  // Blink mode: parpadeo con agudos
  if (mode === "blink" && treble > 200) {
    background(0, 0, 100);
  }

  push();
  if (mode === "mirror") {
    translate(width, 0);
    scale(-1, 1);
  }

  noStroke();
  if (mode === "outline") {
    noFill();
    strokeWeight(3);
  }

  // Dibujar nave 1 (círculo)
  if (mode === "outline") {
    stroke(nave1Color);
  } else {
    fill(nave1Color);
  }
  ellipse(circleX, circleY, 60);

  // Dibujar nave 2 (rectángulo)
  if (mode === "outline") {
    stroke(nave2Color);
  } else {
    fill(nave2Color);
  }
  rect(squareX, squareY, 80, 50, 10);

  pop();
}

function keyPressed() {
  if (key === "1") mode = "normal";
  if (key === "2") mode = "outline";
  if (key === "3") mode = "blink";
  if (key === "4") mode = "mirror";
}
