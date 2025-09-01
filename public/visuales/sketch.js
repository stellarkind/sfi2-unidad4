let socket;
let circleX = 200;
let circleY = 200;
let squareX = 100;
let squareY = 100;
let purple;
let song;
let fft;
let isSongPlaying = false;

function preload() {
  // Asegúrate que el archivo esté en visuales/delos.mp3
  song = loadSound("delos.mp3", 
    () => console.log("Canción cargada ✔"), 
    () => console.error("Error cargando la canción ❌")
  );
}

function setup() {
  createCanvas(600, 400);
  purple = color(188, 155, 243);

  // Inicializar análisis de audio
  fft = new p5.FFT();

  // Conexión al servidor
  socket = io();

  socket.on("connect", () => {
    console.log("Connected to server");
  });

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
        let r = Math.max(0, Math.min(255, parsedData.value));
        purple = color(r, green(purple), blue(purple));
      } else if (parsedData.type === "color-2") {
        let g = Math.max(0, Math.min(255, parsedData.value));
        purple = color(red(purple), g, blue(purple));
      }
    } catch (e) {
      console.error("Error parsing JSON:", e);
    }
  });
}

function draw() {
  background(20);

  if (!isSongPlaying) {
    // Pantalla de espera
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Haz clic para iniciar la canción", width / 2, height / 2);
    return;
  }

  // Analizar el sonido
  let spectrum = fft.analyze();
  let bass = fft.getEnergy("bass");

  // Fondo dinámico según bajo
  background(map(bass, 0, 255, 20, 100), 50, 100);

  // Dibujar figuras
  fill(purple);
  noStroke();
  ellipse(circleX, circleY, 50, 50);
  rect(squareX, squareY, 100, 50);
}

// Reproducir canción al primer clic
function mousePressed() {
  if (!isSongPlaying) {
    song.loop();
    isSongPlaying = true;
  }
}
