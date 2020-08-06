const COLOR_INPUT = "#ABEDF7";
const COLOR_OUTPUT = "#FFFFFF";
const COLOR_DIR = "#038CFC";
const COLOR_FILE = "#FFFFFF";
const COLOR_ERR = "rgb(255, 0, 0)";

class Terminal {
  _console: Console = new Console();
  ui: HTMLElement = document.getElementById("terminal");
  ui_input: any = document.getElementById("terminal-input");

  handleUserInput(): boolean {
    try {
      let input: string = this.ui_input.value;
      this.ui.innerHTML += `<p id="terminal-line" style="color: ${COLOR_INPUT};">
            <strong style="color: #09EB00;"> > </strong>
            ${input}
          </p>`;
      this.ui_input.value = "";

      // Do something with input //
      let output: Object = this._console.execute(input.split(" "));
      console.log(output);
      //
      return true;
    } catch (error) {
      this.sendError(error.message);
    }
    return false;
  }

  sendError(errormsg: string): void {
    this.ui.innerHTML +=
      '<p id="terminal-line" style="color: ' +
      COLOR_ERR +
      ';">' +
      errormsg +
      "</p>";
  }

  sendMSG(msg: string): void {
    this.ui.innerHTML +=
      '<p id="terminal-line" style="color: ' +
      COLOR_OUTPUT +
      ';">' +
      msg +
      "</p>";
  }
}
