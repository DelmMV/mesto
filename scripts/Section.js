export default class Section {
  constructor ({ item, renderer}, containerSelector) {
    this._renderedItems = item;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  insertCard() {
    console.log(this._renderer)
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
