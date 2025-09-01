let socket;
let slider1, slider2;

function setup() {
  noCanvas(); 
  socket = io();

  socket.on('connect', () => console.log('Connected to server'));
  socket.on('disconnect', () => console.log('Disconnected from server'));

  // Vincular sliders ya existentes en el HTML
  slider1 = select('#slider1');
  slider2 = select('#slider2');
}

function draw() {
  // Emitir datos al servidor desde los sliders HTML
  if (socket && socket.connected) {
    socket.emit("message", JSON.stringify({ type: "color-1", value: slider1.value() }));
    socket.emit("message", JSON.stringify({ type: "color-2", value: slider2.value() }));
  }
}
