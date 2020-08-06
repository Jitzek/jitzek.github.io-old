class Console {
    filesystem = new Filesystem();
    commands = new Commands(this.filesystem);

    execute(args: Array<string>): Object {
        let sudo = args[0] == 'sudo';
        if (sudo) args.shift();
        let command: any = this.commands.getCommand(args[0]);
        if (!command) return {output: `bash: ${args[0]}: command not found`, error: true};
        command.execute();
        return {command: command, output: command.output, error: false};
    }
}