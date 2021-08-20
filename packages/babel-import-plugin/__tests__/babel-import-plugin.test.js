"use strict";

const babelImportPlugin = require("..");
const { transform } = require("@babel/core");

describe("babel-import-plugin", () => {
  beforeEach(() => {
    String.prototype.trimAll = function () {
      return this.replace(/\s/g, "");
    };
  });
  it("can transform correct", () => {
    const _code = `import { Button } from 'antd'`;
    const { code } = transform(_code, {
      plugins: [babelImportPlugin],
    });

    expect(code.trimAll()).toEqual(
      `import "antd/lib/button/style";import Button from "antd/lib/button";`.trimAll()
    );
  });
});
