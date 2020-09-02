<template>
    <div class="uploader">
        <el-upload :action="PROXY_URL + action" :headers="headers"
                   ref="upload"
                   :class="{'image-uploader': type==='image', 'is-disabled':disabled}"
                   :on-progress="onProgress"
                   :on-error="onError"
                   :on-success="onSuccess"
                   :on-remove="onRemove"
                   :before-remove="beforeRemove"
                   :limit="calLimit"
                   :file-list="fileList"
                   :before-upload="beforeUpload"
                   :on-preview="onPreview"
                   :show-file-list="type==='button'"
                   :data="params"
                   :auto-upload="autoUpload"
                   :on-change="onChange"
        >
            <app-button v-if="type==='button'" :disabled="disabled || nativeDisabled" :loading="loading" :type="buttonType">{{text}}</app-button>
            <template v-if="type==='image'">
                <img v-show="isShowImg && image[fileName]" :src="image[filePathName]" class="image" />
                <i class="el-icon-plus image-uploader-icon"></i>
            </template>

            <template v-if="type === 'input'">
                <app-input :readonly="true" v-model="image[fileName]" style="width: 200px;"></app-input>
                <app-button :disabled="disabled" :loading="loading" :type="buttonType">{{text}}</app-button>
            </template>

            <div v-if="tip" slot="tip" class="el-upload__tip">{{tip}}</div>

        </el-upload>
        <div class="uploader-mask" v-if="(disabled || nativeDisabled || loading) && type === 'button'"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    /**
     * Created by 周文博 on 2017/4/27.
     */
    import Data from '@Core/data';
    import dialog from '@Pub/dialog';
    import util from '@Pub/util';
    import http from '@Pub/http';
    import config from '@Core/config';

    export default {
        props: {
            value: [Array,Object],

            //按钮文本
            text: {
                type: String,
                default: '选择文件'
            },

            //提示文字
            tip: {
                type: String,
                default: ''
            },

            //上传附带的参数
            param: {
                type: Object,
                default: () => {
                    return {};
                }
            },

            //服务器的下载地址
            filePathName: {
                type: String,
                default: 'url'
            },

            //服务器的文件名称
            fileName: {
                type: String,
                default: 'url'
            },

            //是否手动上传
            autoUpload: {
                type: Boolean,
                default: true
            },

            //按钮类型
            buttonType: {
                type: String,
                default: ''
            },

            //不可点击
            disabled: {
                type: Boolean,
                default: false
            },

            //最大上传数量
            limit: {
                type: Number,
                default: 1
            },

            //最大可上传文件的大小，如500M、500K
            max: String,

            //上传类型:button,image,input
            type: {
                type: String,
                default: 'button'
            },

            //允许的格式
            accept: String,

            //上传地址
            action: {
                type: String,
                default: '/file/upload'
            },

            errorShow: {
                type: Boolean,
                default: true
            }
        },

        data(){
            return {
                nativeValue: [],
                loading: false,

                PROXY_URL: config.PROXY_URL,

                isObject: true,
                isShowImg: false
            }
        },

        computed: {
            params() {
                let params = Object.assign({token: Data.getToken()},this.param)
                params.tokenname = Data.getUser();
                return params
            },
            calLimit(){
                if (this.type === 'button' && !this.isObject) {
                    return this.limit;
                }
                else {
                    return null;
                }
            },
            headers(){
                return {
                    Token: Data.getToken()
                };
            },

            fileList(){
                return this.displayValue.map(d => {
                    if(d[this.fileName] && d[this.fileName].indexOf && d[this.fileName].indexOf('B)') < 0){
                        d.name = `${d[this.fileName]}${d.size?`(${this.bytesToSize(d.size)})`:''}`;
                    }
                    d.url = d[this.filePathName];
                    return d;
                });
            },

            image(){
                this.imgChange();

                if(this.isObject){
                    return this.nativeValue;
                }else{
                    const item = {};
                    item[this.fileName] = '';
                    item[this.filePathName] = '';
                    return this.nativeValue[0] || {}
                }
            },


            displayValue(){
                if(this.isObject){
                    if(this.nativeValue&&(this.nativeValue[this.fileName]||this.nativeValue[this.filePathName])){
                        if(!this.nativeValue[this.fileName]) {
                            this.nativeValue[this.fileName] = this.nativeValue[this.filePathName];
                        }
                        return [this.nativeValue];
                    }else{
                        return [];
                    }
                }else if(this.nativeValue){
                    return this.nativeValue
                }
                else {
                    return [];
                }
            },

            nativeDisabled(){
                return this.fileList.length >= this.limit;
            }
        },

        watch: {
            nativeValue(v){
                this.$emit('input', v);
            },

            value(v){
                this.nativeValue = v;
            }
        },

        methods: {
            imgChange(){
                setTimeout(()=>{
                    if(this.type == 'image') {
                        const image = new Image();

                        image.onload = ()=> {
                            this.isShowImg = true;
                        };

                        image.onerror = ()=> {
                            this.isShowImg = false;
                        };

                        if(this.image[this.filePathName]) {
                            image.src = this.image[this.filePathName];
                        }
                    }
                })
            },

            upload() {
                this.$refs.upload.submit();
            },

            onProgress(){
                this.loading = true;
                this.$emit('progress');
            },

            onError(data){
                this.loading = false;
                let message = data.message;
                try {
                    message = $.parseJSON(message);
                }catch (e) {
                    message = {msg: '上传失败'};
                }
                if(this.errorShow) {
                    dialog.error(message.msg);
                }
                this.nativeValue = {};
                this.$emit('error',message);
            },

            onChange(file){
                if(!this.autoUpload){
                    if(this.beforeUpload(file.raw) && file.status !== 'fail'){
                        let item = file;
                        item[this.fileName] = file.name;
                        item[this.filePathName] = file.url;
                        item.size = file.size;
                        this.nativeValue = item;
                    }else{
                        this.nativeValue = {};
                    }
                }
            },

            onSuccess(e, file, fileList){
                if(file.response.status === 0){
                    if(this.errorShow){
                        dialog.error(file.response.msg);
                    }
                    this.nativeValue = {};
                    this.loading = false;
                    this.$emit('error',file.response);
                }else{
                    if(this.isObject) {
                        if(util.isArray(file.response)) {
                            this.nativeValue = file.response[0];
                        }
                        else {
                            this.nativeValue = file.response;
                        }
                    }
                    else {
                        if(util.isArray(file.response)) {
                            this.nativeValue.concat(file.response);
                        }
                        else {
                            this.nativeValue.push(file.response);
                        }
                    }

                    this.loading = false;
                    Vue.nextTick(()=>{
                        this.$emit('success',this.nativeValue,file.response);
                    });
                }
            },

            onRemove(file){
                let index = this.fileList.indexOf(file);
                if(this.isObject){
                    if(file.status === 'success'){
                        let file = {};
                        file[this.fileName] = '';
                        file[this.filePathName] = '';
                        this.nativeValue = file;

                    }else{
                        this.nativeValue = {};
                    }
                }else{
                    this.nativeValue.splice(index, 1);
                }
                this.$emit('remove')
            },

            promiseDel(){
                return new Promise((resolve, reject)=> {
                    if(!this.nativeValue[this.filePathName]) {
                        return resolve(true);
                    }
                    http.delete(`/file/delete?filePath=${this.nativeValue[this.filePathName]}`).then((res)=>{
                        if(res) {
                            resolve(res);
                        }
                        else {
                            dialog.error('删除失败');
                            reject(res);
                        }
                    })
                }).catch(()=>{
                    dialog.error('删除失败');
                    reject(false);
                });
            },

            beforeRemove(){
                this.$emit('del-file');
                this.loading = false
                // return this.promiseDel().then((res)=>{
                //
                // });
            },

            //点击文件
            onPreview(file){
                this.$emit('preview', file);
            },

            beforeUpload(file){
                let isUsefulSize = true;
                let isUsefulType = true;
                if (this.max) {
                    if (this.countFileSize(this.max) < file.size) {
                        dialog.error(`最大支持上传${this.max}`);
                        isUsefulSize = false;
                    }
                }

                isUsefulType = this.validateFile(file);

                return isUsefulType && isUsefulSize;
            },

            countFileSize(fileSize){
                fileSize = fileSize.toLowerCase();
                if (fileSize.indexOf('m') >= 0) {
                    return fileSize.replace('m', '') * 1024 * 1024;
                } else if (fileSize.indexOf('k') >= 0) {
                    return fileSize.replace('k', '') * 1024;
                }
            },

            bytesToSize(bytes) {
                if (bytes === 0) {return '0 B';}
                let k = 1024;
                let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                let i = Math.floor(Math.log(bytes) / Math.log(k));
                return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
            },

            validateFile(file){
                let type = file.name.split('.');
                type = '.'+type[type.length-1];
                const elType = this.accept;
                if (!elType) {
                    return true;
                } else {
                    if(elType.indexOf(type) >= 0){
                        return true;
                    }else{
                        dialog.error('文件格式不支持');
                        return false
                    }
                }
            },
        },

        created(){
            this.isObject = this.value?util.isObject(this.value):true;
            this.nativeValue = this.value;
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    @import "../style/trans";

    .image-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .image-uploader .image {
        width: 100%;
    }

    .image-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .image-uploader .el-upload {
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }

    .el-upload__tip{
        display: inline-block;
        margin-left: 10px;
        color: #999;
        margin-top: 0;
    }

    .el-upload-list{
        .el-upload-list__item{
            background: #e9ecf1;
            border-radius: 0;
            margin-top: 5px;
            outline: none;
            padding: 0 10px;
            line-height: 2.2;
            .transition(none);
            .box();

            .el-upload-list__item-name{
                .el-icon-document{
                    display: inline-block;
                    width: 14px;
                    height: 13px;
                    vertical-align: middle;
                    background: data-uri('../pub/image/icon-file.png') center no-repeat;
                    &:before{display: none;}
                }
                color: #4f4f4f;
                font-size: 12px;
                margin-right: 20px;
            }

            .el-icon-close-tip{display: none !important;}

            .el-progress{
                width: auto;
                position: static;
                .box-flex(1);
                margin-right: 30px;
                line-height: 1.9;
                .el-progress-bar__outer{
                    border: 1px solid #d9e2ea;
                    height: 10px !important;
                    background: #fff;
                    border-radius: 0;

                    .el-progress-bar__inner{
                        border-radius: 0;
                        background: #9facbe;
                        width: 0;
                        height: 10px !important;
                        transition: all .4s ease;
                    }
                }

                .el-progress__text{
                    display: none;
                }
            }
        }

        .el-upload-list__item.is-success .el-upload-list__item-status-label{display: none;}
        .el-icon-close{
            top: 50%;
            margin-top: -7.5px;
            display: block;
            &:before{
                content: '删除';
                cursor: pointer;
                text-decoration: underline;
                color: #4d99f4;
                font-size: 12px;
            }
        }
    }

    .uploader{
        position: relative;
        .uploader-mask{
            cursor: not-allowed;
            background: transparent;
            position: absolute;
            height: 32px;
            width: 100%;
            top: 6px;
        }
    }

    .uploader{
        .is-disabled{
            .el-icon-close,.el-icon-upload-success {display: none !important;}
        }
    }
</style>