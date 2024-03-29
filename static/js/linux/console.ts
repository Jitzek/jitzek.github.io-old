class Pipeline {
    pipeline: Command[] = [];
    commands: any[][] = [];

    private fs: Filesystem;

    constructor(fs: Filesystem) {
        this.fs = fs;
    }

    async execute(user: Object = null): Promise<any> {
        let result: any = false;
        for (let i = 0; i < this.commands.length; i++) {
            let print = i + 1 >= this.commands.length;

            if (result) {
                let temp = new mFile(null, 'temp');
                temp.setContent(this.convertOutputToString(result));
                this.commands[i].push(temp);
            }
            result = await this.pipeline[i].execute(this.commands[i].slice(1), null, print);
        }
        return result;
    }

    push(command: Command, command_array: string[]) {
        this.pipeline.push(command);
        this.commands.push(command_array);
    }

    async stop() {
        this.pipeline.forEach(command => {
            command.stop();
        });
    }
    private convertOutputToString(output: any): string {
        if (typeof output == 'string') return output;
        if (Array.isArray(output)) {
            let result = '';
            for (let i = 0; i < output.length; i++)
                result += i + 1 < output.length ? `${output[i]}\n` : output[i];
            return result;
        }
    }
}

class Console {
    filesystem = new Filesystem();
    current_command: Command;
    private terminal: Terminal;

    command_stack: any[] = [];

    constructor(terminal: Terminal) {
        this.terminal = terminal;
    }

    special_chars: string[] = [
        '<', '>', '>>', ';', '&&', '&', '||', '|'
    ];

    async execute(command: string) {
        // Split command by whitespace and/or special characters
        let args: string[] = [];
        args = command.split(' '); // TEMP
        args = this.convertGivenCommandToArgs(command);
        args = removeWhiteSpaceEntries(args);

        // Construct command stack
        let c_command_array: string[] = [];
        let c_pipeline: Pipeline = null;

        for (let i = 0; i < args.length; i++) {
            // if pipeline exists : add last command to pipeline and append pipeline to stack
            if (i + 1 >= args.length) {
                c_command_array.push(args[i]);

                let new_command = CommandFactory.getCommand(c_command_array[0], this.filesystem, this.terminal);
                if (!new_command) return this.commandNotFound(c_command_array[0]);

                if (c_pipeline != null) {
                    c_pipeline.push(new_command, c_command_array);
                    this.command_stack.push({ type: 'pipe', executable: c_pipeline });
                }
                else this.command_stack.push({ type: 'command', executable: new_command, args: c_command_array.slice(1) });

                c_command_array = [];
                continue;
            }

            if (args[i] == '|') {
                // if no pipeline exists : create
                if (c_pipeline == null) c_pipeline = new Pipeline(this.filesystem);

                let new_command = CommandFactory.getCommand(c_command_array[0], this.filesystem, this.terminal);
                if (!new_command) return this.commandNotFound(c_command_array[0]);

                // append command (if valid) to pipeline
                c_pipeline.push(new_command, c_command_array);

                c_command_array = [];
                continue;
            }

            else if (args[i] == ';' || args[i] == '&' || args[i] == '&&' /* etc */) {
                let new_command = CommandFactory.getCommand(c_command_array[0], this.filesystem, this.terminal);
                if (!new_command) return this.commandNotFound(c_command_array[0]);

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

            else c_command_array.push(args[i]);
        }

        for (let i = 0; i < this.command_stack.length; i++) {
            if (this.command_stack[i].type == 'pipe') await this.command_stack[i].executable.execute(null);
            else if (this.command_stack[i].type == 'command') await this.command_stack[i].executable.execute(this.command_stack[i].args, null);
        }

        this.clean();
    }

    private convertGivenCommandToArgs(command: string): string[] {
        let result: string[] = [];
        // Iterate through each character of the command string
        let c_arg = '';
        conversion:
        for (let i = 0; i < command.length; i++) {
            // If character is a whitespace, add previous gathered entry (if not empty)
            if (command[i] == ' ') {
                if (c_arg == '') continue;
                result.push(c_arg);
                c_arg = '';
                continue;
            }
            // If character is a special character, add previous gathered entry (if not empty) and push special character as seperate entry
            for (let j = 0; j < this.special_chars.length; j++) {
                let s = '';
                for (let k = 0; k < this.special_chars[j].length; k++) s += `\\${this.special_chars[j][k]}`;
                let match = new RegExp(s, 'g').exec(command.slice(i, command.length));
                if (!match || match.index != 0) continue;
                if (c_arg != '') {
                    result.push(c_arg);
                    c_arg = '';
                }
                i += (match[0].length - 1);
                result.push(match[0]);
                continue conversion;
            }
            c_arg += command[i];
            if (i + 1 >= command.length) result.push(c_arg);
        }
        return result
    }

    private commandNotFound(command: string) {
        this.clean();
        let output = `bash: ${command}: command not found`;
        this.print(output);
        return `bash: ${command}: command not found`;
    }

    private print(msg: any) {
        this.terminal.ui.innerHTML += `${this.terminal.tline_start} ${msg} ${this.terminal.tline_end}`;
    }

    private clean() {
        this.command_stack = [];
    }

    private removeWhiteSpaceEntries(array: Array<string>) {
        return array.filter(function (str: string) { return /\S/.test(str); })
    }

    forceStop() {
        this.command_stack.forEach(command => {
            command.executable.stop();
        });
        this.clean();
    }
}