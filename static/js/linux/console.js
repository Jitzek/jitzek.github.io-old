var Console = /** @class */ (function () {
    function Console() {
        this.filesystem = new Filesystem();
        this.commands = new Commands(this.filesystem);
    }
    Console.prototype.execute = function (args) {
        var sudo = args[0] == 'sudo';
        if (sudo)
            args.shift();
        var command = this.commands.getCommand(args[0]);
        if (!command)
            return { output: "bash: " + args[0] + ": command not found", error: true };
        command.execute();
        return { command: command, output: command.output, error: false };
    };
    return Console;
}());
