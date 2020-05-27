var name = "tw";

argStart = '=';
argEnd = ';';

var halt = false;
var skip = false;

/*function haltOperation(event) {
    if (event.keyCode === 27) {
        event.preventDefault();
        console.log('key pressed');
        halt = true;
    }
}*/

function skipBoot() {
    skip = true;
}

async function typeWriter() {
    var elements = document.getElementsByClassName(name);
    for (var i = 0; i < elements.length; i++) {
        if (skip) {
            fullRemove();
            loadMainConsole();
            break;
        }
        var at = 0;
        await sleep(getDelay(elements[i].innerText));
        if (getRemoval(elements[i].innerText) == 'y') {
            remove();
            continue;
        } else if (getRemoval(elements[i].innerText) == 'f') {
            fullRemove();
            continue;
        }
        if (getLoad(elements[i].innerText) == 'console') {
            loadMainConsole();
        }
        var speed = getSpeed(elements[i].innerText);
        var txt = trimArgs(elements[i].innerText);
        var display = getDisplay(elements[i].innerText);
        elements[i].style.setProperty("color", getColor(elements[i].innerText));

        elements[i].innerText = "";
        elements[i].style.setProperty("display", display);
        while (at < txt.length) {
            if (txt.charAt(at) == " ") {
                elements[i].innerText += "\xa0";
            } else {
                elements[i].innerText += txt.charAt(at);
            }
            at++;
            await sleep(speed);
        }
        if (i > 10) {
            elements[i - 10].scrollIntoView();
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function trimArgs(element) {
    var partcount = 0;
    for (var i = 0; i < element.length; i++) {
        if (element[i] == argEnd) {
            partcount = i + 1;
        }
    }
    return element.slice(partcount, element.length);
}

function getSpeed(element) {
    var prefix = 's';
    var start = false;
    var arg = '';
    for (var i = 0; i < element.length; i++) {
        if (start && element[i] == argEnd) {
            break;
        }
        if (start) {
            arg += element.charAt(i);
        } else if (element[i] == argStart && element[i - 1] == prefix) {
            start = true;
        }
    }
    if (arg.length < 1) {
        return 0;
    }
    return parseInt(arg);
}

function getDelay(element) {
    var prefix = 'd';
    var start = false;
    var arg = '';
    for (var i = 0; i < element.length; i++) {
        if (start && element[i] == argEnd) {
            break;
        }
        if (start) {
            arg += element.charAt(i);
        } else if (element[i] == argStart && element[i - 1] == prefix) {
            start = true;
        }
    }
    if (arg.length < 1) {
        return 0;
    }
    return parseInt(arg);
}

function getDisplay(element) {
    var prefix = 'display';
    var start = false;
    var arg = '';
    for (var i = 0; i < element.length; i++) {
        if (start && element[i] == argEnd) {
            break;
        }
        if (start) {
            arg += element.charAt(i);
        } else if (element[i] == argStart) {
            var check = '';
            if ((i - prefix.length) < 0) {
                continue;
            }
            for (var j = prefix.length; j > 0; j--) {
                check += element[i - j];
            }
            if (check == prefix) {
                start = true;
            }
        }
    }
    if (arg.length < 1) {
        return 'inline';
    }
    console.log(arg);
    return arg;
}

function getColor(element) {
    var prefix = 'c';
    var start = false;
    var arg = '';
    for (var i = 0; i < element.length; i++) {
        if (start && element[i] == argEnd) {
            break;
        }
        if (start) {
            arg += element.charAt(i);
        } else if (element[i] == argStart && element[i - 1] == prefix) {
            start = true;
        }
    }
    if (arg.length < 1) {
        return 'white';
    }
    return arg;
}

function getLoad(element) {
    var prefix = 'l';
    var start = false;
    var arg = '';
    for (var i = 0; i < element.length; i++) {
        if (start && element[i] == argEnd) {
            break;
        }
        if (start) {
            arg += element.charAt(i);
        } else if (element[i] == argStart && element[i - 1] == prefix) {
            start = true;
        }
    }
    return arg;
}

function remove(till) {
    elements = document.getElementsByClassName(name);
    for (var i = 0; i < till; i++) {
        elements[i].style.setProperty("display", "none");
    }
}

function fullRemove() {
    var container = document.getElementsByClassName("tw-container");
    for (var i = 0; i < container.length; i++) {
        container[i].style.setProperty("display", "none");
        container[i].style.setProperty("width", "0");
    }
}

function loadMainConsole() {
    document.getElementsByClassName("console")[0].style.setProperty("opacity", 1);
}

function getRemoval(element) {
    var prefix = 'r';
    var start = false;
    var arg = '';
    for (var i = 0; i < element.length; i++) {
        if (start && element[i] == argEnd) {
            break;
        }
        if (start) {
            arg += element.charAt(i);
        } else if (element[i] == argStart && element[i - 1] == prefix) {
            start = true;
        }
    }
    return arg;
}