var Console = /** @class */ (function () {
    function Console(terminal) {
        this.filesystem = new Filesystem();
        this.commands = new Commands(this.filesystem, terminal);
    }
    Console.prototype.execute = function (args) {
        var sudo = args[0] == 'sudo';
        if (sudo)
            args.shift();
        // Check if the only given input is sudo or whitespace
        if (args.length < 1 || (args[0] == "" && args.every(function (val, i, arr) { return val === arr[0]; }))) {
            if (sudo) {
                // Return sudo command logic
                return "sudo placeholder text";
            }
            return '';
        }
        var command = this.commands.getCommand(args[0]);
        if (!command)
            return "bash: " + args[0] + ": command not found";
        return command.execute(args.slice(1));
    };
    Console.prototype.forceStop = function () {
        this.current_command.stop();
    };
    return Console;
}());
