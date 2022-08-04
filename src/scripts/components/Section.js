export class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._elements = document.querySelector(containerSelector);
    }
   
    addItem(element) {
        this._elements.prepend(element);
    }
}