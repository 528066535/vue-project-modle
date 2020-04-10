<template>
    <div>
        <app-condition>
            <app-formitem label="名称">
                <app-input @keyup="search" v-model="conditions.carriername"></app-input>
            </app-formitem>
            <app-formitem>
                <app-button type="primary" @click="search">搜索</app-button>
            </app-formitem>
        </app-condition>
        <div class="table-container">
            <app-table ref="table" url="/querySuggest">
                <el-table-column label="账号" width="150" prop="loginname" align="center"></el-table-column>
                <el-table-column label="内容" prop="content" align="center"></el-table-column>
                <el-table-column label="提交时间" width="180"  prop="createtime" align="center">
                    <template slot-scope="scope">
                        {{Number(scope.row.createtime) | date('yyyy-MM-dd hh:mm:ss')}}
                    </template>
                </el-table-column>
            </app-table>
        </div>
    </div>
</template>
<script>
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
            search(){
                this.$refs.table.reload(this.conditions);
            },
            add() {},
            edit(row) {
                console.log(row)
            }
        },
    }

</script>
<style lang="less" scoped rel="stylesheet/less">

</style>