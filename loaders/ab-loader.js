function abc() {
    return '222'
}

module.exports = function (source) {
    var url =JSON.stringify(source); //获取url中"?"符后的字串
    url = url.split('?')[1];
    var theRequest = new Object();
    var strs = url.split("&");
    for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }

    // 这个 loader 的功能是把源模块转化为字符串交给 require 的调用方
    // return 'module.exports = ' + JSON.stringify(theRequest.wd);
    return abc
}