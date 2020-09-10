/**
 * Created by 周文博 on 2017/2/9.
 */

export default {

    /**
     * 弹出成功样式的提示框
     * @param text
     */
    success(text) {
        dialogVm.$message({
            type: 'success',
            showClose: true,
            duration: 3000,
            message: text || ''
        });
    },

    /**
     * 弹出错误样式的提示框
     * @param text
     */
    error(text) {
        dialogVm.$message({
            type: 'error',
            duration: 3000,
            message: text || ''
        });
    },

    /**
     * 确认弹出框(一个按钮)
     * @param text
     * @param title
     */
    alert(text, title) {
        return this.confirm(text, title, true);
    },

    /**
     * 确认弹出框(二个按钮)
     * @param text
     * @param title
     * @param hideCancelBtn
     */
    confirm(text, title, hideCancelBtn, isLeft) {
        return new Promise((resolve, reject) => {
            text = `<div style="text-align:${isLeft?'left':'center'}">${text}</div>`
            dialogVm.$confirm(text, title || '提示', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定',
                confirmButtonClass: 'el-button--big',
                cancelButtonText: '取消',
                cancelButtonClass: 'el-button--big el-button--text',
                type: 'warning',
                // center:true,
                closeOnClickModal: false,
                showCancelButton: !hideCancelBtn
            }).then(() => {
                resolve();
            }).catch(() => {});
        });
    },

    //打开弹框
    open(component, data, param){
        param = $.extend({
            width: 520, //弹框宽度
            title: '详情', //弹框标题
            parent: null, //弹框所在的父Vue实例，如需在弹框操作父组件的数据方法，传此参数
            style: '' //弹框主题, 暂时只有一个默认的 和一个 头部是蓝色背景的（blue-header）
        }, param || {});

        data = data || {};
        if(Object.prototype.toString.call(data) === '[object MouseEvent]'){
            data = {};
        }

        if(!dialogVm.title){
            dialogVm.width = param.width;
            dialogVm.title = param.title;
            dialogVm.style = param.style;

            dialogVm.$refs.dialogDetail.open(component, data, param.parent);
        }else{
            dialogVm.subWidth = param.width;
            dialogVm.subTitle = param.title;

            dialogVm.$refs.dialogSubDetail.open(component, data, param.parent);
        }
    },

    //关闭弹框
    close(closeAll){
        if(closeAll){
            if(dialogVm.subTitle){
                dialogVm.$refs.dialogSubDetail.close();
            }

            if(dialogVm.title){
                dialogVm.$refs.dialogDetail.close();
            }
        }else{
            if(dialogVm.subTitle){
                dialogVm.$refs.dialogSubDetail.close();
            }else{
                dialogVm.$refs.dialogDetail.close();
            }
        }
    },

    //关闭全部弹框
    closeAll(){
        this.close(true);
    },

    //更新弹框位置，滚动条
    update(){
        if(dialogVm.subTitle){
            dialogVm.$refs.dialogSubDetail.update();
        }else{
            dialogVm.$refs.dialogDetail.update();
        }
    }
};