<template>
    <app-form @save="save" :model="postData" class="unit-select"  ref="form" label-width="150px">
        <app-formitem label="图片名称" prop="imgname" :rules="rules.imgname">
            <app-input type="devnum" v-model="postData.imgname" placeholder="请输入" :maxlength="100"></app-input>
        </app-formitem>
        <app-formitem label="图片名称" prop="pfile" :rules="rules.pfile">
            <app-file-input tip="只支持文件格式" v-model="file" action="/uploadFile" accept=".gif|.jpeg|.png|.jpg|.bmp">
                <app-button>上传附件</app-button>
            </app-file-input>
        </app-formitem>
    </app-form>
</template>

<script type="text/ecmascript-6">
    /**
     * Created by 周文博 on 2017/5/12.
     */
    import page from '@Pub/page';
    import validate from '@Pub/validate';

    export default {
        data(){
            return {
                file: {},
                postData: {imgname: '', pfile: ''},
                rules: {
                    imgname: validate.required('请填写'),
                    pfile: validate.required('请选择'),
                },
            }
        },
        mixins: [page],
        watch: {
            file: {
                handler: function(file) {
                    this.postData.pfile = file.url
                },
                deep: true
            },
        },
        methods: {
            save() {
                this.saveData('/uploadLoopImg',this.postData).then(res=>{

                })
            }
        },
        mounted(){

        },
    };

</script>