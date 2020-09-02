<template>
    <app-form :model="postData" class="unit-select"  ref="form" label-width="100px">
        <app-formitem label="到期时间" prop="time" :rules="rules.time">
            <app-input v-model="postData.time" placeholder="请选择" type="date"></app-input>
        </app-formitem>
        <div slot="after">
            <app-button type="text" @click="close">关闭</app-button>
            <app-button type="primary" size="big" @click="save">保存</app-button>
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
    import filter from '@Pub/filter';

    export default {
        data(){
            return {
                postData: {time: ''},
                rules: {
                    time: validate.required('请填写'),
                },
            }
        },
        mixins: [page],
        methods: {
            close() {
                this.dialog && this.dialog.close();
            },
            save() {
                console.log(this.data)
                this.saveData('/modifyUserVipdate', {loginname: this.data.loginname, newvipdate: filter.date(this.postData.time, 'yyyyMMdd')})
            }
        },
        mounted(){
            http.get('/queryCarriers',{pageNumber: 1,pageSize: 1000}).then((res) => {
                this.deviceType = res.list
            })
        },
    };

</script>