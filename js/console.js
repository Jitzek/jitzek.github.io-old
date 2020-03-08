var input = "#ABEDF7";
var blue = "#038CFC";
var white = "FFFFFF";
var accented = "rgb(116, 137, 207)"
var neutral = "rgb(230, 230, 230)";
var red = "rgb(255, 0, 0)";

var uptime = 0;

// UPDATEME
/* /usr/local (root)
        Projects
            project1
        readme.txt
*/

async function countUpTime() {
    await sleep(1000);
    uptime++;
    countUpTime();
}

function convertUpTime() {
    var conversion = uptime;
    var hours = Math.floor(uptime / 360);
    conversion -= (hours * 360);
    var minutes = Math.floor(uptime / 60);
    conversion -= (minutes * 60);
    var seconds = conversion;
    return [hours, minutes, seconds];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/** Define and Configure Commands */
var cat = new Object; cat.name = "cat"; cat.help = "concatenate files and print on the standard output";
var cd = new Object; cd.name = "cd"; cd.help = "Change the shell working directory";
var clear = new Object; clear.name = "clear"; clear.help = "clear the terminal screen";
var ls = new Object; ls.name = "ls"; ls.help = "list directory contents";
var pwd = new Object; pwd.name = "pwd"; pwd.help = "print name of current / working directory";
var sysinfo = new Object; sysinfo.name = "sysinfo"; sysinfo.help = "display system info along with ascii art";
var commands = [cat, cd, clear, ls, pwd, sysinfo];
/* ------------ */

/** Define and Configure File system */
var root = new Object; root.name = "/usr/local"; root.type = "directory"; root.path = "/usr/local"

var Projects = new Object; Projects.name = "Projects"; Projects.type = "directory"; Projects.path = root.path + '/' + Projects.name;

var project1 = new Object; project1.name = "project1"; project1.content = "This file is executable (./[FILE])"; project1.type = "file"; project1.exec = true; project1.path = Projects.path + '/' + project1.name;

var readme = new Object;
readme.name = "readme.txt"; readme.content =
    "<span>[Introduction]</span><br>" +
    "<span>Hello and welcome to my linux style terminal (version 0.1), this terminal is simulated and will not accept most common linux commands.</span><br>" +
    "<span>Navigating through this terminal's file system will give you access to various projects that can be reached by executing them (./FILE)</span><br>" +
    "<span>Though I am not completely certain what purpose this page will bring in the future I hope you will enjoy it anyways</span><br><br>";
readme.type = "file"; readme.exec = false; readme.path = root + '/' + readme.name;

Projects.content = [project1];
root.content = [Projects, readme];
var current_dir = root;
/* -------------------------------- */

function sendCommand(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('terminal').innerHTML += "<p id=\"terminal-line\" style=\"color: " + input + ";\"><strong style=\"color: #09EB00;\"> > </strong>" + document.getElementById('terminal-input').value + "</p>";
        handleCommonCommands(document.getElementById('terminal-input').value);
        document.getElementById('terminal-input').value = '';
    }
};

function handleCommonCommands(input) {

    var args = input.trim().split(" ");
    if (args[0][0] == '.' && args[0][1] == '/') {
        //
        return;
    }
    switch (args[0]) {
        case cat.name:
            exec_cat(args);
            return;
        case cd.name:
            exec_cd(args);
            return;
        case clear.name:
            document.getElementById('terminal').innerHTML = "";
            return;
        case 'help':
            commands.forEach(command => {
                document.getElementById('terminal').innerHTML += "<p id=\"terminal-line\" style=\"color: " + accented + ";\">" + "<span>" + command.name + "</span>" + "&nbsp;" + " - " + "&nbsp;" + "<span style=\"color: " + neutral + ";\">" + command.help + "</span>" + "</p>";
            });
            return;
        case ls.name:
            current_dir.content.forEach(element => {
                if (element.type == "directory") {
                    document.getElementById('terminal').innerHTML += "<span id=\"terminal-line\" style=\"color: " + blue + ";\">" + element.name + "</span> &nbsp;";
                }
            });
            current_dir.content.forEach(element => {
                if (element.type == "file") {
                    document.getElementById('terminal').innerHTML += "<span id=\"terminal-line\" style=\"color: " + white + ";\">" + element.name + "</span> &nbsp;";
                }
            });
            return;
        case pwd.name:
            document.getElementById('terminal').innerHTML += "<p id=\"terminal-line\" style=\"color: " + neutral + ";\">" + current_dir.path + "</p>";
            return;
        case sysinfo.name:
            exec_sysinfo();
            return;
        default:
            return;
    }
}

