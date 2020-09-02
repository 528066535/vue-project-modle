/**
 * Created by 蒋鑫强 on 2017/4/7.
 */
import util from '../../pub/util';
import ev from '../../pub/ev';

/**
 *坐标样式表
 *   display: 是否显示坐标
 *   color: 坐标轴文字颜色,
 fontSize: 坐标轴文字大小,
 displayAxisLine: 是否显示坐标轴,
 axisLineColor: 坐标轴颜色,
 axisLineWidth: 坐标轴宽度,
 displaySplitLine: 是否显示坐标分割线,
 splitLineColor: 坐标分割线颜色,
 splitLineWidth: 坐标分割线宽度
 *
 * 提示框样式
 *   display: 是否显示提示框
 *   trigger: 触发类型
 */
export default {
    props: {
        inverse: false,

        //x轴样式
        xStyle: {
            type: Object,
            default: () => {
                return {}
            }
        },

        //y轴样式
        yStyle: {
            type: Object,
            default: () => {
                return {}
            }
        },

        legendStyle: {
            type: Object,
            default: () => {
                return {
                    show: false
                }
            }
        },

        //提示颜色
        tooltipStyle: {
            type: Object,
            default: () => {
                return {}
            }
        },

        gridStyle: {
            type: Object,
            default: () => {
                return {}
            }
        },

        //可视化数据源
        value: {
            type:Array,
            default: () => {
                return [];
            }
        },
    },

    data(){
        return {
            chart: null,
            nativeValue: [],
            timer: null
        }
    },

    computed: {
        series(){
            return [];
        },

        grid(){
            return $.extend({
                top: 20,
                left: 20,
                bottom: 20,
                right: 20,
                containLabel: true
            }, this.gridStyle)
        },

        xAxis(){
            let style = $.extend({
                display: true,
                color: '#646464',
                fontSize: '12px',
                displayAxisTick: true,
                displayAxisLine: true,
                displayAreaSplit: false,
                displayLabel: true,
                axisLineColor: '#f0f0f0',
                axisLineWidth: 1,
                displaySplitLine: false,
                splitLineColor: '#f0f0f0',
                splitLineWidth: 1,
                boundaryGap: false,
                type: 'category',
                formatter: null,
                max: null,
                rotate: 0,
                splitNumber: 10,
                interval: null,
                align: null
            }, this.xStyle);

            return {
                // 是否显示 x 轴
                show: style.display,
                // 坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整。在类目轴中无效。
                splitNumber: style.splitNumber,
                // 坐标轴刻度最大值。
                max: this.max,
                // 坐标轴刻度标签的相关设置。
                axisLabel: {
                    // 坐标轴刻度文字的颜色
                    color: style.color,
                    // 是否显示坐标轴刻度文字
                    show: style.displayLabel,
                    // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。
                    formatter: style.formatter,
                    // 坐标轴重叠的情况下需要旋转文字
                    rotate: style.rotate,
                    align: style.align,
                    // 坐标轴刻度标签的显示间隔，在类目轴中有效。
                    // 默认会采用标签不重叠的策略间隔显示标签。
                    // 可以设置成 0 强制显示所有标签。
                    // 如果设置为 1，表示『隔一个标签显示一个标签』，如果值为 2，表示隔两个标签显示一个标签，以此类推。
                    interval: style.interval,

                    rich: {
                        a: {
                            fontSize: 12,
                            width: 120
                        }
                    }
                },
                // 坐标轴轴线相关设置。
                axisLine: {
                    show: style.displayAxisLine,
                    lineStyle: {
                        width: style.axisLineWidth,
                        color: style.axisLineColor
                    }
                },
                // x 轴上面的分隔线
                splitLine: {
                    show: style.displaySplitLine,
                    lineStyle: {
                        width: style.splitLineWidth,
                        color: style.splitLineColor
                    }
                },
                // 文字上面的刻度标记
                axisTick: {
                    show: style.displayAxisTick
                },
                splitArea: {
                    show: style.displayAreaSplit
                },
                // 坐标轴两边有空隙
                boundaryGap: style.boundaryGap,
                type: style.type,
                data: []
            }
        },

        yAxis(){
            let style = $.extend({
                display: true,
                color: '#646464',
                fontSize: '12px',
                displayAxisLine: true,
                displayAxisTick: true,
                displayAreaSplit: false,
                displayLabel: true,
                axisLineColor: '#f0f0f0',
                axisLineWidth: 1,
                displaySplitLine: true,
                splitLineColor: '#f0f0f0',
                splitLineWidth: 1,
                formatter: null,
                type: 'value',
                minInterval: null,
                max: null,
            }, this.yStyle);


            return {
                show: style.display,
                inverse: this.inverse,
                max: style.max,
                minInterval: style.minInterval,
                axisLabel: {
                    show: style.displayLabel,
                    color: style.color,
                    interval: 0,
                    formatter: style.formatter,

                    rich: {
                        a: {
                            fontSize: 12,
                            width: 154
                        }
                    }
                },
                axisTick: {
                    show: style.displayAxisTick
                },
                axisLine: {
                    show: style.displayAxisLine,
                    lineStyle: {
                        width: style.axisLineWidth,
                        color: style.axisLineColor
                    }
                },
                splitLine: {
                    show: style.displaySplitLine,
                    lineStyle: {
                        width: style.splitLineWidth,
                        color: style.splitLineColor
                    }
                },
                splitArea: {
                    show: style.displayAreaSplit
                },
                type: style.type,
                data: []
            }
        },

        tooltip(){
            let style = $.extend({
                display: true,
                trigger: 'item',
                backgroundColor: 'rgba(50,50,50,0.7)',
                formatter: null,
                pointerType: 'line',
                color: 'rgba(255,255,255,0.4)',
                width: 2,
                position: null
            }, this.tooltipStyle);

            return {
                show: style.display,
                trigger: style.trigger,
                backgroundColor: style.backgroundColor,
                position: style.position,

                axisPointer: {
                    type: style.pointerType,
                    lineStyle: {
                        color: style.color,
                        width: style.width
                    }
                },

                formatter: style.formatter
            }
        },

        chartOption(){
            return {
                legend: this.legendStyle,
                tooltip: this.tooltip,
                grid: this.grid,
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                series: this.series
            }
        }
    },

    watch: {
        value(){
            this.nativeValue = this.value.map(d => {
                if(!util.isArray(d.count)){
                    d.count = [d.count];
                }
                return d;
            });
        },

        nativeValue(){
            if(this.chartOption.xAxis.type === 'category'){
                this.setXData(this.nativeValue.map(d => {return d.name;}));
            }
            if(this.chartOption.yAxis.type === 'category'){
                this.setYData(this.nativeValue.map(d => {return d.name;}));
            }

            if(this.nativeValue.length > 0 && this.nativeValue[0].count !== undefined && this.nativeValue[0].count[0] !== undefined ){
                for(let i = 0; i < this.series.length; i++){
                    this.series[i].data = [];
                }

                for(let i = 0; i < this.series.length; i++){
                    for(let j = 0; j < this.nativeValue.length; j++){
                        if(this.nativeValue[j].color){
                            let dataItem = {
                                value: this.nativeValue[j].count[i],
                                name: this.nativeValue[j].name,
                                selected: this.nativeValue[j].selected
                            };
                            if(this.nativeValue[j].itemStyle){
                                dataItem.itemStyle = this.nativeValue[j].itemStyle;
                                dataItem.itemStyle.color = this.nativeValue[j].color;
                            }else{
                                dataItem.itemStyle = {
                                    color: this.nativeValue[j].color
                                };
                            }

                            if(dataItem.selected && this.nativeValue[j].selectedLabel){
                                dataItem.label = {
                                    color: this.nativeValue[j].selectedLabel
                                }
                            }
                            this.series[i].data.push(dataItem);
                        }else{
                            let dataItem = {
                                value: this.nativeValue[j].count[i],
                                name: this.nativeValue[j].name
                            };
                            if(this.nativeValue[j].itemStyle){
                                dataItem.itemStyle = this.nativeValue[j].itemStyle;
                            }
                            this.series[i].data.push(dataItem);
                        }
                    }
                }
            }


            this.loadChart();
            this.loadEchart(() => {
                this.chart && this.chart.setOption(this.chartOption);
                if(util.isArray(this.chartOption.series) && this.chartOption.series.length <= 0){
                    this.chart && this.chart.clear();
                }
            });
        }
    },

    methods: {
        loadChart: function () {},

        clear(){
            this.chart && this.chart.clear();
        },

        loadEchart(callback){
            if(!this.chart){
                if(window.echarts){
                    this.chart = window.echarts.init($(this.$el).find('.chart')[0]);
                    callback();
                }else{
                    util.loadScript(['/web/resource/third/echarts/echarts.min.js?v=4']).done(() => {
                        this.chart = window.echarts.init($(this.$el).find('.chart')[0]);
                        callback();
                    });
                }
            }else{
                callback();
            }
        },

        loadEchartGl(callback){
            Vue.nextTick(() => {
                callback();
            });
        },

        loading(isShow){
            this.loadEchart(() => {
                if(isShow){
                    this.chart.showLoading({
                        text: '',
                        color: '#3b8cff',
                        maskColor: 'rgba(0,0,0,0)',
                        zlevel: 0
                    });
                }else{
                    window.setTimeout(() => {
                        this.chart.hideLoading();
                    }, 1);
                }
            });
        },

        setXData(data){
            this.xAxis.data = data;
        },

        setYData(data){
            this.yAxis.data = data;
        },

        createColor(from, to, isHor, inverse){
            if(!isHor){
                return {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: inverse?to:from
                    }, {
                        offset: 1, color: inverse?from:to
                    }]
                }
            }else{
                return {
                    type: 'linear',
                    x: 1,
                    y: 0,
                    x2: 0,
                    y2: 0,
                    colorStops: [{
                        offset: 0, color: inverse?to:from
                    }, {
                        offset: 1, color: inverse?from:to
                    }]
                }
            }
        },

        getHex(color){
            return util.getHex(color);
        },

        resize(){
            this.chart && this.chart.resize();
        }
    },

    destroyed(){
        ev.off('resizeChart');
        this.chart && this.chart.clear();
        this.chart && this.chart.dispose();
        this.chart = null;
    },

    mounted() {
        this.nativeValue = this.value.map(d => {
            if(!util.isArray(d.count)){
                d.count = [d.count];
            }
            return d;
        });
        this.loadEchart(() => {
            if(!this.chart){
                this.chart = window.echarts.init($(this.$el).find('.chart')[0]);
            }
        });

        let that = this;
        $(window).on('resize', () => {
            this.timer && clearTimeout(this.timer);
            this.timer = window.setTimeout(() => {
                that.chart && that.chart.resize();
            }, 10);
        });


        ev.on('resizeChart', () => {
            this.timer && clearTimeout(this.timer);

            this.timer = window.setTimeout(() => {
                that.chart && that.chart.resize();
            }, 10);
        });
    }
}