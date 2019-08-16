const { SyncHook } = require("tapable");

class Car {
    constructor() {
        this.hooks = {
            carStarted: new SyncHook()
        };

        this.hooks.carStarted.intercept({
            register: (tapInfo) => {
            // tap: (tapInfo) => {
                console.log(tapInfo)
                if (tapInfo.name === "NitroPlugin") {
                    console.log(`🚫 ${tapInfo.name} is banned 🚫`);

                    tapInfo.fn = () => {
                        console.log(`🚨 Police are on their way 🚨`);
                    };
                } else {
                    console.log(`${tapInfo.name} is registered`);
                }

                return tapInfo;
            },
            // call: () => {
            //     console.log(111)
            // },
        })
    }

    turnOn() {
        this.hooks.carStarted.call();
    }
}

const myCar = new Car();
myCar.hooks.carStarted.tap({ name: "EngineLampPlugin" }, () => {
    console.log("Car started!");
});
// EngineLampPlugin is registered
myCar.hooks.carStarted.tap({ name: "NitroPlugin" }, () => {
    console.log("🏎 lets go fast");
});
// 🚫 NitroPlugin is banned 🚫

myCar.turnOn();