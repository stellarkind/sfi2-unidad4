let socket;

function setup() {
  noCanvas();
  socket = io();

  let slider1 = select("#slider1");
  let slider2 = select("#slider2");

  slider1.input(() => {
    let hue = slider1.value();
    socket.emit("message", JSON.stringify({ type: "color-1", hue }));
  });

  slider2.input(() => {
    let hue = slider2.value();
    socket.emit("message", JSON.stringify({ type: "color-2", hue }));
  });
}
