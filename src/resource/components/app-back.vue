<template>
    <div class="dashboard__back detail-page" :class="{shadow: shadow}" v-if="backName">
        <a class="back-button" v-if="backName" @click="back"><i class="icon icon-back"></i>{{backName}}</a>
        <slot></slot>
    </div>
</template>

<script>
    /**
     * Created by 周文博 on 2017/9/22.
     */
    import router from '@Pub/router';
    import ev from '@Pub/ev';
    import http from '@Pub/http';
    import routerMenu from '@Pub/router/router-menu'

    export default {
        props: {
            logoName: String,

            shadow: {
                type: Boolean,
                default: false
            }
        },

        watch: {
            '$route'(to, from) {
                this.updateBackName(to)
            }
        },

        data(){
            let allMenus = routerMenu.routers.filter(menu => {
                return menu.id !== 'system';
            });

            return {
                showMessage: false,
                backName: router.param.fn?decodeURIComponent(router.param.fn):'',
            }
        },

        methods: {
            getUrl(model){
                this.showModes = false;
                if(model.url.indexOf('http://') >= 0 || model.url.indexOf('https://') >= 0){
                    model.url = model.url.replace('/dashboardhttp', 'http');
                    window.open(model.url, '_blank');
                }else if(model.url.indexOf('/screen/situation') >= 0){
                    window.open(location.protocol + '//' + location.host + '#' + model.url, '_blank');
                }else{
                    router.go(model.url, {menu: model.id});
                }
            },
            back(){
                router.back();
            },

            direct(url, type){
                router.go(url);
            },

            updateBackName(to){
                this.backName = to.query.fn;
            }
        },

        destroyed(){
            ev.off('router-change',this.updateBackName);
        },

        created(){
            ev.on('router-change',this.updateBackName);
        },

        mounted(){
            $(document).on('mouseenter', '.mode-switch .mode-item', function () {
                const $that = $(this);
                if(!$that.is(':animated')){
                    window.setTimeout(() => {
                        $that.removeClass('animated');
                    }, 1000);

                    $that.addClass('animated');
                }
            });
        }
    }
