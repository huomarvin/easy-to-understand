const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const getPath = (p) =>
  path.resolve(__dirname, "../w-test", `${p.endsWith(".js") ? p : `${p}.js`}`);

/**
 * 格式化返回module对象
 * @param {string} file
 * @returns
 */
function getModuleInfo(file) {
  let content = fs.readFileSync(getPath(file), "utf8");
  const ast = parser.parse(content, {
    sourceType: "module",
  });
  const deps = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      deps[node.source.value] = getPath(node.source.value);
    },
  });
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  const moduleInfo = {
    file,
    deps,
    code,
  };
  return moduleInfo;
}

/**
 * @param {string} file
 * @returns 解析模块后的树状图
 */
function parseModules(file) {
  const entry = getModuleInfo(file);
  const temp = [entry];
  const depsGraph = {};
  getDeps(temp, entry);
  temp.forEach((moduleInfo) => {
    depsGraph[getPath(moduleInfo.file)] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code,
    };
  });
  return depsGraph;
}

/**
 * 递归查找所有依赖
 * @param {Array} temp
 * @param {*} param1
 */
function getDeps(temp, { deps }) {
  Object.keys(deps).forEach((key) => {
    const subModule = getModuleInfo(key);
    temp.push(subModule);
    getDeps(temp, subModule);
  });
}

/**
 * @param {string} 打包入口文件
 * @returns 打包后bundle代码
 */
function bundle(file) {
  const depsGraph = JSON.stringify(parseModules(file));
  return `(function (graph) {
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
          require('${getPath(file)}')
      })(${depsGraph})`;
}
const content = bundle("./index.js");

!fs.existsSync("./w-test") && fs.mkdirSync("./w-test");
fs.writeFileSync("./w-test/bundle.js", content);
