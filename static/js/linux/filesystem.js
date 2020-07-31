var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var FileSystem = /** @class */ (function () {
    function FileSystem() {
        this.storage = JSON.parse("\n        {\n            \"/\":\n            {\n                \"bin/\":\n                {\n                    \"test.txt\":\n                    {\n                        \"content\": \"test document\"\n                    }\n                },\n                \"boot/\":\n                {\n        \n                },\n                \"dev/\":\n                {\n        \n                },\n                \"etc/\":\n                {\n        \n                },\n                \"home/\":\n                {\n        \n                },\n                \"lib/\":\n                {\n                    \n                },\n                \"lib32/\":\n                {\n        \n                },\n                \"lib64/\":\n                {\n        \n                },\n                \"libx32/\":\n                {\n        \n                },\n                \"media/\":\n                {\n        \n                },\n                \"mnt/\":\n                {\n        \n                },\n                \"opt/\":\n                {\n        \n                },\n                \"proc/\":\n                {\n        \n                },\n                \"root/\":\n                {\n        \n                },\n                \"run/\":\n                {\n        \n                },\n                \"sbin/\":\n                {\n        \n                },\n                \"snap/\":\n                {\n        \n                },\n                \"srv/\":\n                {\n        \n                },\n                \"sys/\":\n                {\n        \n                },\n                \"tmp/\":\n                {\n        \n                },\n                \"usr/\":\n                {\n                    \"local/\":\n                    {\n                        \"projects/\":\n                        {\n                            \"project1\":\n                            {\n                                \"content\": \"this file is executable\",\n                                \"executable\": true\n                            }\n                        },\n                        \"readme.txt\":\n                        {\n                            \"content\": \"this is a readme\",\n                            \"executable\": false\n                        }\n                    },\n                    \"share/\":\n                    {\n        \n                    }\n                },\n                \"var/\":\n                {\n                    \n                }\n            } \n        }\n        ");
        this.current_dir = this.storage["/"];
    }
    FileSystem.prototype.isDirectory = function (object) {
        return object[object.length - 1] === "/";
    };
    FileSystem.prototype.isFile = function (object) {
        return object[object.length - 1] !== "/";
    };
    FileSystem.prototype.pathDividerCount = function (path) {
        var count = 0;
        for (var i = 0; i < path.length; i++) {
            if (path.charAt(i) === "/")
                count++;
        }
        return count;
    };
    FileSystem.prototype.getLocationAsPath = function (location, parent, path) {
        if (parent === void 0) { parent = this.storage; }
        if (path === void 0) { path = ""; }
        var result;
        if (location == parent)
            return path;
        for (var child in parent) {
            if (this.isDirectory(child))
                result = this.getLocationAsPath(location, parent[child], path + "" + child);
            else if (parent[child] == location)
                result = path + "" + child;
            if (result)
                return result;
        }
        return false;
    };
    FileSystem.prototype.getPathAsArray = function (path) {
        if (path === void 0) { path = this.getLocationAsPath(this.current_dir); }
        var result = [];
        var count = 0;
        for (var i = 0; i < path.length; i++) {
            if (path.charAt(i) === "/" || i >= path.length - 1) {
                var item = "";
                for (var j = i - count; j <= i; j++) {
                    item += path.charAt(j);
                }
                result.push(item);
                count = 0;
            }
            else {
                count++;
            }
        }
        return result;
    };
    FileSystem.prototype.convertToLegalPath = function (path) {
        if (path === void 0) { path = this.getLocationAsPath(this.current_dir); }
        //path = path[0][0] == '/' ? path : this.getLocationAsPath(this.current_dir) + path;
        if (!Array.isArray(path))
            path = this.getPathAsArray(path);
        if (path[0][0] != "/" && path[0][1] != ".") {
            if (path[0][0] == ".")
                path.shift();
            path.unshift(this.getLocationAsPath(this.current_dir));
        }
        var i = 0;
        while (i <= path.length) {
            if (path[i] == "./") {
                path = [].concat(path.splice(0, i), path.splice(1, path.length));
            }
            else if (path[i] == "../") {
                path.splice(i - 1, 2);
                i--;
            }
            else
                i++;
        }
        // Check if '/' should be appended
        if (path.slice(-1)[0].slice(-1) != "/") {
            var newpath = __spreadArrays(path);
            newpath[newpath.length - 1] = newpath[newpath.length - 1] + "/";
            if ((this.getFileByPath(path) == false ||
                this.getFileByPath(path) === undefined) &&
                this.getFileByPath(newpath) != false) {
                path = newpath;
            }
        }
        return path.join("");
    };
    /**
     * Gets parent of given Directory
     * @param {Given Directory} dir
     * @param {Current Directory (recursion)} current
     */
    FileSystem.prototype.dirUP = function (dir, current) {
        if (current === void 0) { current = this.storage["/"]; }
        var result;
        for (var child in current) {
            if (current[child] == dir)
                return current;
            result = this.dirUP(dir, current[child]);
            if (result !== false) {
                return result;
            }
        }
        return false;
    };
    /**
     *
     * @param {Directory to search for} dir
     * @param {Starting Directory} current_dir
     * @param {Current directory} current
     * @param {Pointer for current_dir, e.g: "/usr/local/projects/" where pointer = 1 gives "local/"} pointer
     */
    FileSystem.prototype.getFileByPath = function (file, current_file, current, pointer) {
        if (current_file === void 0) { current_file = []; }
        if (current === void 0) { current = this.storage; }
        if (pointer === void 0) { pointer = 0; }
        var result;
        if (!Array.isArray(file))
            file = this.getPathAsArray(file);
        if (file.join("") == current_file.join("") ||
            file.join("") + "/" == current_file.join("")) {
            return current;
        }
        // Prevent unnecessary recursion
        if (pointer > this.pathDividerCount(file.join("")))
            return false;
        // If current directory contains next directory
        if (current.hasOwnProperty(file[pointer])) {
            current_file.push(file[pointer]);
            result = this.getFileByPath(file, current_file, current[file[pointer]], pointer + 1);
        }
        if (result !== false)
            return result;
        return false;
    };
    FileSystem.prototype.getDirByName = function (dir) {
        return this.storage[dir];
    };
    FileSystem.prototype.changeDir = function (dir) {
        this.current_dir = this.getDirByName(dir);
    };
    return FileSystem;
}());
