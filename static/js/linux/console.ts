class Pipeline {
    pipeline: Command[] = [];
    commands: string[][] = [];

    execute(user: Object = null): any {
        let result: any = false;
        for (let i = 0; i < this.commands.length; i++) {
            let print = i + 1 >= this.commands.length;
            if (result) this.commands[i][this.commands.length - 1] = result;
            result = this.pipeline[i].execute(this.commands[i].slice(1), null, print);
        }
        return result;
    }

    push(command: Command, command_array: string[]) {
        this.pipeline.push(command);
        this.commands.push(command_array);
    }
}

class Console {
    filesystem = new Filesystem();
    commands: Commands;
    current_command: Command;
    private terminal: Terminal;

    command_stack: any[] = [];

    constructor(terminal: Terminal) {
        this.commands = new Commands(this.filesystem, terminal);
        this.terminal = terminal;
    }

    execute(args: Array<string>): string {
        /** 
         * Refactoring Needed, functional but cluttered and unreadable
         */

        /// Logic:

        /// if '|' <- Pipe:
        /// if no pipeline exists : create
        /// append command (if valid) to pipeline

        /// if ';' || '&' etc. <- Chain:
        /// if pipeline exists : add last command to pipeline and append pipeline to stack
        /// append command (if valid) to stack

        /// last list iteration: 
        /// if pipeline exists : add last command to pipeline and append pipeline to stack


        args = removeWhiteSpaceEntries(args);

        // Construct command stack
        let c_command_array: string[] = [];
        let c_pipeline: Pipeline = null;

        for (let i = 0; i < args.length; i++) {
            // if pipeline exists : add last command to pipeline and append pipeline to stack
            if (i + 1 >= args.length) {
                c_command_array.push(args[i]);

                let new_command = this.commands.getCommand(c_command_array[0]);
                if (!new_command) return this.commandNotFound(new_command);

                if (c_pipeline != null) this.command_stack.push({ type: 'pipe', executable: c_pipeline });
                else this.command_stack.push({ type: 'command', executable: new_command, args: c_command_array.slice(1) });
                
                c_command_array = [];
                continue;
            }

            if (args[i] == '|') {
                // if no pipeline exists : create
                if (c_pipeline == null) c_pipeline = new Pipeline();

                let new_command = this.commands.getCommand(c_command_array[0]);
                if (!new_command) return this.commandNotFound(new_command);

                // append command (if valid) to pipeline
                c_pipeline.push(new_command, c_command_array);

                c_command_array = [];
                continue;
            }

            else if (args[i] == ';' || args[i] == '&' || args[i] == '&&' /* etc */) {
                let new_command = this.commands.getCommand(c_command_array[0]);
                if (!new_command) return this.commandNotFound(new_command);
                
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

        let result: any = false;
        for (let i = 0; i < this.command_stack.length; i++) {
            if (this.command_stack[i].type == 'pipe') result = this.command_stack[i].executable.execute(null);
            else if (this.command_stack[i].type == 'command') result = this.command_stack[i].executable.execute(this.command_stack[i].args, null);
        }

        //this.current_command = this.commands.getCommand(args[0]);
        //if (!this.current_command) return `bash: ${args[0]}: command not found`;

        this.clean();
        return result;

        /*
        // Construct Pipeline
        let command_arrs: any[][] = [];
        let current_command_arr: any[] = [];
        let current_pipeline: Pipeline = null;
        for (let i = 0; i < args.length; i++) {
            if (i + 1 >= args.length) {
                current_command_arr.push(args[i]);
            }
            let pipe = args[i] == '|';
            let chain = args[i] == ';' || args[i] == '&' || args[i] == '&&';
            if (pipe || (current_pipeline != null && i + 1 >= args.length) || (chain && current_pipeline != null)) {
                // Append to existing pipeline or create new pipeline
                if (current_pipeline == null) current_pipeline = new Pipeline();
                let new_command: Command = this.commands.getCommand(current_command_arr[0]);
                if (!new_command) {
                    this.clean();
                    let output = `bash: ${current_command_arr[0]}: command not found`;
                    this.print(output);
                    return `bash: ${current_command_arr[0]}: command not found`;
                }

                current_pipeline.push(new_command, current_command_arr);

                current_command_arr = [];

                if (i + 1 >= args.length || chain) this.command_stack.push(current_pipeline);

                if (chain) current_pipeline = null;
                continue;
            }
            else if (chain || i + 1 >= args.length) {
                let new_command: Command = this.commands.getCommand(current_command_arr[0]);
                if (!new_command) {
                    this.clean();
                    let output = `bash: ${current_command_arr[0]}: command not found`;
                    this.print(output);
                    return `bash: ${current_command_arr[0]}: command not found`;
                }
                this.command_stack.push(new_command);
                command_arrs.push(current_command_arr);

                current_command_arr = [];
                continue;
            }
            if (i + 1 < args.length) current_command_arr.push(args[i]);
            else {
                let new_command: Command = this.commands.getCommand(current_command_arr[0]);
                if (!new_command) {
                    this.clean();
                    let output = `bash: ${current_command_arr[0]}: command not found`;
                    this.print(output);
                    return `bash: ${current_command_arr[0]}: command not found`;
                }
                this.command_stack.push(new_command);
            }
        }*/

        /** 
         * ///////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!/////////////////// 
         */
    }

    private commandNotFound(command: Command) {
        this.clean();
        let output = `bash: ${command.id}: command not found`;
        this.print(output);
        return `bash: ${command.id}: command not found`;
    }

    private print(msg: any) {
        this.terminal.ui.innerHTML += `${this.terminal.tline_start} ${msg} ${this.terminal.tline_end}`;
    }

    private clean() {
        this.command_stack = [];
    }

    private removeWhiteSpaceEntries(array: Array<string>) {
        return array.filter(function(str: string) {return /\S/.test(str);})
    }

    pipeTo(output_of: Command, input_of: Command) { // |

    }

    writeTo() { // >

    }

    appendTo() { // >>

    }

    forceStop() {
        this.command_stack.forEach(command => {
            command.stop();
        });
        this.clean();
    }
}