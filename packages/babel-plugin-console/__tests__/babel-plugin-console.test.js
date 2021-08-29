"use strict";

const babelImportPlugin = require("..");
const { transform } = require("@babel/core");

describe("babel-plugin-console", () => {
  it("it can add name when console.log has one argument.", () => {
    const _code = `console.log(123);`;
    const { code } = transform(_code, {
      plugins: [babelImportPlugin],
    });
    expect(code).toEqual('console.log("123", 123);');
  });
  it("it can add names when console.log has many arguments.", () => {
    const _code = `console.log(a, b);`;
    const { code } = transform(_code, {
      plugins: [babelImportPlugin],
    });
    expect(code).toEqual('console.log("a", "b", a, b);');
  });
});
