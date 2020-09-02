<template>
    <div class="video-wrap">
        <app-condition>
            <!--<app-formitem label="名称">-->
                <!--<app-input @keyup="search" v-model="conditions.carriername"></app-input>-->
            <!--</app-formitem>-->
            <!--<app-formitem label="状态">-->
                <!--<app-select v-model="conditions.status" @select-change="search" placeholder="请输入" :maxlength="100">-->
                    <!--<el-option label="上架" value="/queryVideos"></el-option>-->
                    <!--<el-option label="下架" value="/queryDropVideos"></el-option>-->
                <!--</app-select>-->
            <!--</app-formitem>-->
            <app-formitem>
                <app-button type="primary" @click="search">搜索</app-button>
            </app-formitem>
            <div slot="toolbar">
                <!--<app-button @click="add()" icon="add">新增</app-button>-->
            </div>
        </app-condition>
        <div class="table-container">
            <app-table ref="table" url="/queryVideoTypes" list-key="mainlist" :multi-select="false" :no-number="true" :paging="false">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="(item,index) in scope.row.sectionlist" :key="index">
                            <app-form label-position="left" inline class="demo-table-expand" label-width="80px">
                                <app-formitem label="类别名称">
                                    <span>{{ item.tsname }}</span>
                                </app-formitem>
                                <app-formitem style="float: right">
                                    <!--<app-button icon="edit" size="mini" @click="delRow(item)">删除</app-button>-->
                                    <!--<app-button icon="edit" size="mini" @click="editSub(scope.row, item)">编辑</app-button>-->
                                </app-formitem>
                            </app-form>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="类别名称" prop="tmname"></el-table-column>
                <el-table-column  label="操作" align="center" :width="conditions.status === '/queryDropVideos'?320:250">
                    <template slot-scope="scope">
                        <!--<app-button icon="edit" size="mini" @click="add(scope.row)">新增</app-button>-->
                        <!--<app-button icon="edit" size="mini" @click="edit(scope.row)">编辑</app-button>-->
                        <!--<app-button icon="edit" size="mini" @click="delRow(scope.row)">删除</app-button>-->
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
                    carriername: '',
                    status: '/queryVideos'
                }
            }
        },
        created() {

        },

        mounted() {

        },

        methods: {
            delRow(row) {
                this.$refs.table.delSelectedSinglelistByMethods('/deleteVideo', {vid: row.vid, sid: row.sid})
            },
            down(row) {
                this.$refs.table.delSelectedSinglelistByMethods('/dropVideo', {vid: row.vid ? row.vid : row.sid}, '确认要下架视频？', 'post')
            },
            up(row) {
                this.$refs.table.delSelectedSinglelistByMethods('/resumeVideo', {vid: row.vid ? row.vid : row.sid}, '确认要上架视频？', 'post')
            },
            search(){
                this.$refs.table.reload(this.conditions);
            },
            detail(row = {}) {
                import(/* webpackChunkName: "pages/video/video" */'../dialog/video').then(component => {
                    Dialog.open(component, row, {
                        title: row.vid ? '编辑一级视频' : '新增一级视频',
                        width: 500,
                        parent: this
                    });
                });
            },
            subDetail(row = {}, parentRow) {
                import(/* webpackChunkName: "pages/video/sub-video" */'../dialog/sub-video').then(component => {
                    Dialog.open(component, {row: row, parentRow: parentRow}, {
                        title: parentRow.vid ? '编辑二级视频' : '新增二级视频',
                        width: 500,
                        parent: this
                    });
                });
            },
            add(row) {
                if(row) {
                    this.subDetail({}, row)
                }
                else {
                    this.detail(row)
                }
            },
            edit(row = {}) {
                this.detail(row)
            },
            editSub(row, item) {
                this.subDetail(item, row)
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