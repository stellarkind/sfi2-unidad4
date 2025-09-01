let socket;

function setup() {
  createCanvas(300, 400);
  background(30);
  socket = io();
}

function draw() {
  background(30);
  fill(0, 200, 255);
  textAlign(CENTER, CENTER);
  textSize(22);
  text("🚀 Nave 1\nMueve con tu dedo", width / 2, height / 2);
}

function touchMoved() {
  socket.emit("message", JSON.stringify({ type: "touch", x: mouseX, y: mouseY }));
  return false;
}