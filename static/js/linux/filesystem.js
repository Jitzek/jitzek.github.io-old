var Filesystem = /** @class */ (function () {
    function Filesystem() {
        this.storage = {
            type: "directory",
            content: {
                type: "directory",
                content: {
                    bin: {
                        type: "directory",
                        content: {
                            "test.txt": {
                                type: "file",
                                content: "this is a file"
                            }
                        }
                    },
                    boot: {
                        type: "directory",
                        content: {}
                    }
                }
            }
        };
        this.current_dir = this.storage;
    }
    Filesystem.prototype.getLocation = function (path) {
        // Convert string to array (cutting out '/')
        var path_arr = this.pathAsArray(path);
    };
    Filesystem.prototype.pathAsArray = function (path) {
        var path_arr = [];
        var pointer = 0;
        for (var i = 0; i < path.length; i++) {
            if (path[i] == '/') {
                pointer++;
                continue;
            }
            path_arr[pointer] += path[i];
        }
        return path_arr;
    };
    return Filesystem;
}());
