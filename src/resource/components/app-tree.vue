<template>
    <div class="qgs-tree">
        <div v-if="!canCheck && title" class="qgs-tree__header">
            <div class="qgs-tree__header-title">{{title}}</div>
            <span v-if="canAdd || canEdit || canDel">
                <i @click="add" v-if="canAdd" class="qgs-tree__icon qgs-tree__add" :class="{'qgs-tree__add--disabled': !nativeCanAdd}" title="新建" ></i>
                <i @click="edit"  v-if="canEdit"  class="qgs-tree__icon qgs-tree__edit" :class="{'qgs-tree__edit--disabled': !nativeCanEdit}" title="编辑" ></i>
                <i @click="del"  v-if="canDel"  class="qgs-tree__icon qgs-tree__del" :class="{'qgs-tree__del--disabled': !nativeCanDel}" title="删除"></i>
            </span>
        </div>
        <div class="qgs-tree__body">
            <app-page ref="page" style="height: 100%;width: 100%;">
                <el-tree ref="tree" :data="nodes"
                         v-if="nodes.length > 0"
                         :props="defaultProps"
                         node-key="id"
                         :highlight-current="true"
                         :check-on-click-node="true"
                         :default-expanded-keys="expanded"
                         :filter-node-method="filterNode"
                         :show-checkbox="canCheck"
                         :default-checked-keys="defaultCheck"
                         :check-strictly="strictly"
                         @current-change="nodeClick"
                         @node-expand="nodeExpand"
                         @node-collapse="nodeCollapse"
                         :style="{width: width}"
                >
                    <span slot-scope="{ node, data }" style="position: relative; margin-right: 20px;">
                        <span :style="{color: defaultProps.remark && data[defaultProps.remark]?'#949494':'black'}">{{ data[defaultProps.label] }}</span>
                        <el-tag v-if="defaultProps.remark && data[defaultProps.remark]" style="position: absolute;top: -4px;right: -20px;font-size: 12px;color: white;" size="mini" color="#ea8a00 ">{{data[defaultProps.remark]}}</el-tag>
                    </span>
                </el-tree>
            </app-page>
        </div>
    </div>
</template>

<script>
    /**
     * Created by 周文博 on 2017/5/9.
     */
    import http from '@Pub/http';

    export default {
        props: {
            //是否支持多选
            canCheck: {
                type: Boolean,
                default: false
            },

            remarkColor: {
                type: String,
                default: 'black'
            },

            //树的标题
            title: String,

            //是否可以添加节点
            canAdd: {
                type: Boolean,
                default: false
            },

            //是否可以编辑节点
            canEdit: {
                type: Boolean,
                default: false
            },

            //是否可以删除节点
            canDel: {
                type: Boolean,
                default: false
            },

            url: String,

            localData: Array,

            param: Object,

            selectFirst: {
                type: Boolean,
                default: true
            },
            disableId: [String, Number],

            width: {
                type: String,
                default: '500px'
            },

            defaultCheck: {
                type: Array,
                default: () => {return [];}
            },

            strictly: {
                type: Boolean,
                default: false
            },

            expand: {
                type: Boolean,
                default: true
            }
        },

        data(){
            return {
                currentNode: {},
                nodes: [],

                defaultProps: {
                    children: 'child',
                    label: 'name',
                    remark: 'remark'
                },

                nativeCanAdd: false,
                nativeCanDel: false,
                nativeCanEdit: false
            }
        },

        computed: {
            expanded(){
                if(this.expand){
                    if(!this.canCheck){
                        return [1].concat(this.currentNode.id || 1);
                    }else{
                        return this.defaultCheck;
                    }
                }else{
                    return [];
                }
            }
        },

        watch: {
            localData(){
                this.nodes = this.localData;
                if(this.selectFirst && this.nodes[0]){
                    Vue.nextTick(() => {
                        this.nodeClick(this.currentNode.id?this.currentNode:this.nodes[0]);
                    });
                }
            }
        },

        methods: {
            add: function () {
                if(this.nativeCanAdd){
                    this.$emit('node-add', this.currentNode);
                }
            },

            del: function () {
                if(this.nativeCanDel){
                    this.$emit('node-del', this.currentNode);
                }
            },

            edit: function () {
                if(this.nativeCanEdit){
                    this.$emit('node-edit', this.currentNode);
                }
            },

            render(value) {
                if(this.localData){
                    this.nodes = this.localData;
                    if(this.selectFirst && this.nodes[0]){
                        Vue.nextTick(() => {
                            this.nodeClick(this.currentNode.id?this.currentNode:this.nodes[0]);
                        });
                    }
                }else{
                    http.get(this.url, this.param).done(data => {
                        this.nodes = [];
                        for(let i = 0; i < data.length; i++){
                            if(data[i].pId === 0){
                                this.nodes.push(data.splice(i, 1)[0]);
                                i--;
                            }
                        }

                        this.transformData(data, this.nodes);

                        Vue.nextTick().then(()=>{
                            value && this.search(value);
                        });

                        if(this.selectFirst){
                            Vue.nextTick(() => {
                                this.nodeClick(this.currentNode.id?this.currentNode:this.nodes[0]);
                            });
                        }
                    });
                }
            },

            transformData(data, nodes){
                for(let i = 0; i < nodes.length; i++){
                    let node = nodes[i];

                    for(let j = 0; j < data.length; j++){
                        if(data[j].pId === node.id){
                            if(node.child){
                                node.child.push(data.splice(j, 1)[0]);
                            }else{
                                node.child = data.splice(j, 1);
                            }
                            j--;
                        }
                    }
                    if(node.child){
                        this.transformData(data, node.child);
                    }
                }
            },

            setChecked(nodes){
                this.$refs.tree.setCheckedNodes(nodes);
            },

            getChecked: function () {
                return this.$refs.tree.getCheckedNodes();
            },

            getData: function () {
                return this.nodes;
            },

            setButtonStatus(code){
                code = code || '';
                if (code === '001' || code.indexOf('0012521') >= 0) {
                    this.nativeCanAdd = false;
                    this.nativeCanDel = false;
                    this.nativeCanEdit = true;
                } else {
                    this.nativeCanAdd = true;
                    this.nativeCanDel = true;
                    this.nativeCanEdit = true;
                }
            },

            selectNode(node){
                this.setButtonStatus(node.searchCode);
                this.$refs.tree.setCurrentNode({id: node.id});
                if(node.remark) {
                    this.nativeCanAdd = false;
                    this.nativeCanDel = true;
                    this.nativeCanEdit = false;
                }
            },

            nodeClick(node){
                let disableId = this.disableId+'';
                if(!disableId || disableId.indexOf(node.id) < 0){
                    this.selectNode(node);
                    this.currentNode = node;
                    this.$emit('node-click', node);
                }
            },

            filterNode(value,data){
                if (!value) {return true;}
                return data.name.indexOf(value) !== -1;
            },

            search(value){
                this.$refs.tree.filter(value);
            },

            reload(value){
                this.render(value);
            },

            nodeExpand(){
                this.$emit('node-open', true);
            },

            nodeCollapse(){
                this.$emit('node-open', false);
            }
        },

        mounted(){
            this.nativeCanAdd = this.canAdd;
            this.nativeCanDel = this.canDel;
            this.nativeCanEdit = this.canEdit;

            this.render();
        }
    }
