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
            <app-table ref="table" url="/queryPoints">
                <el-table-column  show-overflow-tooltip label="位置" prop="addr" align="center"></el-table-column>
                <el-table-column label="类型" prop="type" align="center">
                    <template slot-scope="scope">
                        {{['服务点','学校','医院'][scope.row.type]}}
                    </template>
                </el-table-column>
                <el-table-column  label="操作" align="center">
                    <template slot-scope="scope">
                        <app-button icon="edit" size="mini" @click="edit(scope.row)">编辑</app-button>
                        <app-button icon="edit" size="mini" @click="delRow(scope.row)">删除</app-button>
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
                    carriername: ''
                }
            }
        },
        created() {

        },

        mounted() {

        },

        methods: {
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