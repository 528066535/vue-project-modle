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
            <app-table ref="table" url="/queryOrders">
                <el-table-column label="账号" prop="loginname" align="center"></el-table-column>
                <el-table-column label="昵称" prop="nickname" align="center"></el-table-column>
                <el-table-column label="充值金额" prop="amount" align="center"></el-table-column>
                <el-table-column label="支付方式" prop="payway" align="center">
                    <template slot-scope="scope">
                        {{['微信'][scope.row.payway-1]}}
                    </template>
                </el-table-column>
                <el-table-column label="订单号" prop="outtradeno" align="center"></el-table-column>
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