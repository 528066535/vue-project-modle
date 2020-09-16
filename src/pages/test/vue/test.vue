<template>
  <div>
    <app-condition>
      <app-formitem label="账号">
        <app-input @keyup="search" v-model="conditions.loginname"></app-input>
      </app-formitem>
      <app-formitem>
        <app-button type="primary" size="mini" @click="search">搜索</app-button>
      </app-formitem>
      <div slot="toolbar">
        <app-button @click="add" icon="add">新增</app-button>
      </div>
    </app-condition>
    <div class="table-container">
      <app-table ref="table" :paging="false" :local-data="tableData" :param="getParams()">
        <el-table-column label="账号" prop="loginname" align="center"></el-table-column>
        <el-table-column label="昵称" prop="nickname" align="center"></el-table-column>
        <el-table-column label="邮箱" prop="email" align="center"></el-table-column>
        <el-table-column label="城市" prop="addrcity" align="center"></el-table-column>
        <el-table-column label="年龄" prop="age" align="center"></el-table-column>
        <el-table-column label="地址" prop="addrcity" align="center"></el-table-column>
        <el-table-column label="vip到期日期" prop="vipexpdate" align="center"></el-table-column>
        <el-table-column  label="操作" align="center">
          <template slot-scope="scope">
            <app-button icon="edit" size="mini" @click="edit(scope.row)">重置密码</app-button>
          </template>
        </el-table-column>
      </app-table>
    </div>
  </div>
</template>

<script>
  import Dialog from '@Pub/dialog';
  import Http from '@Pub/http';
  import router from '@Pub/router';

  export default {
    data() {
      return {
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

    mounted() {
    },

    methods:{
      getParams() {
        let params = this.conditions
        params.queryType = this.$route.query.type
        return params
      },
      search(){
        this.$refs.table.reload();
      },
      add() {
        router.go(`/dashboard/test/home/detail`)
      },
      edit(row) {
        Dialog.confirm('重置密码后,默认密码为123456,是否需要重置密码？','提示').then(()=>{
          Http.post('/resetUserPwd', {loginname: row.loginname}).then(res=>{
            Dialog.success('重置成功');
            this.search()
          })
        })
      }
    },
  }

</script>
<style lang="less" scoped rel="stylesheet/less">

</style>