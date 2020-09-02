<template>
    <app-form :model="postData" class="unit-select"  ref="form" label-width="120px">
        <app-formitem label="设备数量" prop="devnum" :rules="rules.devnum">
            <app-input v-model="postData.devnum" placeholder="请输入" :maxlength="100"></app-input>
        </app-formitem>
        <app-formitem label="会员类型" prop="type" :rules="rules.type">
            <app-select v-model="postData.type" placeholder="请输入" :local-data="[{name: '普通', value: '0'},{name: '体验', value: '1'}]"></app-select>
        </app-formitem>
        <app-formitem label="运营商" prop="carrierid" :rules="rules.carrierid">
            <app-select v-model="postData.carrierid" placeholder="请输入" :local-data="deviceType" value-name="carrierid" key-name="carriername"></app-select>
        </app-formitem>
        <app-formitem label="赠送会员天数">
            <app-input v-model="postData.vipday" placeholder="请输入" :maxlength="100"></app-input>
        </app-formitem>
        <div slot="after">
            <app-button type="text" @click="close">关闭</app-button>
            <app-button type="primary" size="big" @click="save">保存</app-button>
            <app-button type="primary" size="big" @click="save">保存并导出</app-button>
        </div>
    </app-form>
</template>

<script type="text/ecmascript-6">
    /**
     * Created by 周文博 on 2017/5/12.
     */
    import page from '@Pub/page';
    import validate from '@Pub/validate';
    import http from '@Pub/http';
    import Data from '@Core/data'
    import dialog from '@Pub/dialog';

    export default {
        data(){
            return {
                deviceType: [],
                postData: {devnum: '', carrierid: '', vipday: '0', type: ''},
                rules: {
                    devnum: validate.required('请填写'),
                    carrierid: validate.required('请选择'),
                    type: validate.required('请选择'),
                },
            }
        },
        mixins: [page],
        methods: {
            close() {
                this.dialog && this.dialog.close();
            },
            save() {
                this.$refs.form.verify(() => {
                    http.post(`/addDevices`, this.postData).then(res=>{
                        http.get(`/qrZipCreate?adminname=${Data.getUser()}&idmin=${res.startid}&idmax=${res.endid}`).then(res=>{
                            window.open(res.zipurl)
                            if(this.parent && this.parent.$refs && this.parent.$refs.table){
                                this.parent.$refs.table.refresh();
                            }
                            dialog.close()
                        })
                    })
                })
            }
        },
        mounted(){
            http.get('/queryCarriers',{pageNumber: 1,pageSize: 1000}).then((res) => {
                this.deviceType = res.list
            })
        },
    };

</script>