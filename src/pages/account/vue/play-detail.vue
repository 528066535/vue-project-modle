<template>
    <div>
        <div class="breadcrumb-holder">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/dashboard/account/play' }">播放时长</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <app-condition>
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
            <app-table ref="table" url="/queryHostoryPlayList" :param="getParams()">
                <el-table-column  show-overflow-tooltip label="用户" prop="loginname" align="center"></el-table-column>
                <el-table-column  show-overflow-tooltip label="播放时长" prop="playtimes" align="center"></el-table-column>
                <el-table-column  show-overflow-tooltip label="播放日期" prop="serverdate" align="center"></el-table-column>
                <!--<el-table-column  label="操作" align="center">-->
                    <!--<template slot-scope="scope">-->
                        <!--<app-button icon="edit" size="mini" @click="edit(scope.row)">编辑</app-button>-->
                        <!--<app-button icon="edit" size="mini" @click="delRow(scope.row)">删除</app-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </app-table>
        </div>
    </div>
</template>
<script>
    import Dialog from '@Pub/dialog'
    import router from '@Pub/router';
    import Http from '@Pub/http';
    import filter from '@Pub/filter';
    import Data from '@Core/data';

    export default {
        data() {
            let star = new Date((new Date()).setMonth((new Date()).getMonth()-1))
            return {
                conditions: {
                    time: [star, new Date()]
                }
            }
        },
        created() {

        },

        mounted() {

        },

        methods: {
            exportAll() {
                const loading = this.$loading({
                    lock: true,
                    text: '正在导出',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                let query = `loginname=${router.param.loginname}&startDay=${this.conditions.time[0] ? filter.date(this.conditions.time[0], 'yyyyMMdd') : ''}&endDay=${this.conditions.time[1] ? filter.date(this.conditions.time[1], 'yyyyMMdd') : ''}`
                Http.get(`/exportHostoryPlayList?${query}`).then(res=>{
                    console.log('要下载了')
                    console.log(res)
                    window.open(res.zipurl)
                    loading.close();
                }).catch(error=>{
                    loading.close();
                })
            },
            delRow(row){
                this.$refs.table.delSelectedSinglelistByMethods('/deletePoint', {pid: row.pid})
            },
            getParams() {
                return {
                    loginname: router.param.loginname,
                    startDay: this.conditions.time[0] ? filter.date(this.conditions.time[0], 'yyyyMMdd') : '',
                    endDay: this.conditions.time[1] ? filter.date(this.conditions.time[1], 'yyyyMMdd') : ''
                }
            },
            search(){
                this.$refs.table.reload(this.getParams());
            },
            add() {
                this.edit()
            },
            edit(row) {
                import(/* webpackChunkName: "pages/account/place" */'../dialog/place').then(component => {
                    Dialog.open(component, row, {
                        title: row ? '编辑' : '新增',
                        width: 900,
                        parent: this
                    });
                });
            }
        },
    }

</script>
<style lang="less" scoped rel="stylesheet/less">

</style>
