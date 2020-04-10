<template>
    <div style="width: 100%;height: 100%;position: relative;">
        <div class="chart" style="width: 100%;height: 100%;"></div>
        <div class="no-data" v-if="nativeValue.length <= 0">暂无数据</div>
    </div>
</template>

<script>
    /**
     * 折线图
     *
     * 数据源格式 [{name: '', count: ''}]
     *
     *
     * Created by 蒋鑫强 on 2017/4/6.
     */
    import chart from './js/charts';
    import util from '../../resource/pub/util';

    export default {
        props: {
            smooth: false,

            colors:{
                type: Array,
                default: () => {
                    return []
                }
            },

            opacity:{
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

            showSymbol: {
                type: Boolean,
                default: true
            },

            showLine: {
                type: Boolean,
                default: true
            },

            silent: {
                type: Boolean,
                default: false
            },

            itemStyle: Object,

            symbolSize: {
                type: Number,
                default: 6
            }
        },

        computed: {
            series(){
                if(this.nativeValue.length > 0){
                    let count = this.nativeValue[0].count;
                    return count.map((d, index) => {
                        let color = this.colors[index];
                        let hex = {};
                        if(color){
                            if(util.isArray(color)){
                                hex = this.getHex(color[0]);
                            }else{
                                hex = this.getHex(color);
                            }
                        }

                        return {
                            name: this.names[index],
                            type: 'line',
                            showSymbol: this.showSymbol,
                            smooth: this.smooth,
                            symbol: 'circle',
                            symbolSize: this.symbolSize,
                            data: [],
                            silent: this.silent,
                            lineStyle: {
                                normal: {
                                    color: this.showLine?(util.isArray(color)?color[this.inverse?1:0]:color):'transparent',
                                    opacity: this.opacity[index]?this.opacity[index]:1
                                },
                            },
                            areaStyle: {
                                normal: {
                                    color: util.isArray(color)?this.createColor(color[0], color[1], false):'transparent'
                                }
                            },

                            itemStyle: this.itemStyle?this.itemStyle:{
                                color: util.isArray(color)?color[0]:color,
                                borderColor: `rgba(${hex.R}, ${hex.G}, ${hex.B}, 0.4)`,
                                borderWidth: 8
                            }
                        };
                    });
                }else{
                    return [];
                }
            }
        },

        created(){
            this.xStyle.boundaryGap = false;
        },

        mixins: [chart]
    };
</script>
<style>
    .no-data{
        color: #999;
        position: absolute;
        top: 50%;
        width: 100%;
        text-align: center;
        margin-top: -8px;
    }
</style>