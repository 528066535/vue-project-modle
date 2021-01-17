<template>
    <app-form @save="save" :model="postData" class="unit-select"  ref="form" label-width="120px">
        <app-formitem label="开始设备ID" prop="idmin" :rules="rules.idmin">
            <app-input v-model="postData.idmin" placeholder="请输入" :maxlength="100"></app-input>
        </app-formitem>
        <app-formitem label="结束设备ID" prop="idmax" :rules="rules.idmax">
            <app-input v-model="postData.idmax" placeholder="请输入" :maxlength="100"></app-input>
        </app-formitem>
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

    export default {
        data(){
            return {
                deviceType: [],
                postData: {idmin: '', idmax: ''},
                rules: {
                    idmin: validate.required('请填写'),
                    idmax: validate.required('请选择'),
                },
            }
        },
        mixins: [page],
        methods: {
            save() {
                this.$refs.form.verify(() => {
                    const loading = this.$loading({
                        lock: true,
                        text: '正在导出',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    http.get(`/qrZipCreate?adminname=${Data.getUser()}&idmin=${this.postData.idmin}&idmax=${this.postData.idmax}`).then(res=>{
                        window.open(res.zipurl)
                        loading.close();
                    }).catch(error=> {
                        loading.close();
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
