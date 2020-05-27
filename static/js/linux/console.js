const COLOR_INPUT = "#ABEDF7";
const COLOR_OUTPUT = "#FFFFFF";
const COLOR_DIR = "#038CFC";
const COLOR_FILE = "#FFFFFF";
const COLOR_ERR = "rgb(255, 0, 0)";

const fs = new FileSystem();

function sendCommand(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('terminal').innerHTML += "<p id=\"terminal-line\" style=\"color: " + COLOR_INPUT + ";\"><strong style=\"color: #09EB00;\"> > </strong>" + document.getElementById('terminal-input').value + "</p>";
        handleInput(document.getElementById('terminal-input').value);
        document.getElementById('terminal-input').value = '';
    }
};

function sendError(errormsg) {
    document.getElementById('terminal').innerHTML += "<p id=\"terminal-line\" style=\"color: " + COLOR_ERR + ";\">" + errormsg + "</p>";
}

function sendMSG(msg) {
    document.getElementById('terminal').innerHTML += "<p id=\"terminal-line\" style=\"color: " + COLOR_OUTPUT + ";\">" + msg + "</p>";
}

function handleInput(input) {
    var args = input.trim().split(" ");
    switch (args[0]) {
        case "cat":
            var expected = Array;
            output = cat(args);
            if (!(output instanceof expected)) {
                if (output) sendError(output);
                break;
            }
            document.getElementById('terminal').innerHTML += "<span id=\"terminal-line\" style=\"color: " + COLOR_OUTPUT + ";\">" + output[0] + "</span> &nbsp;";
            break;
        case "clear":
            document.getElementById('terminal').innerHTML = "";
            break;
        case "ls":
            var expected = Array;
            output = ls(args);
            if (!(output instanceof expected)) {
                if (output) sendError(output);
                break;
            }
            output.forEach(element => {
                if (fs.isDirectory(element)) {
                    document.getElementById('terminal').innerHTML += "<span id=\"terminal-line\" style=\"color: " + COLOR_DIR + ";\">" + element + "</span> &nbsp;";
                }
                else if (fs.isFile(element)) {
                    document.getElementById('terminal').innerHTML += "<span id=\"terminal-line\" style=\"color: " + COLOR_FILE + ";\">" + element + "</span> &nbsp;";
                }
            });
            break;
        default:
            document.getElementById('terminal').innerHTML += "<span id=\"terminal-line\" style=\"color: " + COLOR_OUTPUT + ";\">" + `bash: ${args[0]}: command not found` + "</span> &nbsp;";
    }
}

function ls(args) {
    if (args.length < 0) return;
    if (args.length > 3) return 'Too many arguments';
    var result;
    var path = args[1];
    if (path && path[0] === '-' && args.length > 2) {
        // Additional Arguments Given
        path = args[2];
        // TODO
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
        file = fs.getPathAsArray(path);
        document.getElementById('terminal').innerHTML += "<span id=\"terminal-line\" style=\"color: " + COLOR_FILE + ";\">" + file[file.length - 1] + "</span> &nbsp;";
        return;
    }
    arr = [];
    for (let object in result) {
        arr.push(object);
    }
    return arr;
}

function cat(args) {
    if (args.length < 0) return;
    if (args.length < 1) return 'Not enough arguments'
    if (args.length > 3) return 'Too many arguments';
    var result;
    var path = args[1];
    if (path && path[0] === '-' && args.length > 2) {
        // Additional Arguments Given
        path = args[2];
        // TODO
    }
    path = fs.convertToLegalPath(path);
    var result = fs.getFileByPath(path);
    if (!result) {
        return `cat: ${path}: No such file or directory`;
    }
    if (!fs.isFile(path)) return `cat: ${path}: Is a directory`; 
    return [result.content];
}