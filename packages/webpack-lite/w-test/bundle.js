(function (graph) {
          function require(file) {
              function absRequire(relPath) {
                  return require(graph[file].deps[relPath])
              }
              var exports = {};
              (function (require,exports,code) {
                  eval(code)
              })(absRequire, exports, graph[file].code)
              return exports
          }
          require('/Users/marvin/Documents/Git/easy-to-understand/packages/webpack-lite/w-test/index.js')
      })({"/Users/marvin/Documents/Git/easy-to-understand/packages/webpack-lite/w-test/index.js":{"deps":{"./add":"/Users/marvin/Documents/Git/easy-to-understand/packages/webpack-lite/w-test/add.js","./circle":"/Users/marvin/Documents/Git/easy-to-understand/packages/webpack-lite/w-test/circle.js"},"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add\"));\n\nvar _circle = _interopRequireDefault(require(\"./circle\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log((0, _add[\"default\"])(2, 4));\nconsole.log((0, _circle[\"default\"])(6));"},"/Users/marvin/Documents/Git/easy-to-understand/packages/webpack-lite/w-test/add.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = _default;\n\nfunction _default(a, b) {\n  return a + b;\n}"},"/Users/marvin/Documents/Git/easy-to-understand/packages/webpack-lite/w-test/circle.js":{"deps":{"./const":"/Users/marvin/Documents/Git/easy-to-understand/packages/webpack-lite/w-test/const.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = _default;\n\nvar _const = _interopRequireDefault(require(\"./const\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nfunction _default(r) {\n  return _const[\"default\"] * r * r;\n}"},"/Users/marvin/Documents/Git/easy-to-understand/packages/webpack-lite/w-test/const.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _default = Math.PI;\nexports[\"default\"] = _default;"}})