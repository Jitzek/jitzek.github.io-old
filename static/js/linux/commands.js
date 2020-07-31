// NOTICE
// Will throw error because FileSystem is undefined
// As long as the filesystem.js is called before the commands.js it should work
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
function getAdditionalArgs(args) {
    var a_args = [];
    for (var i = 1; i < args.length; i++) {
        if (args[i][0] == "-") {
            for (var j = 1; j < args[i].length; j++) {
                a_args.push(args[i][j]);
            }
        }
    }
    return a_args;
}
function helpCalled(args) {
    return args[1] == "--help";
}
var OutputType;
(function (OutputType) {
    OutputType[OutputType["STDOUT"] = 0] = "STDOUT";
    OutputType[OutputType["STDERR"] = 1] = "STDERR";
    OutputType[OutputType["NONE"] = 2] = "NONE";
})(OutputType || (OutputType = {}));
var Command = /** @class */ (function () {
    function Command(terminal, filesystem) {
        this.COLOR_OUTPUT = "#FFFFFF";
        this.COLOR_ERR = "rgb(255, 0, 0)";
        this.terminal = terminal;
        this.filesystem = filesystem;
    }
    Command.prototype.execute = function (args) {
        throw new Error("Method not implemented.");
    };
    Command.prototype.print = function (output) {
        // Print generic output
        if (output.type == OutputType.STDOUT) {
            this.printGenericMessage(output.output);
            return true;
        }
        if (output.type == OutputType.STDERR) {
            this.printGenericError(output.output);
            return true;
        }
        return false;
    };
    Command.prototype.printGenericMessage = function (msg) {
        this.terminal.innerHTML +=
            '<p id="terminal-line" style="color: ' +
                this.COLOR_OUTPUT +
                ';">' +
                msg +
                "</p>";
    };
    Command.prototype.printGenericError = function (errormsg) {
        this.terminal.innerHTML +=
            '<p id="terminal-line" style="color: ' +
                this.COLOR_ERR +
                ';">' +
                errormsg +
                "</p>";
    };
    return Command;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(terminal, filesystem) {
        var _this = _super.call(this, terminal, filesystem) || this;
        _this.id = "cat";
        _this.help = "concatenate files and print on the standard output";
        return _this;
    }
    Cat.prototype.execute = function (args) {
        // Catch help (--help)
        if (helpCalled(args))
            return { output: this.help, type: OutputType.STDOUT };
        // Catch additional args (-)
        var a_args = getAdditionalArgs(args);
        //
        // @TODO Do something with additional args
        //
        // Get given path
        var path = args[1];
        for (var i = 1; i < args.length; i++) {
            path = args[i];
            if (args[i][0] != "-")
                break;
        }
        // Convert given path to legal path
        path = this.filesystem.convertToLegalPath(path);
        var result = this.filesystem.getFileByPath(path);
        // Handle no file found
        if (!result)
            return {
                output: "cat: " + path + ": No such file or directory",
                type: OutputType.STDERR
            };
        // Handle not a file
        if (!this.filesystem.isFile(path))
            return {
                output: "cat: " + path + ": Is a directory",
                type: OutputType.STDERR
            };
        // Return file
        return { output: result.content, type: OutputType.STDOUT };
    };
    Cat.prototype.print = function (output) {
        return _super.prototype.print.call(this, output);
    };
    return Cat;
}(Command));
var Clear = /** @class */ (function (_super) {
    __extends(Clear, _super);
    function Clear(terminal, filesystem) {
        var _this = _super.call(this, terminal, filesystem) || this;
        _this.id = "clear";
        _this.help = "clear the terminal screen";
        return _this;
    }
    Clear.prototype.execute = function (args) {
        // Catch help (--help)
        if (helpCalled(args))
            return { output: this.help, type: OutputType.STDOUT };
        // Catch additional args (-)
        var a_args = getAdditionalArgs(args);
        //
        // @TODO Do something with additional args
        //
        this.terminal.innerHTML = "";
        return { output: null, type: OutputType.NONE };
    };
    Clear.prototype.print = function (output) {
        return _super.prototype.print.call(this, output);
    };
    return Clear;
}(Command));
var Ls = /** @class */ (function (_super) {
    __extends(Ls, _super);
    function Ls(terminal, filesystem) {
        var _this = _super.call(this, terminal, filesystem) || this;
        _this.COLOR_FILE = "#FFFFFF";
        _this.COLOR_DIR = "#038CFC";
        _this.CTYPE_FILE = "CTYPE_FILE";
        _this.CTYPE_DIR = "CTYPE_DIR";
        _this.id = "ls";
        _this.help = "list directory contents";
        return _this;
    }
    Ls.prototype.execute = function (args) {
        // Catch help (--help)
        if (helpCalled(args))
            return { output: this.help, type: OutputType.STDOUT };
        // Catch additional args (-)
        var a_args = getAdditionalArgs(args);
        //
        // @TODO Do something with additional args
        //
        // Get given path
        var path = args[1];
        for (var i = 1; i < args.length; i++) {
            path = args[i];
            if (args[i][0] != "-")
                break;
        }
        // Convert given path to legal path
        path = this.filesystem.convertToLegalPath(path);
        var req = args.length > 1
            ? this.filesystem.getFileByPath(path)
            : this.filesystem.current_dir;
        // Handle no file found
        if (!req)
            return {
                output: "ls: cannot access '" + path + "': No such file or directory",
                type: OutputType.STDERR
            };
        // If requested object is a File
        if (this.filesystem.isFile(this.filesystem.getLocationAsPath(req))) {
            var file = this.filesystem.getPathAsArray(path);
            return { output: file[file.length - 1], type: this.CTYPE_FILE };
        }
        return { output: Object.keys(req), type: this.CTYPE_DIR };
    };
    Ls.prototype.print = function (output) {
        var _this = this;
        if (output.type == OutputType.STDOUT || output.type == OutputType.STDERR)
            return _super.prototype.print.call(this, output);
        if (output.type == this.CTYPE_FILE) {
            this.terminal.innerHTML +=
                '<span id="terminal-line" style="color: ' +
                    this.COLOR_FILE +
                    ';">' +
                    output.output +
                    "</span> &nbsp;";
            return true;
        }
        if (output.type == this.CTYPE_DIR) {
            if (!(output.output instanceof Array)) {
                return false;
            }
            output.output.forEach(function (item) {
                if (_this.filesystem.isDirectory(item)) {
                    _this.terminal.innerHTML +=
                        '<span id="terminal-line" style="color: ' +
                            _this.COLOR_DIR +
                            ';">' +
                            item +
                            "</span> &nbsp;";
                }
                else if (_this.filesystem.isFile(item)) {
                    _this.terminal.innerHTML +=
                        '<span id="terminal-line" style="color: ' +
                            _this.COLOR_FILE +
                            ';">' +
                            item +
                            "</span> &nbsp;";
                }
            });
            return true;
        }
        return false;
    };
    return Ls;
}(Command));
