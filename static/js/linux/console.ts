class Console {
    filesystem = new Filesystem();
    commands = new Commands(this.filesystem);

    execute(args: Array<string>): Object {
        let sudo = args[0] == 'sudo';
        if (sudo) args.shift();
        // Check if the only given input is sudo or whitespace
        if (args.length < 1 || (args[0] == "" && args.every((val, i, arr) => val === arr[0]))) {
            if (sudo) {
                // Return sudo command logic
                return {output: `sudo placeholder text`, error: true};
            }
            return {output: '', error: false};
        }
        let command: any = this.commands.getCommand(args[0]);
        if (!command) return {output: `bash: ${args[0]}: command not found`, error: true};
        command.execute(args.slice(1), sudo /* or root user */);
        return {command: command.id, output: command.output, error: false};
    }
}