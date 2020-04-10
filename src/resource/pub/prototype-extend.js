/**
 * Created by 周文博 on 2017/3/22.
 *
 */
/****扩展Date对象开始****/

//格式化日期
Date.prototype.format = function(format){
    const o = {
        // 月份
        'M+': this.getMonth() + 1,
        // 日
        'd+': this.getDate(),
        // 小时
        'h+': this.getHours(),
        // 分
        'm+': this.getMinutes(),
        // 秒
        's+': this.getSeconds(),
        // 季度
        'q+': Math.floor((this.getMonth() + 3) / 3),
        // 毫秒
        'S': this.getMilliseconds()
    };

    if(/(y+)/.test(format)){
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for(let key in o){
        if(new RegExp('(' + key + ')').test(format)){
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[key]) : (('00' + o[key]).substr(('' + o[key]).length)));
        }
    }

    return format;
};

// 添加日
Date.prototype.addDays = function(d){
    this.setDate(this.getDate() + d);
};

//计算2个日期的差值
Date.prototype.diff = function(date){
    let days = date.getTime() - this.getTime();
    return parseInt(days / (1000 * 60 * 60 * 24));
};

//获取当前第几季度
Date.prototype.season = function () {
    const month = this.getMonth() + 1;
    if(month >= 1 && month < 4){
        return 1;
    }else if(month >=4 && month < 7){
        return 2;
    }else if(month >= 7 && month < 10){
        return 3;
    }else if(month >= 10 && month <= 12){
        return 4;
    }
};
/****扩展Date对象结束****/

/****扩展Array对象开始****/
//根据id获取数组中对应的值
Array.prototype.getById = function (id) {
    return this.getByKey('id', id);
};

//根据key获取数组中对应的值
Array.prototype.getByKey = function (key, v) {
    return this.filter(function (value) {
        return value[key] === v;
    })[0];
};
/****扩展Array对象结束****/

/*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
if (!String.fromCodePoint) {
    (function() {
        var defineProperty = (function() {
            // IE 8 only supports `Object.defineProperty` on DOM elements
            try {
                var object = {};
                var $defineProperty = Object.defineProperty;
                var result = $defineProperty(object, object, object) && $defineProperty;
            } catch(error) {}
            return result;
        }());
        var stringFromCharCode = String.fromCharCode;
        var floor = Math.floor;
        var fromCodePoint = function() {
            var MAX_SIZE = 0x4000;
            var codeUnits = [];
            var highSurrogate = null;
            var lowSurrogate = null;
            var index = -1;
            var length = arguments.length;
            if (!length) {
                return '';
            }
            var result = '';
            while (++index < length) {
                var codePoint = Number(arguments[index]);
                if (
                    !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
                    codePoint < 0 || // not a valid Unicode code point
                    codePoint > 0x10FFFF || // not a valid Unicode code point
                    floor(codePoint) != codePoint // not an integer
                ) {
                    throw RangeError('Invalid code point: ' + codePoint);
                }
                if (codePoint <= 0xFFFF) { // BMP code point
                    codeUnits.push(codePoint);
                } else { // Astral code point; split in surrogate halves
                    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                    codePoint -= 0x10000;
                    highSurrogate = (codePoint >> 10) + 0xD800;
                    lowSurrogate = (codePoint % 0x400) + 0xDC00;
                    codeUnits.push(highSurrogate, lowSurrogate);
                }
                if (index + 1 == length || codeUnits.length > MAX_SIZE) {
                    result += stringFromCharCode.apply(null, codeUnits);
                    codeUnits.length = 0;
                }
            }
            return result;
        };
        if (defineProperty) {
            defineProperty(String, 'fromCodePoint', {
                'value': fromCodePoint,
                'configurable': true,
                'writable': true
            });
        } else {
            String.fromCodePoint = fromCodePoint;
        }
    }());
}