
import EventEmitter from 'events';

export default class BaseView extends EventEmitter {
    constructor (options) {
        super();
        this.el = options.el;
        this._eventListeners = [];
    }

    destroy () {
        // Remove all DOM event listeners that is object is listening on
        this._eventListeners.forEach(listener => this.el.removeEventListener(listener.event, listener.f));
        // Remove all EventEmitter listeners that are listening on this object
        this.removeAllListeners();
        // Remove reference to DOM
        delete this.el;
    }

    _bindEvent (event, selector, callback) {
        var listener = {
            event: event,
            f: function (event) {
                if (event.target.matches(selector)) {
                    callback(event);
                }
            }
        };
        this._eventListeners.push(listener);
        this.el.addEventListener(listener.event, listener.f);
    }

    render () {
        this.el.innerHTML = 'render is not implemented';
    }
}
