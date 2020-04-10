<template>
    <app-form @save="save" :model="postData" class="unit-select"  ref="form" label-width="150px">
        <app-formitem label="套餐名称" prop="pname" :rules="rules.pname">
            <app-input v-model="postData.pname" placeholder="请输入" :maxlength="100"></app-input>
        </app-formitem>
        <app-formitem label="实付价格" prop="realamount" :rules="rules.realamount">
            <app-input type="number" v-model="postData.realamount" placeholder="请输入"></app-input>
        </app-formitem>
        <app-formitem label="原价" prop="oriamount" :rules="rules.oriamount">
            <app-input type="number" v-model="postData.oriamount" placeholder="请输入"></app-input>
        </app-formitem>
        <app-formitem label="套餐有效天数" prop="expdays" :rules="rules.expdays">
            <app-input type="number" v-model="postData.expdays" placeholder="请输入"></app-input>
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
                postData: {pname: '', realamount: '', oriamount: '', expdays: ''},
                rules: {
                    pname: validate.required('请填写'),
                    realamount: validate.required('请填写'),
                    oriamount: validate.required('请填写'),
                    expdays: validate.required('请填写'),
                },
            }
        },
        mixins: [page],
        methods: {
            save() {
                this.saveData('/addVipMenu',this.postData).then(res=>{

                })
            }
        },
        mounted(){

        },
    };

</script>