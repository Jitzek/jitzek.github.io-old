var mFile = /** @class */ (function () {
    function mFile(parent, name) {
        this.parent = null;
        this.parent = parent;
        this.name = name;
    }
    mFile.prototype.getContent = function () {
        return this.content;
    };
    mFile.prototype.setContent = function (content) {
        this.content = content;
    };
    mFile.prototype.appendContent = function (content) {
        this.content += content;
    };
    return mFile;
}());
var mDirectory = /** @class */ (function () {
    function mDirectory(parent, name) {
        this.parent = null;
        this.subdirectories = [];
        this.files = [];
        this.parent = parent;
        this.name = name;
    }
    mDirectory.prototype.getContent = function () {
        return [].concat(this.subdirectories).concat(this.files);
    };
    mDirectory.prototype.addFile = function (file) {
        this.files.push(file);
    };
    mDirectory.prototype.addFileByName = function (filename) {
        this.files.push(new mFile(this, filename));
    };
    mDirectory.prototype.removeFile = function (file) {
        var index = this.files.indexOf(file, 0);
        if (index > -1) {
            this.files.splice(index, 1);
        }
    };
    mDirectory.prototype.removeFileByName = function (filename) {
        for (var i = 0; i < this.files.length; i++) {
            if (this.files[i].name == filename) {
                this.removeFile(this.files[i]);
                return;
            }
        }
    };
    mDirectory.prototype.addDirectory = function (directory) {
        this.subdirectories.push(directory);
    };
    mDirectory.prototype.addDirectoryByName = function (directoryname) {
        this.subdirectories.push(new mDirectory(this, directoryname));
    };
    mDirectory.prototype.removeDirectory = function (directory) {
        var index = this.subdirectories.indexOf(directory, 0);
        if (index > -1) {
            this.subdirectories.splice(index, 1);
        }
    };
    mDirectory.prototype.removeDirectoryByName = function (directoryname) {
        for (var i = 0; i < this.subdirectories.length; i++) {
            if (this.subdirectories[i].name == directoryname) {
                this.removeDirectory(this.subdirectories[i]);
                return;
            }
        }
    };
    return mDirectory;
}());
var Filesystem = /** @class */ (function () {
    function Filesystem() {
        this.root = new mDirectory(null, '/');
        var bin = new mDirectory(this.root, 'bin');
        var testtxt = new mFile(bin, 'test.txt');
        testtxt.setContent('this is a text file');
        bin.addFile(testtxt);
        this.root.addDirectory(bin);
        this.current_dir = this.root;
    }
    Filesystem.prototype.getLocation = function (path) {
        // Convert string to array (cutting out '/')
        var path_arr = this.convertToLegalPathArray(this.pathAsArray(path));
        return this.getLocationFromArray(path_arr);
    };
    Filesystem.prototype.isFile = function (location) {
        return location instanceof mFile;
    };
    Filesystem.prototype.isDirectory = function (location) {
        return location instanceof mDirectory;
    };
    Filesystem.prototype.getLocationFromArray = function (path_array, current_location) {
        if (current_location === void 0) { current_location = this.root; }
        if (path_array.length < 1)
            return current_location;
        if (path_array[0] == '/')
            path_array.shift();
        var location = null;
        var content = current_location.getContent();
        for (var i = 0; i < content.length; i++) {
            if (content[i].name == path_array[0]) {
                location = content[i];
                break;
            }
        }
        if (location == null || location == undefined)
            return false;
        return this.getLocationFromArray(path_array.slice(1), location);
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
            if (parent_1 == this.root)
                break;
        }
        result.reverse();
        if (location != this.root)
            result.push(location.name);
        return result;
    };
    Filesystem.prototype.getParentOfLocation = function (location, current_location) {
        if (current_location === void 0) { current_location = this.root; }
        if (location == this.root)
            return this.root;
        for (var i = 0; i < current_location.subdirectories.length; i++) {
            if (current_location.subdirectories[i] == location)
                return current_location;
            var result = this.getParentOfLocation(location, current_location.subdirectories[i]);
            if (result !== false)
                return result;
        }
        return false;
    };
    Filesystem.prototype.arrayAsString = function (path_arr) {
        var result = '/';
        path_arr.forEach(function (e) {
            result += "/" + e;
        });
        return result;
    };
    return Filesystem;
}());
