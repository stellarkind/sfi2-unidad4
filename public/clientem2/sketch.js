let socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io();
  noCanvas(); // la UI es solo HTML + CSS
}

function touchMoved() {
  socket.emit("message", JSON.stringify({ type: "touch-2", x: mouseX, y: mouseY }));
  return false;
}
