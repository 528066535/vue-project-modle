<template>
    <div>
        <app-condition>
            <app-formitem label="设备id">
                <app-input @keyup="search" v-model="conditions.devid"></app-input>
            </app-formitem>
            <app-formitem label="运营商">
                <app-select @select-change="search" clearable v-model="conditions.carrierid" :local-data="deviceType" value-name="carrierid" key-name="carriername"></app-select>
            </app-formitem>
            <app-formitem label="是否使用">
                <app-select @select-change="search" clearable v-model="conditions.isUsed" :local-data="[{name: '使用', value: '1'}, {name: '未使用', value: '0'}]"></app-select>
            </app-formitem>
            <app-formitem>
                <app-button type="primary" @click="search">搜索</app-button>
            </app-formitem>
            <div slot="toolbar">
                <app-button @click="add" icon="add">新增</app-button>
                <app-button @click="exportQ" icon="export">选择列表数据并导出</app-button>
                <app-button @click="exportQId" icon="export">根据设备id间隔导出</app-button>
            </div>
        </app-condition>
        <div class="table-container">
            <app-table ref="table" url="/queryDevices">
                <el-table-column label="设备ID" width="100" prop="devid" align="center"></el-table-column>
                <el-table-column label="登录名称" prop="loginname" align="center"></el-table-column>
                <el-table-column label="激活时间" prop="activetime" align="center">
                    <template slot-scope="scope">
                        {{scope.row.activetime | date('yyyy-MM-dd hh:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column label="所属运营商名称" prop="carriername" align="center"></el-table-column>
                <el-table-column label="二维码" prop="qrcode" align="center"></el-table-column>
                <el-table-column  label="操作" align="center" width="240">
                    <template slot-scope="scope">
                        <app-button icon="edit" size="mini" @click="setBusiness(scope.row)">设置运营商</app-button>
                        <app-button icon="remove" size="mini" @click="del(scope.row)">删除</app-button>
                    </template>
                </el-table-column>
            </app-table>
        </div>
    </div>
</template>
<script>
    import Dialog from '@Pub/dialog'
    import Http from '@Pub/http'
    import Data from '@Core/data'
    export default {
        data() {
            return {
                conditions: {
                    devid: '',
                    carrierid: '',
                    isUsed: ''
                },
                deviceType: []
            }
        },
        created() {

        },

        mounted() {
            Http.get('/queryCarriers',{pageNumber: 1,pageSize: 1000}).then((res) => {
                this.deviceType = res.list
            })
        },

        methods: {
            exportQ() {
                let selections = this.$refs.table.getSelection()
                if(selections.length == 0) {
                    return Dialog.error('请选择要导出的数据')
                }
                else {
                    let ids = selections.map(data=>data.devid).join(',')
                    Http.get(`/qrZipCreate?adminname=${Data.getUser()}&ids=${ids}`).then(res=>{
                        window.open(res.zipurl)
                    })
                }
            },
            del(row){
                this.$refs.table.delSelectedSinglelistByMethods('/deleteDevice', row)
            },
            search(){
                this.$refs.table.reload(this.conditions);
            },
            exportQId() {
                import(/* webpackChunkName: "pages/account/change-password-export" */'../dialog/device-export').then(component => {
                    Dialog.open(component, {}, {
                        title: '批量导出',
                        width: 400,
                        parent: this
                    });
                });
            },
            add() {
                import(/* webpackChunkName: "pages/account/change-password-dialog" */'../dialog/device-add').then(component => {
                    Dialog.open(component, {}, {
                        title: '新增设备',
                        width: 600,
                        parent: this
                    });
                });
            },
            edit(row) {
                console.log(row)
            },
            setBusiness(row) {
                import(/* webpackChunkName: "pages/account/set-bussiness" */'../dialog/set-bussiness').then(component => {
                    Dialog.open(component, row, {
                        title: '设置运营商',
                        width: 600,
                        parent: this
                    });
                });
            }
        },
    }

</script>
<style lang="less" scoped rel="stylesheet/less">

</style>