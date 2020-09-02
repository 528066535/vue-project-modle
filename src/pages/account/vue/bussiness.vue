<template>
    <div>
        <app-condition>
            <app-formitem label="名称">
                <app-input @keyup="search" v-model="conditions.carriername"></app-input>
            </app-formitem>
            <app-formitem>
                <app-button type="primary" @click="search">搜索</app-button>
            </app-formitem>
            <div slot="toolbar">
                <app-button @click="add" icon="add">新增</app-button>
            </div>
        </app-condition>
        <div class="table-container">
            <app-table ref="table" url="/queryCarriers">
                <el-table-column label="运营商名称" prop="carriername" align="center"></el-table-column>
                <el-table-column label="等级" prop="carrierlv" align="center"></el-table-column>
                <el-table-column  label="操作" align="center">
                    <template slot-scope="scope">
                        <app-button icon="edit" size="mini" @click="del(scope.row)">删除</app-button>
                        <app-button icon="edit" size="mini" @click="confirmPassword(scope.row)">重置密码</app-button>
                        <app-button icon="edit" size="mini" @click="edit(scope.row)">编辑</app-button>
                    </template>
                </el-table-column>
            </app-table>
        </div>
    </div>
</template>
<script>
    import Dialog from '@Pub/dialog'
    import http from '@Pub/http'
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
            confirmPassword(row) {
                Dialog.confirm('是否要重置密码？').then(() => {
                    row.newadminpwd = '123456'
                    http.post('/modifyCarrier', row).then(res=>{
                        this.search()
                    })
                })
            },
            del(row){
                this.$refs.table.delSelectedSinglelistByMethods('/deleteCarrier', {carrierid: row.carrierid})
            },
            search(){
                this.$refs.table.reload(this.conditions);
            },
            add() {
                import(/* webpackChunkName: "pages/account/change-password-dialog" */'../dialog/bussiness-add').then(component => {
                    Dialog.open(component, {}, {
                        title: '新增运营商',
                        width: 600,
                        parent: this
                    });
                });
            },
            edit(row) {
                import(/* webpackChunkName: "pages/account/change-password-dialog" */'../dialog/bussiness-add').then(component => {
                    Dialog.open(component, row, {
                        title: '编辑运营商',
                        width: 600,
                        parent: this
                    });
                });
            }
        },
    }

</script>
<style lang="less" scoped rel="stylesheet/less">

</style>