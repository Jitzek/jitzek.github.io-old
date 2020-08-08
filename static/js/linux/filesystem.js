var Filesystem = /** @class */ (function () {
    function Filesystem() {
        this.storage = {
            name: "/",
            type: "directory",
            content: {
                bin: {
                    name: "bin",
                    type: "directory",
                    content: {
                        "test.txt": {
                            name: "test.txt",
                            type: "file",
                            content: "this is a file"
                        }
                    }
                },
                boot: {
                    name: "boot",
                    type: "directory",
                    content: {}
                }
            }
        };
        this.current_dir = this.storage;
    }
    Filesystem.prototype.getLocation = function (path) {
        // Convert string to array (cutting out '/')
        var path_arr = this.convertToLegalPathArray(this.pathAsArray(path));
        console.log(path_arr);
        while (true) {
            break;
        }
    };
    Filesystem.prototype.pathAsArray = function (path) {
        var path_arr = [];
        var pointer = 0;
        for (var i = 0; i < path.length; i++) {
            if (path[i] == '/') {
                if (path_arr[pointer] == undefined)
                    path_arr.push("/");
                pointer++;
                continue;
            }
            if (path_arr[pointer] == undefined)
                path_arr.push(path[i]);
            else
                path_arr[pointer] += path[i];
        }
        return path_arr;
    };
    Filesystem.prototype.convertToLegalPathArray = function (path) {
        if (path[0][0] == '.') {
            var pre_path = path[0] == '..' ? this.locationAsArray(this.getParentOfLocation(this.current_dir)) : this.locationAsArray(this.current_dir);
            path = pre_path.concat(path.slice(1));
        }
        for (var i = 0; i < path.length; i++) {
            if (path[i] == '.')
                path.splice(i, 1);
            else if (path[i] == '..')
                path.splice(i, -2);
        }
        if (path[0] != '/')
            path.unshift('/');
        return path;
    };
    Filesystem.prototype.locationAsArray = function (location) {
        var result = [];
        while (true) {
            var parent_1 = this.getParentOfLocation(location);
            result.push(parent_1.name);
            if (parent_1 == this.storage)
                break;
        }
        result.reverse();
        if (location != this.storage)
            result.push(location.name);
        return result;
    };
    Filesystem.prototype.getParentOfLocation = function (location, current_location) {
        var _this = this;
        if (current_location === void 0) { current_location = this.storage; }
        if (location = this.storage)
            return this.storage;
        Object.keys(current_location.content).forEach(function (key) {
            if (current_location.content[key] == location) {
                return current_location;
            }
            var result = _this.getParentOfLocation(location, current_location);
            if (result !== false)
                return result;
        });
        return false;
    };
    return Filesystem;
}());
