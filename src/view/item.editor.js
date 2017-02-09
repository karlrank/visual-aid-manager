
import templates from '../templates';
import BaseView from './base';

export default class ItemEditorView extends BaseView {
    constructor (options) {
        super(options);
        this.name = 'ItemEditor';
        this._item = options.item;

        this._bindEvent('click', 'button.save-item', (event) => {
            event.preventDefault();

            this._item.id = this.el.querySelector('input.id').value;
            this._item.measurements = this.el.querySelector('input.measurements').value;
            this._item.material = this.el.querySelector('input.material').value;

            this.emit('save', this._item);
        });
    }

    render (item) {
        this.el.innerHTML = templates.view.itemeditor({
            item: this._item
        });
    }
}
