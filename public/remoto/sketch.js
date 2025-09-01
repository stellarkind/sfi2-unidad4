let socket;
let slider1, slider2;

function setup() {
  noCanvas();
  socket = io();

  // Slider 1 (Nave 1 - Azul/Naranja)
  slider1 = createSlider(0, 255, 128);
  slider1.id("slider1");
  slider1.parent(document.body);

  // Slider 2 (Nave 2 - Rojo/Verde)
  slider2 = createSlider(0, 255, 128);
  slider2.id("slider2");
  slider2.parent(document.body);
}

function draw() {
  if (socket && socket.connected) {
    socket.emit("message", JSON.stringify({ type: "color-1", value: slider1.value() }));
    socket.emit("message", JSON.stringify({ type: "color-2", value: slider2.value() }));
  }
}
