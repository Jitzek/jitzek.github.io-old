var Pipeline = /** @class */ (function () {
    function Pipeline() {
        this.pipeline = [];
        this.commands = [];
    }
    Pipeline.prototype.execute = function (user) {
        if (user === void 0) { user = null; }
        var result = false;
        for (var i = 0; i < this.commands.length; i++) {
            var print_1 = i + 1 >= this.commands.length;
            if (result)
                this.commands[i][this.commands.length - 1] = result;
            result = this.pipeline[i].execute(this.commands[i].slice(1), null, print_1);
        }
        return result;
    };
    Pipeline.prototype.push = function (command, command_array) {
        this.pipeline.push(command);
        this.commands.push(command_array);
    };
    return Pipeline;
}());
var Console = /** @class */ (function () {
    function Console(terminal) {
        this.filesystem = new Filesystem();
        this.command_stack = [];
        this.commands = new Commands(this.filesystem, terminal);
        this.terminal = terminal;
    }
    Console.prototype.execute = function (args) {
        args = removeWhiteSpaceEntries(args);
        // Construct command stack
        var c_command_array = [];
        var c_pipeline = null;
        for (var i = 0; i < args.length; i++) {
            // if pipeline exists : add last command to pipeline and append pipeline to stack
            if (i + 1 >= args.length) {
                c_command_array.push(args[i]);
                var new_command = this.commands.getCommand(c_command_array[0]);
                if (!new_command)
                    return this.commandNotFound(c_command_array[0]);
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
                var new_command = this.commands.getCommand(c_command_array[0]);
                if (!new_command)
                    return this.commandNotFound(c_command_array[0]);
                // append command (if valid) to pipeline
                c_pipeline.push(new_command, c_command_array);
                c_command_array = [];
                continue;
            }
            else if (args[i] == ';' || args[i] == '&' || args[i] == '&&' /* etc */) {
                var new_command = this.commands.getCommand(c_command_array[0]);
                if (!new_command)
                    return this.commandNotFound(c_command_array[0]);
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
        var result = false;
        for (var i = 0; i < this.command_stack.length; i++) {
            if (this.command_stack[i].type == 'pipe')
                result = this.command_stack[i].executable.execute(null);
            else if (this.command_stack[i].type == 'command')
                result = this.command_stack[i].executable.execute(this.command_stack[i].args, null);
        }
        this.clean();
        return result;
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
            command.stop();
        });
        this.clean();
    };
    return Console;
}());
