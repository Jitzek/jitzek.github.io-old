var Commands = /** @class */ (function () {
    function Commands(filesystem) {
        this.commands = [];
        this.commands = [new Cat(filesystem)];
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
        this.output = false;
        this.id = 'cat';
        this.man = {};
        this.fs = fs;
    }
    Cat.prototype.execute = function () {
        throw new Error("Method not implemented.");
    };
    Cat.prototype.print = function (terminal) {
        throw new Error("Method not implemented.");
    };
    return Cat;
}());
