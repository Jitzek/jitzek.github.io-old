class Command {
  constructor(terminal, id, man) {
    this.terminal = terminal;
    this.id = id;
    this.man = man;
  }

  execute(args) {
    throw "Function not implemented";
  }

  printToHTML(content) {
    throw "Function not implemented";
  }

  hasOutput() {
    throw "Function not implemented";
  }

  getAdditionalArgs(args) {
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
}

class Cat extends Command {
  constructor(terminal) {
    super(terminal, "cat", "concatenate files and print on the standard output");
  }

  execute(args) {
    if (args.length < 0) return;
    if (args.length < 1) return "Not enough arguments";
    if (args.length > 3) return "Too many arguments";
    let result;
    let path = args[1];
    if (path && path[0] === "-" && args.length > 2) {
      // Additional Arguments Given
      path = args[2];
      // TODO
    }
    path = fs.convertToLegalPath(path);
    result = fs.getFileByPath(path);
    if (!result) {
      return `cat: ${path}: No such file or directory`;
    }
    if (!fs.isFile(path)) return `cat: ${path}: Is a directory`;
    return [result.content];
  }

  printToHTML(content) {
    if (!(content instanceof Array)) {
      if (content) sendError(content);
      return false;
    }
    terminal.innerHTML +=
      '<span id="terminal-line" style="color: ' +
      COLOR_OUTPUT +
      ';">' +
      content[0] +
      "</span> &nbsp;";
    return true;
  }

  hasOutput() {
    return true;
  }
}

class Clear extends Command {
  constructor() {
    super(terminal, "clear", "clear the terminal screen");
  }

  execute(args) {
    terminal.innerHTML = "";
  }

  hasOutput() {
    return false;
  }
}

class Ls extends Command {
  constructor(terminal) {
    super(terminal, "ls", "list directory contents");
  }

  execute(args) {
    if (args.length < 0) return;
    let result;
    let path = args[1];
    let a_args = [];
    if (path && path[0] == "-" && args.length > 2) {
      a_args = super.getAdditionalArgs(args);
      path = path[a_args.length + 1];
    }
    path = fs.convertToLegalPath(path);
    if (args.length > 1) {
      result = fs.getFileByPath(path);
      if (!result) {
        return `ls: cannot access '${path}': No such file or directory`;
      }
    }
    if (!result) result = fs.current_dir;
    if (fs.isFile(fs.getLocationAsPath(result))) {
      let file = fs.getPathAsArray(path);
      terminal.innerHTML +=
        '<span id="terminal-line" style="color: ' +
        COLOR_FILE +
        ';">' +
        file[file.length - 1] +
        "</span> &nbsp;";
      return;
    }
    let arr = [];
    for (let object in result) {
      arr.push(object);
    }
    return arr;
  }

  printToHTML(content) {
    if (!(content instanceof Array)) {
      if (content) sendError(content);
      return false;
    }
    content.forEach((item) => {
      if (fs.isDirectory(item)) {
        terminal.innerHTML +=
          '<span id="terminal-line" style="color: ' +
          COLOR_DIR +
          ';">' +
          item +
          "</span> &nbsp;";
      } else if (fs.isFile(item)) {
        terminal.innerHTML +=
          '<span id="terminal-line" style="color: ' +
          COLOR_FILE +
          ';">' +
          item +
          "</span> &nbsp;";
      }
    });
    return true;
  }

  hasOutput() {
    return true;
  }
}
