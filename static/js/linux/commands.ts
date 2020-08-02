// NOTICE
// Will throw error because FileSystem is undefined
// As long as the filesystem.js is called before the commands.js it should work

function getAdditionalArgs(args: string[]): string[] {
  let a_args = [];
  for (let i = 1; i < args.length; i++) {
    if (args[i][0] == "-") {
      for (let j = 1; j < args[i].length; j++) {
        a_args.push(args[i][j]);
      }
    }
  }
  return a_args;
}

function helpCalled(args: string[]) {
  return args[1] == "--help";
}

enum OutputType {
  STDOUT,
  STDERR,
  NONE,
}

class Command {
  id: string;
  help: string;
  terminal: HTMLElement;
  filesystem: FileSystem;

  private COLOR_OUTPUT = "#FFFFFF";
  private COLOR_ERR = "rgb(255, 0, 0)";

  constructor(terminal: HTMLElement, filesystem: FileSystem) {
    this.terminal = terminal;
    this.filesystem = filesystem;
  }

  public execute(args: string[]): Object {
    throw new Error("Method not implemented.");
  }

  public print(output: any): boolean {
    // Print generic output
    if (output.type == OutputType.STDOUT) {
      this.printGenericOutput(output.output);
      return true;
    }
    if (output.type == OutputType.STDERR) {
      this.printGenericError(output.output);
      return true;
    }
    return false;
  }

  private printGenericOutput(msg: string) {
    this.terminal.innerHTML +=
      '<p id="terminal-line" style="color: ' +
      this.COLOR_OUTPUT +
      ';">' +
      msg +
      "</p>";
  }
  private printGenericError(errormsg: string) {
    this.terminal.innerHTML +=
      '<p id="terminal-line" style="color: ' +
      this.COLOR_ERR +
      ';">' +
      errormsg +
      "</p>";
  }
}

class Cat extends Command {
  constructor(terminal: HTMLElement, filesystem: FileSystem) {
    super(terminal, filesystem);
    this.id = "cat";
    this.help = "concatenate files and print on the standard output";
  }

  execute(args: string[]): Object {
    // Catch help (--help)
    if (helpCalled(args)) return { output: this.help, type: OutputType.STDOUT };

    // Catch additional args (-)
    let a_args: string[] = getAdditionalArgs(args);

    //
    // @TODO Do something with additional args
    //

    // Get given path
    let path: string = args[1];
    for (let i = 1; i < args.length; i++) {
      path = args[i];
      if (args[i][0] != "-") break;
    }

    // Convert given path to legal path
    path = this.filesystem.convertToLegalPath(path);
    let result: any = this.filesystem.getFileByPath(path);

    // Handle no file found
    if (!result)
      return {
        output: `cat: ${path}: No such file or directory`,
        type: OutputType.STDERR,
      };

    // Handle not a file
    if (!this.filesystem.isFile(path))
      return {
        output: `cat: ${path}: Is a directory`,
        type: OutputType.STDERR,
      };

    // Return file
    return { output: result.content, type: OutputType.STDOUT };
  }

  print(output: any): boolean {
    return super.print(output);
  }
}

class Clear extends Command {
  constructor(terminal: HTMLElement, filesystem: FileSystem) {
    super(terminal, filesystem);
    this.id = "clear";
    this.help = "clear the terminal screen";
  }

  execute(args: string[]): Object {
    // Catch help (--help)
    if (helpCalled(args)) return { output: this.help, type: OutputType.STDOUT };

    // Catch additional args (-)
    let a_args: string[] = getAdditionalArgs(args);

    //
    // @TODO Do something with additional args
    //

    this.terminal.innerHTML = "";

    return { output: null, type: OutputType.NONE };
  }

  print(output: any): boolean {
    return super.print(output);
  }
}

class Ls extends Command {
  COLOR_FILE = "#FFFFFF";
  COLOR_DIR = "#038CFC";

  public CTYPE_FILE = "CTYPE_FILE";
  public CTYPE_DIR = "CTYPE_DIR";

  constructor(terminal: HTMLElement, filesystem: FileSystem) {
    super(terminal, filesystem);
    this.id = "ls";
    this.help = "list directory contents";
  }

  execute(args: string[]): Object {
    // Catch help (--help)
    if (helpCalled(args)) return { output: this.help, type: OutputType.STDOUT };

    // Catch additional args (-)
    let a_args: string[] = getAdditionalArgs(args);

    //
    // @TODO Do something with additional args
    //

    // Get given path
    let path: string = args[1];
    for (let i = 1; i < args.length; i++) {
      path = args[i];
      if (args[i][0] != "-") break;
    }

    // Convert given path to legal path
    path = this.filesystem.convertToLegalPath(path);

    let req: any =
      args.length > 1
        ? this.filesystem.getFileByPath(path)
        : this.filesystem.current_dir;

    // Handle no file found
    if (!req)
      return {
        output: `ls: cannot access '${path}': No such file or directory`,
        type: OutputType.STDERR,
      };

    // If requested object is a File
    if (this.filesystem.isFile(this.filesystem.getLocationAsPath(req))) {
      let file = this.filesystem.getPathAsArray(path);
      return { output: file[file.length - 1], type: this.CTYPE_FILE };
    }
    
    return { output: Object.keys(req), type: this.CTYPE_DIR };
  }

  print(output: any): boolean {
    if (output.type == OutputType.STDOUT || output.type == OutputType.STDERR) return super.print(output);
    if (output.type == this.CTYPE_FILE) {
      this.terminal.innerHTML +=
        '<span id="terminal-line" style="color: ' +
        this.COLOR_FILE +
        ';">' +
        output.output +
        "</span> &nbsp;";
      return true;
    }
    if (output.type == this.CTYPE_DIR) {
      if (!(output.output instanceof Array)) {
        return false;
      }
      output.output.forEach((item: Object) => {
        if (this.filesystem.isDirectory(item)) {
          this.terminal.innerHTML +=
            '<span id="terminal-line" style="color: ' +
            this.COLOR_DIR +
            ';">' +
            item +
            "</span> &nbsp;";
        } else if (this.filesystem.isFile(item)) {
          this.terminal.innerHTML +=
            '<span id="terminal-line" style="color: ' +
            this.COLOR_FILE +
            ';">' +
            item +
            "</span> &nbsp;";
        }
      });
      return true;
    }
    return false;
  }
}
