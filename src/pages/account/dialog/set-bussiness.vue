<template>
    <app-form @save="save" ref="form">
        <div class="table-container" style="height: 300px">
            <app-table ref="table" url="/queryCarriers" :multi-select="false" @row-click="clickRow">
                <el-table-column label="运营商名称" prop="carriername" align="center"></el-table-column>
                <el-table-column label="等级" prop="carrierlv" align="center"></el-table-column>
            </app-table>
        </div>
    </app-form>
</template>
<script>
    import Http from '@Pub/http'
    import page from '@Pub/page';
    export default {
        data() {
            return {
                row: null
            }
        },
        created() {

        },
        mixins: [page],
        mounted() {

        },

        methods: {
            clickRow(row) {
                this.row = row
            },
            save(){
                this.saveData('/moveDevice', {devid:this.data.devid, carrierid: this.row.carrierid})
            }
        },
    }

</script>
<style lang="less" scoped rel="stylesheet/less">

</style>