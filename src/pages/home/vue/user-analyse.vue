<template>
    <app-page ref="page" class="analyse">
        <div class="blank">
            <div class="header-wrap">
                用户统计
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
                用户概览
            </div>
            <div class="content-wrap">
                <div class="data-summary-wrap">
                    <div class="line-summary-wrap">
                        <div class="item-summary-wrap" @click="go(1)">
                            <div>累计用户数</div>
                            <div>{{userData.totalUsersNum}}</div>
                            <div></div>
                        </div>
                        <div class="item-summary-wrap" @click="go(2)">
                            <div>昨日新增用户数</div>
                            <div>{{userData.yestNewUserNum}}</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap" @click="go(3)">
                            <div>本周新增用户数</div>
                            <div>{{userData.weekNewUserNum}}</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap" @click="go(4)">
                            <div>本月新增用户数</div>
                            <div>{{userData.monthNewUserNum}}</div>
                            <div class="tb-holder">同比</div>
                        </div>
                    </div>
                    <div class="line-summary-wrap">
                        <div class="item-summary-wrap">
                            <div>未使用激活码</div>
                            <div>{{userData.unActiveCodeNum}}</div>
                            <div> </div>
                        </div>
                        <div class="item-summary-wrap" @click="go(5)">
                            <div>未激活用户数</div>
                            <div>{{userData.unActiveUserNum}}</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap" @click="go(6)">
                            <div>VIP用户</div>
                            <div>{{userData.vipNum}}</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <div class="item-summary-wrap" @click="go(7)">
                            <div>昨日活跃用户</div>
                            <div>{{userData.yestAcUserNum}}</div>
                            <div class="tb-holder">同比</div>
                        </div>
                    </div>
                    <div class="line-summary-wrap">
                        <div class="item-summary-wrap" @click="go(8)">
                            <div>本周活跃用户</div>
                            <div>{{userData.weekAcUserNum}}</div>
                            <div> </div>
                        </div>
                        <div class="item-summary-wrap" @click="go(9)">
                            <div>本月活跃用户</div>
                            <div>{{userData.monthAcUserNum}}</div>
                            <div class="tb-holder">同比</div>
                        </div>
                        <!--<div class="item-summary-wrap">-->
                            <!--<div>本周活跃用户数</div>-->
                            <!--<div>{{userData.}}</div>-->
                            <!--<div class="tb-holder">同比</div>-->
                        <!--</div>-->
                        <!--<div class="item-summary-wrap">-->
                            <!--<div>本月活跃用户数</div>-->
                            <!--<div>{{userData.}}</div>-->
                            <!--<div class="tb-holder">同比</div>-->
                        <!--</div>-->
                    </div>
                </div>
            </div>
        </div>

        <div class="blank">
            <div class="header-wrap">
                整体趋势
            </div>
            <div class="condition-holder">
                <app-form inline>
                    <app-formitem>
                        <el-radio-group v-model="allTrendConditions.type" style="margin-bottom: 30px;" size="small">
                            <el-radio-button label="newUserNum">新增用户</el-radio-button>
                            <el-radio-button label="acUserNum">活跃用户</el-radio-button>
                            <el-radio-button label="allUserNum">累计用户</el-radio-button>
                            <el-radio-button label="vipUserNum">VIP用户</el-radio-button>
                            <el-radio-button label="expUserNum">过期用户</el-radio-button>
                        </el-radio-group>
                    </app-formitem>
                    <app-formitem class="fr">
                        <app-input @change="searchTrend" v-model="allTrendConditions.day" type="daterange"></app-input>
                    </app-formitem>
                </app-form>
            </div>
            <div class="content-wrap" style="height: 400px">
                <!--:names="['登录', '攻击']"-->
                <!--:colors="[['#22c9f8', 'rgba(34,201,248,0.1)'], ['#a49dfc', 'rgba(164,157,252,0.1)']]"-->
                <!--:grid-style="{top: 40, bottom: 45}"-->
                <!--:smooth="true"-->
                <!--:tooltip-style="{trigger: 'axis'}"-->
                <chart-line
                        ref="chartLine"
                        :yStyle="{minInterval: 1}"
                        v-model="lineData"
                ></chart-line>
                <!--<chart-pie-->
                        <!--ref="chartLine"-->
                        <!--v-model="lineData"-->
                <!--&gt;</chart-pie>-->
                <!--<chart-bar-->
                        <!--ref="chartLine"-->
                        <!--v-model="lineData"-->
                <!--&gt;</chart-bar>-->
            </div>
        </div>

    </app-page>
</template>
<script>
    import chartLine from '@Resource/components-charts/chart-line'
    import chartPie from '@Resource/components-charts/chart-pie'
    import chartBar from '@Resource/components-charts/chart-bar'
    import Http from '@Pub/http';
    import router from '@Pub/router';
    import filter from '@Pub/filter';

    export default {
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
                allTrendData: [],
                userData: {},
                allTrendConditions: {
                    type: 'newUserNum',
                    day: [start, new Date()]
                }
            }
        },
        components: {
            chartLine,
            chartPie,
            chartBar
        },
        created() {

        },
        computed: {
            lineData() {
                return this.allTrendData.map(data=>{
                    return {
                        name: data.serverdate,
                        count: data[this.allTrendConditions.type]
                    }
                })
            }
        },

        mounted() {
            Http.post('/queryUserData').then(res=>{
                this.userData = res
            });
            this.searchTrend()
        },

        methods: {
            go(type) {
                router.go(`/dashboard/account/user?type=${type}`)
            },
            searchTrend() {
                let params = {
                    startDay: filter.date(this.allTrendConditions.day[0], 'yyyyMMdd'),
                    endDay: filter.date(this.allTrendConditions.day[1], 'yyyyMMdd')
                }
                Http.post('/queryUserDataSection', params).then(res=>{
                    this.allTrendData = res.list
                })
            }
        },
    }
</script>
<style lang="less" scoped rel="stylesheet/less">
    @import "../style/analyse";
</style>