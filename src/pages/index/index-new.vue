<template>
    <app-page class="index-img-holder">
        <div>
            <img @click="go" src="../../resource/image/home/1.jpg" alt="">
            <img src="../../resource/image/home/2.jpg" alt="">
            <img src="../../resource/image/home/3.jpg" alt="">
            <img src="../../resource/image/home/4.jpg" alt="">
            <img src="../../resource/image/home/5.jpg" alt="">
            <img src="../../resource/image/home/6.jpg" alt="">
            <img src="../../resource/image/home/7.jpg" alt="">
            <img src="../../resource/image/home/8.jpg" alt="">
            <img src="../../resource/image/home/9.jpg" alt="">
            <img src="../../resource/image/home/10.jpg" alt="">
            <img src="../../resource/image/home/11.jpg" alt="">
            <img src="../../resource/image/home/12.jpg" alt="">
            <img src="../../resource/image/home/13.jpg" alt="">
            <img src="../../resource/image/home/14.jpg" alt="">
            <img src="../../resource/image/home/15.jpg" alt="">
            <img src="../../resource/image/home/16.jpg" alt="">
            <img src="../../resource/image/home/17.jpg" alt="">
        </div>
        <div @click="go" style="text-align: center; background: black;height: 50px;line-height: 50px;font-size: 20px;color: white;">进入管理界面</div>
    </app-page>
</template>
<script>
    import router from '@Pub/router';

    export default {
        data() {
            return {
                conditions: {
                    loginname: ''
                }
            }
        },
        created() {

        },

        mounted() {

        },

        methods: {
            go() {
                router.go('/login')
            },
        },
    }

</script>
<style lang="less" scoped rel="stylesheet/less">
.index-img-holder {
    width: 100%;
    img {
        width: 100%;
    }
}
</style>