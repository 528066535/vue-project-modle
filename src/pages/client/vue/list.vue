<template>
  <div>
    <app-condition>
      <app-formitem label="商品状态">
        <app-select :local-data="statusList" @keyup="search" :localData="statusList" v-model="conditions.loginname"></app-select>
      </app-formitem>
      <app-formitem label="上架状态">
        <app-input @keyup="search" v-model="conditions.loginname"></app-input>
      </app-formitem>
      <app-formitem label="关键字">
        <app-input @keyup="search" v-model="conditions.loginname"></app-input>
      </app-formitem>
      <app-formitem>
        <app-button type="primary" size="mini" @click="search">搜索</app-button>
      </app-formitem>
      <div slot="toolbar">
        <app-button @click="addBus" icon="add">新建客户</app-button>
        <app-button @click="addBus" icon="add">绑定mm</app-button>
      </div>
    </app-condition>
    <div class="table-container">
      <app-table ref="table" :paging="false" :local-data="tableData" :param="getParams()">
        <el-table-column label="姓名" prop="loginname" align="center"></el-table-column>
        <el-table-column label="手机号码" prop="nickname" align="center"></el-table-column>
        <el-table-column label="标签" prop="email" align="center"></el-table-column>
        <el-table-column label="关联的业务经理" prop="addrcity" align="center"></el-table-column>
        <el-table-column label="最新的消费时间" prop="age" align="center"></el-table-column>
        <el-table-column label="累计消费次数" prop="addrcity" align="center"></el-table-column>
        <el-table-column  label="操作" align="center" width="310">
          <template slot-scope="scope">
            <app-button icon="edit" size="mini" @click="edit(scope.row)">上架</app-button>
            <app-button icon="edit" size="mini" @click="edit(scope.row)">编辑</app-button>
            <app-button icon="edit" size="mini" @click="edit(scope.row)">删除</app-button>
          </template>
        </el-table-column>
      </app-table>
    </div>
  </div>
</template>

<script>
  import Dialog from '@Pub/dialog';
  import Http from '@Pub/http';
  import js from '../js/client'

  export default {
    data() {
      return {
        conditions: {

        },
        tableData: [
          {
            loginname: '测试',
            nickname: '测试'
          },
          {
            loginname: '测试',
            nickname: '测试'
          },
          {
            loginname: '测试',
            nickname: '测试'
          },
          {
            loginname: '测试',
            nickname: '测试'
          },
          {
            loginname: '测试',
            nickname: '测试'
          },
          {
            loginname: '测试',
            nickname: '测试'
          },
          {
            loginname: '测试',
            nickname: '测试'
          },
          {
            loginname: '测试',
            nickname: '测试'
          },
          {
            loginname: '测试',
            nickname: '测试'
          },
          {
            loginname: '测试',
            nickname: '测试'
          }
        ],
        conditions: {
          loginname: ''
        }
      }
    },
    created() {

    },
    mixins: [js],

    mounted() {
    },

    methods:{
      addBus() {
        console.log('123')
        this.open()
      },
      open(row = null) {
        console.log('123')
        import(/* webpackChunkName: "pages/business/dialog/client-detail" */'../dialog/client-detail').then(component => {
            Dialog.open(component, row, {
            title: row ? '编辑' : '新增',
            width: 900,
            parent: this
          });
        });
      },
      getParams() {
        let params = this.conditions
        params.queryType = this.$route.query.type
        return params
      },
      search(){
        console.log(123)
      },
      add() {},
      edit(row) {

      }
    }
  }

</script>
<style lang="less" scoped rel="stylesheet/less">

</style>