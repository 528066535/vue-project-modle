<template>
    <div class="disposal-step">
        <div class="disposal-step__item-wrap" v-for="(step, index) in data" :key="index" v-if=" index < openLength || (isOpen && index>=openLength)">
            <div class="disposal-step__item"  >
                <div class="disposal-step__time"></div>
                <div class="disposal-step__result">
                    <p class="disposal-step__result-title">{{step[resultKey]}}<a @click="open(index)" class="fr" v-if="step.resolvement">{{openIndex[index]?'收起':'展开'}}<i class="icon icon-progress-down" :class="{'icon-progress-up':openIndex[index]}"></i></a></p>
                    <pre class="disposal-step__result-measures" v-show="step.resolvement && openIndex[index]" >{{step.resolvement}}</pre>
                    <p class="disposal-step__result-time">{{step[timeKey] | date('yyyy-MM-dd hh:mm:ss')}}</p>
                </div>
            </div>
            <div class="disposal-step__line" v-if=" (isOpen?data.length:data.length>openLength?openLength:data.length) - 1 > index"></div>

        </div>
        <div class="disposal-step__item" style="line-height: 30px;">
            <a style="margin-left: 50px; cursor: pointer;" v-if="data && data.length>openLength" @click="isOpen = !isOpen">{{isOpen?'收起':'展开'}}</a>
        </div>
    </div>
</template>

<script>
    /**
     * Created by 周文博 on 2017/4/21.
     */
    export default {
        props: {
            data: Array,

            timeKey: {
                type: String,
                default: 'clsj'
            },

            resultKey: {
                type: String,
                default: 'cljg'
            },

            openLength: {
                type: Number,
                default: 5
            }
        },

        data(){
            return {
                openIndex: {},
                dataList: [],
                isOpen :false
            }
        },
        
        watch:{

        },

        methods: {
            open(index){
                Vue.set(this.openIndex, index, !this.openIndex[index]);
            }
        }
    }
</script>

<style lang="less">
    @import "../style/trans";

    .disposal-step{
        min-height: 1px;
        .disposal-step__item{
            overflow: hidden;
            .disposal-step__time{float: left;}

            .disposal-step__time{
                width: 40px;
                height: 20px;
                text-align: center;
                position: relative;

                &:after{
                    content: '';
                    display: block;
                    width: 11px;
                    height: 11px;
                    border-radius: 50%;
                    top:50%;
                    left: 50%;
                    margin: -5.5px 0 0 -5.5px;
                    background: #dedede;
                    position: absolute;
                }
            }

            .disposal-step__result{
                margin-left: 50px;
                margin-right: 0;
                font-size: 14px;
            }
        }

        .disposal-step__line{
            display: block;
            width: 1px;
            background: #dedede;
            margin-top: 1px;
            position: absolute;
            top: 10px;
            bottom: -50px;
            left: 20px;
        }

        .disposal-step__result-time{
            font-size: 14px;
            color: #9f9f9f;
            margin-top: 14px;
        }

        .disposal-step__result-title{
            font-size: 16px;
        }

        .disposal-step__result-measures{
            margin-top: 14px;
            line-height: 24px;
            color: #a4a4a4;
            word-break: break-all;
            max-width: 60%;
            font-size: 14px;
        }

        .disposal-step__result-title{
            width: 490px;

            .fr{
                cursor: pointer;
                .icon-progress-down{
                    background-image: data-uri('../image/icon-prgress-down.png');margin-left: 3px;position: relative;top: -1px;
                    &.icon-progress-up{
                        .rotateZ(180deg);
                    }
                }
                color: #4d99f4;
            }
        }

        .disposal-step__item-wrap{
            position: relative;
            margin-bottom: 40px;

            &:nth-child(1){
                .disposal-step__time{
                    &:after{
                        background: #4285f4;
                    }
                }

                .disposal-step__line{
                    top: 15px;
                }
            }

        }
    }
</style>