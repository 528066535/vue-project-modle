<template>
    <div class="test-holder page-holder">
        <div class="nav-holder">
            <van-nav-bar title="" left-text="刷新">
                <template #right>
                    <van-icon name="search" size="18"/>
                </template>
            </van-nav-bar>
        </div>
        <div class="test-holder">
            <div style="overflow: auto;height: 100%">
                <van-button>你好</van-button>
                <div style="height: 400px; background: red;">
                    <div style="position: relative; z-index: 1000;height: 400px; width: 200px; margin: auto;">
                        <stack ref="stack" :pages="someList" :stackinit="stackinit"></stack>
                    </div>
                </div>
                <van-button>你好</van-button>
                <div style="height: 400px; background: red;"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import stack from 'vue-tantan-stack'
    export default {
        components: {
            stack
        },
        data() {
            return {
                someList: [],
                stackinit: {
                    visible: 3
                }
            }
        },
        created() {

        },

        mounted() {
            let that = this
            setTimeout(function () {
                that.someList = [
                    { html: '<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg" alt="01">' },
                    { html: '<img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg" alt="02">' }
                ]})
        },

        methods: {},
    }

</script>
<style lang="less" scoped rel="stylesheet/less">
    .test-holder {
        width: 100%;
    }
</style>