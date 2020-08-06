class Filesystem {
  storage: Object;
  current_dir: Object;
  constructor() {
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
                content: "this is a file",
              },
            },
          },
          boot: {
              type: "directory",
              content: {}
          }
        },
      },
    };
    this.current_dir = this.storage;
  }

  getLocation(path: string) {
    // Convert string to array (cutting out '/')
    let path_arr = this.pathAsArray(path);
  }

  private pathAsArray(path: string): Array<string> {
    let path_arr: Array<string> = [];
    let pointer = 0;
    for (let i = 0; i < path.length; i++) {
      if (path[i] == '/') {
        pointer++;
        continue;
      }
      path_arr[pointer] += path[i];
    }
    return path_arr;
  }
}
