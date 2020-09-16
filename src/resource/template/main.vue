<template>
  <div class="main-warp">
    <div class="main-header">
      <div class="header-holder">
        <div class="logo-holder">
          <img src="" alt="LOGO">
          <span>平台名称</span>
        </div>
        <div class="top-menu-holder">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                   text-color="#fff">
            <el-menu-item v-for="(item) in menus" :index="item.path" :key="item.path">
              {{item.name}}
            </el-menu-item>
          </el-menu>
        </div>
        <div class="right-holder">
          <el-dropdown @command="clickDrop">
            <span class="el-dropdown-link">
              姓名<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">设置用户</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="main-body">
      <div class="main-menu">
        <el-menu
          :default-active="activeSubIndex"
          class="el-menu-vertical-demo"
          text-color="#fff"
          @select="handleSelectSub"
        >
          <el-menu-item v-for="item in subMenus.children" :index="item.path" :key="item.path" v-if="!item.meta.isDetail">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main-content">
        <div class="menu-back-holder" v-if="backObj.name && backObj.isDetail">
          <a class="back-button" @click="back"><i class="icon el-icon-arrow-left"></i><span>{{backObj.name}}</span></a>
        </div>
        <div class="main-view">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import routerMenu from "@Pub/router/router-menu";
  import router from "@Pub/router";
  import Util from "@Core/util";

  export default {
    data() {
      return {
        menus: routerMenu.routers,
        currentUrl: '',
        activeIndex: '',
        subMenus: [],
        activeSubIndex: '',
        backObj: {}
      }
    },
    computed: {
    },
    watch: {
      '$route'(to, from){
        console.log(this.$route)
        this.backObj = {
          name: this.$route.query.fn,
          isDetail: this.$route.meta.isDetail
        }
        if(to.path === from.path){
          //同一个地址参数变化，刷新当前页isEvaluate面
          window.location.reload();
        } else {
          this.currentUrl = router.url.split('?')[0].replace('/dashboard/', '/')
          this.activeIndex = this.currentUrl ? this.currentUrl.split('/')[1] : ''
          let pathKey = this.currentUrl ? this.currentUrl.split('/')[1] : []
          this.subMenus = Util.getByKey(this.menus, 'path', pathKey)
          this.activeSubIndex = this.currentUrl ? this.currentUrl.split('/')[2] : ''
        }
      }
    },
    mounted() {
      this.backObj = {
        name: this.$route.query.fn,
        isDetail: this.$route.meta.isDetail
      }
    },
    created() {
      this.currentUrl = router.url.split('?')[0].replace('/dashboard/', '/')
      this.activeIndex = this.currentUrl ? this.currentUrl.split('/')[1] : ''
      let pathKey = this.currentUrl ? this.currentUrl.split('/')[1] : []
      this.subMenus = Util.getByKey(this.menus, 'path', pathKey)
      this.activeSubIndex = this.currentUrl ? this.currentUrl.split('/')[2] : ''
    },
    methods: {
      clickDrop(item) {
        switch (item) {
          case 'logout':
            Util.clearToken()
            this.$router.push('/login')
            break
        }
      },
      back() {
        router.back()
      },
      handleSelect(path) {
        router.go(`/dashboard/${path}`)
      },
      handleSelectSub(path) {
        router.go(`/dashboard/${this.activeIndex}/${path}`)
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../resource/css/value.less";

  .main-warp {
    display: flex;
    flex-direction: column;
    height: 100%;

    .main-header {
      height: @header-height;
      line-height: @header-height;
      color: white;

      .header-holder {
        display: flex;
        background: @color-background-header;
      }

      .logo-holder {
        width: @side-width;
        text-align: center;
      }

      .top-menu-holder {
        flex: 1;

        .el-menu {
          background: @color-background-header;
        }

        .el-menu--horizontal {
          border-bottom: none;
        }

        .el-menu--horizontal > .el-menu-item.is-active {
          background: @color-background-header;
          color: @color-link;
        }

        .el-menu-item:hover, .is-active {
          background: @color-background-header-active;
        }

        .el-menu--horizontal > .el-menu-item {
          height: @header-height;
          line-height: @header-height;
          font-size: 16px;
        }
      }

      .right-holder {
        width: @side-width;
        text-align: right;
        padding: 0 20px;
      }
    }

    .el-menu {
      border-right: none;
    }

    .main-body {
      display: flex;
      flex: 1;
      height: 100%;
      overflow: hidden;

      .main-menu {
        width: @side-width;
        height: 100%;
        flex-direction: column;
        overflow: auto;
        background: @color-background-side;

        .el-menu-item {
          background: @color-background-side;
        }

        .el-menu-item:hover, .is-active {
          background: @color-background-side-active;
        }
      }

      .main-content {
        display: flex;
        overflow: hidden;
        width: 0;
        flex: 1;
        flex-direction: column;

        .main-view {
          height: 100%;
          width: 100%;
        }

        .main-view > div {
          display: flex;
          flex-direction: column;
          flex: 1;
          height: 100%;
          width: 100%;
          background: #f5f5f5;

          .table-container{
            overflow: hidden;
            flex: 1;
            padding-left: 10px;
          }
        }
      }

    }

    .el-dropdown-link {
      cursor: pointer;
      color: @color-link;
    }

    .menu-back-holder {
      width: 100%;
      height: 50px;
      line-height: 50px;
      position: relative;
      z-index: 0;
      background: white;
      .back-button{
        display: inline-block;
        line-height: 50px;
        vertical-align: top;
        padding-left: 10px;
        cursor: pointer;
        font-size: 16px;
        color: #3b3b3b;
        span {
          margin-left: 2px;
        }
      }
    }
  }

</style>