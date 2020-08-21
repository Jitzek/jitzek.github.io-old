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
function removeWhiteSpaceEntries(array) {
    return array.filter(function (str) { return /\S/.test(str); });
}
var Command = /** @class */ (function () {
    function Command(fs, terminal) {
        this.fs = fs;
        this.terminal = terminal;
    }
    ;
    Command.prototype.execute = function (args, user, print) { };
    Command.prototype.print = function (output) { };
    Command.prototype.stop = function () { };
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
        if (removeWhiteSpaceEntries(args).length < 1) {
            // Display help
            if (print)
                this.print('cat: help placeholder text');
            return;
        }
        // Determine additional parameters ('-', '--')
        //
        // Get location of file
        var location = this.fs.getLocation(args[0]);
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
    Cat.prototype.stop = function () {
        this.forcestop = true;
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
        // Determine additional parameters ('-', '--')
        if (user === void 0) { user = null; }
        if (print === void 0) { print = false; }
        //
        this.terminal.ui.innerHTML = '';
        //if (print) this.print();
        return false;
    };
    Clear.prototype.print = function (output) {
        if (output === void 0) { output = null; }
        var cscript = document.createElement("script");
        cscript.appendChild(document.createTextNode("function tempClear(){ document.getElementById(\"terminal\").innerHTML = ''; }"));
        this.terminal.ui.appendChild(cscript);
        var callback = document.createElement("img");
        callback.setAttribute("src", "");
        callback.setAttribute("onerror", "tempClear()");
        this.terminal.ui.appendChild(callback);
    };
    Clear.prototype.stop = function () {
        this.forcestop = true;
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
        // Determine additional parameters ('-', '--')
        if (user === void 0) { user = null; }
        if (print === void 0) { print = true; }
        //
        var output = args[0];
        if (print)
            this.print(output);
        return output;
    };
    Echo.prototype.print = function (output) {
        this.terminal.ui.innerHTML += this.terminal.tline_start + " " + output + " " + this.terminal.tline_end;
    };
    Echo.prototype.stop = function () {
        this.forcestop = true;
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
        var _this = this;
        if (print === void 0) { print = true; }
        if (args.length == 0) {
            var output_2 = [];
            var commands_1 = [];
            CommandFactory.command_ids.forEach(function (id) {
                commands_1.push(CommandFactory.getCommand(id, _this.fs, _this.terminal));
            });
            commands_1.forEach(function (command) {
                output_2.push(command.id + " - " + command.help);
            });
            if (print)
                this.print(output_2);
            return output_2;
        }
        if (args.length > 2) {
            var output_3 = 'help: too many arguments';
            if (print)
                this.print(output_3);
            return output_3;
        }
        // Catch argument as command
        var command = CommandFactory.getCommand(args[0], this.fs, this.terminal);
        var output;
        if (!command)
            output = "help: '" + args[0] + "' is not a supported command";
        else
            output = command.id + " - " + command.help;
        if (print)
            this.print(output);
        return output;
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
    Help.prototype.stop = function () {
    };
    return Help;
}(Command));
var Ls = /** @class */ (function (_super) {
    __extends(Ls, _super);
    function Ls(fs, terminal) {
        return _super.call(this, fs, terminal) || this;
    }
    Ls.prototype.execute = function (args, user, print) {
        throw new Error("Method not implemented.");
    };
    Ls.prototype.print = function (output) {
        throw new Error("Method not implemented.");
    };
    Ls.prototype.stop = function () {
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
        if (removeWhiteSpaceEntries(args).length < 1) {
            // Display help
            if (print)
                this.print('sudo: help placeholder text');
            return;
        }
        // Do some password checks
        // Execute command as root user
        var command = CommandFactory.getCommand(args[0], this.fs, this.terminal);
        if (!command) {
            if (print)
                this.print("sudo: " + args[0] + ": command not found");
        }
        if (command)
            this.sub_command = command;
        var result = this.sub_command.execute(args.slice(1), user = null /* root */, print = true);
        return result;
    };
    Sudo.prototype.print = function (output) {
        if (this.sub_command != undefined && this.sub_command != null) {
            this.sub_command.print(output);
            return;
        }
        this.terminal.ui.innerHTML += this.terminal.tline_start + " " + output + " " + this.terminal.tline_end;
    };
    Sudo.prototype.stop = function () {
        this.forcestop = true;
        this.sub_command.stop();
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
    CommandFactory.command_ids = ['cat', 'clear', 'echo', 'help', 'ls', 'sudo'];
    CommandFactory.command_classes = [Cat, Clear, Echo, Help, Ls, Sudo];
    return CommandFactory;
}());
