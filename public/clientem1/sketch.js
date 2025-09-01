let socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io();
  noCanvas(); // la UI ahora es solo HTML + CSS
}

function touchMoved() {
  socket.emit("message", JSON.stringify({ type: "touch", x: mouseX, y: mouseY }));
  return false;
}
