class Wrapper {
  constructor(element, text, display = true) {
    this.element = document.createElement(element);
    this.element.innerHTML = text;
    this.display = !display;
    this.toggleDisplay();
  }
  click(val) {
    this.element.addEventListener("click", () => val());
    return this;
  }
  showSelectable() {
    this.element.style.cursor = "pointer";
    return this;
  }
  addClass(className) {
    this.element.classList.add(className);
    return this;
  }
  toggleDisplay() {
    this.display = !this.display;
    this.element.style.display = this.display ? "" : "none";
    return this;
  }
  appendChild(child) {
    this.element.appendChild(child.element);
    return this;
  }
  createChild(element, text, display = true) {
    var wrapper = new Wrapper(element, text, display);
    this.appendChild(wrapper);
    return this;
  }
  static generate(element, text, display = true) {
    return new Wrapper(element, text, display);
  }
}

class AnchorWrapper extends Wrapper {
  constructor(href, text, target = "_blank") {
    super("a", text);
    this.element.href = href;
    this.element.target = target;
  }
  static generate(href, text, target = "_blank") {
    return new AnchorWrapper(href, text, target);
  }
}

const renderHouse = (house) => {
  const bodyDiv = Wrapper.generate("div", "", false)
  .createChild("p", "body div child")
  .appendChild(Wrapper.generate("p", "P tooltip").addClass("tooltip")
    .appendChild(Wrapper.generate("span", `span house name `)
      .appendChild(AnchorWrapper.generate(`mailto:${house.id}`, house.id))
      .createChild("br", "")
      .addClass("tooltiptext")));
return Wrapper.generate("div", "")
  .addClass("house")
  .appendChild(Wrapper.generate("h1", `${house.name} &mdash; ${house.id}`)
    .showSelectable()
    .click(() => bodyDiv.toggleDisplay()))
  .appendChild(bodyDiv)
  .element;
};

const get = (model, domain, done) => {
  fetch(`/${domain}`)
    .then(response => response.json())
    .then(json => {
      model[domain] = json;
      done();
    });
};





const initialize = (app, model) => get(model, "houses", () => {
  model.houses.forEach(house => {
    app.appendChild(renderHouse(house));
  });
});


// app
(() => {
  const model = {};
  const app = document.getElementById("app");
  initialize(app, model);
})()


