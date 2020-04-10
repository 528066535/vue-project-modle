/**
 * Created by 周文博 on 2017/1/16.
 * 浏览器cookie
 */
import util from './util';
import store from '../third/store.min';

export default {
    /**
     * 根据传入的key获取指定的内容
     * @param key
     */
    get(key){
        let result = store.get(key) || '';
        try {
            result = $.parseJSON(result);
        }catch (e){}
        return result;
    },

    /**
     * 设置本地缓存内容
     * @param key 内容保存时用的键值
     * @param value 要保存的内容
     */
    set(key, value){
        if(!util.isString(value) && !util.isNumber(value)){
            value = JSON.stringify(value);
        }
        store.set(key, value);
    },

    remove(key){
        store.remove(key);
    }
}