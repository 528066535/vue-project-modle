/**
 * Created by 周文博 on 2017/1/17.
 * 绑定全局事件
 */
let globalVm = null;

function getVm() {
    if(!globalVm){
        globalVm = new Vue();
    }
    return globalVm;
}

export default {
    /**
     * 绑定监听事件
     * @param name 事件名称
     * @param callback 事件回调方法
     */
    on(name, callback) {
        let vm = getVm();
        vm.$on(name, callback);
    },

    /**
     * 触发事件
     * @param name 事件名称
     * @param data 传递的参数
     */
    trigger(name, data, dataOther) {
        let vm = getVm();
        vm.$emit(name, data, dataOther);
    },

    /**
     * 移除事件
     * @param name
     * @param callback
     */
    off(name, callback) {
        let vm = getVm();
        if(name){
            vm.$off(name, callback);
        }else{
            vm.$off();
        }
    },

    /**
     * 只触发一次的事件
     * @param name
     * @param callback
     */
    once(name, callback) {
        let vm = getVm();
        vm.$once(name, callback);
    }
};