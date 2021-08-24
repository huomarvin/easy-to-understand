@loadable/component
React code splitting made easy.

使用方法如下，此次实现 loadable 函数

```js
import loadable from "@loadable/component";
const OtherComponent = loadable(() => import("./OtherComponent"));
function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```
