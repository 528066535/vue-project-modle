<template>
    <div class="main-warp">
        <div class="main-header" style="background: #f5f5f5">
            <app-hearder></app-hearder>
        </div>
        <div class="main-body">
            <div class="main-menu" style="background: rgb(48, 65, 86)">
                <app-menu></app-menu>
            </div>
            <div class="main-content">
                <app-back></app-back>
                <div class="dashboard__container">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import appMenu from '../components/app-menu'
    import appHearder from '../components/app-header'
    import appBack from '../components/app-back'
    export default {
        components: {
            appMenu,
            appHearder,
            appBack
        },
        data() {
            return {

            }
        },
        mounted() {

        },
        created() {

        },
        methods: {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
    .main-warp {
        display: flex;
        flex-direction: column;
        height: 100%;

        .main-header {
            height: 60px;
            width: 100%;
        }

        .main-body {
            display: flex;
            flex: 1;
            height: 100%;
            overflow: hidden;

            .main-menu {
                height: 100%;
                flex-direction: column;
            }

            .main-content {
                display: flex;
                overflow: hidden;
                width: 0;
                flex: 1;
                flex-direction: column;

                .dashboard__container {
                    background: #f5f5f5;
                    flex: 1;
                    background: #f5f5f5;
                    overflow: hidden;

                    &div{
                        height: 100%;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                    }
                }
            }
        }
    }
</style>