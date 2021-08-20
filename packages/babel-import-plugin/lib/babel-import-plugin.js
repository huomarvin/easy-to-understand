const { addSideEffect } = require("@babel/helper-module-imports");

module.exports = function ({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path) {
        const {
          node: { specifiers, source },
        } = path;
        if (
          !t.isImportDefaultSpecifier(specifiers[0]) &&
          source.value === "antd"
        ) {
          addSideEffect(
            path,
            `antd/lib/${specifiers[0].local.name.toLowerCase()}/style`
          );
          const newImport = specifiers.map((specifier) =>
            t.importDeclaration(
              [t.ImportDefaultSpecifier(specifier.local)],
              t.stringLiteral(
                `${source.value}/lib/${specifier.local.name.toLowerCase()}`
              )
            )
          );
          path.replaceWithMultiple(newImport);
        }
      },
    },
  };
};
