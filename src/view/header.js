
import templates from '../templates';
import BaseView from './base';

export default class HeaderView extends BaseView {
    constructor (options) {
        super(options);
        this.name = 'Header';

        this._bindEvent('click', 'nav > button', (event) => {
            this.emit('navigate', event.target.getAttribute('data-name'));
        })
    }

    render (data) {
        this.el.innerHTML = templates.header(data);
    }
}
