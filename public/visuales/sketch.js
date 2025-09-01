let socket;
let ship1 = { x: 150, y: 200, color: [0, 180, 255] };   // Azul inicial
let ship2 = { x: 100, y: 100, color: [255, 80, 80] };   // Rojo inicial

let song, fft;
let mode = "normal"; // normal, outline, blink, mirror
let isSongPlaying = false;

function preload() {
  // Asegúrate que el archivo esté en visuales/delos.mp3
  song = loadSound("delos.mp3",
    () => console.log("🎵 Canción cargada ✔"),
    () => console.error("❌ Error cargando la canción")
  );
}

function setup() {
  createCanvas(600, 600);
  fft = new p5.FFT();

  socket = io();

  socket.on("connect", () => console.log("Connected to server"));

  socket.on("message", (data) => {
    try {
      let parsed = JSON.parse(data);

      if (parsed.type === "touch") {
        ship1.x = parsed.x;
        ship1.y = parsed.y;
      } else if (parsed.type === "touch-2") {
        ship2.x = parsed.x;
        ship2.y = parsed.y;
      } else if (parsed.type === "color-1") {
        // Control de color Nave 1 (azul-verde)
        ship1.color = [0, parsed.value, 255 - parsed.value / 2];
      } else if (parsed.type === "color-2") {
        // Control de color Nave 2 (rojo-morado)
        ship2.color = [255 - parsed.value / 2, 0, parsed.value];
      } else if (parsed.type === "mode") {
        mode = parsed.value;
      }
    } catch (e) {
      console.error("Error parsing message:", e);
    }
  });
}

function draw() {
  if (!isSongPlaying) {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Haz clic para iniciar la canción", width / 2, height / 2);
    return;
  }

  let spectrum = fft.analyze();
  let bass = fft.getEnergy("bass");

  // Fondo dinámico según graves
  let bgCol = map(bass, 0, 255, 20, 120);
  background(bgCol, 50, bgCol);

  // Blink: parpadeo
  if (mode === "blink" && bass > 180) {
    background(255);
  }

  if (mode === "mirror") {
    translate(width, 0);
    scale(-1, 1);
  }

  // Dibujar naves
  drawShip(ship1.x, ship1.y, ship1.color);
  drawShip(ship2.x, ship2.y, ship2.color);
}

function drawShip(x, y, col) {
  push();
  translate(x, y);

  if (mode === "outline") {
    noFill();
    stroke(col);
    strokeWeight(3);
  } else {
    noStroke();
    fill(col);
  }

  beginShape();
  vertex(0, -20);
  vertex(-15, 15);
  vertex(15, 15);
  endShape(CLOSE);

  pop();
}

// Reproducir canción al primer clic
function mousePressed() {
  if (!isSongPlaying) {
    song.loop();
    isSongPlaying = true;
  }
}

// Control rápido desde teclado
function keyPressed() {
  if (key === "1") mode = "normal";
  if (key === "2") mode = "outline";
  if (key === "3") mode = "blink";
  if (key === "4") mode = "mirror";
}
