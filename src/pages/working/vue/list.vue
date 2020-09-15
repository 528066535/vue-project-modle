<template>
  <div>
    <app-condition>
      <app-formitem label="手机号">
        <app-input @keyup="search" v-model="conditions.loginname"></app-input>
      </app-formitem>
      <app-formitem label="账号状态">
        <app-select :local-data="statusList" @keyup="search" :localData="statusList" v-model="conditions.loginname"></app-select>
      </app-formitem>
      <div slot="toolbar">
        <app-button @click="addBus" icon="add">新建员工</app-button>
      </div>
    </app-condition>
    <div class="table-container">
      <app-table ref="table" :paging="false" :local-data="tableData" :param="getParams()">
        <el-table-column label="姓名" prop="loginname" align="center"></el-table-column>
        <el-table-column label="手机号码" prop="nickname" align="center"></el-table-column>
        <el-table-column label="员工工号" prop="email" align="center"></el-table-column>
        <el-table-column label="注册时间" prop="age" align="center"></el-table-column>
        <el-table-column label="账号状态" prop="addrcity" align="center"></el-table-column>
        <el-table-column  label="操作" align="center" width="590">
          <template slot-scope="scope">
            <app-button icon="edit" size="mini" plian @click="edit(scope.row)">编辑</app-button>
            <app-button icon="edit" size="mini" @click="edit(scope.row)">删除</app-button>
            <app-button icon="edit" size="mini" @click="edit(scope.row)">分配商品</app-button>
            <app-button icon="edit" size="mini" @click="edit(scope.row)">重置密码</app-button>
            <app-button icon="edit" size="mini" @click="edit(scope.row)">锁定</app-button>
          </template>
        </el-table-column>
      </app-table>
    </div>
  </div>
</template>

<script>
  import Dialog from '@Pub/dialog';
  import Http from '@Pub/http';
  import js from '../js/working'

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
        import(/* webpackChunkName: "pages/business/dialog/working-detail" */'../dialog/working-detail').then(component => {
          Dialog.open(component, row, {
          title: row ? '编辑' : '新增',
          width: 600,
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