<template>
    <div class="table-status-wrap">
        <div class="table-sub-status status_select_er">
            <div class="table-sub-status__item" v-for="(tab, index) in status" :key="index" :class="{'table-sub-status__item--active': currentActive === tab}" @click="switchTag(tab)" >
                {{statusText[index]}}
                <span class="table-status__count" v-if="dataCount[tab] !== 'undefined'" v-text="dataCount[tab]"></span>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * Created by 周文博 on 2017/4/7.
     */
    export default {
        props: {
            dataCount: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            status: {
                type: Array,
                default: function () {
                    return [];
                }
            },

            statusText: {
                type: Array,
                default: function () {
                    return [];
                }
            },

            value: [String, Number]
        },

        data(){
            return {
                currentActive: ''
            }
        },

        methods: {
            switchTag(tab){
                this.currentActive = tab;
                this.$emit('tab-change', this.currentActive);
            }
        },

        watch: {
            value(){
                this.currentActive = this.value;
            },

            currentActive(){
                this.$emit('input', this.currentActive);
            }
        },

        created(){
            this.currentActive = this.value;
        }
    }
</script>
<style lang="less">
    @import "../style/trans";
    .table-status__count{
        color: #0081fe;
        margin-left: 3px;
    }

    .table-sub-status{
        margin-top: 14px;

        .table-sub-status__item{
            font-size: 14px;
            color: #3b3b3b;
            text-align: center;
            min-width: 90px;
            padding: 0 14px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            cursor: pointer;
            border-radius: 30px;
            position: relative;
            border:1px dashed transparent;
            margin-right: 10px;
            margin-left: 10px;
            .borderBox();

            .table-status__count{
                color: #3b3b3b;
            }

            &:hover,&.table-sub-status__item--active{
                border:1px solid #55a8fd;
                background: #55a8fd;
                color: #fff;

                .table-status__count{
                    color: #fff;
                }
            }
        }
    }
</style>