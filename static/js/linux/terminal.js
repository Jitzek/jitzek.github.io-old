var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var COLOR_INPUT = "#ABEDF7";
var COLOR_OUTPUT = "#FFFFFF";
var COLOR_DIR = "#038CFC";
var COLOR_FILE = "#FFFFFF";
var COLOR_ERR = "rgb(255, 0, 0)";
var Terminal = /** @class */ (function () {
    function Terminal() {
        this._console = new Console(this);
        this.ui = document.getElementById("terminal");
        this.ui_input = document.getElementById("terminal-input");
        this.tline_start = "<p id=\"terminal-line\" style=\"color: " + COLOR_OUTPUT + ";\">";
        this.tline_end = "</p>";
    }
    Terminal.prototype.handleUserInput = function () {
        return __awaiter(this, void 0, void 0, function () {
            var input, result;
            return __generator(this, function (_a) {
                try {
                    input = this.ui_input.value;
                    this.ui.innerHTML += "<p id=\"terminal-line\" style=\"color: " + COLOR_INPUT + ";\">\n            <strong style=\"color: #09EB00;\"> > </strong>\n            " + input + "\n          </p>";
                    this.ui_input.value = "";
                    result = this._console.execute(input.split(" "));
                    //
                }
                catch (error) {
                    this.print(error.message);
                }
                return [2 /*return*/];
            });
        });
    };
    Terminal.prototype.softStopExecution = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Terminal.prototype.forceStopExecution = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._console.forceStop();
                return [2 /*return*/];
            });
        });
    };
    Terminal.prototype.print = function (msg) {
        // TODO: Inline color codes recognition
        this.ui.innerHTML +=
            '<p id="terminal-line" style="color: ' +
                COLOR_OUTPUT +
                ';">' +
                msg +
                "</p>";
    };
    return Terminal;
}());
