<template>
    <app-form @save="save" :model="postData" class="unit-select" ref="form" label-width="110px">
        <app-formitem label="视频名称" prop="vname" :rules="rules.vname">
            <app-input :disabled="data.row.sid" v-model="postData.vname" placeholder="请输入" style="width: 200px"></app-input>
        </app-formitem>
        <app-formitem label="是否处理过" prop="isreal" :rules="rules.isreal">
            <el-radio-group v-model="postData.isreal">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
            </el-radio-group>
        </app-formitem>
        <app-formitem label="当前集数" prop="ordernum" :rules="rules.ordernum">
            <app-input type="number" v-model="postData.ordernum" placeholder="请输入" style="width: 200px"></app-input>
        </app-formitem>
        <!--<app-formitem label="缩略图" prop="filep" :rules="rules.filep">-->
            <!--<app-file-input tip="只支持文件格式" v-model="filep" action="/uploadFile" accept=".gif|.jpeg|.png|.jpg|.bmp">-->
                <!--<app-button>上传附件</app-button>-->
            <!--</app-file-input>-->
        <!--</app-formitem>-->
        <app-formitem label="视频上传" prop="filev" :rules="rules.filev">
            <app-file-input tip="只支持视频文件格式" v-model="filev" action="/uploadFile" accept=".mp4|.wmv|.avi|.dat|.asf|.mpeg|.mpg|.rm|.rmvb|.ram|.flv|.mp4|.3gp|.mov|.divx|.dv|.vob|.mkv|.flc|.f4v|.m4v|.swf|.webm">
                <app-button>点击上传</app-button>
            </app-file-input>
        </app-formitem>
    </app-form>
</template>

<script type="text/ecmascript-6">
    /**
     * Created by 周文博 on 2017/5/12.
     */
    import page from '@Pub/page';
    import Http from '@Pub/http';
    import validate from '@Pub/validate';

    export default {
        data(){
            return {
                postData: {
                    vname: '',
                    ordernum: '',
                    isreal: '',
                    filep: '',
                    filev: ''
                },
                rules: {
                    vname: validate.required('请填写'),
                    ordernum: validate.required('请输入'),
                    tsid: validate.required('请填写'),
                    isreal: validate.required('请选择'),
                    filep: validate.required('请选择'),
                    filev: validate.required('请选择'),
                },
                tsid: [],
                options: [],
                filev: { url: '' },
                filep: { url: '' },
                subVideo: true
            }
        },
        watch:{
            filev: {
                handler: function(file) {
                    this.postData.filev = file.url
                    this.postData.vurl = file.url
                },
                deep: true
            },
            filep: {
                handler: function(file) {
                    this.postData.filep = file.url
                    this.postData.vimg = file.url
                },
                deep: true
            },
        },
        mixins: [page],
        methods: {
            save() {
                let url = ''
                if(this.data.row.sid) {
                    url = '/modifyVideo'
                }
                else {
                    url = '/uploadVideoSub'
                }
                this.saveData(url, this.postData).then(res=>{

                })
            }
        },
        mounted(){
            if (this.data.row.sid) {
                this.postData = this.data.row
                this.postData.vid = this.data.row.sid
                this.postData.vname = this.data.row.sname
                this.filep.url = ''
                this.filev.url = this.data.row.surl
            }
            this.postData.belongid = this.data.parentRow.vid
            delete this.postData.adminname
        },
    };

</script>
<style lang="less" scoped rel="stylesheet/less">
.bm-view {
    height: 100%;
    width: 100%;
    .map {
        height: 400px;
    }
}
</style>