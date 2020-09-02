/**
 * Created by 周文博 on 2017/1/17.
 * 公共工具库
 */
import Data from '@Core/data'
import Router from '@Pub/router'
let timerGlobal = null;

function clone (obj) {
    let o = null;
    if (typeof obj === "object") {
        if (obj === null) {//原型链的终点
            o = null;
        } else {
            if(obj instanceof Date) {
                o = new Date(obj.valueOf());
            }
            else if (obj instanceof Array) {//数组对象
                o = [];
                for (let i = 0, len = obj.length; i < len; i++) {
                    o.push(clone(obj[i]));
                }
            } else {//普通对象
                o = {};
                for (let j in obj) {
                    o[j] = clone(obj[j]);
                }
            }
        }
    } else {//基本类型
        o = obj;
    }
    return o;
}

let tool = {
    // 获取变量类型
    getType(obj) {
        return Object.prototype.toString.call(obj);
    },

    // 判断变量是否为Number对象
    isNumber(num) {
        return this.getType(num) === '[object Number]';
    },

    isInteger(num) {
        return this.isNumber(num) && num % 1 === 0;
    },

    //判断是否对象
    isObject(num) {
        return this.getType(num) === '[object Object]';
    },

    // 判断变量是否为String对象
    isString(str) {
        return this.getType(str) === '[object String]';
    },

    // 判断变量是否为Array对象
    isArray(arr) {
        return this.getType(arr) === '[object Array]';
    },

    // 判断变量是否为Date对象
    isDate(date) {
        return this.getType(date) === '[object Date]';
    },

    // 判断变量是否为Function对象
    isFunction(fn) {
        return this.getType(fn) === '[object Function]';
    },

    strLength(str){
        return str.replace(/[\u0391-\uFFE5]/g,"aa").length;
    },

    // 创建一个指定长度且由字母和数字组成的随机字符串
    getRandomStr(len) {
        let str = '';
        for(; str.length < len; str += Math.random().toString(36).substr(2)){}
        return str.substr(0, len);
    },

    // 获取URL参数集合
    getUrlParams(url) {
        if(url === undefined){
            url = document.location.href;
        }
        let s = url.indexOf('?'), str = '';
        if(s >- 1){
            str = url.substr(s + 1, url.length - s - 1);
        }
        let parts = str.split('&'), params = {};
        for(let i = 0, l = parts.length; i < l; i++){
            let part = parts[i], ps = part.split('=');
            params[ps[0]] = ps[1];
        }
        return params;
    },

    bytesToSize(bytes) {
        if (bytes === 0) {
            return '0 B';
        }
        let k = 1024;
        let sizes = ['B','K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
        let i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toFixed(1) + sizes[i];
    },

    //判断是否为word
    isWord(type) {
        return type.indexOf('.doc') >= 0 || type.indexOf('.docx') >= 0 || /^application\/.*(msword|document)$/i.test(type);
    },

    //判断是否为excel
    isExcel(type) {
        return type.indexOf('.xls') >= 0 || type.indexOf('.xlsx') >= 0 || /^application\/.*(sheet|excel)$/i.test(type);
    },

    //判断是否为pdf
    isPdf(type) {
        return type.indexOf('pdf') >= 0;
    },

    //格式化月份
    parseMonth(month) {
        let arr = month.split('-');
        return arr[0] + '-' + (arr[1] <= 9?'0' + arr[1]: arr[1]);
    },

    cloneObj(obj) {
        return clone(obj);
    },

    //延迟处理函数
    delay(delay){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, delay || 200);
        });
    },

    debounce(delay){
        timerGlobal && clearTimeout(timerGlobal);
        return new Promise((resolve, reject) => {
            timerGlobal = setTimeout(() => {
                resolve();
            }, delay || 200);
        });
    },

    //通过history获取之前保存的查询参数
    getCacheParams(){
        return history.state?(history.state.cacheParams || {}):{};
    },

    scrollDiv(div, color){
        Vue.nextTick(() => {
            div.niceScroll({
                cursorcolor: color || 'rgba(0,0,0,0.06)',
                cursorwidth: "8px",
                cursorborder: "none",
                cursorborderradius: "8px",
                autohidemode: 'cursor'
            });
        });
    },

    logout() {
        Data.removeToken()
        Data.removeUser()
        Router.go('/login')
    },

    getHex(color){
        color = color.replace('#', '').toUpperCase();
        if(color.length === 3){
            let arr = color.split('');
            color = arr[0] + arr[0] + arr[1] + arr[1] + arr[2] + arr[2];
        }
        let arr = color.split('');
        return {
            R: parseInt([arr[0],arr[1]].join(''), 16),
            G: parseInt([arr[2],arr[3]].join(''), 16),
            B: parseInt([arr[4],arr[5]].join(''), 16)
        }
    }
};

export default tool;

const ua = navigator.userAgent.toLowerCase();
export let isIe = !!ua.match(/msie ([\d.]+)/) || ua.indexOf("edge") > -1 || !!window.ActiveXObject || "ActiveXObject" in window;
