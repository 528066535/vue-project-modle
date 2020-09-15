/**
 * Created by 蒋鑫强 on 2017/1/17.
 * 表单验证
 */
import http from './http';

export default {
    //必填校验
    required(errMsg){
        return {required: true, message: errMsg || '请输入内容!'};
    },

    //邮箱校验
    get email(){
        return {type: 'email', message: '邮箱格式错误!'}
    },

    //url
    get url(){
        return {type: 'url', message: 'url格式错误!'}
    },

    //数字 大于等于0
    get integer(){
        return doValidate(/^(0|[1-9][0-9]*)$/, '请输入整数!'); ///^\d+$/
    },

    //数字
    get number(){
        return doValidate(/^[+-]?\d*\.?\d*$/, '请输入数字!'); ///^\d+$/
    },

    //正数
    get positiveInteger(){
        return doValidate(/^[1-9][0-9]*$/, '请输入正整数!');
    },

    //移动电话
    get mobile(){
        return doValidate(/^1[0-9]{10}$/, '手机号格式错误!');
    },

    //座机
    get call(){
        return doValidate(/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/, '电话格式错误!');
    },

    //ip
    get ip(){
        return doValidate(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/, 'IP地址格式错误!');
    },

    //mac
    get mac(){
        return doValidate(/^([0-9a-fA-F]{2})(([/\s:-][0-9a-fA-F]{2}){5})$/, 'mac地址格式错误!');
    },

    //端口
    get port(){
        return doValidate(/^(0|[1-9]\d{0,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])(-([1-9]\d{0,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))?$/);
    },

    /**
     * 校验正整数
     */
    get positiveNumber(){
        return doValidate(/^[0-9]+([.]{1}[0-9]+){0,1}$/, '请输入正数!');
    },

    //自定义
    custom(validator){
        return { validator: validator};
    },

    checkByUrl(postUrl, postJson, callback){
        http.getSilent(postUrl, postJson).done(function (data) {
            callback();
        }).fail(function (data) {
            callback(new Error(data.msg));
        });
    }
}

function doValidate(regx, message) {
    return {validator: (rule, value, callback) => {
        if(value !== ''){
            if(regx.test(value+'')){
                callback();
            }else{
                callback(new Error(message || '格式不正确!'));
            }
        }else{
            callback();
        }
    }};
}