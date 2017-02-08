
'use strict';

import {dialog} from 'electron';

export var fileMenuTemplate = {
    label: 'File',
    submenu: [
        {
            label: "Open database...",
            accelerator: "CmdOrCtrl+O",
            click: function (menuItem, browserWindow, event) {
                dialog.showOpenDialog(browserWindow, {
                    title: 'Open database',
                    filters: [
                        {
                            name: 'Visual Aid Database',
                            extensions: ['vdb.json']
                        }
                    ],
                    properties: ['openFile']
                }, function (paths) {
                    console.log(`file`, paths);
                })
            }
        },
        {
            label: 'Print',
            accelerator: 'CmdOrCtrl+P',
            click: function (menuItem, browserWindow, event) {
                browserWindow.webContents.print();
            }
        }
    ]
};
