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
                            <div>累计用户数</div>
                            <div>0</div>
                            <div></div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>昨日新增用户数</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>本周新增用户数</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>本月新增用户数</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                    </div>
                    <div class="line-summary-wrap">
                        <div class="item-summary-wrap">
                            <div>未使用激活码</div>
                            <div>0</div>
                            <div> </div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>未激活用户数</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>VIP用户</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>日平均使用时长</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                    </div>
                    <div class="line-summary-wrap">
                        <div class="item-summary-wrap">
                            <div>周平均使用时长</div>
                            <div>0</div>
                            <div> </div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>昨日日活用户数</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>本周活跃用户数</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap">
                            <div>本月活跃用户数</div>
                            <div>0</div>
                            <div class="tb-holder">同比</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="blank">
            <div class="header-wrap">
                营收概览
            </div>
            <div class="content-wrap">
                <chart-line
                        ref="chartLine"
                        v-model="lineData"
                        :names="['登录', '攻击']"
                        :colors="[['#22c9f8', 'rgba(34,201,248,0.1)'], ['#a49dfc', 'rgba(164,157,252,0.1)']]"
                        :y-style="{displayAxisTick: false, displayAxisLine: false}"
                        :x-style="{displayAxisTick: false}"
                        :grid-style="{top: 10, bottom: 15}"
                        :smooth="true"
                        :show-symbol="false"
                        :show-line="false"
                        :tooltip-style="{trigger: 'axis'}"
                ></chart-line>
            </div>
        </div>

    </app-page>
</template>
<script>
    import chartLine from '@Resource/components-charts/chart-line'
    export default {
        data() {
            return {
                conditions: {}
            }
        },
        components: {
            chartLine
        },
        created() {

        },

        mounted() {
            console.log(echarts)
            var myChart = echarts.init(document.getElementById('charts'));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },

        methods: {
            search() {}
        },
    }
</script>
<style lang="less" scoped rel="stylesheet/less">
    @import "../style/analyse";
</style>