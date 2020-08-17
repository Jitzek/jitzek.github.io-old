var Commands = /** @class */ (function () {
    function Commands(filesystem) {
        this.commands = [];
        this.commands = [new Cat(filesystem), new Clear(filesystem), new Echo(filesystem)];
    }
    Commands.prototype.getCommand = function (commandid) {
        for (var i = 0; i < this.commands.length; i++)
            if (this.commands[i].id == commandid)
                return this.commands[i];
        return false;
    };
    return Commands;
}());
var Cat = /** @class */ (function () {
    function Cat(fs) {
        this.id = 'cat';
        this.man = {};
        this.fs = fs;
    }
    Cat.prototype.execute = function (ui, args, user) {
        // Determine additional parameters ('-', '--')
        if (user === void 0) { user = null; }
        //
        // Get location of file
        var location = this.fs.getLocation(args[0]);
        // Check if location is file
        if (!this.fs.isFile(location))
            return "cat: cannot open " + location.name;
        // Output is content of file
        return location.content;
    };
    return Cat;
}());
var Clear = /** @class */ (function () {
    function Clear(fs) {
        this.id = 'clear';
        this.man = {};
        this.fs = fs;
    }
    Clear.prototype.execute = function (ui, args, user) {
        // Determine additional parameters ('-', '--')
        if (user === void 0) { user = null; }
        //
        ui.innerHTML = '';
    };
    return Clear;
}());
var Echo = /** @class */ (function () {
    function Echo(fs) {
        this.id = 'echo';
        this.man = {};
        this.fs = fs;
    }
    Echo.prototype.execute = function (ui, args, user) {
        // Determine additional parameters ('-', '--')
        if (user === void 0) { user = null; }
        //
        ui.innerHTML += '<p id="terminal-line" style="color: ' +
            COLOR_OUTPUT +
            ';">' +
            args[0] +
            "</p>";
    };
    return Echo;
}());
