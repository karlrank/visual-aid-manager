
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

    _bindEvent (eventName, selector, callback) {
        var listener = {
            event: eventName,
            f: function (event) {
                if (event.target.matches(selector)) {
                    event.sTarget = event.target;
                    callback(event);
                } else {
                    let element = event.target.parentElement;
                    while (element && element !== this.el) {
                        if (element.matches(selector)) {
                            event.sTarget = element;
                            callback(event);
                        }
                        element = element.parentElement;
                    }
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