</script>

<style lang="less">
    @import "../../resource/style/trans";

    .qgs-tree{
        width: 100%;
        height: 100%;
        position: relative;
        background: #fff;
        .borderBox();
        border-radius: 2px 2px 0 0;
        .box();
        .box-column();
        flex-basis: auto;

        .qgs-tree__header{
            height: 36px;
            background: #fff;
            overflow: hidden;
            box-shadow: 0 2px 3px #d5d9df;
            border-radius: 2px 2px 0 0;
            position: relative;
            z-index: 1;
            .borderBox();

            .qgs-tree__header-title{
                float: left;
                height: 36px;
                line-height: 36px;
                padding-left: 8px;
                color: #1e1e1e;
            }

            span{
                float:right;
                margin:10px 8px 0 0;

                .qgs-tree__icon{
                    display: inline-block;
                    width:16px;
                    height:16px;
                    background-repeat:no-repeat;
                    background-position: center;
                    margin-left:10px;
                    cursor: pointer;

                    &.qgs-tree__add{background-image: data-uri('../image/button-icon/icon-add.png');}
                    &.qgs-tree__edit{background-image: data-uri('../image/button-icon/icon-edit.png');}
                    &.qgs-tree__del{background-image: data-uri('../image/button-icon/icon-remove.png');}
                    &.qgs-tree__add--disabled{background-image: data-uri('../image/button-icon/icon-add-disabled.png');}
                    &.qgs-tree__edit--disabled{background-image: data-uri('../image/button-icon/icon-edit-disabled.png');}
                    &.qgs-tree__del--disabled{background-image: data-uri('../image/button-icon/icon-remove-disabled.png');}
                }
            }
        }

        .qgs-tree__body{
            .box-flex(1);
            overflow: hidden;

            .el-tree{
                padding-top: 15px;
                .el-tree-node>.el-tree-node__children{
                    overflow: auto;
                }

                .el-tree-node__expand-icon{
                    &:before{display: none;}
                    display: block;
                    width: 16px;
                    height: 16px;
                    background: data-uri('../image/tree/icon-tree-close.png') center no-repeat;

                    &.expanded{
                        background: data-uri('../image/tree/icon-tree-open.png') center no-repeat;
                        .rotateZ(0);
                    }

                    &.is-leaf{
                        background: data-uri('../image/tree/icon-tree-item.png') center no-repeat;
                    }
                }

                .el-tree-node__content{
                    height: 30px;
                    line-height: 30px;
                    border: 1px solid transparent;

                    .el-tree-node__label{
                        display: block;
                        .box-flex(1);
                        overflow: hidden;
                    }
                }

                &.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
                    background: #e5f3ff;
                    border: 1px solid #b2d3ef;
                }
            }
        }

        .qgs-tree__footer{
            border-top:1px solid #cad1dd;
            background-color: #eef1f7;
            padding:3px 5px 3px 3px;
            position: absolute;
            bottom: 0;
            height: 36px;
            left: 0;
            right: 0;
            .borderBox();
        }
    }
</style>