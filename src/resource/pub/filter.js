/**
 * Created by 周文博 on 2017/3/22.
 *
 */
import util from './util';

/**
 * 日期格式化
 * @param value
 * @param format
 * @returns {string}
 * @private
 */
const date = function (value, format) {
    if(util.isDate(value)){
        return value.format(format);
    }else{
        if(value){
            if(util.isString(value) && value.indexOf('Z') < 0){
                value = value.replace(/-/ig, '/').split('.')[0];
            }
            return new Date(value).format(format);
        }else{
            return '';
        }
    }
};

/**
 * 字符串转json对象
 * @param value 字符串
 * @param key 要获取的json中的key, 不传怎返回整个json
 * @private
 */
const json = function (value, key) {
    const oJson = $.parseJSON(value);
    return key?oJson[key]:oJson;
};

/**
 * 将数字转换成货币 千位一个, 分隔的表达形式
 * integer 是否取整数
 * count 转换后保留小数点位数
 */
const currency = function (value, integer, count) {
    let number = Number(value);
    count = count || 2;
    if(isNaN(number) || number < 1000){
        return number;
    }else{
        number = (number / 1000) + '';
        number = number.split('.');
        if(number.length === 1 || integer){
            return number[0] + 'k';
        }else{
            let smallNumber = number[1].length > count?number[1].substring(0, count):number[1];
            return number[0] + (!smallNumber?'':'.' + smallNumber) + 'k';
        }
    }
};

const thousand = function (value) {
    let number = Number(value);
    if(isNaN(number)){
        number = 0;
    }
    return number.toLocaleString().split(".")[0];
};

/**
 * 去掉HTML代码
 * @param value
 * @returns {string}
 */
const html = function (value) {
    value = value || '';
    return value.replace(/<[^>]+>/g,"");
};

const nameHidden = function (value) {
    if(value){
        value = value + '';
        let len = value.length;
        let pre = value.substring(0, 1);
        let b = '';
        for (let i = 1; i < len; i ++) {
            b += '*';
        }
        return pre + b;
    }else{
        return '';
    }
};

const ipHidden = function (value) {
    if(value){
        let valueList = value.split('.');
        let pre = '';
        for (let i = 0; i < valueList.length; i ++) {
            if (i == 0 || i == valueList.length-1) {
                pre += valueList[i];
            }
            else {
                pre += '*';
            }
        }
        return pre;
    }else{
        return '';
    }
};

const phoneHidden = function (value) {
    if(value){
        value = value + '';
        if(value.length === 11){
            let pre = value.substring(0, 3);
            let last = value.substring(9, 11);
            return pre + '******' + last;
        }else{
            return value;
        }
    }else{
        return '';
    }
}

/**
 * 加密手机号中间部分
 * @param value
 * @private
 */
const phone = function (value) {
    if(value){
        value = value + '';
        if(value.length === 11){
            let pre = value.substring(0, 3);
            let last = value.substring(7, 11);
            return pre + '****' + last;
        }else{
            return value;
        }
    }else{
        return '';
    }
};

const sysStatus = function (value) {
    return {
        'good': '正常',
        'error': '异常'
    }[value] || '';
};

if(typeof Vue !== 'undefined'){
    Vue.filter('date', date);

    Vue.filter('nameHidden', nameHidden);

    Vue.filter('phoneHidden', phoneHidden);

    Vue.filter('ipHidden', ipHidden);

    Vue.filter('json', json);

    Vue.filter('currency', currency);

    Vue.filter('thousand', thousand);

    Vue.filter('phone', phone);

    Vue.filter('html', html);

    Vue.filter('sysStatus', sysStatus);
}

export default {
    date: date,

    json: json,

    currency: currency,

    phone: phone,

    html: html,

    thousand: thousand,

    nameHidden: nameHidden,

    phoneHidden: phoneHidden,

    ipHidden: ipHidden,
};