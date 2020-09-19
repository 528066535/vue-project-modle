<template>
  <div class="relate-wrap">
    <div class="form-wrap">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="phone"
          label="手机号"
          placeholder="请输入绑定的手机号"
          :rules="[{ required: true, validator: phone, message: '请填写手机号' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            绑定
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
  import wx from 'weixin-js-sdk'
  import http from '@Pub/http'
  import { Dialog, Toast } from 'vant'

  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    mounted () {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名，见附录1
        jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })

      wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        console.log('配置成功')
      });

      wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(res)
        Dialog({ message: '微信配置失败，请联系管理员' })
      });
    },
    methods: {
      phone(val) {
        return new Promise((resolve) => {
          resolve(/^1[0-9]{10}$/.test(val+''))
        })
      },

      onSubmit(values) {
        Toast.loading('验证中...');
        http.get('abc').then(data => {
          console.log(data)
        })
        setTimeout(() => {
          Toast.clear();
          console.log(values)
        }, 1000)
      }
    }
  }
</script>
<style lang="less">
.relate-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .form-wrap {
    height: 300px;
    width: 100%;
  }
}
</style>