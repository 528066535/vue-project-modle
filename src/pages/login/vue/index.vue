<template>
  <div class="login-wrap">
    <div class="login-holder">
      <div class="login">
        <div class="title-holder">
          <span class="title">欢迎登录</span>
        </div>
        <div class="item-holder">
          <div class="input-name-holder input-holder">
            <i class="icon icon-user"></i>
            <input type="text" autocomplete="new-password" v-model="user.account"
                   class="text-input input-name"
                   placeholder="请输入用户名">
          </div>
          <div class="input-password-holder input-holder">
            <i class="icon icon-lock"></i>
            <input type="password" autocomplete="new-password" v-model="user.password"
                   class="text-input input-password"
                   @keyup.enter="login" placeholder="请输入密码">
          </div>

          <div>
            <div class="remember-holder fr float-holder">
              <div class="checkbox">
                <input type="checkbox" id="agree-password" v-model="ck"/>
                <label for="agree-password" class="checkbox__display"></label>
                <label for="agree-password" class="checkbox__text">记住我</label>
              </div>
            </div>
          </div>

          <div class="btn-holder">
            <el-button type="primary" class="btn-login" @click="login">{{posting?'登录中...':'登录'}}
            </el-button>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import Data from '@Core/data'
  import router from '@Pub/router'

  export default {
    data() {
      return {
        posting: false,
        user: {},
        ck: false
      }
    },
    created() {
      let data = Data.getCount()
      this.user = data ? data : {}
    },

    mounted() {

    },

    methods: {
      login() {
        if (this.ck) {
          Data.setCount(this.user);
        } else {
          Data.removeCount()
        }
        router.go('/')
      }
    },
  }

</script>
<style lang="less" scoped rel="stylesheet/less">
.login-wrap {
  height: 100%;
  width: 100%;
  background: data-uri('../img/icon.png') center no-repeat;
  display: flex;
  flex-direction: row-reverse;

  .login-holder {
    width: 600px;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;

    .login {
      width: 300px;
      height: 300px;
      margin-bottom: 100px;

      .title-holder {
        text-align: center;
        height: 50px;
        line-height: 50px;
        margin: 20px;
      }
      .title {
        border-bottom: 2px solid blue;
        font-size: 24px;
        font-weight: bold;
      }
    }

    .item-holder {
      display: flex;
      flex-direction: column;
    }

    .input-holder .text-input {
      height: 50px;
      border-radius: 2px;
      -webkit-appearance: none;
      margin: 10px 0;
      font-size: 16px;
      float: right;
      border: none;
      border-bottom: 2px solid #3b8cff;
      width: 100%;
    }

    .btn-holder {
      margin: 30px 0;

      .btn-login {
        width: 100%;
      }
    }

    .input-name-holder {
      position: relative;
      display: inline-block;
    }

    .input-password-holder {
      position: relative;
      display: inline-block;
    }

    .icon {
      width: 30px;
      height: 30px;
      margin: 20px 0 12px;
      left: -30px;
      position: absolute;
    }

    .icon-user {
      background-image: data-uri('../img/login-icon-user.png');
    }

    .icon-lock {
      background-image: data-uri('../img/login-icon-password.png');
    }

    .remember-holder {
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>