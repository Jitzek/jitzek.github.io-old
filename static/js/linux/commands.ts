class Commands {
  commands: Array<Command> = [];
  constructor(filesystem: Filesystem, terminal: Terminal) {
    this.commands = [new Cat(filesystem, terminal), new Clear(filesystem, terminal), new Echo(filesystem, terminal)];
  }

  getCommand(commandid: string): any {
    for (let i = 0; i < this.commands.length; i++) if (this.commands[i].id == commandid) return this.commands[i];
    return false;
  }
}

interface Command {
  id: string;
  man: Object;
  fs: Filesystem;
  terminal: Terminal;
  forcestop: boolean;

  execute(args: Array<string>, user: Object): any;
  print(output: any): void;
  stop(): void;
}

class Cat implements Command {
  id: string;
  man: Object;
  fs: Filesystem;
  terminal: Terminal;
  forcestop = false;
  constructor(fs: Filesystem, terminal: Terminal) {
    this.id = 'cat';
    this.man = {};
    this.fs = fs;
    this.terminal = terminal;
  }

  execute(args: Array<string>, user: Object = null, print = true): any {
    // Determine additional parameters ('-', '--')

    //

    // Get location of file
    let location = this.fs.getLocation(args[0]);

    // Check if location is file
    if (!this.fs.isFile(location)) {
      let output = `cat: cannot open ${location.name}`;
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

class Clear implements Command {
  id: string;
  man: Object;
  fs: Filesystem;
  terminal: Terminal;
  forcestop = false;
  constructor(fs: Filesystem, terminal: Terminal) {
    this.id = 'clear';
    this.man = {};
    this.fs = fs;
    this.terminal = terminal;
  }

  execute(args: string[], user: Object = null, print = false): any {
    // Determine additional parameters ('-', '--')

    //
    this.terminal.ui.innerHTML = '';

    if (print) this.print();
    
    return false;
  }

  print(output: any=null) {
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

class Echo implements Command {
  id: string;
  man: Object;
  fs: Filesystem;
  terminal: Terminal;
  forcestop = false;
  constructor(fs: Filesystem, terminal: Terminal) {
    this.id = 'echo';
    this.man = {};
    this.fs = fs;
    this.terminal = terminal;
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