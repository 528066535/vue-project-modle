/**
 * Created by 蒋鑫强 on 2017/1/17.
 * 公共工具库
 */
import loadScript from '../third/script.min'
import {SYSTEM, RESOURCE_IMAGE} from './config';
import dialog from './dialog';
import store from './store';
import router from "@Pub/router";
import http from "@Pub/http";

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

// 获取变量类型
function getType(obj) {
    return Object.prototype.toString.call(obj);
},

export default {
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

    cloneObj(obj) {
        return clone(obj);
    }
}