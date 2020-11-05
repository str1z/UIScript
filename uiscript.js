const UIScript = {
  setProperties: (data) => {
    for (let key in data) document.documentElement.style.setProperty("--" + key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`), data[key]);
  },
  layout: {
    expandLeft: () => document.querySelector(".layout").classList.add("expand-left"),
    expandRight: () => document.querySelector(".layout").classList.add("expand-right"),
    collapseLeft: () => document.querySelector(".layout").classList.remove("expand-left"),
    collapseRight: () => document.querySelector(".layout").classList.remove("expand-right"),
  },
  Unit: class {
    constructor(element) {
      this.element = element;
      this.template = element.innerHTML;
    }
    on(event, handler) {
      this.element.addEventListener(event, handler);
    }
    mapArray(array) {
      this.element.innerHTML = "";
      for (let v of array) this.element.innerHTML += this.template.replace(/__(\w+)__/g, (_, key) => v[key]);
      return this;
    }

    formData() {
      let res = {};
      this.element.querySelectorAll("input, select, textarea").forEach((el, i) => {
        if (el.name !== "") res[el.name] = el.type == "checkbox" ? el.checked : el.value;
      });
      return res;
    }
  },
  useHashRoute: (...hashes) => {
    let styles = document.head.appendChild(document.createElement("style"));
    const updateStyles = () => {
      styles.innerHTML = "";
      for (let hash of hashes) if (location.hash !== "#" + hash) styles.innerHTML += `.hash-route-${hash}{display: none;}`;
    };
    updateStyles();
    addEventListener("hashchange", updateStyles);
  },
};
