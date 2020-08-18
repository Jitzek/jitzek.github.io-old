class Console {
    filesystem = new Filesystem();
    commands: Commands;
    current_command: Command;

    constructor(terminal: Terminal) {
        this.commands = new Commands(this.filesystem, terminal);
    }

    execute(args: Array<string>): string {
        let sudo = args[0] == 'sudo';
        if (sudo) args.shift();
        // Check if the only given input is sudo or whitespace
        if (args.length < 1 || (args[0] == "" && args.every((val, i, arr) => val === arr[0]))) {
            if (sudo) {
                // Return sudo command logic
                return `sudo placeholder text`;
            }
            return '';
        }
        let command: any = this.commands.getCommand(args[0]);
        if (!command) return `bash: ${args[0]}: command not found`;
        return command.execute(args.slice(1), /* user */);
    }

    forceStop() {
        this.current_command.stop();
    }
}