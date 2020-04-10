<template>
    <app-page ref="page" class="analyse">
        <div class="blank">
            <div class="header-wrap">
                营收统计
            </div>
            <div class="content-wrap">
                <app-form label-position="left" inline class="demo-table-expand" label-width="100px">
                    <app-formitem style="padding-top: 20px;">
                        <app-input placeholder="一级代理"></app-input>
                    </app-formitem>
                </app-form>
            </div>
        </div>

        <div class="blank">
            <div class="header-wrap">
                营收概览
            </div>
            <div class="content-wrap">
                <div class="data-summary-wrap">
                    <div class="line-summary-wrap">
                        <div class="item-summary-wrap">
                            <div>订单总数</div>
                            <div>0</div>
                            <div></div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>昨日订单数</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>本周订单数</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>本周订单数</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                    </div>
                    <div class="line-summary-wrap">
                        <div class="item-summary-wrap">
                            <div>营收总数</div>
                            <div>0</div>
                            <div> </div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>昨日营收总数</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>本周营收总数</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>本周订单数</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </app-page>
</template>
<script>

    export default {
        data() {
            return {
                conditions: {}
            }
        },
        created() {

        },

        mounted() {

        },

        methods: {
            search() {}
        },
    }
</script>
<style lang="less" scoped rel="stylesheet/less">
    @import "../style/analyse";
</style>