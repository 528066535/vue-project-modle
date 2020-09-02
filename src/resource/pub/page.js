/**
 * Created by 周文博 on 2017/3/22.
 * 创建一个Vue路由生成的页面
 */
import util from '@Pub/util';
import http from '@Pub/http';
import dialog from '@Pub/dialog';

export default {
    computed: {

    },
    data(){
        return {

        };
    },

    watch:{
        '$route'(to, from){
            if(to.path === from.path){
                //同一个地址参数变化，刷新当前页isEvaluate面
                window.location.reload();
            }
        }
    },

    methods: {
        saveData(url, postJson, successTip) {
            return new Promise((resolve, reject) => {
                if(url && util.isString(url)){
                    if(this.posting){
                        return false;
                    }
                    if(this.$refs.form){
                        this.$refs.form.verify(() => {
                            this.posting = true;
                            //延迟400ms 提交 防止重复点击提交
                            util.debounce(300).then(() => {
                                http.post(url, postJson).then((d) => {
                                    dialog.success(successTip || d.msg || '操作成功');
                                    resolve(d);
                                    this.dialog && this.dialog.close();
                                    if(this.parent && this.parent.$refs && this.parent.$refs.table){
                                        this.parent.$refs.table.refresh();
                                    }
                                },(error)=>{
                                    if(error.code == -2) {
                                        dialog.close()
                                    }
                                    reject(error);
                                }).catch((d)=>{

                                }).always((res) => {
                                    this.posting = false;
                                });
                            });
                        });
                    }else{
                        dialog.error('请设置提交的表单的 ref="from" !');
                        reject();
                    }
                }else{
                    dialog.error('保存的接口地址不正确!');
                    reject();
                }
            });
        },
    },

    created(){

    },

    mounted(){

    },

    beforeDestroy(){
        for(let key in this.$refs){
            if(this.$refs[key]){
                this.$refs[key].$destroy();
            }
        }
    },

    destroyed(){
        for(let key in this.data){
            this.data[key] = null;
        }
    }
};