<template>
    <div class="table-status" :class="{'is-center': center}">
        <div class="table-status-item" @click="switchTag(tab)" :class="{'is-active': currentActive === tab}"  v-for="(tab, index) in status" :key="index">
            <span>{{statusText[index]}}</span>
            <span class="table-status__count" v-if="dataCount[tab] !== 'undefined'" v-text="dataCount[tab]"></span>
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
                type: [Array,Object],
                default: function () {
                    return [];
                }
            },

            value: [String, Number],

            center: {
                type: Boolean,
                default: true
            }
        },

        data(){
            return {
                currentActive: ''
            }
        },

        methods: {
            switchTag(tab){
                this.currentActive = tab;
                this.$emit('tab-change', tab);
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
    .table-status{
        background: #fff;
        box-shadow: 0 1px 5px #d5d9df;
        .box();

        .table-status-item{
            font-size: 14px;
            text-align: center;
            cursor: pointer;
            color: #757575;
            position: relative;
            height: 48px;
            line-height: 48px;
            padding: 0 40px;

            &.is-active{
                color: #1e1e1e;
                position: relative;

                &:after{
                    content: '';
                    display: block;
                    height: 2px;
                    background: #4285f4;
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                }
            }
        }

        &.is-center{
            justify-content: center;
        }

        .table-status__count{
            color: #347fe8;
            margin-left: 8px;
        }
    }
</style>