<template>
    <div class="autocomplete" :class="id" style="height: 30px;">
        <el-popover
                v-model="show"
                ref="popover-autocomplete"
                trigger="click"
                :width="width"
                :popper-class="'autocomplete__select_' + id + ' autocomplete__select'">
            <el-table @row-click="rowClick" border height="240" width="600"
                      :row-class-name="getActiveClass"
                      v-loading="loading" v-table-load="tableLoadMore"
                      :data="datas">
                <el-table-column v-for="(col, index) in tableHeader" :key="index" :label="col.display" :prop="col.prop"></el-table-column>
            </el-table>
        </el-popover>

        <el-input placeholder="请输入" v-if="!disabled" v-popover:popover-autocomplete ref="input" size="small"
                  @keyup.native="getRemoteData"
                  @keyup.native.13="keyupEnter(current)"
                  :on-icon-click="focusInput"
                  @focus="focusInput"
                  @blur="blurInput"
                  v-model="nativeValue" suffix-icon="search" class="autocomplete-component"></el-input>
        <el-input placeholder="请输入" v-if="disabled" ref="input" size="small" disabled
                  v-model="nativeValue" suffix-icon="search" class="autocomplete-component"></el-input>
    </div>
</template>

<script>
    /**
     * Created by 周文博 on 2017/4/1.
     */
    import http from '../pub/http';
    import util from '../pub/util';
    import {isIe} from '../pub/util';

    export default {
        props: {
            value: Object,

            //远程数据的地址
            url: String,

            //是否模糊输入，如果是，则会保留输入的内容，否则严格按照下拉数据输入
            isLike: {
                type: Boolean,
                default: false
            },

            keyName: {
                type: String,
                default: 'name'
            },

            tableHeader: {
                type: Array,
                default: () => {
                    return [];
                }
            },

            placeholder: String,

            disabled: {
                type: Boolean,
                default: false
            }
        },

        data(){
            return {
                nativeValue: '',
                loading: false,
                show: false,
                test: true,
                current: null,
                id: util.getRandomStr(8),
                width: 0,

                datas: [],
                options: []
            }
        },

        methods: {
            tableLoadMore(){
                this.datas = this.datas.concat(this.splitOptions());
            },
            load(){
                console.log('架子啊');
            },
            getActiveClass(res){
                if(res.rowIndex === 0){
                    return 'active-row';
                }
            },

            getRemoteData: function () {
                util.debounce(250).then(() => {
                    if(this.url && !this.loading){
                        this.loading = true;
                        http.get(this.url, {keywords: this.nativeValue, searchText: this.nativeValue, expertName: this.nativeValue}).done(ret => {
                            if(ret.rows){
                                ret.rows = ret.rows.map(d => {
                                    return d.cols || d;
                                });
                            }
                            ret = ret.rows || ret;
                            this.options = ret;
                            this.datas = [];
                            this.datas = this.datas.concat(this.splitOptions());
                            this.loading = false;
                            this.show = true;
                            if(!this.isLike){
                                this.current = ret[0] || this.current;
                            }

                            const $table = $(`.autocomplete__select_${this.id}`).find('.el-table__body-wrapper');
                            $table.scrollTop(0);
                        });
                    }
                });
            },

            splitOptions(){
                if(this.options.length > 50){
                    return this.options.splice(0, 50);
                }else{
                    return this.options.splice(0, this.options.length);
                }
            },

            rowClick(row){
                this.keyupEnter(row);
            },

            keyupEnter(row) {
                if(row){
                    this.show = false;
                    this.current = row;
                    this.nativeValue = this.current[this.keyName];
                    this.$emit('input', row);
                    this.$emit('change');
                }
            },

            focusInput(){
                if(!this.disabled){
                    this.getRemoteData();
                }
            },

            blurInput(){
                if(this.isLike){
                    let obj = {};
                    obj[this.keyName] = this.nativeValue;
                    this.keyupEnter(obj);
                }
            }
        },

        watch: {
            value(){
                this.nativeValue = this.value[this.keyName];
                this.current = this.value;
            },

            show(){
                this.width = $(this.$el).width();
                if(!this.show){
                    if(!this.isLike){
                        this.nativeValue = this.current[this.keyName];
                    }else{
                        this.current = {};
                        this.current[this.keyName] = this.nativeValue;
                    }
                    this.$emit('input', this.current);
                }
            }
        },

        directives: {
            'table-load': {
                bind(el, binding) {
                    // 获取element-ui定义好的scroll盒子
                    const SELECTWRAP_DOM = el.querySelector('.el-table__body-wrapper');

                    SELECTWRAP_DOM.addEventListener('scroll', function () {
                        /*
                         * scrollHeight 获取元素内容高度(只读)
                         * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                         * clientHeight 读取元素的可见高度(只读)
                         * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                         * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                         */
                        let sign = 1; // 定义默认的向上滚于乡下滚的边界
                        const CONDITION = ((this.scrollHeight - this.scrollTop <= this.clientHeight + 1) &&
                                this.scrollTop > sign)// 注意: && this.scrollTop

                        if (this.scrollTop > sign) {
                            sign = this.scrollTop;
                            // console.log('向下')
                        }
                        if (this.scrollTop < sign) {
                            sign = this.scrollTop;
                            // console.log('向上')
                        }

                        if (CONDITION) {
                            binding.value();
                        }
                    });
                }
            }
        },

        destroyed(){
            $('.autocomplete__select_' + this.id).remove();
        },

        mounted(){
            this.nativeValue = this.value[this.keyName];
            this.current = this.value;
        }
    }

</script>

<style lang="less">
    .autocomplete__select {
        position: relative;
        padding: 0;
        border: none;
        box-shadow: none;

        .active-row td {
            background: #0098fe !important;
        }
        .active-row td div {
            color: #fff !important;
        }

        .popper__arrow{
            display: none;
        }

        &[x-placement^=top]{
            margin-bottom: 3px;
        }
        &[x-placement^=bottom]{
            margin-top: 3px;
        }
    }

    .el-input .el-input__icon.search{
        &:before{
            display: none;
        }
        width: 16px;
        height: 30px;
        display: inline-block;
        /*background: data-uri('../pub/image/icon-search.png') center no-repeat;*/
    }

    .autocomplete__select{
        .el-table .el-table__header-wrapper{
            box-shadow: none;
            border-bottom: 1px solid #EEF0F6;
        }
    }
</style>