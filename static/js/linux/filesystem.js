var Filesystem = /** @class */ (function () {
    function Filesystem() {
        this.storage = {
            name: "/",
            type: "directory",
            content: [
                {
                    name: "bin",
                    type: "directory",
                    content: [
                        {
                            name: "test.txt",
                            type: "file",
                            executable: false,
                            content: "this is a text file"
                        },
                    ]
                },
                {
                    name: "boot",
                    type: "directory",
                    content: []
                },
            ]
        };
        this.current_dir = this.storage;
    }
    Filesystem.prototype.getLocation = function (path) {
        // Convert string to array (cutting out '/')
        var path_arr = this.convertToLegalPathArray(this.pathAsArray(path));
        console.log(this.getLocationFromArray(path_arr));
        return this.getLocationFromArray(path_arr);
    };
    Filesystem.prototype.getLocationFromArray = function (array, current_location) {
        if (current_location === void 0) { current_location = this.storage; }
        if (array.length < 1)
            return current_location;
        if (array[0] == '/')
            array.shift();
        var location = null;
        for (var i = 0; i < current_location.content.length; i++) {
            if (current_location.content[i].name == array[0]) {
                location = current_location.content[i];
                break;
            }
        }
        if (location == null || location == undefined)
            return false;
        return this.getLocationFromArray(array.slice(1), location);
    };
    Filesystem.prototype.pathAsArray = function (path) {
        var path_arr = [];
        var pointer = 0;
        for (var i = 0; i < path.length; i++) {
            if (path[i] == "/") {
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
        if (path[0][0] == ".") {
            var pre_path = path[0] == ".."
                ? this.locationAsArray(this.getParentOfLocation(this.current_dir))
                : this.locationAsArray(this.current_dir);
            path = pre_path.concat(path.slice(1));
        }
        for (var i = 0; i < path.length; i++) {
            if (path[i] == ".")
                path.splice(i, 1);
            else if (path[i] == "..")
                path.splice(i, -2);
        }
        if (path[0] != "/")
            path.unshift("/");
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
        if (current_location === void 0) { current_location = this.storage; }
        if (location == this.storage)
            return this.storage;
        for (var i = 0; i < current_location.content.length; i++) {
            if (current_location.content[i] == location)
                return current_location;
            var result = this.getParentOfLocation(location, current_location.content[i]);
            if (result !== false)
                return result;
        }
        return false;
    };
    return Filesystem;
}());
