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
            <app-table ref="table" url="/queryLoopImgs" :multi-select="false" :no-number="true" :paging="false">
                <el-table-column label="名称" width="100" prop="imgname" align="center"></el-table-column>
                <el-table-column label="上传时间" prop="loginname" align="center">
                    <template slot-scope="scope">
                        {{Number(scope.row.createtime) | date('yyyy-MM-dd hh:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column label="图片" prop="activetime" align="center">
                    <template slot-scope="scope">
                        <img style="height: 80px;" :src="scope.row.imgurl" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="上传账号" prop="adminname" align="center"></el-table-column>
                <el-table-column  label="操作" align="center" width="240">
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
                delete row.adminname
                this.$refs.table.delSelectedSinglelistByMethods('/deleteLoopImg', row)
            },
            search(){
                this.$refs.table.reload(this.conditions);
            },
            add() {
                import(/* webpackChunkName: "pages/setting/change-password-dialog" */'../dialog/banner').then(component => {
                    Dialog.open(component, {}, {
                        title: '新增',
                        width: 600,
                        parent: this
                    });
                });
            },
            edit(row) {
                console.log(row)
            }
        },
    }

</script>
<style lang="less" scoped rel="stylesheet/less">

</style>