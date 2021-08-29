# babel-plugin-console

实现自动添加日志标识

```js
console.log(a);  => console.log('a', a);
console.log(b);  => console.log('a', 'b', a , b);
```

## 使用

```shell
yarn add -D @rg0720/babel-import-console
```

或

```shell
npm install @rg0720/babel-import-console --dev
```

在 babel 的配置文件的 plugins 节点中添加如下内容

```js
"module:@rg0720/babel-import-console";
```
