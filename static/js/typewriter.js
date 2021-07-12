const typeWriters = [];

function getTW(containerid) {
  return typeWriters.filter((tw) => {
    return tw.containerid == containerid;
  })[0];
}

/**
 * Initializes a TypeWriter for a specified HTML container
 * @param {string} containerid HTML ID of container
 * @param {string} childname Name of children elements inside container, only elements with this classname will be altered
 * @returns {object} Initialized TypeWriter object
 */
function initializeTW(containerid, childname) {
  let tw = {
    containerid: containerid,
    childname: childname,
    get container() {
      return document.getElementById(this.containerid);
    },
    /**
     * Adds line to container
     * @param {string} content Content to be written
     * @param {string} type HTML element type, default "p" (paragraph)
     * @param {number} delay ms between each letter (animation), default 50 (ms)
     */
    write: async function (content, type = "p", delay = 50, custom_class = false, custom_styling = false) {
      let element = document.createElement(type);
      element.setAttribute("class", this.childname);
      if (custom_class) element.className += ` ${custom_class}`;
      if (custom_styling) element.style.cssText = custom_styling;
      this.container.appendChild(element);

      /* Write Animation */
      let i = 0;
      while (i < content.length) {
        element.innerHTML += content[i];
        await sleep(delay);
        i++;
      }
      /* -------------- */
    },
    /**
     * Erases last child of container
     * @param {number} delay ms between each letter (animation), default 50 (ms)
     */
    erase: async function (delay = 50) {
      let lastChild = this.container.querySelectorAll(`.${this.childname}:last-child`)[0];

      /* Erase Animation */
      let i = element.innerHTML.length;
      while (i > 0) {
        element.innerHTML = element.innerHTML.slice(0, -1);
        await sleep(delay);
        i--;
      }
      /* -------------- */

      this.container.removeChild(lastChild);
    },
    /**
     * Remove all children from container
     */
    clean: async function () {
      const elements = this.container.getElementsByClassName(this.childname);
      while (elements.length > 0) elements[0].remove();
    },
    /**
     * Remove container and all it's children from HTML document
     */
    delete: function () {
      this.container.remove();
      typeWriters.pop(this);
    },
  };
  typeWriters.push(tw);
  return tw;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeAnimation(element, content, delay) {
  let i = 0;
  while (i < content.length) {
    element.innerHTML += content[i];
    await sleep(delay);
    i++;
  }
}
async function eraseAnimation(element, delay) {
  let i = element.innerHTML.length;
  while (i > 0) {
    element.innerHTML = element.innerHTML.slice(0, -1);
    await sleep(delay);
    i--;
  }
}