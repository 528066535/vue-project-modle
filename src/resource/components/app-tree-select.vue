<template>
    <el-popover
            :visible-arrow="false"
            popper-class="pop-tree"
            v-model="show"
        >
        <div style="height: 300px;width: 300px;">
            <app-tree :url="url" :param="param"
                      :can-check="checkEnable"
                      :select-first="false"
                      :disable-id="disableId"
                      @node-click="selectNode" ></app-tree>
        </div>

        <el-input :disabled="disabled" slot="reference" readonly :placeholder="placeholder" size="small"  v-model="displayName" suffix-icon="caret-bottom"></el-input>
    </el-popover>
</template>

<script>
    /**
     * Created by 周文博 on 2017/4/26.
     */
    import appTree from '@Component/app-tree';

    export default {
        props: {
            disabled: false,

            //禁用的选项ID
            disableId: [String, Number],

            value: {
                type: [Object, Array],
                default: function () {
                    return {};
                }
            },

            //远程数据地址
            url: String,

            //远程数据参数
            param: {
                type: Object,
                default: function () {
                    return {};
                }
            },

            //是否多选
            checkEnable: {
                type: Boolean,
                default: false
            },

            placeholder: String
        },

        data(){
            return {
                nativeValue: [],
                show: false
            }
        },

        watch: {
            value(v){
                this.nativeValue = v;
            },

            nativeValue(v){
                this.$emit('input', v);
            }
        },

        computed: {
            displayName(){
                if(this.checkEnable){
                    return this.nativeValue.map(d => {return d.name;});
                }else{
                    return this.nativeValue.name;
                }
            }
        },

        methods: {
            selectNode(node){
                this.nativeValue = node;
                this.show = false;
            }
        },

        mounted(){
            this.nativeValue = this.value;
        },

        components: {
            appTree
        }
    }
</script>
<style lang="less">
    @import "../style/trans";
    .pop-tree{
        &[x-placement^=bottom]{
            margin-top: 3px;
        }
    }
</style>