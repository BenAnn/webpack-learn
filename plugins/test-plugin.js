class EndWebpackPlugin {

    constructor(doneCallback, failCallback) {
        this.doneCallback = doneCallback;
        this.failCallback = failCallback;
    }

    apply(compiler) {
        compiler.hooks.done.tap('EndWebpackPlugin', (stats) => {
            this.doneCallback(stats);
        });
        compiler.hooks.failed.tap('EndWebpackPlugin', (err) => {
            this.failCallback(err);
        });

        compiler.hooks.emit.tap('test', (compilation, callback) => {
            compilation.chunks.forEach(function (chunk) {

                // Explore each asset filename generated by the chunk and replace the console.* methods:
                chunk.files.forEach(function (filename) {

                    // Get the asset source for each file generated by the chunk:
                    var source = compilation.assets[filename].source();

                    var consoleName=["console","window.console"];
                    var consoleType= ["log", "info", "warn", "error" ,"assert" ,"count" ,"clear", "group" ,
                        "groupEnd", "groupCollapsed" ,"trace" ,"debug", "dir" ,"dirxml", "profile", "profileEnd" ,
                        "time" ,"timeEnd" ,"timeStamp" ,"table","exception"];

                    //Console.log|debug|info|warn|error regexp
                    var rConsole = new RegExp(`(${consoleName.join('|')}).(?:${consoleType.join('|')})\\s{0,}\\([^)]*\\)[;]*[,]*`, 'gi');

                    //Regexp replace null
                    console.log(source)
                    source = source.replace(rConsole, '');
                    console.log(source)
                    compilation.assets[filename] = {
                        source: function () {
                                return source;
                            },
                        size: function () {
                                return source.length;
                            }
                    }
                });
            });
        });

    }
}

module.exports = EndWebpackPlugin;