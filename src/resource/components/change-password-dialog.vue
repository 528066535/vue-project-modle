<template>
    <app-form @save="save" :model="postData" class="unit-select"  ref="form">
        <app-formitem label="旧密码" prop="nowpwd" :rules="rules.nowpwd">
            <app-input type="password" v-model="postData.nowpwd" placeholder="请输入" :maxlength="100"></app-input>
        </app-formitem>
        <app-formitem label="新密码" prop="newpwd" :rules="rules.newpwd">
            <app-input type="password" v-model="postData.newpwd" placeholder="请输入" :maxlength="100"></app-input>
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
                postData: {account: Data.getUser(),adminname: Data.getUser(), nowpwd: '', newpwd: ''},
                rules: {
                    nowpwd: validate.required('请填写密码'),
                    newpwd: validate.required('请填写密码'),
                },
            }
        },
        mixins: [page],
        methods: {
            save() {
                this.saveData('/modifyAdminPwd',this.postData).then(res=>{
                    util.logout()
                })
            }
        },
        mounted(){

        },
    };

</script>