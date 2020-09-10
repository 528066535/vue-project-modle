<template>
    <el-row class="condition" :class="{simple: simple, 'condition-right':$slots.right, 'condition-all':showAllCondition }">
        <el-col :span="24" v-if="!simple && showTitle" class="condition--title">条件搜索</el-col>
        <el-col :span="24"  v-if="!simple" class="conditions--items">
            <el-form :inline="true" label-suffix="：" @submit.native.prevent>
                <slot></slot>
            </el-form>
            <div v-if="$slots.right" class="right-holder">
                <slot name="right"></slot>
                <app-button @click="openCondition">{{showAllCondition?'收起':'展开'}}</app-button>
            </div>
        </el-col>
        <el-col :span="24" class="toolbar">
            <div v-if="$slots.extToolBar" style="position: relative;top: -8px;display: inline-block;">
                <slot name="extToolBar" ></slot>
            </div>
            <el-button-group v-if="$slots.toolbar">
                <slot name="toolbar"></slot>
            </el-button-group>
        </el-col>

        <el-col :span="24" class="toolbar">
            <div v-if="$slots.tableBar" style="position: relative;top: -8px;display: inline-block;">
                <slot name="tableBar" ></slot>
                <app-button @click="openCondition">{{showAllCondition?'收起':'展开'}}</app-button>
            </div>
        </el-col>
    </el-row>

</template>

<script>
    export default {
        props: {
            simple: {
                type: Boolean,
                default: false
            },
            showTitle: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                showAllCondition: false,
            }
        },
        methods: {
            openCondition() {
                this.showAllCondition = !this.showAllCondition;
                this.$emit('right-click',this.showAllCondition)
            },
        }
    }
</script>

<style lang="less">
    .condition{
        border-radius: 2px 0 0 2px;
        padding-top: 10px;
        padding-left: 10px;

        .toolbar {
            min-height: 5px;
        }

        .condition--title{
            padding: 0 10px;
            font-size: 14px;
            color: #3b3b3b;
            background: #dae2f6;
            line-height: 34px;
        }

        .conditions--items{
            background: #fff;
            padding: 14px 20px 1px 20px;
            overflow: hidden;
        }

        .toolbar .el-button-group > div{
            margin-bottom: 16px;
            margin-top: 16px;
            overflow: hidden;
        }

        &.simple{
            .toolbar .el-button-group > div{
                margin-top: 0;
            }
        }
        &.condition-right {
            .conditions--items {
                position: relative;
                height: 55px;
            }

            .el-col-24 {
                padding-right: 150px;
            }
        }

        &.condition-all {
            .el-col-24 {
                padding-right: 10px;
            }

            .el-col-24 .el-form-item:last-child {
                padding-right: 140px;
            }

            .conditions--items {
                height: auto;
            }
        }
        .el-col-24{
            float: none;
        }
        .el-form-item{
            margin-bottom: 12px;
        }

        .right-holder {
            position: absolute;
            bottom: 12px;
            right: 20px;
        }
    }
</style>