const COLOR_INPUT = "#ABEDF7";
const COLOR_OUTPUT = "#FFFFFF";
const COLOR_DIR = "#038CFC";
const COLOR_FILE = "#FFFFFF";
const COLOR_ERR = "rgb(255, 0, 0)";

const fs = new FileSystem();
let terminal = document.getElementById("terminal");
const commands = [new Cat(terminal, fs), new Clear(terminal, fs), new Ls(terminal, fs)];

function sendCommand(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById(
      "terminal"
    ).innerHTML += `<p id="terminal-line" style="color: ${COLOR_INPUT};">
        <strong style="color: #09EB00;"> > </strong>
        ${document.getElementById("terminal-input").value}
      </p>`;
    handleInput(document.getElementById("terminal-input").value);
    document.getElementById("terminal-input").value = "";
  }
}

function sendError(errormsg) {
  document.getElementById("terminal").innerHTML +=
    '<p id="terminal-line" style="color: ' +
    COLOR_ERR +
    ';">' +
    errormsg +
    "</p>";
}

function sendMSG(msg) {
  document.getElementById("terminal").innerHTML +=
    '<p id="terminal-line" style="color: ' +
    COLOR_OUTPUT +
    ';">' +
    msg +
    "</p>";
}

function handleInput(input) {
  var args = input.trim().split(" ");
  let cid = args[0];
  if (cid == "help") {
    commands.forEach((command) => {
      terminal.innerHTML += `<span id="terminal-line" style="color: ${COLOR_OUTPUT};">
        ${command.id} - ${command.help}
        </span><br>`;
    });
    return;
  }
  for (let i = 0; i < commands.length; i++) {
    if (commands[i].id == cid) {
      let output = commands[i].execute(args);
      if (output != false && output != undefined) commands[i].print(output);
      break;
    }
    if (i + 1 >= commands.length) {
      // Command not found
      terminal.innerHTML +=
        '<span id="terminal-line" style="color: ' +
        COLOR_OUTPUT +
        ';">' +
        `bash: ${args[0]}: command not found` +
        "</span> &nbsp;";
    }
  }
}
