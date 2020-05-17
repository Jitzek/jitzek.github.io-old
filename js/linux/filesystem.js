class FileSystem {
    constructor() {
        this.storage = JSON.parse(`
        {
            "/":
            {
                "bin/":
                {
                    "test.txt":
                    {
                        "content": "test document"
                    }
                },
                "boot/":
                {
        
                },
                "dev/":
                {
        
                },
                "etc/":
                {
        
                },
                "home/":
                {
        
                },
                "lib/":
                {
                    
                },
                "lib32/":
                {
        
                },
                "lib64/":
                {
        
                },
                "libx32/":
                {
        
                },
                "media/":
                {
        
                },
                "mnt/":
                {
        
                },
                "opt/":
                {
        
                },
                "proc/":
                {
        
                },
                "root/":
                {
        
                },
                "run/":
                {
        
                },
                "sbin/":
                {
        
                },
                "snap/":
                {
        
                },
                "srv/":
                {
        
                },
                "sys/":
                {
        
                },
                "tmp/":
                {
        
                },
                "usr/":
                {
                    "local/":
                    {
                        "projects/":
                        {
                            "project1":
                            {
                                "content": "this file is executable",
                                "executable": true
                            }
                        },
                        "readme.txt":
                        {
                            "content": "this is a readme",
                            "executable": false
                        }
                    },
                    "share/":
                    {
        
                    }
                },
                "var/":
                {
                    
                }
            } 
        }
        `);
        this.current_dir = this.storage['/'];
    }

    isDirectory(object) {
        return object[object.length - 1] === '/';
    }

    isFile(object) {
        return object[object.length - 1] !== '/';
    }

    pathDividerCount(path) {
        var count = 0;
        for (var i = 0; i < path.length; i++) {
            if (path.charAt(i) === '/') count++;
        }
        return count;
    }

    getLocationAsPath(location, parent = this.storage, path = '') {
        var result;
        if (location == parent) return path;

        for (let child in parent) {
            if (this.isDirectory(child)) result = this.getLocationAsPath(location, parent[child], path + '' + child);
            else if (parent[child] == location) result = path + '' + child;
            if (result) return result;
        }
        return false;
    }

    getPathAsArray(path = this.getLocationAsPath(this.current_dir)) {
        var result = [];
        var count = 0;
        for (var i = 0; i < path.length; i++) {
            if (path.charAt(i) === '/' || (i >= path.length - 1)) {
                var item = "";
                for (var j = i - count; j <= i; j++) {
                    item += path.charAt(j);
                }
                result.push(item);
                count = 0;
            } else {
                count++;
            }
        }
        return result;
    }

    convertToLegalPath(path = this.getLocationAsPath(this.current_dir)) {
        //path = path[0][0] == '/' ? path : this.getLocationAsPath(this.current_dir) + path;
        if (!Array.isArray(path)) path = this.getPathAsArray(path);
        if (path[0][0] == '.') {
            path[0] = this.getLocationAsPath(this.current_dir);
        }
        console.log(path);
        let i = 0;
        while (i <= path.length) {
            if (path[i] == './') {
                path = [].concat(path.splice(0, i), path.splice(1, path.length));
            }
            else if (path[i] == '../') {
                path.splice(i - 1, 2);
                i--;
            }
            else i++;
        }
        console.log(path);
        return path.join('');
    }

    /**
     * Gets parent of given Directory
     * @param {Given Directory} dir 
     * @param {Current Directory (recursion)} current 
     */
    dirUP(dir, current = this.storage['/']) {
        var result;
        for (let child in current) {
            if (current[child] == dir) return current;
            result = this.dirUP(dir, current[child]);

            if (result !== false) {
                return result;
            }
        }
        return false;
    }

    /**
     * 
     * @param {Directory to search for} dir 
     * @param {Starting Directory} current_dir 
     * @param {Current directory} current 
     * @param {Pointer for current_dir, e.g: "/usr/local/projects/" where pointer = 1 gives "local/"} pointer 
     */
    getFileByPath(file, current_file = [], current = this.storage, pointer = 0) {
        var result;
        if (!Array.isArray(file)) file = this.getPathAsArray(file);
        if (file.join('') == current_file.join('')) { 
            return current; 
        }

        // Prevent unnecessary recursion
        if (pointer > this.pathDividerCount(file.join(''))) return false;

        // If current directory contains next directory
        if (current.hasOwnProperty(file[pointer])) {
            current_file.push(file[pointer]);
            result = this.getFileByPath(file, current_file, current[file[pointer]], pointer + 1);
        }
        if (result !== false) return result;
        return false;
    }

    changeDir(dir) {
        this.current_dir = this.getDirByName(dir);
    }
}