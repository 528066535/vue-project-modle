<template>
    <div class="bar-list-warp">
        <div class="bar-list box">
            <div :style="{width: getWidth()}" class="bar-item border" v-for="(item,index) in status" @click="tabChange(item)" :key="item" :class="{[item]:item==currentActive,'active-item':item==currentActive,['item-'+item]:true}" >
                <i class="icon" :class="'icon-'+item"></i>
                <div class="fr content-holder">
                    <div class="num" :class="'color-'+item" v-if="tabCount[item] || tabCount[item]==0">{{tabCount[item]}}</div>
                    <div class="text">{{statusText[index]}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * Created by 周文博 on 2018/9/10.
     */


    export default {
        props: {
            //例如 ['total', 'noDataToday', 'noDataWeek']
            status: {
                type: Array,
                default: () => {
                    return []
                }
            },

            //例如 ['total', 'noDataToday', 'noDataWeek']
            noBorder: {
                type: Boolean,
                default: false
            },

            //例如 {'total':1, 'noDataToday':2, 'noDataWeek':3}
            tabCount: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            //例如 ['单位总数', '昨天无数据单位', '上周数据']
            statusText: {
                type: Array,
                default: () => {
                    return []
                }
            },

            //例如 'total'
            value: [String, Number],
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
        },

        data() {
            return {
                currentActive: '',
            }
        },

        computed: {

        },

        methods: {
            tabChange(item) {
                this.currentActive = item;
                Vue.nextTick(()=>{
                    this.$emit('tabChange',item);
                });
            },
            getWidth(){
                return 1/status.length*100 + '%';
            }
        }
    }
</script>
<style lang="less" scoped>
    .bar-list-warp {
        position: relative;
        padding: 10px 0 0 10px;

        .bar-list {
            width: 16.5rem;

            /*justify-content: space-between;*/
            position: relative;
            flex-grow: 1;

            .bar-item {
                background: white;
                flex: 1;
                height: 1.22rem;
                position: relative;
                cursor: pointer;
                margin-right: 0.15rem;

                .content-holder {
                    margin-right: 0.3rem;
                    margin-top: 0;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    .num {
                        text-align: right;
                        font-size: 0.4rem;
                        height: 0.2rem;
                    }

                    .text {
                        text-align: right;
                    }
                }
                &:last-child {
                    margin-right: 0;
                }
            }

            .item-total {
                .content-holder {
                    .num {
                        color: #0047c8;
                    }

                    .text {
                        color: black;
                    }
                }
            }

            .item-noDataToday {
                .content-holder {
                    .num {
                        color: #d6691f;
                    }

                    .text {
                        color: black;
                    }
                }
            }

            .item-noDataWeek {
                .content-holder {
                    .num {
                        color: #233b7d;
                    }

                    .text {
                        color: black;
                    }
                }
            }

            .icon {
                background-size: contain;
                height: 0.9rem;
                width: 0.9rem;
                position: absolute;
                top: 0.16rem;
                left: 0.3rem;
            }

            .icon-total {
                background-image: url('../image/tab-block/icon-total-active.png');
            }

            .icon-noDataToday {
                background-image: url('../image/tab-block/icon-today-active.png');
            }

            .icon-noDataWeek {
                background-image: url('../image/tab-block/icon-week-active.png');
            }

            .total {
                background: linear-gradient(to right, #0084ff , #0047c8);

                .icon-total {
                    background-image: url('../image/tab-block/icon-total-normal.png');
                }

                .content-holder {
                    .num {
                        color: white;
                    }

                    .text {
                        color: white;
                    }
                }
            }

            .noDataToday {
                background: linear-gradient(to right, #f99450 , #d6691f);
                .icon-noDataToday {
                    background-image: url('../image/tab-block/icon-today-normal.png');
                }

                .content-holder {
                    .num {
                        color: white;
                    }

                    .text {
                        color: white;
                    }
                }
            }

            .noDataWeek {
                background: linear-gradient(to right, #5f76cc , #233b7d);
                .icon-noDataWeek {
                    background-image: url('../image/tab-block/icon-week-normal.png');
                }

                .content-holder {
                    .num {
                        color: white;
                    }

                    .text {
                        color: white;
                    }
                }
            }

            .item-bill {
                .icon-bill {
                    background-image: url('../image/tab-block/bill-normal.png');
                }
                .content-holder {
                    .num {
                        color: #48a15c;
                    }
                }
            }

            .item-check {
                .icon-check {
                    background-image: url('../image/tab-block/check-normal.png');
                }
                .content-holder {
                    .num {
                        color: #1266f1;
                    }
                }
            }

            .item-double {
                .icon-double {
                    background-image: url('../image/tab-block/double-normal.png');
                }
                .content-holder {
                    .num {
                        color: #cc814f;
                    }
                }
            }

            .bill {
                background: linear-gradient(to right, #5eb172 , #238c3b);
                .icon-bill {
                    background-image: url('../image/tab-block/bill-active.png');
                }
            }

            .check {
                background: linear-gradient(to right, #0084ff , #0047c8);
                .icon-check {
                    background-image: url('../image/tab-block/check-active.png');
                }
            }

            .double {
                background: linear-gradient(to right, #f99450 , #d6691f);
                .icon-double {
                    background-image: url('../image/tab-block/double-active.png');
                }
            }


            .active-item {
                .content-holder {
                    .num {
                        color: white;
                    }

                    .text {
                        color: white;
                    }
                }
            }
        }

        .border {
            border: 1px solid #e1e1e1;
        }
    }



</style>
<style lang="less">
    @import "../../resource/style/trans";
</style>