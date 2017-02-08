
import templates from '../templates';
import BaseView from './base';

export default class PreviewView extends BaseView {
    constructor (options) {
        super(options);
        this.name = 'Preview';
        this._model = options.model;
    }

    render () {
        this.el.innerHTML = templates.view.preview(this._model.getItemsAsPages());
    }
}
