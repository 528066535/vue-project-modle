<template>
    <div style="width: 100%; display: flex; flex-direction: column; height: 100%;">
        <el-tabs type="card" v-model="currentActive" >
            <el-tab-pane :name="index+''" :label="tab" v-for="(tab, index) in tabs" :key="index"></el-tab-pane>
        </el-tabs>
        <div class="tab-body" style="position: relative;">
            <div style="width: 100%;" v-show="parseInt(currentActive) === index" v-for="(tab, index) in tabs" :key="index">
                <slot :name="index + 1"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * Created by 周文博 on 2017/4/20.
     */
    export default {
        props: {
            tabs: Array
        },

        data(){
            return {
                currentActive: '0'
            }
        }
    }
</script>

<style lang="less">
    @import "../style/trans";
    .tab-body{
        flex: 1;
        th, th .cell{
            background: #fff;
        }
    }
    .el-tabs--card>.el-tabs__header{margin: 10px;}
    .el-tabs--card>.el-tabs__header .el-tabs__nav{border: none;}
    .el-tabs__item{padding: 0 15px;height: 37px;line-height: 37px;}

    .el-tabs--card .el-tabs__item{width: auto;text-align: center;color: #3b3b3b !important;.transition(none) !important;}
    .el-tabs--card .el-tabs__header{border-bottom: 1px solid #e8e8e8; }
    .el-tabs--card .el-tabs__item{background: #fff;margin-right: 8px;border:1px solid #d9d9d9 !important;}
    .el-tabs--card .el-tabs__item.is-active{border-radius: 0 !important;position: relative;}
    .el-tabs--card .el-tabs__item.is-active{background: #0098fe;color: #fff !important;border-color: #0098fe !important;}
</style>