"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Load zone.js for the server.
require("zone.js/dist/zone-node");
require("reflect-metadata");
var fs_1 = require("fs");
var path_1 = require("path");
var core_1 = require("@angular/core");
// Faster server renders w/ Prod mode (dev mode never needed)
core_1.enableProdMode();
// Import module map for lazy loading
var module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
var platform_server_1 = require("@angular/platform-server");
var static_paths_1 = require("./static.paths");
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
var _a = require('./server/main'), AppServerModuleNgFactory = _a.AppServerModuleNgFactory, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
var BROWSER_FOLDER = path_1.join(process.cwd(), 'browser');
// Load the index.html file containing referances to your application bundle.
var index = fs_1.readFileSync(path_1.join('browser', 'index.html'), 'utf8');
var previousRender = Promise.resolve();
// Iterate each route path
static_paths_1.ROUTES.forEach(function (route) {
    var fullPath = path_1.join(BROWSER_FOLDER, route);
    // Make sure the directory structure is there
    if (!fs_1.existsSync(fullPath)) {
        fs_1.mkdirSync(fullPath);
    }
    // Writes rendered HTML to index.html, replacing the file if it already exists.
    previousRender = previousRender.then(function (_) { return platform_server_1.renderModuleFactory(AppServerModuleNgFactory, {
        document: index,
        url: route,
        extraProviders: [
            module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)
        ]
    }); }).then(function (html) { return fs_1.writeFileSync(path_1.join(fullPath, 'index.html'), html); });
});
//# sourceMappingURL=prerender.js.map