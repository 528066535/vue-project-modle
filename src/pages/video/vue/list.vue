<template>
    <div class="video-wrap">
        <app-condition>
            <app-formitem label="名称">
                <app-input @keyup="search" v-model="conditions.carriername"></app-input>
            </app-formitem>
            <app-formitem>
                <app-button type="primary" @click="search">搜索</app-button>
            </app-formitem>
            <div slot="toolbar">
                <app-button @click="add" icon="add">新增</app-button>
            </div>
        </app-condition>
        <div class="table-container">
            <app-table ref="table" url="/queryVideos" list-key="mainVideosList" :multi-select="false" :no-number="true">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="(item,index) in scope.row.sectionlist" :key="index">
                            <app-form label-position="left" inline class="demo-table-expand" label-width="100px">
                                <app-formitem label="创建人">
                                    <span>{{ item.adminname }}</span>
                                </app-formitem>
                                <app-formitem label="创建时间">
                                    <span>{{ item.createtime }}</span>
                                </app-formitem>
                                <app-formitem label="集数">
                                    <span>{{ item.ordernum }}</span>
                                </app-formitem>
                                <app-formitem label="名称">
                                    <span>{{ item.sname }}</span>
                                </app-formitem>
                                <app-formitem label="路径">
                                    <div style="    width: 100px; overflow: hidden; text-overflow: ellipsis;">{{ item.surl }}</div>
                                </app-formitem>
                                <app-formitem style="float: right">
                                    <app-button icon="edit" size="mini" @click="delRow(item, scope.row)">删除</app-button>
                                </app-formitem>
                                <app-formitem style="float: right">
                                    <app-button icon="edit" size="mini" @click="edit(scope.row)">编辑</app-button>
                                </app-formitem>
                            </app-form>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="视频名称" prop="vname" align="center"></el-table-column>
                <el-table-column label="路径" show-overflow-tooltip prop="vurl" align="center"></el-table-column>
                <el-table-column label="类别" prop="vtypename" align="center"></el-table-column>
                <el-table-column label="VIP类型" prop="isvip" align="center">
                    <template slot-scope="scope">
                        {{['普通','VIP'][scope.row.type]}}
                    </template>
                </el-table-column>
                <el-table-column label="总集数" prop="totalnum" align="center"></el-table-column>
                <el-table-column label="当前是第几集" prop="ordernum" align="center"></el-table-column>
                <el-table-column label="创建者" prop="adminname" align="center"></el-table-column>
                <el-table-column  label="操作" align="center" width="250">
                    <template slot-scope="scope">
                        <app-button icon="edit" size="mini" @click="edit(scope.row)">新增</app-button>
                        <app-button icon="edit" size="mini" @click="edit(scope.row)">编辑</app-button>
                        <app-button icon="edit" size="mini" @click="delRow(scope.row)">删除</app-button>
                    </template>
                </el-table-column>
            </app-table>
        </div>
    </div>
</template>
<script>
    import Dialog from '@Pub/dialog';
    export default {
        data() {
            return {
                conditions: {
                    carriername: ''
                }
            }
        },
        created() {

        },

        mounted() {

        },

        methods: {
            delRow(row) {},
            search(){
                this.$refs.table.reload(this.conditions);
            },
            add() {
                this.edit()
            },
            edit(row) {
                import(/* webpackChunkName: "pages/video/video" */'../dialog/video').then(component => {
                    Dialog.open(component, row, {
                        title: row ? '编辑' : '新增',
                        width: 500,
                        parent: this
                    });
                });
            }
        },
    }

</script>
<style lang="less" rel="stylesheet/less">
    .video-wrap {
        .data-form {
            border-bottom: 1px solid #d5d5d5;
            .el-form-item {
                margin-bottom: 8px;
            }
        }
    }
</style>