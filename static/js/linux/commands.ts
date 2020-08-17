class Commands {
  commands: Array<Command> = [];
  constructor(filesystem: Filesystem) {
    this.commands = [new Cat(filesystem), new Clear(filesystem), new Echo(filesystem)];
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

  execute(ui: HTMLObjectElement, args: Array<string>, user: Object): any;
}

class Cat implements Command {
  id: string;
  man: Object;
  fs: Filesystem;
  constructor(fs: Filesystem) {
    this.id = 'cat';
    this.man = {};
    this.fs = fs;
  }

  execute(ui: HTMLObjectElement, args: Array<string>, user: Object = null): any {
    // Determine additional parameters ('-', '--')

    //

    // Get location of file
    let location = this.fs.getLocation(args[0]);

    // Check if location is file
    if (!this.fs.isFile(location)) return `cat: cannot open ${location.name}`;

    // Output is content of file
    return location.content;
  }
}

class Clear implements Command {
  id: string;
  man: Object;
  fs: Filesystem;
  constructor(fs: Filesystem) {
    this.id = 'clear';
    this.man = {};
    this.fs = fs;
  }

  execute(ui: HTMLObjectElement, args: string[], user: Object = null): any {
    // Determine additional parameters ('-', '--')

    //
    ui.innerHTML = '';
  }
}

class Echo implements Command {
  id: string;
  man: Object;
  fs: Filesystem;
  constructor(fs: Filesystem) {
    this.id = 'echo';
    this.man = {};
    this.fs = fs;
  }

  /// TODO: -e escape characters
  execute(ui: HTMLObjectElement, args: string[], user: Object = null): any {
    // Determine additional parameters ('-', '--')

    //
    ui.innerHTML += '<p id="terminal-line" style="color: ' +
      COLOR_OUTPUT +
      ';">' +
      args[0] +
      "</p>";
  }
}