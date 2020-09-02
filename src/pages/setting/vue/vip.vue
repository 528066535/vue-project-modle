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
            <app-table ref="table" url="/queryVipMenu" :multi-select="false" :no-number="true" :paging="false">
                <el-table-column label="套餐名称" width="100" prop="pname" align="center"></el-table-column>
                <el-table-column label="创建用户" prop="adminname" align="center"></el-table-column>
                <el-table-column label="创建时间" prop="createtime" align="center">
                    <template slot-scope="scope">
                        {{Number(scope.row.createtime) | date('yyyy-MM-dd hh:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column label="原价" prop="oriamount" align="center"></el-table-column>
                <el-table-column label="实付价格" prop="realamount" align="center"></el-table-column>
                <el-table-column label="有效期" prop="expdays" align="center"></el-table-column>
                <el-table-column  label="操作" align="center" width="120">
                    <template slot-scope="scope">
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
                this.$refs.table.delSelectedSinglelistByMethods('/deleteVipMenu', row)
            },
            search(){
                this.$refs.table.reload(this.conditions);
            },
            add() {
                import(/* webpackChunkName: "pages/setting/vip" */'../dialog/vip').then(component => {
                    Dialog.open(component, {}, {
                        title: '新增VIP',
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