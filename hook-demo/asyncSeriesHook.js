const { AsyncSeriesHook } = require("tapable");

// 创建实例
let asyncSeriesHook = new AsyncSeriesHook(["name", "age"]);

// 注册事件
asyncSeriesHook.tapAsync("1", (name, age, next) => {
    setTimeout(() => {
        console.log("1", name, age, new Date());
        next();
    }, 1000);
});

asyncSeriesHook.tapAsync("2", (name, age, next) => {
    setTimeout(() => {
        console.log("2", name, age, new Date());
        next();
    }, 2000);
});

asyncSeriesHook.tapAsync("3", (name, age, next) => {
    setTimeout(() => {
        console.log("3", name, age, new Date());
        next();
    }, 3000);
});

// 触发事件，让监听函数执行
asyncSeriesHook.callAsync("panda", 18, () => {
    console.log("complete");
});