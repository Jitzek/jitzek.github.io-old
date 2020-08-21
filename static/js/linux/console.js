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
var Pipeline = /** @class */ (function () {
    function Pipeline() {
        this.pipeline = [];
        this.commands = [];
    }
    Pipeline.prototype.execute = function (user) {
        if (user === void 0) { user = null; }
        return __awaiter(this, void 0, void 0, function () {
            var result, i, print_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = false;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.commands.length)) return [3 /*break*/, 4];
                        print_1 = i + 1 >= this.commands.length;
                        if (result)
                            this.commands[i].push(result);
                        return [4 /*yield*/, this.pipeline[i].execute(this.commands[i].slice(1), null, print_1)];
                    case 2:
                        result = _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    Pipeline.prototype.push = function (command, command_array) {
        this.pipeline.push(command);
        this.commands.push(command_array);
    };
    Pipeline.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.pipeline.forEach(function (command) {
                    command.stop();
                });
                return [2 /*return*/];
            });
        });
    };
    return Pipeline;
}());
var Console = /** @class */ (function () {
    function Console(terminal) {
        this.filesystem = new Filesystem();
        this.command_stack = [];
        this.terminal = terminal;
    }
    Console.prototype.execute = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var c_command_array, c_pipeline, i, new_command, new_command, new_command, result, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = removeWhiteSpaceEntries(args);
                        c_command_array = [];
                        c_pipeline = null;
                        for (i = 0; i < args.length; i++) {
                            // if pipeline exists : add last command to pipeline and append pipeline to stack
                            if (i + 1 >= args.length) {
                                c_command_array.push(args[i]);
                                new_command = CommandFactory.getCommand(c_command_array[0], this.filesystem, this.terminal);
                                if (!new_command)
                                    return [2 /*return*/, this.commandNotFound(c_command_array[0])];
                                if (c_pipeline != null) {
                                    c_pipeline.push(new_command, c_command_array);
                                    this.command_stack.push({ type: 'pipe', executable: c_pipeline });
                                }
                                else
                                    this.command_stack.push({ type: 'command', executable: new_command, args: c_command_array.slice(1) });
                                c_command_array = [];
                                continue;
                            }
                            if (args[i] == '|') {
                                // if no pipeline exists : create
                                if (c_pipeline == null)
                                    c_pipeline = new Pipeline();
                                new_command = CommandFactory.getCommand(c_command_array[0], this.filesystem, this.terminal);
                                if (!new_command)
                                    return [2 /*return*/, this.commandNotFound(c_command_array[0])];
                                // append command (if valid) to pipeline
                                c_pipeline.push(new_command, c_command_array);
                                c_command_array = [];
                                continue;
                            }
                            else if (args[i] == ';' || args[i] == '&' || args[i] == '&&' /* etc */) {
                                new_command = CommandFactory.getCommand(c_command_array[0], this.filesystem, this.terminal);
                                if (!new_command)
                                    return [2 /*return*/, this.commandNotFound(c_command_array[0])];
                                // if pipeline exists : add last command to pipeline and append pipeline to stack
                                if (c_pipeline != null) {
                                    // append command (if valid) to pipeline
                                    c_pipeline.push(new_command, c_command_array);
                                    c_command_array = [];
                                    this.command_stack.push({ type: 'pipe', executable: c_pipeline });
                                    c_pipeline = null;
                                    continue;
                                }
                                // append command (if valid) to stack
                                this.command_stack.push({ type: 'command', executable: new_command, args: c_command_array.slice(1) });
                                c_command_array = [];
                            }
                            else
                                c_command_array.push(args[i]);
                        }
                        result = false;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.command_stack.length)) return [3 /*break*/, 6];
                        if (!(this.command_stack[i].type == 'pipe')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.command_stack[i].executable.execute(null)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(this.command_stack[i].type == 'command')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.command_stack[i].executable.execute(this.command_stack[i].args, null)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6:
                        this.clean();
                        return [2 /*return*/];
                }
            });
        });
    };
    Console.prototype.commandNotFound = function (command) {
        this.clean();
        var output = "bash: " + command + ": command not found";
        this.print(output);
        return "bash: " + command + ": command not found";
    };
    Console.prototype.print = function (msg) {
        this.terminal.ui.innerHTML += this.terminal.tline_start + " " + msg + " " + this.terminal.tline_end;
    };
    Console.prototype.clean = function () {
        this.command_stack = [];
    };
    Console.prototype.removeWhiteSpaceEntries = function (array) {
        return array.filter(function (str) { return /\S/.test(str); });
    };
    Console.prototype.forceStop = function () {
        this.command_stack.forEach(function (command) {
            command.executable.stop();
        });
        this.clean();
    };
    return Console;
}());
