<template>
    <app-form @save="save" :model="postData" class="unit-select"  ref="form" label-width="150px">
        <app-formitem label="运营商名称" prop="carriername" :rules="rules.carriername">
            <app-input type="text" v-model="postData.carriername" placeholder="请输入" :maxlength="100"></app-input>
        </app-formitem>
        <app-formitem label="运营商登录账号" prop="adminname" :rules="rules.adminname">
            <app-input type="text" v-model="postData.adminname" placeholder="请输入" :maxlength="100"></app-input>
        </app-formitem>
        <app-formitem label="新密码" prop="adminpwd" :rules="rules.adminpwd">
            <app-input type="password" v-model="postData.adminpwd" placeholder="请输入" :maxlength="100"></app-input>
        </app-formitem>
    </app-form>
</template>

<script type="text/ecmascript-6">
    /**
     * Created by 周文博 on 2017/5/12.
     */
    import page from '@Pub/page';
    import validate from '@Pub/validate';
    import util from '@Pub/util';
    import Data from '@Core/data';

    export default {
        data(){
            return {
                postData: {carriername: '',adminpwd: '', adminname: ''},
                rules: {
                    carriername: validate.required('请填写'),
                    adminpwd: validate.required('请填写'),
                    adminname: validate.required('请填写'),
                },
            }
        },
        mixins: [page],
        methods: {
            save() {
                this.saveData('/addCarrier',this.postData).then(res=>{

                })
            }
        },
        mounted(){

        },
    };

</script>