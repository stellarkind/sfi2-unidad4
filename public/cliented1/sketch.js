let socket;

window.onload = () => {
  socket = io();

  const buttons = {
    normal: document.getElementById("normal"),
    outline: document.getElementById("outline"),
    blink: document.getElementById("blink"),
    mirror: document.getElementById("mirror"),
  };

  function setActive(buttonId) {
    Object.values(buttons).forEach(btn => btn.classList.remove("active"));
    buttons[buttonId].classList.add("active");
  }

  buttons.normal.onclick = () => {
    socket.emit("message", JSON.stringify({ type: "mode", value: "normal" }));
    setActive("normal");
  };

  buttons.outline.onclick = () => {
    socket.emit("message", JSON.stringify({ type: "mode", value: "outline" }));
    setActive("outline");
  };

  buttons.blink.onclick = () => {
    socket.emit("message", JSON.stringify({ type: "mode", value: "blink" }));
    setActive("blink");
  };

  buttons.mirror.onclick = () => {
    socket.emit("message", JSON.stringify({ type: "mode", value: "mirror" }));
    setActive("mirror");
  };
};

