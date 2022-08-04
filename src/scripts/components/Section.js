export class Section {
    constructor(containerSelector) {
        this._elements = document.querySelector(containerSelector);
    }
   
    addItem(element) {
        this._elements.prepend(element);
    }
}