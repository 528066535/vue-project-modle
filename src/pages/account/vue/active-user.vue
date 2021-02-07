<template>
    <div>
        <app-condition>
            <app-formitem label="账号">
                <app-input @keyup="search" v-model="conditions.queryname"></app-input>
            </app-formitem>
            <app-formitem label="时间">
                <app-input :clear-able="false" type="daterange" @keyup="search" v-model="conditions.time"></app-input>
            </app-formitem>
            <app-formitem>
                <app-button type="primary" @click="search">搜索</app-button>
            </app-formitem>
            <div slot="toolbar">
                <app-button @click="exportAll" icon="export">导出</app-button>
            </div>
        </app-condition>
        <div class="table-container">
            <app-table ref="table" :url="api" :param="getParams()">
                <el-table-column label="账号" prop="loginname" align="center"></el-table-column>
                <el-table-column label="昵称" prop="nickname" align="center"></el-table-column>
                <el-table-column label="邮箱" prop="email" align="center"></el-table-column>
                <el-table-column label="城市" prop="addrcity" align="center"></el-table-column>
                <el-table-column label="年龄" prop="age" align="center"></el-table-column>
                <el-table-column label="地址" prop="addrcity" align="center"></el-table-column>
                <el-table-column label="注册日期" prop="createtime" align="center"></el-table-column>
                <el-table-column label="激活日期" prop="activetime" align="center"></el-table-column>
                <el-table-column label="vip到期日期" prop="vipexpdate" align="center"></el-table-column>
                <el-table-column label="活跃天数" prop="activedays" align="center"></el-table-column>
            </app-table>
        </div>
    </div>
</template>

<script>
    import Dialog from '@Pub/dialog';
    import Data from '@Core/data';
    import Http from '@Pub/http';
    import filter from '@Pub/filter';

    export default {
        data() {
            let star = new Date((new Date()).setMonth((new Date()).getMonth()-1))
            return {
                conditions: {
                    queryname: '',
                    time: [star, new Date()]
                }
            }
        },
        computed: {
            api() {
                return '/queryActiveList'
            }
        },
        created() {

        },

        mounted() {
        },

        methods:{
            exportAll() {
                const loading = this.$loading({
                    lock: true,
                    text: '正在导出',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                let query = `adminname=${Data.getUser()}&startDay=${this.conditions.time[0] ? filter.date(this.conditions.time[0], 'yyyyMMdd') : ''}&endDay=${this.conditions.time[1] ? filter.date(this.conditions.time[1], 'yyyyMMdd') : ''}`
                Http.get(`/exportActiveList?${query}`).then(res=>{
                    console.log('要下载了')
                    console.log(res)
                    window.open(res.zipurl)
                    loading.close();
                }).catch(error=>{
                    loading.close();
                })
            },
            getParams() {
                return {
                    queryname: this.conditions.queryname,
                    startDay: this.conditions.time[0] ? filter.date(this.conditions.time[0], 'yyyyMMdd') : '',
                    endDay: this.conditions.time[1] ? filter.date(this.conditions.time[1], 'yyyyMMdd') : ''
                }
            },
            search(){
                this.$refs.table.reload(this.getParams());
            },
            setTime(row){
                import(/* webpackChunkName: "pages/account/dialog/user-time" */'../dialog/user-time').then(component => {
                    Dialog.open(component, row, {
                        title: '修改有效期',
                        width: 400,
                        parent: this
                    });
                });
            },
            add() {},
            edit(row) {
                Dialog.confirm('重置密码后,默认密码为123456,是否需要重置密码？','提示').then(()=>{
                    Http.post('/resetUserPwd', {loginname: row.loginname}).then(res=>{
                        Dialog.success('重置成功');
                        this.search()
                    })
                })
            }
        },
    }

</script>
<style lang="less" scoped rel="stylesheet/less">

</style>
