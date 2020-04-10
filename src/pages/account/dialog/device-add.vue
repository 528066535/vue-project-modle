<template>
    <app-form @save="save" :model="postData" class="unit-select"  ref="form" label-width="150px">
        <app-formitem label="设备数量" prop="devnum" :rules="rules.devnum">
            <app-input type="devnum" v-model="postData.devnum" placeholder="请输入" :maxlength="100"></app-input>
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
                postData: {devnum: ''},
                rules: {
                    devnum: validate.required('请填写'),
                },
            }
        },
        mixins: [page],
        methods: {
            save() {
                this.saveData('/addDevices',this.postData).then(res=>{

                })
            }
        },
        mounted(){

        },
    };

</script>