import Config from './config'

let set = (key,value) => {
    var key = getKey(key);
    var value = compile(JSON.stringify(value));
    return localStorage.setItem(key, value);
};

let get = (key) => {
    var key = getKey(key);
    let result = localStorage.getItem(key);
    var data = result?JSON.parse(uncompile(result)):null;
    return data;
};

let remove = (key) => {
    var key = getKey(key);
    return localStorage.removeItem(key);
};

function getKey(code) {
    return Config.DATA.PREFIX + code;
}

function compile(str){
    let result = str;
    let c = String.fromCharCode(result.charCodeAt(0)+result.length);

    for(let i = 1;i < result.length;i++){
        c += String.fromCharCode(result.charCodeAt(i)+result.charCodeAt(i-1));
    }
    return escape(c);
}

function uncompile(str){
    let result = unescape(str);
    let c = String.fromCharCode(result.charCodeAt(0)-result.length);

    for(let i=1; i<result.length; i++){
        c += String.fromCharCode(result.charCodeAt(i)-c.charCodeAt(i-1));
    }
    return c;
}

export default {
    compile,
    uncompile,
}