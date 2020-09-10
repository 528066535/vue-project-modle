<template>
    <div style="width: 100%;height: 100%;">
        <div class="chart" style="width: 100%;height: 100%;"></div>
        <div class="no-data" v-if="nativeValue.length <= 0">暂无数据</div>
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
    import util from '../../resource/pub/util';

    export default {
        props: {
            colors:{
                type: Array,
                default: () => {
                    return []
                }
            },

            names:{
                type: Array,
                default: () => {
                    return []
                }
            },

            silent: {
                type: Boolean,
                default: false
            },

            barWidth: {
                type: Number,
                default: 3
            },

            radius: {
                type: [Number, Array],
                default: 0
            },

            barGap: {
                type:String,
                default: '30%'
            },

            label: {
                type: Object,
                default: () => {
                    return {};
                }
            },

            triangle: {
                type: Boolean,
                default: false
            },
        },

        computed: {
            series(){
                if(this.nativeValue.length > 0){
                    let count = this.nativeValue[0].count;
                    return count.map((d, index) => {
                        let color = this.colors[index];
                        return {
                            name: this.names[index],
                            type: 'bar',
                            barWidth: this.barWidth,
                            data: [],
                            silent: this.silent,
                            barGap: this.barGap,
                            itemStyle: {
                                normal: {
                                    color: util.isArray(color)?this.createColor(color[0], color[1], false):color,
                                    barBorderRadius: this.radius,
                                }
                            },
                            label: this.label,
                            markPoint: this.triangle?{
                                symbol: 'path://M2,0 L1,1 L1,1.2 L3,1.2 L3,1 z',
                                symbolSize: [30, 10],
                                itemStyle: {
                                  color: util.isArray(color)?color[0]:color
                                },
                                data: this.nativeValue.map((d, index) => {
                                    return {coord: [index, d.count[0]]}
                                }),
                                symbolOffset: [0, -4]
                            }:{}
                        };
                    });
                }else{
                    return [];
                }
            }
        },

        mounted(){
            this.loadEchart(() => {
                this.chart.on('click', params => {
                    this.$emit('click', params);
                });
            });
        },

        mixins: [chart]
    };
</script>