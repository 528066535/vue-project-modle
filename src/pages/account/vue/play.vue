<template>
    <div>
        <app-condition>
            <div slot="toolbar">
                <app-button @click="exportFile" icon="add">导出</app-button>
            </div>
        </app-condition>
        <div class="table-container">
            <app-table ref="table" url="/queryTotalPlayList">
                <el-table-column  show-overflow-tooltip label="用户名称" prop="loginname" align="center"></el-table-column>
                <el-table-column  show-overflow-tooltip label="总时长（分）" prop="total_m" align="center"></el-table-column>
                <el-table-column  show-overflow-tooltip label="本月时长（分）" prop="month_m" align="center"></el-table-column>
                <el-table-column  show-overflow-tooltip label="本周时长（分）" prop="week_m" align="center"></el-table-column>
                <el-table-column  label="操作" align="center">
                    <template slot-scope="scope">
                        <app-button icon="edit" size="mini" @click="edit(scope.row)">详情</app-button>
                    </template>
                </el-table-column>
            </app-table>
        </div>
    </div>
</template>
<script>
    import Dialog from '@Pub/dialog'
    import router from '@Pub/router';
    import Data from '@Core/data';
    import Http from '@Pub/http';

    export default {
        data() {
            return {
                conditions: {
                    carriername: ''
                }
            }
        },
        created() {

        },

        mounted() {

        },

        methods: {
            exportFile() {
                let selections = this.$refs.table.getSelection()
                // if(!selections.length) {
                //     return Dialog.error('请选择要导出的数据')
                // }
                const loading = this.$loading({
                    lock: true,
                    text: '正在导出',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                let query = ''
                if(selections.length) {
                    query  = `type=1&loginnames=${selections.map(data => data.loginname).join(',')}`
                } else {
                    query = `type=0`
                }
                Http.get(`/exportTotalPlayList?${query}`).then(res=>{
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
            search(){
                this.$refs.table.reload(this.conditions);
            },
            add() {
                this.edit()
            },
            edit(row) {
                router.go('/dashboard/account/play-detail', { loginname: row.loginname })
            }
        },
    }

</script>
<style lang="less" scoped rel="stylesheet/less">

</style>
