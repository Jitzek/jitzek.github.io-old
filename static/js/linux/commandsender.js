const terminal = new Terminal();

async function sendCommand(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    terminal.handleUserInput();
  }
}