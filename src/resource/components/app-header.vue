<template>
    <div class="dashboard__header" :class="{shadow: shadow}">
        <div class="fl logo-wrap" @click="goIndex">
            <div class="logo" style="display: inline-block">
                <!--logo-->
                <img src="../image/logo-s.png" onerror="this.src='../image/logo-s.png'"/>
            </div>
        </div>

        <div class="fr" style="position: relative;z-index: 4;top: 50%;margin: -0.15rem 10px;">
            <el-dropdown @command="handleClick">
              <span class="el-dropdown-link m-link">
                {{USER}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    /**
     * Created by 周文博 on 2017/9/22.
     */
    import router from '@Pub/router';
    import dialog from '@Pub/dialog';
    import http from '@Pub/http';
    import util from '@Core/util';
    import Data from '@Core/data';

    export default {
        props: {
            logoName: String,

            shadow: {
                type: Boolean,
                default: false
            }
        },

        data() {

            return {
                messageCount: 0,

                USER: Data.getUser(),

                SYSTEM: {},

                newmessages: [],

                modeSearchText: '',

                showModes: false
            }
        },

        computed: {},

        methods: {
            goIndex() {
                router.go('/index')
            },
            getUrl(model) {
                this.showModes = false;
                if (model.url.indexOf('http://') >= 0 || model.url.indexOf('https://') >= 0) {
                    model.url = model.url.replace('/dashboardhttp', 'http');
                    window.open(model.url, '_blank');
                } else if (model.url.indexOf('/screen/situation') >= 0) {
                    window.open(location.protocol + '//' + location.host + '#' + model.url.replace('/dashboard/', '/'), '_blank');
                } else {
                    router.go(model.url, {menu: model.id});
                }
            },
            back() {
                router.back();
            },

            direct(url, type) {
                router.go(url);
            },

            handleClick(command) {
                switch (command) {
                    case 'logout':
                        dialog.confirm('确定要退出登录?').then(() => {
                            util.logout();
                        });
                        break;
                    case 'changePassword':
                        import(/* webpackChunkName: "resource/components/change-password-dialog" */'./change-password-dialog').then(component => {
                            dialog.open(component, {}, {
                                title: '修改密码',
                                width: 400,
                                parent: this
                            });
                        });
                        break;
                    default:
                        break;
                }
            }
        },

        destroyed() {

        },

        created() {

        },

        mounted() {
            $(document).on('mouseenter', '.mode-switch .mode-item', function () {
                const $that = $(this);
                if (!$that.is(':animated')) {
                    window.setTimeout(() => {
                        $that.removeClass('animated');
                    }, 1000);

                    $that.addClass('animated');
                }
            });
        },
    }
</script>
<style lang="less">
    @import "../../resource/style/trans";

    .dashboard__header {
        height: 60px;
        position: relative;
        z-index: 1001;
        background: linear-gradient(36deg, #53657b 0%, #1d4d7e 100%);
        box-shadow: 0 0.05rem 0.05rem rgba(0, 0, 0, 0.2);

        .el-dropdown-link {
            font-size: 16px;
            color: white;
        }
        .icon-exit {
            background: data-uri('../pub/image/back/back-exist.png');
            height: 0.3rem;
            width: 0.3rem;
        }

        .logo-wrap {
            font-size: 0.3rem;
            height: 60px;
            line-height: 60px;
            color: white;
            font-weight: 500;
            cursor: pointer;

            .logo {
                display: inline-block;
                /*width: 0.58rem;*/
                height: 40px;
                margin-right: 0.06rem;
                margin-left: 0.16rem;
                position: relative;
                top: 4px;

                img {
                    /*width: 100%;*/
                    height: 100%;
                    vertical-align: top;
                }
            }
        }

        .icon {
            width: 0.3rem;
            height: 0.3rem;
            vertical-align: super;
            margin-right: 0.12rem;
            position: relative;
            z-index: 4;
            cursor: pointer;
            background-size: 100% 100%;

            &.icon-home {
                background-image: data-uri('../pub/image/back/back-home.png');
            }

            &.icon-navigation-bar {
                background-image: data-uri('../pub/image/back/back-menu.png');
                position: relative;

                &:hover {
                    background-image: data-uri('../pub/image/back/back-menu.png');
                }
            }

            &.icon-message {
                background-image: data-uri('../pub/image/back/back-messaage.png');

                &:hover {
                    background-image: data-uri('../pub/image/back/back-messaage.png');
                }

                position: relative;

                .red-dot {
                    display: block;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #f08494;
                    position: absolute;
                    right: 0;
                    top: 0;
                }

                .dot {
                    width: 14px;
                    height: 14px;
                    line-height: 14px;
                    display: block;
                    border-radius: 50%;
                    background: #eb566c;
                    position: absolute;
                    right: -0.06rem;
                    top: -0.02rem;
                    font-size: 0.12rem;
                    color: #fff;

                    .big {
                        position: absolute;
                        top: -0.04rem;
                        display: block;
                        left: 0;
                        right: 0;
                        text-align: center;
                    }

                    .number {
                        display: block;
                        text-align: center;
                        .scale(0.8);
                    }
                }
            }

            &.icon-back {
                background-image: data-uri('../pub/image/nav/icon-back.png');
                margin-right: 10px;
                vertical-align: middle;
                position: relative;
                top: -1px;
            }

            &.icon-mode-search {
                background-image: data-uri('../pub/image/nav/icon-mode-search.png');
            }


        }

        &.shadow {
            box-shadow: 0 1px 5px #d5d9df;
            height: 64px;

            .logo-wrap {
                line-height: 64px;
            }

            & > .fr {
                /*margin-top: 14px !important;*/
            }

            &.no-shadow {
                box-shadow: none;
            }
        }
    }

    .keywords {
        font-size: 16px;
        color: #4285f4;
    }

    .user-card-wrap {
        .user-card {
            height: 140px;

            .user-content {
                padding: 24px;
                background: #fff;
                border-radius: 2px;
                overflow: hidden;
                .box();

                .avatar {
                    width: 90px;
                    height: 90px;
                    background-size: 100%;

                    & + div {
                        .box-flex(1);

                        p.name {
                            font-size: 16px;
                            color: #3b3b3b;
                        }

                        p.role-name {
                            font-size: 14px;
                            color: #5d5e64;
                            margin-top: 5px;
                            margin-bottom: 14px;
                        }
                    }
                }
            }

            .user-card-foot {
                height: 51px;
                .borderBox();
                background: #f5f5f5;
                border-top: 1px solid #ccc;
                padding: 10px 16px;
                border-radius: 0 0 2px 2px;
            }
        }
    }

    .message-list-wrap {

        .message-list {
            .message-list-title {
                line-height: 44px;
                position: relative;
                z-index: 2;
                background: #fff;
                padding: 0 16px;
                border-radius: 2px;
                border-bottom: 1px solid #dedede;

                span:nth-child(1) {
                    font-size: 14px;
                    color: #3b3b3b;
                }

                span.fr {
                    font-size: 12px;
                    color: #9f9f9f;
                    cursor: pointer;
                }
            }

            .message-list-item {
                font-size: 14px;
                color: #5d5e64;
                padding: 10.5px 16px;
                border-bottom: 1px solid #dedede;
                cursor: pointer;

                span.title {
                    color: #3b3b3b;
                }

                span.fr {
                    display: inline-block;
                    padding: 0 5px;
                    border-radius: 20px;
                    color: #fff;
                    font-size: 12px;
                    min-width: 14px;
                    text-align: center;

                    &.big-number {
                        position: relative;
                        width: 14px;
                        height: 16px;

                        &:after {
                            content: '...';
                            color: #fff;
                            font-size: 12px;
                            position: relative;
                            top: -3.5px;
                        }
                    }
                }

                &:nth-child(2) span.fr {
                    background: #559ef5;
                }

                &:nth-child(3) span.fr {
                    background: #ffab00;
                }

                &:nth-child(4) span.fr {
                    background: #da3610;
                }

                &:nth-child(5) span.fr {
                    background: #da3610;
                }
            }
        }

        .message-list-footer {
            text-align: center;
            line-height: 44px;
            font-size: 14px;
            color: #3b3b3b;
            cursor: pointer;
        }
    }

    .mode-switch {
        bottom: 0;
        top: 40px !important;
        border-radius: 0;
        margin-right: -5px;
    }

    .mode-wrap {
        background: data-uri('../pub/image/nav/menu-background.png') center no-repeat;
        background-size: cover;
        height: 100%;
        width: 280px;

        .mode {
            padding: 20px 15px 20px 20px;
            height: 100%;

            .search-bar {
                .search-input {
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

            .mode-items {
                padding-top: 35px;

                .mode-items-row {
                    width: 245px;
                    .box();
                    margin-bottom: 3px;

                    .mode-item {
                        cursor: pointer;
                        position: relative;
                        display: block;
                        .box-flex(1);
                        height: 100px;
                        margin-right: 3px;
                        overflow: hidden;
                        background: rgba(8, 45, 94, 0.4);

                        .inner {
                            position: absolute;
                            left: 0;
                            right: 0;
                            top: 50%;
                            .translate(0, -50%);

                            .background {
                                width: 60px;
                                height: 60px;
                                margin: auto;
                                background-position: center;
                                background-repeat: no-repeat;
                                background-size: 100%;
                            }

                            p {
                                text-align: center;
                                margin-top: 6px;
                                font-size: 12px;
                                color: #fff;
                            }
                        }

                        &.handle {
                            .background {
                                background-image: data-uri("../pub/image/nav/background-handle.png");
                            }
                        }

                        &.monitor {
                            .background {
                                background-image: data-uri("../pub/image/nav/background-monitor.png");
                            }
                        }

                        &.protection {
                            .background {
                                background-image: data-uri("../pub/image/nav/background-protection.png");
                            }
                        }

                        &.bill {
                            .background {
                                background-image: data-uri("../pub/image/nav/background-disposal.png");
                            }
                        }

                        &.trace {
                            .background {
                                background-image: data-uri("../pub/image/nav/background-source.png");
                            }
                        }

                        &.spy {
                            .background {
                                background-image: data-uri("../pub/image/nav/background-scout.png");
                            }
                        }

                        &.direct {
                            .background {
                                background-image: data-uri("../pub/image/nav/background-command.png");
                            }
                        }

                        &.information {
                            .background {
                                background-image: data-uri("../pub/image/nav/background-threat.png");
                            }
                        }

                        &.screen_situation {
                            .background {
                                background-image: data-uri("../pub/image/nav/background-overview.png");
                            }
                        }

                        &.exercise {
                            .background {
                                background-image: data-uri("../pub/image/nav/background-defense.png");
                            }
                        }

                        &.animated {
                            .animation(flipInY, 1s, 1);
                        }

                        .borderBox();
                    }
                }
            }

            .search-model-item .mode-icon {
                position: relative;

                &:after {
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

                &.handle:after {
                    background-image: data-uri('../pub/image/nav/background-handle.png');
                }

                &.monitor:after {
                    background-image: data-uri('../pub/image/nav/background-monitor.png');
                }

                &.protection:after {
                    background-image: data-uri('../pub/image/nav/background-protection.png');
                }

                &.disposal:after, &.bill:after {
                    background-image: data-uri('../pub/image/nav/background-disposal.png');
                }

                &.trace:after {
                    background-image: data-uri('../pub/image/nav/background-source.png');
                }

                &.spy:after {
                    background-image: data-uri('../pub/image/nav/background-scout.png');
                }

                &.command:after, &.direct:after {
                    background-image: data-uri('../pub/image/nav/background-command.png');
                }

                &.information:after {
                    background-image: data-uri('../pub/image/nav/background-threat.png');
                }

                &.screen_situation:after {
                    background-image: data-uri('../pub/image/nav/background-overview.png');
                }

                &.exercise:after {
                    background-image: data-uri('../pub/image/nav/background-defense.png');
                }
            }

            .mode-search-results {
                .empty {
                    font-size: 16px;
                    color: #fff;
                    padding-top: 188px;
                    text-align: center;
                }

                .search-models {
                    margin: 20px 20px 0 0;
                    background: rgba(255, 255, 255, 0.1);

                    .title {
                        line-height: 42px;
                        padding: 0 16px;
                        font-size: 14px;
                        color: #fff;
                    }

                    .search-model-item {
                        border-top: 1px solid rgba(255, 255, 255, 0.05);
                        overflow: hidden;
                        padding: 16px;
                        cursor: pointer;
                        display: block;

                        .mode-icon {
                            width: 56px;
                            height: 56px;
                        }

                        .content {
                            margin-left: 66px;
                            margin-right: 0;
                            position: relative;
                            height: 56px;

                            p {
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

                                &:nth-child(2), &:nth-child(2) span {
                                    font-size: 14px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .mode-switch {
        &.dark[x-placement^=bottom] .popper__arrow:after {
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