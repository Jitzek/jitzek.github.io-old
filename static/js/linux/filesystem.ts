class mFile {
  parent: mDirectory = null;
  name: string;
  content: string;

  constructor(parent: mDirectory, name: string) {
    this.parent = parent;
    this.name = name;
  }

  getContent(): string {
    return this.content
  }
  setContent(content: string) {
    this.content = content;
  }
  appendContent(content: string) {
    this.content += content;
  }
}

class mDirectory {
  parent: mDirectory = null;
  subdirectories: mDirectory[] = [];
  files: mFile[] = [];

  name: string;

  constructor(parent: mDirectory, name: string) {
    this.parent = parent;
    this.name = name;
  }

  getContent() {
    return [].concat(this.subdirectories).concat(this.files);
  }

  addFile(file: mFile) {
    this.files.push(file);
  }
  addFileByName(filename: string) {
    this.files.push(new mFile(this, filename))
  }

  removeFile(file: mFile) {
    const index: number = this.files.indexOf(file, 0);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }
  removeFileByName(filename: string) {
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].name == filename) {
        this.removeFile(this.files[i]);
        return;
      }
    }
  }

  addDirectory(directory: mDirectory) {
    this.subdirectories.push(directory);
  }
  addDirectoryByName(directoryname: string) {
    this.subdirectories.push(new mDirectory(this, directoryname));
  }

  removeDirectory(directory: mDirectory) {
    const index: number = this.subdirectories.indexOf(directory, 0);
    if (index > -1) {
      this.subdirectories.splice(index, 1);
    }
  }
  removeDirectoryByName(directoryname: string) {
    for (let i = 0; i < this.subdirectories.length; i++) {
      if (this.subdirectories[i].name == directoryname) {
        this.removeDirectory(this.subdirectories[i]);
        return;
      }
    }
  }
}

class Filesystem {
  root: mDirectory;
  storage: any;
  current_dir: any;
  constructor() {
    this.root = new mDirectory(null, '/');
    let bin = new mDirectory(this.root, 'bin');
    let testtxt = new mFile(bin, 'test.txt');
    testtxt.setContent('this is a text file');
    bin.addFile(testtxt);
    this.root.addDirectory(bin);

    this.current_dir = this.root;
  }

  getLocation(path: string): any {
    // Convert string to array (cutting out '/')
    let path_arr = this.convertToLegalPathArray(this.pathAsArray(path));

    return this.getLocationFromArray(path_arr);
  }

  isFile(location: any) {
    return location instanceof mFile;
  }

  isDirectory(location: any) {
    return location instanceof mDirectory;
  }

  getLocationFromArray(path_array: Array<string>, current_location = this.root): any {
    if (path_array.length < 1) return current_location;
    if (path_array[0] == '/') path_array.shift();
    let location: mDirectory = null;

    let content: any[] = current_location.getContent();
    for (let i = 0; i < content.length; i++) {
      if (content[i].name == path_array[0]) {
        location = content[i];
        break;
      }
    }
    if (location == null || location == undefined) return false;
    return this.getLocationFromArray(path_array.slice(1), location);
  }

  private pathAsArray(path: string): Array<string> {
    let path_arr: Array<string> = [];
    let pointer = 0;
    for (let i = 0; i < path.length; i++) {
      if (path[i] == "/") {
        if (path_arr[pointer] == undefined) path_arr.push("/");
        pointer++;
        continue;
      }
      if (path_arr[pointer] == undefined) path_arr.push(path[i]);
      else path_arr[pointer] += path[i];
    }
    return path_arr;
  }

  private convertToLegalPathArray(path: Array<string>): Array<string> {
    if (path[0][0] == ".") {
      let pre_path: Array<string> =
        path[0] == ".."
          ? this.locationAsArray(this.getParentOfLocation(this.current_dir))
          : this.locationAsArray(this.current_dir);
      path = pre_path.concat(path.slice(1));
    }
    for (let i = 0; i < path.length; i++) {
      if (path[i] == ".") path.splice(i, 1);
      else if (path[i] == "..") path.splice(i, -2);
    }
    if (path[0] != "/") path.unshift("/");
    return path;
  }

  private locationAsArray(location: any): Array<string> {
    let result: Array<string> = [];
    while (true) {
      let parent: any = this.getParentOfLocation(location);
      result.push(parent.name);
      if (parent == this.root) break;
    }
    result.reverse();
    if (location != this.root) result.push(location.name);
    return result;
  }

  private getParentOfLocation(location: Object, current_location: mDirectory = this.root): any {
    if (location == this.root) return this.root;
    for (let i = 0; i < current_location.subdirectories.length; i++) {
      if (current_location.subdirectories[i] == location) return current_location;
      let result = this.getParentOfLocation(
        location,
        current_location.subdirectories[i]
      );
      if (result !== false) return result;
    }
    return false;
  }

  private arrayAsString(path_arr: string[]) {
    let result = '/';
    path_arr.forEach(e => {
      result += `/${e}`;
    });
    return result;
  }
}
