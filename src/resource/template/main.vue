<template>
  <div class="main-warp">
    <div class="main-content">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/dashboard">图</van-tabbar-item>
      <van-tabbar-item icon="friends-o">消息</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0
      }
    },
    mounted() {

    },
    created() {

    },
    methods: {}
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .main-warp {
    width: 100%;
    height: 100%;

    .main-content {
      height: calc(100% - 50px);
    }
  }
</style>