
import BaseView from './base';
import ManageView from './manage';
import PreviewView from './preview';
import HeaderView from './header';

import templates from '../templates';

export default class MainView extends BaseView {
    constructor (options) {
        super(options);

        this.el.querySelector('body').innerHTML = templates.main();
        this._header = this.el.querySelector('header');
        this._main = this.el.querySelector('main');

        this._headerView = new HeaderView({el: this._header});
        this._views = [
            new ManageView({el: this._getContainer(), model: options.visualAidModel}),
            new PreviewView({el: this._getContainer(), model: options.visualAidModel})
        ];

        this._headerView.on('navigate', target => {
            this.setView(target);
        })
    }

    _getContainer () {
        var container = this.el.createElement('div');
        container.className = 'container';
        return container;
    }

    setView (name) {
        this._renderHeader(name);
        let view = this._views.find(v => v.name === name);
        view.render();

        // Empty element
        while(this._main.firstChild) {
            this._main.removeChild(this._main.firstChild);
        }
        this._main.appendChild(view.el);
    }

    _renderHeader (selectedViewName) {
        this._headerView.render(this._views.map(view => ({
            selected: view.name === selectedViewName,
            name: view.name
        })));
    }

    render () {
        this.setView('Manage');
    }
}
