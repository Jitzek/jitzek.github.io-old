const COLOR_INPUT = "#ABEDF7";
const COLOR_OUTPUT = "#FFFFFF";
const COLOR_DIR = "#038CFC";
const COLOR_FILE = "#FFFFFF";
const COLOR_ERR = "rgb(255, 0, 0)";

class Terminal {
  _console: Console = new Console(this);
  ui: HTMLElement = document.getElementById("terminal");
  ui_input: any = document.getElementById("terminal-input");

  tline_start = `<p id="terminal-line" style="color: ${COLOR_OUTPUT};">`
  tline_end = "</p>";

  async handleUserInput() {
    try {
      let input: string = this.ui_input.value;
      this.ui.innerHTML += `<p id="terminal-line" style="color: ${COLOR_INPUT};">
            <strong style="color: #09EB00;"> > </strong>
            ${input}
          </p>`;
      this.ui_input.value = "";

      // Do something with input //
      let result: any = this._console.execute(input.split(" "));
      //
    } catch (error) {
      this.print(error.message);
    }
  }

  async softStopExecution() {
    //
  }

  async forceStopExecution() {
    this._console.forceStop();
  }

  print(msg: string): void {
    // TODO: Inline color codes recognition
    this.ui.innerHTML +=
      '<p id="terminal-line" style="color: ' +
      COLOR_OUTPUT +
      ';">' +
      msg +
      "</p>";
  }
}
