const { SyncHook } = require("tapable");

// 创建实例
let syncHook = new SyncHook(["name", "age"]);

// 注册事件
syncHook.tap("1", (name, age) => console.log("1", name, age));
syncHook.tap("2", (name, age) => console.log("2", name, age));
syncHook.tap("3", (name, age) => console.log("3", name, age));

// 触发事件，让监听函数执行
syncHook.call("panda", 18);
