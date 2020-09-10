<template>
    <div style="width: 100%;height: 100%;position: relative;">
        <div class="chart" style="width: 100%;height: 100%;position: relative;z-index: 99;"></div>
        <div class="center-text">
            <template v-if="centerText">
                <p :style="{color: color, fontSize: centerSize}">{{isCenterPercent?currentItem.value:currentItem.count}}</p>
                <p v-if="!isCenterPercent">{{currentItem.name}}</p>
            </template>
            <div class="no-data" v-if="nativeValue.length <= 0">暂无数据</div>
        </div>
    </div>
</template>

<script>
    /**
     * 柱状图
     *
     * 数据源格式 [{name: '', count: ''}]
     *
     * Created by 蒋鑫强 on 2017/4/6.
     */
    import chart from './js/charts';

    export default {
        props: {
            names:{
                type: Array,
                default: () => {
                    return []
                }
            },

            colors:{
                type: Array,
                default: () => {
                    return []
                }
            },

            silent: {
                type: Boolean,
                default: false
            },

            rose: {
                type: Boolean,
                default: false
            },

            shadow: {
                type: Boolean,
                default: false
            },

            label: {
                type: Boolean,
                default: false
            },

            labelColor: String,
            lineColor: String,

            labelFill: {
                type: Boolean,
                default: true
            },

            radius:{
                type: Array,
                default: () => {
                    return ['65%','85%']
                }
            },

            center:{
                type: Array,
                default: () => {
                    return ['50%','50%']
                }
            },

            centerText:{
                type: Boolean,
                default: false
            },

            centerSize: {
                type: String,
                default: '48px'
            },

            isCenterPercent:{
                type: Boolean,
                default: true
            },

            smallDot: {
                type: Number,
                default: 0
            },

            startAngle:{
                type: Number,
                default: 90
            },

            fontSize:{
                type: Number,
                default: 12
            },

            clockWise:{
                type: Boolean,
                default: true
            },

            formatter: {
                type: [Function, String],
                default: function (data) {
                    return data.value;
                }
            },

            selectedOffset:{
                type: Number,
                default: 10
            },

            tooltipFormatter: {
                type: Function,
                default: function(d){
                    return `${d.data.name}：${d.data.value}`;
                }
            }
        },

        data(){
            return {
                currentItem: {},
                color: '#585858'
            }
        },

        computed: {
            series(){
                this.color = '#585858';
                if(this.nativeValue.length > 0){
                    let count = this.nativeValue[0].count;
                    let item = this.nativeValue.filter(d => {return d.selected;});
                    let total = 0;
                    for(let i = 0; i < this.nativeValue.length; i++){
                        total += parseInt(this.nativeValue[i].count[0]);
                    }
                    if(item.length > 0){
                        let percent = item[0].count[0] / (total || 1) * 100;
                        this.currentItem = {
                            name: item[0].name,
                            count: item[0].count[0],
                            value: (this.smallDot === 0?Math.round(percent): percent.toFixed(this.smallDot)) + '%'
                        };
                    }else{
                        this.currentItem = {
                            name: '全部',
                            count: total,
                            value: '100%'
                        };
                    }

                    return count.map((d, index) => {
                        return {
                            color: this.colors,
                            clockwise: this.clockWise,
                            selectedOffset: this.selectedOffset,
                            label: {
                                show: this.label,
                                color: this.labelColor,
                                fontSize: this.fontSize,
                                formatter: !this.labelFill?'  {per|{d}%} \n {b|{b}：}{c} ': this.formatter,

                                rich: {
                                    b: {
                                        fontSize: 12,
                                        lineHeight: 20,
                                        textAlign: 'left'
                                    },
                                    per: {
                                        fontSize: 26
                                    },
                                    c: {
                                        fontSize: 12,
                                        lineHeight: 12,
                                        color: this.labelColor
                                    },
                                    d: {
                                        fontSize: 12,
                                        lineHeight: 12,
                                        color: this.labelColor
                                    },
                                    perC: {
                                        fontSize: 12,
                                        color: 'rgba(255,255,255,0.45)'
                                    }
                                }
                            },
                            labelLine: {
                                show: this.label,
                                lineStyle: {
                                    color: this.lineColor || this.labelColor
                                }
                            },
                            name: this.names[index],
                            selectedMode: this.rose?false:'single',
                            startAngle: this.startAngle,
                            type: 'pie',
                            roseType: this.rose,
                            data: [],
                            silent: this.silent,
                            radius: this.radius,
                            center: this.center,
                            tooltip: {
                                formatter: this.tooltipFormatter
                            },
                            itemStyle: this.shadow?{
                                shadowBlur: 20,
                                shadowColor: 'rgba(0,0,0,0.8)'
                            }:{}
                        };
                    });
                }else{
                    this.currentItem = {};
                    return [];
                }
            }
        },

        created(){
            this.xStyle.display = false;
            this.yStyle.display = false;
        },

        mounted(){
            this.loadEchart(() => {
                this.chart.on('pieselectchanged', params => {
                    let item = this.nativeValue.getByKey('name', params.name) || {};
                    let total = 0;
                    for(let i = 0; i < this.nativeValue.length; i++){
                        total += parseInt(this.nativeValue[i].count[0]);
                    }

                    if(this.currentItem.name === params.name){
                        this.currentItem = {
                            name: '全部',
                            count: total,
                            value: '100%'
                        };
                    }else{
                        let percent = item.count[0] / (total || 1) * 100;
                        this.currentItem = {
                            name: item.name,
                            count: item.count[0],
                            value: (this.smallDot === 0?parseInt(percent): percent.toFixed(this.smallDot)) + '%'
                        };
                    }

                });
                this.chart.on('click', params => {
                    if(this.centerText){
                        if(this.currentItem.name === params.name){
                            if(params.data.itemStyle){
                                this.color = params.data.itemStyle.color;
                            }
                            if(this.nativeValue[params.dataIndex] && this.nativeValue[params.dataIndex].centerColor){
                                this.color = this.nativeValue[params.dataIndex].centerColor;
                            }
                            this.$emit('click', params);
                        }else{
                            this.color = '#585858';
                            this.$emit('click', {name: ''});
                        }
                    }else{
                        this.$emit('click', params);
                    }
                });
            });
        },

        mixins: [chart]
    };
</script>
<style lang="less" scoped>
    @import "../../resource/style/trans";
    .center-text{
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        bottom: 0;
        text-align: center;
        .box();
        .box-column();
        justify-content: center;
        .translate(0,-50%);

        p:nth-child(1){
            font-size: 48px;
            color: #585858;
        }

        p:nth-child(2){
            font-size: 14px;
            color: #9f9f9f;
        }
    }
</style>