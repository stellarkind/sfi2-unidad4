let socket;

function setup() {
  noCanvas(); // 👈 Sin canvas, solo HTML

  socket = io();

  socket.on("connect", () => console.log("✅ Conectado al servidor"));
  socket.on("disconnect", () => console.log("❌ Desconectado del servidor"));

  const slider1 = document.getElementById("slider1");
  const slider2 = document.getElementById("slider2");

  // Detectar cambios y enviar valores
  slider1.addEventListener("input", () => {
    if (socket && socket.connected) {
      socket.emit("message", JSON.stringify({ type: "color-1", value: slider1.value }));
    }
  });

  slider2.addEventListener("input", () => {
    if (socket && socket.connected) {
      socket.emit("message", JSON.stringify({ type: "color-2", value: slider2.value }));
    }
  });
}
