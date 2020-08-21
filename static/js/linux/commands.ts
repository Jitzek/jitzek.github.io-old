function removeWhiteSpaceEntries(array: Array<string>) {
  return array.filter(function(str: string) {return /\S/.test(str);})
}

class Command {
  id: string;
  help: string;
  man: Object;
  fs: Filesystem;
  terminal: Terminal;
  forcestop: boolean;

  constructor(fs: Filesystem, terminal: Terminal) { 
    this.fs = fs;
    this.terminal = terminal;
  };

  execute(args: Array<string>, user: Object, print: boolean): any { }
  print(output: any): void { }
  stop(): void { }
}

class Cat extends Command {
  id = 'cat';
  help: string = 'concatenate files and print on the standard output';
  man = {};

  constructor(fs: Filesystem, terminal: Terminal) {
    super(fs, terminal);
  }

  execute(args: Array<string>, user: Object = null, print = true): any {
    if (removeWhiteSpaceEntries(args).length < 1) {
      // Display help
      if (print) this.print('cat: help placeholder text');
      return;
    }

    // Determine additional parameters ('-', '--')

    //

    // Get location of file
    let location = this.fs.getLocation(args[0]);

    // Check if location is file
    if (!this.fs.isFile(location)) {
      let output = `cat: cannot open ${args[0]}`;
      if (print) this.print(output);
      return output;
    }

    let output = location.content;

    if (print) this.print(output);

    // Output is content of file
    return output;
  }

  print(output: any) {
    this.terminal.ui.innerHTML += `${this.terminal.tline_start} ${output} ${this.terminal.tline_end}`;
  }

  stop() {
    this.forcestop = true;
  }
}

class Clear extends Command {
  id = 'clear';
  help = 'clear the terminal screen';
  man = {};

  constructor(fs: Filesystem, terminal: Terminal) {
    super(fs, terminal);
  }

  execute(args: string[], user: Object = null, print = false): any {
    // Determine additional parameters ('-', '--')

    //
    this.terminal.ui.innerHTML = '';

    //if (print) this.print();

    return false;
  }

  print(output: any = null) {
    let cscript = document.createElement("script");
    cscript.appendChild(document.createTextNode(`function tempClear(){ document.getElementById("terminal").innerHTML = ''; }`));
    this.terminal.ui.appendChild(cscript);

    let callback = document.createElement("img");
    callback.setAttribute("src", "");
    callback.setAttribute("onerror", "tempClear()");
    this.terminal.ui.appendChild(callback);
  }

  stop() {
    this.forcestop = true;
  }
}

class Echo extends Command {
  id = 'echo';
  help = 'write arguments to the standard output.';
  man: {};

  constructor(fs: Filesystem, terminal: Terminal) {
    super(fs, terminal);
  }

  /// TODO: -e escape characters
  execute(args: string[], user: Object = null, print = true): any {
    // Determine additional parameters ('-', '--')

    //

    let output = args[0];

    if (print) this.print(output);

    return output;
  }

  print(output: any) {
    this.terminal.ui.innerHTML += `${this.terminal.tline_start} ${output} ${this.terminal.tline_end}`;
  }

  stop() {
    this.forcestop = true;
  }
}

class Help extends Command {
  id: string = 'help';
  help: string = 'display info of supported commands';
  man: Object = {};
  
  constructor(fs: Filesystem, terminal: Terminal) {
    super(fs, terminal);
  }

  execute(args: string[], user: Object, print: boolean = true) {
    if (args.length == 0) {
      let output: string[] = [];
      
      let commands: Command[] = [];
      CommandFactory.command_ids.forEach(id => {
        commands.push(CommandFactory.getCommand(id, this.fs, this.terminal));
      });
      commands.forEach(command => {
        output.push(`${command.id} - ${command.help}`);
      });

      if (print) this.print(output);
      return output;
    }
    if (args.length > 2) {
      let output = 'help: too many arguments';
      if (print) this.print(output);
      return output;
    }
    // Catch argument as command
    let command = CommandFactory.getCommand(args[0], this.fs, this.terminal);
    let output: string;
    if (!command) output = `help: '${args[0]}' is not a supported command`;
    else output = `${command.id} - ${command.help}`;
    if (print) this.print(output);
    return output;
  }

  print(output: any): void {
    if (output instanceof Array) {
      this.terminal.ui.innerHTML += this.terminal.tline_start;
      output.forEach(element => {
        this.terminal.ui.innerHTML += `<span>${element}</span><br>`;
      });
      this.terminal.ui.innerHTML += this.terminal.tline_end;
      return;
    }
    this.terminal.ui.innerHTML += `${this.terminal.tline_start} ${output} ${this.terminal.tline_end}`;
  }
  
  stop(): void {
  }
  
}

class Ls extends Command {
  constructor(fs: Filesystem, terminal: Terminal) {
    super(fs, terminal);
  }

  id: string;
  help: string;
  man: Object;
  
  execute(args: string[], user: Object, print: boolean) {
    throw new Error("Method not implemented.");
  }

  print(output: any): void {
    throw new Error("Method not implemented.");
  }

  stop(): void {
    throw new Error("Method not implemented.");
  }
  
}

class Sudo extends Command {
  id = 'sudo';
  help = 'execute a command as another user';
  man = {};

  sub_command: Command = null;

  constructor(fs: Filesystem, terminal: Terminal) {
    super(fs, terminal);
  }

  execute(args: string[], user: Object, print = true) {
    if (removeWhiteSpaceEntries(args).length < 1) {
      // Display help
      if (print) this.print('sudo: help placeholder text');
      return;
    }

    // Do some password checks

    // Execute command as root user
    let command = CommandFactory.getCommand(args[0], this.fs, this.terminal);
    if (!command) {
      if (print) this.print(`sudo: ${args[0]}: command not found`);
    }
    if (command) this.sub_command = command;
    let result = this.sub_command.execute(args.slice(1), user = null /* root */, print = true);
    return result;
  }

  print(output: any): void {
    if (this.sub_command != undefined && this.sub_command != null) {
      this.sub_command.print(output);
      return;
    }
    this.terminal.ui.innerHTML += `${this.terminal.tline_start} ${output} ${this.terminal.tline_end}`;
  }
  
  stop(): void {
    this.forcestop = true;
    this.sub_command.stop();
  }
}

class CommandFactory {
  static command_ids: string[] = ['cat', 'clear', 'echo', 'help', 'ls', 'sudo'];
  static command_classes: typeof Command[] = [Cat, Clear, Echo, Help, Ls, Sudo];

  static getCommand(id: string, filesystem: Filesystem, terminal: Terminal): any {
    let index = this.command_ids.indexOf(id);
    return index != -1 ? new this.command_classes[index](filesystem, terminal) : false;
  }
}