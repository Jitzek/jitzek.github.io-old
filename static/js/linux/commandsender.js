const terminal = new Terminal();

function sendCommand(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    terminal.handleUserInput();
  }
}