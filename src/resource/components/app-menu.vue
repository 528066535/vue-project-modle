<template>
    <div class="dashboard__menu">
        <div style="height:1px;"></div>
        <div class="dashboard__menu-list">
            <app-page ref="page">
                <div style="width: 2rem;">
                    <template v-for="parentMenu in menu" v-if="parentMenu.meta.level.indexOf(level)>=0">
                        <router-link :class="{true:'link-active'}[!parentMenu.children && currentUrl===`/${parentMenu.path}`]" :to="{path: '/dashboard/' + parentMenu.path,query: {menu: menu.name}}" v-if="!parentMenu.children">
                            <div class="dashboard__menu-item">{{parentMenu.name}}</div>
                        </router-link>
                        <div v-else :class="{true:'link-active'}[!parentMenu.children && currentUrl===`/${parentMenu.path}`]" class="dashboard__menu-item dashboard__menu--parent" @click="openMenu(parentMenu, !parentMenu.open)">
                            <span >{{parentMenu.name}}</span>
                            <i class="el-icon-menu-right" :class="[parentMenu.open?'open':'close']"></i>
                        </div>
                        <div v-if="parentMenu.open && parentMenu.children">
                            <router-link v-if="childMenu.meta.level.indexOf(level)>=0" class="dashboard__menu-item" :class="{true:'link-active'}[currentUrl.includes(`/${parentMenu.path}/${childMenu.path}`)]" :to="{path: '/dashboard/' + parentMenu.path + '/' + childMenu.path, query: {menu: menu.name}}"  v-for="childMenu in parentMenu.children" :key="childMenu.id">
                                <!--<i class="icon" :style="{'background-image': 'url('+getIcon(parentMenu.path, childMenu)+'.png?v=20181213)'}"></i>-->
                                <span style="margin-left: 10px;">{{childMenu.name}}</span>
                            </router-link>
                        </div>
                    </template>
                    <div class="menu__empty" style="height: 30px;"></div>
                </div>
            </app-page>
        </div>
    </div>
</template>

<script>
    /**
     * Created by 周文博 on 2017/9/22.
     */
    import { RESOURCE_IMAGE} from '@Core/config';
    import router from "@Pub/router";
    import Data from '@Core/data'
    import routerMenu from "@Pub/router/router-menu";


    export default {
        props: {
            // menu: {
            //     type: Object,
            //     default: () => {return {
            //         name: '',
            //         id: '',
            //         child: []
            //     };}
            // },

            messageCount: {
                type: Object,
                default: () => {return {};}
            },

        },

        data(){
            return {
                level: Data.getLevel(),
                currentUrl: '',
                menu: routerMenu.routers
            }
        },

        watch: {
            menu(newData, oldData){
                if(newData.id !== oldData.id){
                    this.$refs.page.scrollTop();
                    this.$refs.page.update();
                }
            },

            '$route'(to, from){
                this.currentUrl = router.url.split('?')[0].replace('/dashboard/', '/')
                if (to.query.menu !== from.query.menu) {
                    this.init(this.menu);
                }
            }
        },

        methods: {
            getIcon(path, menu){
                const urlArr = menu.path;
                return '../pub/image/menu/icon-' + path + '-' + urlArr;
            },

            openMenu(menu, show) {
                if(menu.children) {
                    Vue.set(menu, 'open', show);
                }
            },

            init(newData){
                Vue.nextTick(() => {
                    if(newData){
                        for(let i = 0; i < newData.length; i++){
                            let child = newData[i].children;
                            this.openMenu(newData[i], false);
                            if(child){
                                let isMenuIn = child.filter(d => {
                                    return this.currentUrl.indexOf(`/${newData[i].path}/${d.path}`) >= 0;
                                });
                                if(isMenuIn.length > 0){
                                    this.openMenu(newData[i], true);
                                }
                            }
                        }
                    }
                });
            }
        },

        created(){

        },

        mounted(){
            Vue.nextTick(() => {
                let $currentItem = $(this.$el).find('.dashboard__menu-item.router-link-active');
                this.$refs.page.scrollTop($currentItem.index() * 50 - 100);
            });
            this.currentUrl = router.url.split('?')[0].replace('/dashboard/', '/')

            this.init(this.menu);
        },
    }
