let socket;
let ship1 = { x: 150, y: 200, color: [0, 200, 255], visible: true };
let ship2 = { x: 100, y: 100, color: [255, 100, 150], visible: true };

let song, fft;
let mode = "normal"; // normal, outline, blink, mirror
let blinkCounter = 0;
let phase = 1; // fase emocional actual
let tunnel = [];

function preload() {
  song = loadSound("./delos.mp3",
    () => console.log("Canción cargada ✔"),
    () => console.error("Error cargando la canción ❌")
  );
}

function setup() {
  createCanvas(600, 600);
  fft = new p5.FFT();

  // Iniciar túnel
  for (let i = 0; i < 20; i++) {
    tunnel.push({ size: i * 40 + 20, sides: int(random([4, 6, 8])) });
  }

  socket = io();

  socket.on("connect", () => console.log("✅ Connected to server"));

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
        ship1.color = [parsed.value, 200, 255 - parsed.value];
      } else if (parsed.type === "color-2") {
        ship2.color = [255, parsed.value, 200];
      } else if (parsed.type === "mode") {
        mode = parsed.value;
      }

    } catch (e) {
      console.error("Error parsing message:", e);
    }
  });
}

function draw() {
  background(0);

  let spectrum = fft.analyze();
  let bass = fft.getEnergy("bass");

  // Detectar fase por tiempo de canción
  if (song.isPlaying()) {
    let t = song.currentTime();
    if (t < 80) phase = 1;
    else if (t < 140) phase = 2;
    else phase = 3;
  }

  // Paleta según fase
  let tunnelColor;
  if (phase === 1) tunnelColor = color(0, 200, 255);   // azul/verde
  if (phase === 2) tunnelColor = color(160, 0, 200);   // morado/cian
  if (phase === 3) tunnelColor = color(255, 50, 100);  // rojo/magenta

  // Dibujar túnel
  push();
  translate(width / 2, height / 2);
  stroke(tunnelColor);
  noFill();

  for (let t of tunnel) {
    beginShape();
    for (let i = 0; i < t.sides; i++) {
      let angle = map(i, 0, t.sides, 0, TWO_PI);
      let x = cos(angle) * t.size;
      let y = sin(angle) * t.size;
      vertex(x, y);
    }
    endShape(CLOSE);

    // Crecimiento reactivo a graves
    t.size += map(bass, 0, 255, 1, 6);

    if (t.size > width * 1.5) {
      t.size = 20;
      t.sides = int(random([4, 6, 8]));
    }
  }
  pop();

  // BLINK → solo naves
  if (mode === "blink") {
    blinkCounter++;
    if (blinkCounter % 15 === 0) {
      ship1.visible = !ship1.visible;
      ship2.visible = !ship2.visible;
    }
  } else {
    ship1.visible = true;
    ship2.visible = true;
  }

  // Dibujar naves
  if (ship1.visible) drawShip(ship1.x, ship1.y, ship1.color);
  if (ship2.visible) drawShip(ship2.x, ship2.y, ship2.color);

  // MIRROR → duplicar naves
  if (mode === "mirror") {
    if (ship1.visible) drawShip(width - ship1.x, ship1.y, ship1.color);
    if (ship2.visible) drawShip(width - ship2.x, ship2.y, ship2.color);
  }

  // Debug de fase
  noStroke();
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Fase: " + phase, 10, 10);
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

// Reproducir canción al clic
function mousePressed() {
  if (!song.isPlaying()) {
    song.loop();
  }
}
