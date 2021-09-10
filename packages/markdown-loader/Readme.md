# 如何去写一个 loader

`loader`简单来理解就是将静态资源转换为模块代码的工具函数，简单理解如下:

```js
module.exports = (source) => `export default xxx`;
```

因为`loader`的执行顺序是从右向左的，所以只要保证最后一个`loader`可以将静态资源转换成模块化语法即可。

以代码中为引，如果我们没有将`md`转换为模块化代码，则可以补充一个`html-loader`来处理`html`代码。
