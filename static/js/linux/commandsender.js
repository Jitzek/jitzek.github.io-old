const terminal = new Terminal();

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendCommand(event) {
  if (event.keyCode === 13) {
    event.preventDefault();

    terminal.handleUserInput();
  }
}

document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'z' || event.ctrlKey && event.key === 'c') {
    terminal.forceStopExecution();
  }
});