<template>
    <app-page class="index-img-holder">
        <div @click="go">
            <img src="../../resource/image/home/d.jpg" alt="">
            <img src="../../resource/image/home/b.jpg" alt="">
            <img src="../../resource/image/home/c.jpg" alt="">
        </div>
        <!--<div @click="go" style="text-align: center; background: black;height: 50px;line-height: 50px;font-size: 20px;color: white;">进入管理界面</div>-->
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
    padding: 0px;
    width: 100%;
    img {
        width: 100%;
    }
    .p-holder {
        text-align: center;
        .desc-holder {
            padding: 20px;
            line-height: 30px;
            text-align: left;
        }
    }
}
</style>