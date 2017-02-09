
import templates from '../templates';
import BaseView from './base';
import ItemEditorView from './item.editor';

export default class ManageView extends BaseView {
    constructor (options) {
        super(options);
        this.name = 'Manage';
        this._model = options.model;

        this._bindEvent('click', 'tr.item-row', (event) => {
            let itemId = event.sTarget.getAttribute('data-id');
            if (this._itemEditor) {
                this._itemEditor.destroy();
            }
            this._itemEditor = new ItemEditorView({
                el: this._itemEditorContainer,
                item: this._model.getItem(itemId)
            });
            this._itemEditor.render();
            this._itemEditor.on('save', item => {
                this._model.updateItem(item);
                this.render();
            });
        });
    }

    render () {
        this.el.innerHTML = templates.view.manage({
            items: this._model.getItems()
        });

        this._itemEditorContainer = this.el.querySelector('aside.item-editor-container');
    }
}