</script>
<style lang="less">
    @import "../../resource/style/trans";
    .dashboard__menu{
        width: 2rem;
        height: 100%;
        float: left;
        .box();
        .box-column();
        z-index: 1;

        .dashboard__logo--wrap{
            height: 2rem;
            /*background: rgba(8, 45, 94, 0.4);*/
            position: relative;

            .dashboard__logo--inner{
                position: absolute;
                top: 50%;
                width: 100%;
                text-align: center;
                .translate(0, -50%);

                .logo{
                    width: 100%;
                    height: 90px;
                    margin: auto;
                    img{
                        width: auto;
                        height: 100%;
                    }
                }

                p{
                    color: #fff;
                    font-size: 18px;
                    margin-top: 10px;
                    padding: 0 10px;
                }
            }
        }

        .menu__empty{
            height: 0;
        }

        .dashboard__menu-list{
            .box-flex(1);
            width: 2rem;
            overflow: hidden;

            a {
                text-decoration: none;
            }

            .link-active {
                color: rgb(64, 158, 255) !important;
                a {
                    color: rgb(64, 158, 255) !important;
                }
                .dashboard__menu-item {
                    color: rgb(64, 158, 255) !important;
                }
            }

            .dashboard__menu-item{

                &:hover {
                    background: #263445;
                    color: rgb(191, 203, 217);
                }
                padding: 16px 15px;
                display: block;
                text-decoration: none;
                color: rgb(191, 203, 217);
                font-size: 16px;
                line-height: 16px;
                /*background: #e6f7ff;*/
                cursor: pointer;

                a {
                    text-decoration: none;
                    color: rgb(191, 203, 217);
                    font-size: 14px;
                    /*background: #e6f7ff;*/
                    cursor: pointer;
                }

                &.dashboard__menu--parent{
                    font-size: 16px;
                    position: relative;
                    -webkit-user-select:none;
                    -moz-user-select:none;
                    -ms-user-select:none;
                    user-select:none;

                    .el-icon-menu-right {
                        line-height: 48px;
                        right: 10px;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        width: 20px;
                        cursor: pointer;
                        background: data-uri('../pub/image/menu/icon-menu-right-active.png') center no-repeat;
                        &:hover {
                            background: data-uri('../pub/image/menu/icon-menu-right-active.png') center no-repeat;
                        }
                    }

                    .open {
                        animation:openTransform 0.1s;
                        -moz-animation:openTransform 0.1s;
                        -webkit-animation:openTransform 0.1s;
                        -o-animation:openTransform 0.1s;
                        transform: rotate(90deg);
                    }

                    .close {
                        animation: closeTransform 0.06s;
                        -moz-animation:closeTransform 0.06s;
                        -webkit-animation:closeTransform 0.06s;
                        -o-animation:closeTransform 0.06s;
                        transform: rotate(0deg);
                    }

                    @keyframes openTransform
                    {
                        from {
                            -webkit-transform: rotate(0deg);
                            transform: rotate(0deg);
                        }
                        to {
                            -webkit-transform: rotate(90deg);
                            transform: rotate(90deg);
                        }
                    }

                    @-moz-keyframes openTransform /* Firefox */
                    {
                        from {
                            -webkit-transform: rotate(0deg);
                            transform: rotate(0deg);
                        }
                        to {
                            -webkit-transform: rotate(90deg);
                            transform: rotate(90deg);
                        }
                    }

                    @-webkit-keyframes openTransform /* Safari and Chrome */
                    {
                        from {
                            -webkit-transform: rotate(0deg);
                            transform: rotate(0deg);
                        }
                        to {
                            -webkit-transform: rotate(90deg);
                            transform: rotate(90deg);
                        }
                    }

                    @-o-keyframes openTransform /* Opera */
                    {
                        from {
                            -webkit-transform: rotate(0deg);
                            transform: rotate(0deg);
                        }
                        to {
                            -webkit-transform: rotate(90deg);
                            transform: rotate(90deg);
                        }
                    }

                    @keyframes closeTransform
                    {
                        from {
                            -webkit-transform: rotate(90deg);
                            transform: rotate(90deg);
                        }
                        to {
                            -webkit-transform: rotate(0deg);
                            transform: rotate(0deg);
                        }
                    }

                    @-moz-keyframes closeTransform /* Firefox */
                    {
                        from {
                            -webkit-transform: rotate(90deg);
                            transform: rotate(90deg);
                        }
                        to {
                            -webkit-transform: rotate(0deg);
                            transform: rotate(0deg);
                        }
                    }

                    @-webkit-keyframes closeTransform /* Safari and Chrome */
                    {
                        from {
                            -webkit-transform: rotate(90deg);
                            transform: rotate(90deg);
                        }
                        to {
                            -webkit-transform: rotate(0deg);
                            transform: rotate(0deg);
                        }
                    }

                    @-o-keyframes closeTransform /* Opera */
                    {
                        from {
                            -webkit-transform: rotate(90deg);
                            transform: rotate(90deg);
                        }
                        to {
                            -webkit-transform: rotate(0deg);
                            transform: rotate(0deg);
                        }
                    }
                }

                .unread-message{
                    border-radius: 2px;
                    background: #384259;
                    line-height: 22px;
                    padding: 0 7px;
                    text-align: center;
                    color: #fff;
                    float: right;
                }
            }
        }

        .icon{
            width: 22px;
            height: 22px;
            margin-right:4px;
            margin-left: 15px;
            position: relative;
            top: -1px;
            background-size: auto 100%;
        }
    }
</style>