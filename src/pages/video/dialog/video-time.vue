<template>
  <app-form @save="save" :model="postData" class="unit-select" ref="form" label-width="110px">
    <app-formitem label="播放次数" prop="ntimes" :rules="rules.ntimes">
      <app-input type="number" v-model="postData.ntimes" placeholder="请输入" style="width: 200px"></app-input>
    </app-formitem>
  </app-form>
</template>

<script type="text/ecmascript-6">
  /**
   * Created by 周文博 on 2017/5/12.
   */
  import page from '@Pub/page';
  import Http from '@Pub/http';
  import validate from '@Pub/validate';

  export default {
    data(){
      return {
        postData: {
          ntimes: '',
        },
        rules: {
          ntimes: validate.required('请填写'),
        },
      }
    },
    mixins: [page],
    methods: {
      save() {
        let url = ''
        url = '/modifyPlaytimes'
        this.saveData(url,this.postData).then(res=>{

        })
      }
    },
    mounted(){
      this.postData.vid = this.data.vid
      this.postData.ntimes = this.data.playtimes
    }
  };

</script>
<style lang="less" scoped rel="stylesheet/less">
  .bm-view {
    height: 100%;
    width: 100%;
    .map {
      height: 400px;
    }
  }
</style>
