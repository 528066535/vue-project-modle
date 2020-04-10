<template>
    <div>
        <app-condition>
            <app-formitem label="区域">
                <app-select v-model="conditions.areaId">
                    <el-option label="全部" value="all"></el-option>
                </app-select>
            </app-formitem>
            <div slot="toolbar">
                <app-button @click="add" type="primary">新增</app-button>
            </div>
        </app-condition>

        <div class="table-container">
            <app-table ref="table" :local-data="tableData">
                <el-table-column label="单位名称" prop="a" align="center"></el-table-column>
                <el-table-column label="单位名称1" prop="b" align="center"></el-table-column>
            </app-table>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                conditions: {
                    areaId: 1
                },
                tableData: [{a:1,b:2},{a:1,b:2},{a:1,b:2},{a:1,b:2}]
            }
        },
        created() {

        },

        mounted() {

        },

        methods: {
            add() {}
        },
    }

</script>
<style lang="less" scoped rel="stylesheet/less">

</style>