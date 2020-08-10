class Filesystem {
  storage: any;
  current_dir: any;
  constructor() {
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
              content: "this is a text file",
            },
          ],
        },
        {
          name: "boot",
          type: "directory",
          content: [],
        },
      ],
    };
    this.current_dir = this.storage;
  }

  getLocation(path: string): any {
    // Convert string to array (cutting out '/')
    let path_arr = this.convertToLegalPathArray(this.pathAsArray(path));
    
    return this.getLocationFromArray(path_arr);
  }

  getLocationFromArray(array: Array<string>, current_location = this.storage): any {
    if (array.length < 1) return current_location;
    if (array[0] == '/') array.shift();
    let location: Object = null;
    for (let i = 0; i < current_location.content.length; i++) {
      if (current_location.content[i].name == array[0]) {
        location = current_location.content[i];
        break;
      }
    }
    if (location == null || location == undefined) return false;
    return this.getLocationFromArray(array.slice(1), location);
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
      if (parent == this.storage) break;
    }
    result.reverse();
    if (location != this.storage) result.push(location.name);
    return result;
  }

  private getParentOfLocation(
    location: Object,
    current_location: any = this.storage
  ): any {
    if (location == this.storage) return this.storage;
    for (let i = 0; i < current_location.content.length; i++) {
      if (current_location.content[i] == location) return current_location;
      let result = this.getParentOfLocation(
        location,
        current_location.content[i]
      );
      if (result !== false) return result;
    }
    return false;
  }
}
