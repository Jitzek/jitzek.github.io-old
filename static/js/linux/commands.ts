class Commands {
  commands: Array<Command> = [];
  constructor(filesystem: Filesystem) {
    this.commands = [new Cat(filesystem)];
  }

  getCommand(commandid: string): any {
    for (let i = 0; i < this.commands.length; i++) if (this.commands[i].id == commandid) return this.commands[i];
    return false;
  }
}

interface Command {
  id: string;
  man: Object;
  output: Object;
  fs: Filesystem;

  execute(): void;
  print(terminal: Terminal): void;
}

class Cat implements Command {
  id: string;
  man: Object;
  output: Object = false;
  fs: Filesystem;
  constructor(fs: Filesystem) {
    this.id = 'cat';
    this.man = {};
    this.fs = fs;
  }

  execute(): void {
    throw new Error("Method not implemented.");
  }
  print(terminal: Terminal): void {
    throw new Error("Method not implemented.");
  }
}