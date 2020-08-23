var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function removeWhiteSpaceEntries(array) {
    return array.filter(function (str) { return /\S/.test(str); });
}
var Command = /** @class */ (function () {
    function Command(fs, terminal) {
        this.forcestop = false;
        this.fs = fs;
        this.terminal = terminal;
    }
    ;
    Command.prototype.execute = function (args, user, print) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    Command.prototype.print = function (output) { };
    Command.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.forcestop = true;
                return [2 /*return*/];
            });
        });
    };
    return Command;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(fs, terminal) {
        var _this = _super.call(this, fs, terminal) || this;
        _this.id = 'cat';
        _this.help = 'concatenate files and print on the standard output';
        _this.man = {};
        return _this;
    }
    Cat.prototype.execute = function (args, user, print) {
        if (user === void 0) { user = null; }
        if (print === void 0) { print = true; }
        if (args.length < 1) {
            // Display help
            if (print)
                this.print('cat: help placeholder text');
            return;
        }
        // Determine additional parameters ('-', '--')
        //
        // Get location of file
        var location = args[0] instanceof mFile || args[0] instanceof mDirectory ? args[0] : this.fs.getLocation(args[0]);
        // Check if location is file
        if (!this.fs.isFile(location)) {
            var output_1 = "cat: cannot open " + args[0];
            if (print)
                this.print(output_1);
            return output_1;
        }
        var output = location.content;
        if (print)
            this.print(output);
        // Output is content of file
        return output;
    };
    Cat.prototype.print = function (output) {
        this.terminal.ui.innerHTML += this.terminal.tline_start + " " + output + " " + this.terminal.tline_end;
    };
    return Cat;
}(Command));
var Clear = /** @class */ (function (_super) {
    __extends(Clear, _super);
    function Clear(fs, terminal) {
        var _this = _super.call(this, fs, terminal) || this;
        _this.id = 'clear';
        _this.help = 'clear the terminal screen';
        _this.man = {};
        return _this;
    }
    Clear.prototype.execute = function (args, user, print) {
        if (user === void 0) { user = null; }
        if (print === void 0) { print = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Determine additional parameters ('-', '--')
                //
                this.terminal.ui.innerHTML = '';
                //if (print) this.print();
                return [2 /*return*/, false];
            });
        });
    };
    Clear.prototype.print = function (output) {
        if (output === void 0) { output = null; }
        return;
    };
    return Clear;
}(Command));
var Echo = /** @class */ (function (_super) {
    __extends(Echo, _super);
    function Echo(fs, terminal) {
        var _this = _super.call(this, fs, terminal) || this;
        _this.id = 'echo';
        _this.help = 'write arguments to the standard output.';
        return _this;
    }
    /// TODO: -e escape characters
    Echo.prototype.execute = function (args, user, print) {
        if (user === void 0) { user = null; }
        if (print === void 0) { print = true; }
        return __awaiter(this, void 0, void 0, function () {
            var valid, i, output;
            return __generator(this, function (_a) {
                valid = true;
                for (i = 0; i < args.length; i++) {
                    if (typeof args[i] !== "string") {
                        valid = false;
                        break;
                    }
                }
                output = valid ? args.join(' ') : '\xa0';
                if (print)
                    this.print(output);
                return [2 /*return*/, output];
            });
        });
    };
    Echo.prototype.print = function (output) {
        this.terminal.ui.innerHTML += this.terminal.tline_start + " " + output + " " + this.terminal.tline_end;
    };
    return Echo;
}(Command));
var Help = /** @class */ (function (_super) {
    __extends(Help, _super);
    function Help(fs, terminal) {
        var _this = _super.call(this, fs, terminal) || this;
        _this.id = 'help';
        _this.help = 'display info of supported commands';
        _this.man = {};
        return _this;
    }
    Help.prototype.execute = function (args, user, print) {
        if (print === void 0) { print = true; }
        return __awaiter(this, void 0, void 0, function () {
            var output_2, commands_1, output_3, command, output;
            var _this = this;
            return __generator(this, function (_a) {
                if (args.length == 0) {
                    output_2 = [];
                    commands_1 = [];
                    CommandFactory.command_ids.forEach(function (id) {
                        commands_1.push(CommandFactory.getCommand(id, _this.fs, _this.terminal));
                    });
                    commands_1.forEach(function (command) {
                        output_2.push(command.id + " - " + command.help);
                    });
                    if (print)
                        this.print(output_2);
                    return [2 /*return*/, output_2];
                }
                if (args.length > 2) {
                    output_3 = 'help: too many arguments';
                    if (print)
                        this.print(output_3);
                    return [2 /*return*/, output_3];
                }
                command = CommandFactory.getCommand(args[0], this.fs, this.terminal);
                if (!command)
                    output = "help: '" + args[0] + "' is not a supported command";
                else
                    output = command.id + " - " + command.help;
                if (print)
                    this.print(output);
                return [2 /*return*/, output];
            });
        });
    };
    Help.prototype.print = function (output) {
        var _this = this;
        if (output instanceof Array) {
            this.terminal.ui.innerHTML += this.terminal.tline_start;
            output.forEach(function (element) {
                _this.terminal.ui.innerHTML += "<span>" + element + "</span><br>";
            });
            this.terminal.ui.innerHTML += this.terminal.tline_end;
            return;
        }
        this.terminal.ui.innerHTML += this.terminal.tline_start + " " + output + " " + this.terminal.tline_end;
    };
    return Help;
}(Command));
var Ls = /** @class */ (function (_super) {
    __extends(Ls, _super);
    function Ls(fs, terminal) {
        var _this = _super.call(this, fs, terminal) || this;
        _this.id = 'ls';
        _this.help = 'list directory contents';
        return _this;
    }
    Ls.prototype.execute = function (args, user, print) {
        return __awaiter(this, void 0, void 0, function () {
            var path, content, output, location_1, directory;
            return __generator(this, function (_a) {
                path = args[0];
                output = [];
                if (typeof path === 'string') {
                    location_1 = this.fs.getLocation(path);
                    if (!this.fs.isDirectory(location_1)) {
                        return [2 /*return*/];
                    }
                    directory = location_1;
                    content = directory.getContent();
                    content.forEach(function (e) {
                        output.push(e.name);
                    });
                }
                else if (path === 'mDirectory') {
                }
                else {
                    return [2 /*return*/];
                }
                if (print)
                    this.print(content);
                return [2 /*return*/];
            });
        });
    };
    Ls.prototype.print = function (output) {
        throw new Error("Method not implemented.");
    };
    return Ls;
}(Command));
var Sudo = /** @class */ (function (_super) {
    __extends(Sudo, _super);
    function Sudo(fs, terminal) {
        var _this = _super.call(this, fs, terminal) || this;
        _this.id = 'sudo';
        _this.help = 'execute a command as another user';
        _this.man = {};
        _this.sub_command = null;
        return _this;
    }
    Sudo.prototype.execute = function (args, user, print) {
        if (print === void 0) { print = true; }
        return __awaiter(this, void 0, void 0, function () {
            var command, result;
            return __generator(this, function (_a) {
                if (removeWhiteSpaceEntries(args).length < 1) {
                    // Display help
                    if (print)
                        this.print('sudo: help placeholder text');
                    return [2 /*return*/];
                }
                command = CommandFactory.getCommand(args[0], this.fs, this.terminal);
                if (!command) {
                    if (print)
                        this.print("sudo: " + args[0] + ": command not found");
                }
                if (command)
                    this.sub_command = command;
                result = this.sub_command.execute(args.slice(1), user = null /* root */, print = true);
                return [2 /*return*/, result];
            });
        });
    };
    Sudo.prototype.print = function (output) {
        if (this.sub_command != undefined && this.sub_command != null) {
            this.sub_command.print(output);
            return;
        }
        this.terminal.ui.innerHTML += this.terminal.tline_start + " " + output + " " + this.terminal.tline_end;
    };
    Sudo.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.forcestop = true;
                this.sub_command.stop();
                return [2 /*return*/];
            });
        });
    };
    return Sudo;
}(Command));
var CommandFactory = /** @class */ (function () {
    function CommandFactory() {
    }
    CommandFactory.getCommand = function (id, filesystem, terminal) {
        var index = this.command_ids.indexOf(id);
        return index != -1 ? new this.command_classes[index](filesystem, terminal) : false;
    };
    CommandFactory.command_ids = ['cat', 'clear', 'echo', 'help', /*'ls'*/ , 'sudo'];
    CommandFactory.command_classes = [Cat, Clear, Echo, Help, /*Ls*/ , Sudo];
    return CommandFactory;
}());
