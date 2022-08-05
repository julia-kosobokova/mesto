export class Section {
    constructor(containerSelector, renderer) {
        this._elements = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    setInitialItems(items) {
        items.forEach((item) => {
            const element = this._renderer(item);
            this._elements.append(element);
        });
    }
   
    addItem(item) {
        const element = this._renderer(item);
        this._elements.prepend(element);
    }
}