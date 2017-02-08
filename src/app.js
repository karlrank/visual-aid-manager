
'use strict';

// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import env from './env';
import templates from './templates';
import _ from 'lodash';

import VisualAidModel from './model/visual.aid';
import MainView from './view/main';

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {
    var visualAidModel = new VisualAidModel();
    var mainView = new MainView({el: document, visualAidModel: visualAidModel});
    mainView.render();
});
