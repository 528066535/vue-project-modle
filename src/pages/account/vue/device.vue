<template>
    <div>
        <app-condition>
            <app-formitem label="设备id">
                <app-input @keyup="search" v-model="conditions.devid"></app-input>
            </app-formitem>
            <app-formitem>
                <app-button type="primary" @click="search">搜索</app-button>
            </app-formitem>
            <div slot="toolbar">
                <app-button @click="add" icon="add">新增</app-button>
            </div>
        </app-condition>
        <div class="table-container">
            <app-table ref="table" url="/queryDevices" :multi-select="false">
                <el-table-column label="设备ID" width="100" prop="devid" align="center"></el-table-column>
                <el-table-column label="登录名称" prop="loginname" align="center"></el-table-column>
                <el-table-column label="激活时间" prop="activetime" align="center">
                    <template slot-scope="scope">
                        {{scope.row.activetime | date('yyyy-MM-dd hh:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column label="所属运营商名称" prop="carriername" align="center"></el-table-column>
                <el-table-column  label="操作" align="center" width="240">
                    <template slot-scope="scope">
                        <app-button icon="edit" size="mini" @click="setBusiness(scope.row)">设置运营商</app-button>
                        <app-button icon="remove" size="mini" @click="del(scope.row)">删除</app-button>
                    </template>
                </el-table-column>
            </app-table>
        </div>
    </div>
</template>
<script>
    import Dialog from '@Pub/dialog'
    export default {
        data() {
            return {
                conditions: {
                    devid: ''
                }
            }
        },
        created() {

        },

        mounted() {

        },

        methods: {
            del(row){
                this.$refs.table.delSelectedSinglelistByMethods('/deleteDevice', row)
            },
            search(){
                this.$refs.table.reload(this.conditions);
            },
            add() {
                import(/* webpackChunkName: "pages/account/change-password-dialog" */'../dialog/device-add').then(component => {
                    Dialog.open(component, {}, {
                        title: '新增设备',
                        width: 600,
                        parent: this
                    });
                });
            },
            edit(row) {
                console.log(row)
            },
            setBusiness(row) {
                import(/* webpackChunkName: "pages/account/set-bussiness" */'../dialog/set-bussiness').then(component => {
                    Dialog.open(component, row, {
                        title: '设置运营商',
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