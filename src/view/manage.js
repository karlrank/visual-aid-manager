
import templates from '../templates';
import BaseView from './base';

export default class ManageView extends BaseView {
    constructor (options) {
        super(options);
        this.name = 'Manage';
    }

    render () {
        this.el.innerHTML = templates.view.manage();
    }
}
