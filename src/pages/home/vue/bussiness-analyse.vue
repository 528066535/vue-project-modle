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
                            <div>{{busData.totalNum}}</div>
                            <div></div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>昨日订单数</div>
                            <div>{{busData.yestNum}}</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>本周订单数</div>
                            <div>{{busData.weekNum}}</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>本周订单数</div>
                            <div>{{busData.monthNum}}</div>
                            <div class="tb-holder">同比</div>
                        </div>
                    </div>
                    <div class="line-summary-wrap">
                        <div class="item-summary-wrap">
                            <div>营收总数</div>
                            <div>{{busData.totalAmount}}</div>
                            <div> </div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>昨日营收总数</div>
                            <div>{{busData.yestAmount}}</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>本周营收总数</div>
                            <div>{{busData.weekAmount}}</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>本月营收总数</div>
                            <div>{{busData.monthAmount}}</div>
                            <div class="tb-holder">同比</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="blank">
            <div class="header-wrap">
                订单趋势
            </div>
            <div class="condition-holder">
                <app-form inline>
                    <app-formitem class="fr">
                        <app-input @change="searchOrder" v-model="orderConditions.day" type="daterange"></app-input>
                    </app-formitem>
                </app-form>
            </div>
            <div class="content-wrap" style="height: 400px">
                <chart-line
                        ref="chartLine"
                        :yStyle="{minInterval: 1}"
                        v-model="orderData"
                ></chart-line>
            </div>
        </div>

        <div class="blank">
            <div class="header-wrap">
                营业额趋势
            </div>
            <div class="condition-holder">
                <app-form inline>
                    <app-formitem class="fr">
                        <app-input @change="searchSales" v-model="salesConditions.day" type="daterange"></app-input>
                    </app-formitem>
                </app-form>
            </div>
            <div class="content-wrap" style="height: 400px">
                <chart-line
                        ref="salesLine"
                        :yStyle="{minInterval: 1}"
                        v-model="salesLine"
                ></chart-line>
            </div>
        </div>

    </app-page>
</template>
<script>
    import Http from '@Pub/http';
    import chartLine from '@Resource/components-charts/chart-line'
    import filter from '@Pub/filter';

    export default {
        components: {
            chartLine
        },
        data() {
            function getBeforeDate(number) {
                const num = number;
                const date = new Date();
                let year = date.getFullYear();
                let mon = date.getMonth() + 1;
                let day = date.getDate();
                if (day <= num) {
                    if (mon > 1) {
                        mon = mon - 1;
                    } else {
                        year = year - 1;
                        mon = 12;
                    }
                }
                date.setDate(date.getDate() - num);
                year = date.getFullYear();
                mon = date.getMonth() + 1;
                day = date.getDate();
                const s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day);
                return s;
            }
            let start = getBeforeDate(7)
            return {
                busData: {},
                conditions: {},

                orderConditions: {
                    day: [start, new Date()]
                },
                orderData: [],

                salesConditions: {
                    day: [start, new Date()]
                },
                salesLine: []
            }
        },
        created() {

        },

        mounted() {
            this.searchData()
            this.searchOrder()
            this.searchSales()
        },

        methods: {
            searchOrder() {
                let params = {
                    startDay: filter.date(this.orderConditions.day[0], 'yyyyMMdd'),
                    endDay: filter.date(this.orderConditions.day[1], 'yyyyMMdd')
                }
                Http.post('/queryOrderNumSection', params).then(res=>{
                    this.orderData = res
                })
            },
            searchData() {
                let params = {

                }
                Http.post('/querySalesData', params).then(res=>{
                    this.busData = res
                })
            },
            searchSales() {
                let params = {
                    startDay: filter.date(this.salesConditions.day[0], 'yyyyMMdd'),
                    endDay: filter.date(this.salesConditions.day[1], 'yyyyMMdd')
                }
                Http.post('/querySalesSection', params).then(res=>{
                    this.salesLine = res
                })
            }
        },
    }
</script>
<style lang="less" scoped rel="stylesheet/less">
    @import "../style/analyse";
</style>