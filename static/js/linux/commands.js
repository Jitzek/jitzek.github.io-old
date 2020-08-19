function removeWhiteSpaceEntries(array) {
    return array.filter(function (str) { return /\S/.test(str); });
}
var Commands = /** @class */ (function () {
    function Commands(filesystem, terminal) {
        this.commands = [];
        this.commands = [new Cat(filesystem, terminal), new Clear(filesystem, terminal), new Echo(filesystem, terminal), new Sudo(filesystem, terminal)];
    }
    Commands.prototype.getCommand = function (commandid) {
        for (var i = 0; i < this.commands.length; i++)
            if (this.commands[i].id == commandid)
                return this.commands[i];
        return false;
    };
    return Commands;
}());
var Cat = /** @class */ (function () {
    function Cat(fs, terminal) {
        this.id = 'cat';
        this.man = {};
        this.forcestop = false;
        this.sub_command = null;
        this.fs = fs;
        this.terminal = terminal;
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
        this.sub_command.stop();
    };
    return Cat;
}());
var Clear = /** @class */ (function () {
    function Clear(fs, terminal) {
        this.id = 'clear';
        this.man = {};
        this.forcestop = false;
        this.sub_command = null;
        this.fs = fs;
        this.terminal = terminal;
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
        this.sub_command.stop();
    };
    return Clear;
}());
var Echo = /** @class */ (function () {
    function Echo(fs, terminal) {
        this.id = 'echo';
        this.forcestop = false;
        this.sub_command = null;
        this.fs = fs;
        this.terminal = terminal;
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
        this.sub_command.stop();
    };
    return Echo;
}());
var Sudo = /** @class */ (function () {
    function Sudo(fs, terminal) {
        this.id = 'sudo';
        this.man = {};
        this.sub_command = null;
        this.fs = fs;
        this.terminal = terminal;
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
        var command = new Commands(this.fs, this.terminal).getCommand(args[0]);
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
}());
