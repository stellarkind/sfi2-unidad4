let socket;

function setup() {
  createCanvas(300, 400);
  background(30);
  socket = io();
}

function draw() {
  background(30);
  fill(255, 100, 100);
  textAlign(CENTER, CENTER);
  textSize(22);
  text("🚀 Nave 2\nMueve con tu dedo", width / 2, height / 2);
}

function touchMoved() {
  socket.emit("message", JSON.stringify({ type: "touch-2", x: mouseX, y: mouseY }));
  return false;
}
