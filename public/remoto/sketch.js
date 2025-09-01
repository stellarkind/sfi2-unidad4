let socket;
let slider1, slider2;
let card, title, label1, label2;

function setup() {
  noCanvas(); // no usamos canvas aquí
  socket = io();

  socket.on("connect", () => console.log("✅ Connected to server"));
  socket.on("disconnect", () => console.log("❌ Disconnected from server"));

  // Crear contenedor principal
  card = createDiv().addClass("card");

  // Título
  title = createElement("h2", "🎨 Control de Colores");
  card.child(title);

  // Label + slider Nave 1
  label1 = createP("Nave 1 (Azul → Verde)");
  card.child(label1);
  slider1 = createSlider(0, 255, 128);
  slider1.addClass("slider-blue");
  card.child(slider1);

  // Label + slider Nave 2
  label2 = createP("Nave 2 (Rojo → Morado)");
  card.child(label2);
  slider2 = createSlider(0, 255, 128);
  slider2.addClass("slider-red");
  card.child(slider2);
}

function draw() {
  if (socket && socket.connected) {
    socket.emit("message", JSON.stringify({ type: "color-1", value: slider1.value() }));
    socket.emit("message", JSON.stringify({ type: "color-2", value: slider2.value() }));
  }
}
