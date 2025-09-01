let socket;
let ship1 = { x: 150, y: 200, color: [188, 155, 243] };
let ship2 = { x: 100, y: 100, color: [100, 200, 100] };

let audio, fft;
let mode = "normal"; // normal, outline, blink, mirror

function preload() {
  // Asegúrate que el archivo esté en visuales/delos.mp3
  song = loadSound("./delos.mp3",
  () => console.log("Canción cargada ✔"),
  () => console.error("Error cargando la canción ❌")
);

}

function setup() {
  createCanvas(600, 600);
  background(0);

  fft = new p5.FFT();
  audio.loop();

  socket = io();

  socket.on('connect', () => {
    console.log("Connected to server");
  });

  socket.on('message', (data) => {
    try {
      let parsed = JSON.parse(data);

      if (parsed.type === "touch") {
        ship1.x = parsed.x;
        ship1.y = parsed.y;
      } else if (parsed.type === "touch-2") {
        ship2.x = parsed.x;
        ship2.y = parsed.y;
      } else if (parsed.type === "colors") {
        ship1.color = [parsed.nave1, 100, 200];
        ship2.color = [parsed.nave2, 200, 100];
      } else if (parsed.type === "mode") {
        mode = parsed.mode;
      }

    } catch (e) {
      console.error("Error parsing message:", e);
    }
  });
}

function draw() {
  // Fondo dinámico con graves
  let spectrum = fft.analyze();
  let bass = fft.getEnergy("bass");
  let bgCol = map(bass, 0, 255, 20, 120);
  background(bgCol, 50, bgCol);

  // Blink mode: parpadeo con graves
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

  // Triángulo como nave minimalista
  beginShape();
  vertex(0, -20);
  vertex(-15, 15);
  vertex(15, 15);
  endShape(CLOSE);

  pop();
}

// Control desde teclado para desktop
function keyPressed() {
  if (key === "1") mode = "normal";
  if (key === "2") mode = "outline";
  if (key === "3") mode = "blink";
  if (key === "4") mode = "mirror";
}
