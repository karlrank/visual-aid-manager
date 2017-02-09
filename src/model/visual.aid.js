
'use strict';

import _ from 'lodash';
import EventEmitter from 'events';

export default class VisualAidModel extends EventEmitter {
    constructor () {
        super();
        this._items = _.range(3 * 3 * 3 + 2).map(i => ({
            _id: i,
            id: `1234:${i}`,
            measurements: '64x64x3',
            material: '1.4401 + 1D',
            imageData: 'data:image/png;base64,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'
        }));
    }

    getItem (id) {
        id = parseInt(id);
        return this._items.find(item => item._id === id);
    }

    updateItem (item) {
        let modelItem = this._items.find(i => i._id === item._id);
        _.assign(modelItem, item);
        this.emit('item-updated', modelItem);
    }

    getItems () {
        return _.sortBy(this._items, 'id');
    }

    getItemsAsPages () {
        var pages = {pages: [{rows: [{columns: []}]}]},
            page = pages.pages[0],
            row = page.rows[0];

        this.getItems().forEach(item => {
            if (page.rows.length >= 3 && row.columns.length >= 3) {
                page = {rows: [{columns: []}]};
                row = page.rows[0];
                pages.pages.push(page);
            }

            if (row.columns.length >= 3) {
                row = {columns: []};
                page.rows.push(row);
            }

            row.columns.push(item);
        });

        _.times(3 - row.columns.length, i => {
            row.columns.push({empty: true});
        });

        _.times(3 - page.rows.length, i => {
            page.rows.push({columns: [{empty: true}, {empty: true}, {empty: true}]});
        });

        return pages;
    }
}
