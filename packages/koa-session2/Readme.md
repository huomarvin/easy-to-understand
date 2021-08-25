# koa-session2 简单实现

简单说起来`koa-session2`就是有一个内置的`Map`对象来存放`session`对象，`key`可以用`uuid`带来做，`value`可以是存储好的对象。
缺点就是当重启之后，`Map`中的信息会丢失。