function sendError(errormsg) {
    document.getElementById('terminal').innerHTML += "<p id=\"terminal-line\" style=\"color: " + red + ";\">" + errormsg + "</p>";
}

function dirToPath(parent, path) {
    if (parent.path == path) {
        current_dir = parent;
        return;
    }
    if (parent.type != 'directory') {
        return;
    }
    parent.content.forEach(element => {
        if (element.path != path) {
            dirToPath(element, path);
        }
        if (element.type == 'directory') {
            current_dir = element;
        }
        return;
    });
}

function getPathUp(path) {
    var fullcount = 0;
    var partcount = 0;
    path.split('').forEach(char => {
        if (char == '/') {
            partcount = fullcount;
        }
        fullcount++;
    });
    return path.slice(0, partcount);

}


function exec_cat(args) {
    if (args.length < 2) {
        document.getElementById('terminal').innerHTML += "<p id=\"terminal-line\" style=\"color: " + white + ";\">" + "cat [FILE]" + "</p>";
        return;
    }
    current_dir.content.forEach(element => {
        if (element.name == args[1]) {
            if (element.type == "directory") {
                sendError(element.name + " Is a directory");
                return;
            }
            document.getElementById('terminal').innerHTML += "<p id=\"terminal-line\" style=\"color: " + white + ";\">" + element.content + "</p>";
            return;
        }
    });
}

function exec_cd(args) {
    if (args.length < 2) {
        document.getElementById('terminal').innerHTML += "<p id=\"terminal-line\" style=\"color: " + white + ";\">" + "cd [DIRECTORY]" + "</p>";
        return;
    }
    if (args[1] == '..') {
        if (current_dir.path == root.path) {
            sendError("Access Denied");
            return;
        }
        var test = getPathUp(current_dir.path);
        dirToPath(root, getPathUp(current_dir.path));
        return;
    }
    var done = false;
    current_dir.content.forEach(element => {
        if (element.name == args[1]) {
            if (element.type == "file") {
                sendError(element.name + " Is not a directory");
                return;
            }
            current_dir = element;
            done = true;
            return;
        }
    });
    if (done) {
        return;
    }
    dirToPath(root, args[1]);
}

function exec_sysinfo() {
    var cUpTime = convertUpTime();
    var sUpTime = '';
    if (cUpTime[0] > 0) {
        sUpTime += cUpTime[0] + ' hours  ';
    } if (cUpTime[1] > 0) {
        sUpTime += cUpTime[1] + ' mins  ';
    }
    sUpTime += cUpTime[2] + ' seconds';
    var output =
        "<pre id=\"terminal-line\" style=\"overflow: hidden;\">" +
        "<span style=\"color: #CF7496;\"> 888888 888888 888    d8P  </span>         <span style=\"color: #CF7496;\">jitzek@jitzek</span>\n" +
        "<span style=\"color: #F99F9F;\">    \"88b   \"88b 888   d8P   </span>      <span style=\"color: white;\">  -------------</span>\n" +
        "<span style=\"color: #FAB69F;\">     888    888 888  d8P    </span>        <span style=\"color: #CF7496;\">OS: <span style=\"color: white;\">jitxekOS 0.1 (devPhase) (x86_64)</span></span>\n" +
        "<span style=\"color: #F7D0A8;\">     888    888 888d88K     </span>        <span style=\"color: #CF7496;\">Uptime: <span style=\"color: white;\">" + sUpTime + "</span></span>\n" +
        "<span style=\"color: #E0BDAE;\">     888    888 8888888b    </span>\n" +
        "<span style=\"color: #CDA3B4\">     888    888 888  Y88b   </span>\n" +
        "<span style=\"color: #C095B0;\">     88P    88P 888   Y88b  </span>\n" +
        "<span style=\"color: #C56D92;\">     888    888 888    Y88b </span>\n" +
        "<span style=\"color: #AA5C8D;\">   .d88P  .d88P             </span>\n" +
        "<span style=\"color: #A1588F\"> .d88P\" .d88P\"              </span>\n" +
        "<span style=\"color: #8B4E87;\">888P\"  888P\"                </span>\n" +
        "</pre>"
    document.getElementById('terminal').innerHTML += output;
    return;
}