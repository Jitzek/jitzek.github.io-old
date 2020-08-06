var COLOR_INPUT = "#ABEDF7";
var COLOR_OUTPUT = "#FFFFFF";
var COLOR_DIR = "#038CFC";
var COLOR_FILE = "#FFFFFF";
var COLOR_ERR = "rgb(255, 0, 0)";
var Terminal = /** @class */ (function () {
    function Terminal() {
        this._console = new Console();
        this.ui = document.getElementById("terminal");
        this.ui_input = document.getElementById("terminal-input");
    }
    Terminal.prototype.handleUserInput = function () {
        try {
            var input = this.ui_input.value;
            this.ui.innerHTML += "<p id=\"terminal-line\" style=\"color: " + COLOR_INPUT + ";\">\n            <strong style=\"color: #09EB00;\"> > </strong>\n            " + input + "\n          </p>";
            this.ui_input.value = "";
            // Do something with input //
            var output = this._console.execute(input.split(" "));
            console.log(output);
            //
            return true;
        }
        catch (error) {
            this.sendError(error.message);
        }
        return false;
    };
    Terminal.prototype.sendError = function (errormsg) {
        this.ui.innerHTML +=
            '<p id="terminal-line" style="color: ' +
                COLOR_ERR +
                ';">' +
                errormsg +
                "</p>";
    };
    Terminal.prototype.sendMSG = function (msg) {
        this.ui.innerHTML +=
            '<p id="terminal-line" style="color: ' +
                COLOR_OUTPUT +
                ';">' +
                msg +
                "</p>";
    };
    return Terminal;
}());
