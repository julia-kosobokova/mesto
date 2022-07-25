export class Section {
    constructor({
        items,
        renderer
    }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._elements = document.querySelector(containerSelector);
    }
    generate() {
        // функция перебора массива
        this._items.forEach((cardAttributes) => {
            const element = this._renderer(cardAttributes.name, cardAttributes.link);
            this.addItem(element);
        });
    }
    addItem(element) {
        this._elements.prepend(element);
    }
}