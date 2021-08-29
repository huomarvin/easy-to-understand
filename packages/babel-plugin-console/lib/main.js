module.exports = function ({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        if (
          t.isMemberExpression(path.node.callee) &&
          path.node.callee.object.name === "console"
        ) {
          const args = path.node.arguments.map((item) => {
            if (item.type === "NumericLiteral") {
              return t.stringLiteral(String(item.value));
            } else if (item.type === "Identifier") {
              return t.stringLiteral(item.name);
            }
          });
          path.node.arguments.unshift(...args);
        }
      },
    },
  };
};