</script>
<style lang="less">
    @import "../../resource/style/trans";

    .dashboard__back{
        height: 40px;
        line-height: 40px;
        position: relative;
        z-index: 0;
        /*margin-top: 0.16rem;*/
        /*margin-left: 0.16rem;*/
        background: white;

        .logo-wrap{
            font-size: 18px;
            color: #323437;
            line-height: 52px;
            .logo{
                display: inline-block;
                width: 36px;
                height: 36px;
                margin-right: 10px;
                margin-left: 7px;
                position: relative;
                top: -4px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .back-button{
            display: inline-block;
            line-height: 40px;
            vertical-align: top;
            padding-left: 10px;
            cursor: pointer;
            font-size: 14px;
            color: #3b3b3b;
        }

        .icon{
            width: 20px;
            height: 20px;
            vertical-align: super;
            margin-right: 22px;
            position: relative;
            z-index: 4;
            cursor: pointer;
            &.icon-navigation-bar{
                background-image: data-uri('../pub/image/nav/navigation-bar.png');width: 16px;height: 16px;position: relative;top: -2px;
                &:hover{background-image:  data-uri('../pub/image/nav/navigation-bar-hover.png');}
            }
            &.icon-message{
                background-image: data-uri('../pub/image/nav/message.png');
                &:hover{background-image: data-uri('../pub/image/nav/message-hover.png');}
                position: relative;
                .red-dot{
                    display: block;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #f08494;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
            &.icon-back{
                background-image: data-uri('../pub/image/nav/icon-back.png');
                margin-right: 12px;
                vertical-align: middle;
                position: relative;
                top: -1px;
            }
            &.icon-mode-search{
                background-image: data-uri('../pub/image/nav/icon-mode-search.png');
            }
        }

        &.shadow{
            box-shadow: 0 1px 5px #d5d9df;
            height: 64px;
            .logo-wrap{
                line-height: 64px;
            }

            & > .fr{
                margin-top: 14px !important;
            }

            &.no-shadow{box-shadow: none;}
        }
    }

    .keywords{
        font-size: 16px;
        color: #4285f4;
    }


    .mode-switch{
        bottom: 0;
        top: 40px !important;
        border-radius: 0;
        margin-right: -5px;
    }

    .mode-wrap{
        background: data-uri('../pub/image/nav/menu-background.png') center no-repeat;
        background-size: cover;
        height: 100%;
        width: 280px;
        .mode{
            padding: 20px 15px 20px 20px;
            height: 100%;

            .search-bar{
                .search-input{
                    height: 30px;
                    line-height: 30px;
                    border-radius: 15px;
                    padding-left: 40px;
                    color: #fff;
                    width: 198px;
                    background: #192252 data-uri('../pub/image/nav/icon-mode-search.png') 15px center no-repeat;
                    border: 1px solid rgba(38, 50, 119, 0.4);
                }
            }

            .mode-items{
                padding-top: 35px;

                .mode-items-row{
                    width: 245px;
                    .box();
                    margin-bottom: 3px;

                    .mode-item{
                        cursor: pointer;
                        position: relative;
                        display: block;
                        .box-flex(1);
                        height: 100px;
                        margin-right: 3px;
                        overflow: hidden;
                        background: rgba(8, 45, 94, 0.4);

                        .inner{
                            position: absolute;
                            left: 0;
                            right: 0;
                            top: 50%;
                            .translate(0, -50%);
                            .background{
                                width: 60px;
                                height: 60px;
                                margin: auto;
                                background-position: center;
                                background-repeat: no-repeat;
                                background-size: 100%;
                            }

                            p{
                                text-align: center;
                                margin-top: 6px;
                                font-size: 12px;
                                color: #fff;
                            }
                        }

                        &.handle{
                            .background{
                                background-image: data-uri("../pub/image/nav/background-handle.png");
                            }
                        }

                        &.monitor{
                            .background{
                                background-image: data-uri("../pub/image/nav/background-monitor.png");
                            }
                        }

                        &.protection{
                            .background{
                                background-image: data-uri("../pub/image/nav/background-protection.png");
                            }
                        }

                        &.bill{
                            .background{
                                background-image: data-uri("../pub/image/nav/background-disposal.png");
                            }
                        }

                        &.trace{
                            .background{
                                background-image: data-uri("../pub/image/nav/background-source.png");
                            }
                        }

                        &.spy{
                            .background{
                                background-image: data-uri("../pub/image/nav/background-scout.png");
                            }
                        }

                        &.direct{
                            .background{
                                background-image: data-uri("../pub/image/nav/background-command.png");
                            }
                        }

                        &.information{
                            .background{
                                background-image: data-uri("../pub/image/nav/background-threat.png");
                            }
                        }

                        &.screen_situation{
                            .background{
                                background-image: data-uri("../pub/image/nav/background-overview.png");
                            }
                        }
                        &.exercise{
                            .background{
                                background-image: data-uri("../pub/image/nav/background-defense.png");
                            }
                        }

                        &.animated{
                            .animation(flipInY, 1s, 1);
                        }

                        .borderBox();
                    }
                }
            }

            .search-model-item .mode-icon{
                position: relative;
                &:after{
                    content: '';
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-repeat: no-repeat !important;
                    background-position: center !important;
                    background-size: 100% auto;
                }
                &.handle:after{
                    background-image: data-uri('../pub/image/nav/background-handle.png');
                }

                &.monitor:after{
                    background-image: data-uri('../pub/image/nav/background-monitor.png');
                }

                &.protection:after{
                    background-image: data-uri('../pub/image/nav/background-protection.png');
                }

                &.disposal:after,&.bill:after{
                    background-image: data-uri('../pub/image/nav/background-disposal.png');
                }

                &.trace:after{
                    background-image: data-uri('../pub/image/nav/background-source.png');
                }

                &.spy:after{
                    background-image: data-uri('../pub/image/nav/background-scout.png');
                }

                &.command:after,&.direct:after{
                    background-image: data-uri('../pub/image/nav/background-command.png');
                }

                &.information:after{
                    background-image: data-uri('../pub/image/nav/background-threat.png');
                }

                &.screen_situation:after{
                    background-image: data-uri('../pub/image/nav/background-overview.png');
                }

                &.exercise:after{
                    background-image: data-uri('../pub/image/nav/background-defense.png');
                }
            }
            .mode-search-results{
                .empty{
                    font-size: 16px;
                    color: #fff;
                    padding-top: 188px;
                    text-align: center;
                }

                .search-models{
                    margin: 20px 20px 0 0;
                    background: rgba(255,255,255,0.1);
                    .title{
                        line-height: 42px;
                        padding: 0 16px;
                        font-size: 14px;
                        color: #fff;
                    }

                    .search-model-item{
                        border-top: 1px solid rgba(255,255,255,0.05);
                        overflow: hidden;
                        padding: 16px;
                        cursor: pointer;
                        display: block;
                        .mode-icon{
                            width: 56px;
                            height: 56px;
                        }
                        .content{
                            margin-left: 66px;
                            margin-right: 0;
                            position: relative;
                            height: 56px;

                            p{
                                font-size: 16px;
                                color: #fff;
                                position: absolute;
                                top: 50%;
                                margin-top: -4px;
                                .translate(0, -50%);
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                                width: 100%;

                                &:nth-child(2), &:nth-child(2) span{
                                    font-size: 14px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .mode-switch{
        &.dark[x-placement^=bottom] .popper__arrow:after{
            border-bottom-color: #072c5e;
        }
    }


    @-webkit-keyframes flipInY {
        0% {
            -webkit-transform: perspective(400px) rotateY(90deg);
            opacity: 0;
        }

        40% {
            -webkit-transform: perspective(400px) rotateY(-10deg);
        }

        70% {
            -webkit-transform: perspective(400px) rotateY(10deg);
        }

        100% {
            -webkit-transform: perspective(400px) rotateY(0deg);
            opacity: 1;
        }
    }
    @-moz-keyframes flipInY {
        0% {
            -moz-transform: perspective(400px) rotateY(90deg);
            opacity: 0;
        }

        40% {
            -moz-transform: perspective(400px) rotateY(-10deg);
        }

        70% {
            -moz-transform: perspective(400px) rotateY(10deg);
        }

        100% {
            -moz-transform: perspective(400px) rotateY(0deg);
            opacity: 1;
        }
    }
    @-o-keyframes flipInY {
        0% {
            -o-transform: perspective(400px) rotateY(90deg);
            opacity: 0;
        }

        40% {
            -o-transform: perspective(400px) rotateY(-10deg);
        }

        70% {
            -o-transform: perspective(400px) rotateY(10deg);
        }

        100% {
            -o-transform: perspective(400px) rotateY(0deg);
            opacity: 1;
        }
    }
    @keyframes flipInY {
        0% {
            transform: perspective(400px) rotateY(90deg);
            opacity: 0;
        }

        40% {
            transform: perspective(400px) rotateY(-10deg);
        }

        70% {
            transform: perspective(400px) rotateY(10deg);
        }

        100% {
            transform: perspective(400px) rotateY(0deg);
            opacity: 1;
        }
    }
</style>