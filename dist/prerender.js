"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
require("reflect-metadata");
var fs_1 = require("fs");
var path_1 = require("path");
var core_1 = require("@angular/core");
core_1.enableProdMode();
var module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
var platform_server_1 = require("@angular/platform-server");
var static_paths_1 = require("./static.paths");
var _a = require('./server/main'), AppServerModuleNgFactory = _a.AppServerModuleNgFactory, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
var BROWSER_FOLDER = path_1.join(process.cwd(), 'browser');
var index = fs_1.readFileSync(path_1.join('browser', 'index.html'), 'utf8');
var previousRender = Promise.resolve();
static_paths_1.ROUTES.forEach(function (route) {
    var fullPath = path_1.join(BROWSER_FOLDER, route);
    if (!fs_1.existsSync(fullPath)) {
        fs_1.mkdirSync(fullPath);
    }
    previousRender = previousRender.then(function (_) { return platform_server_1.renderModuleFactory(AppServerModuleNgFactory, {
        document: index,
        url: route,
        extraProviders: [
            module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)
        ]
    }); }).then(function (html) { return fs_1.writeFileSync(path_1.join(fullPath, 'index.html'), html); });
});
//# sourceMappingURL=prerender.js.map