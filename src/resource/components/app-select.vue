<template>
    <el-select @visible-change="visible" :popper-class="customId + ' ' + selectId"
               :filterable="filter"
               :filter-method="filterMethod"
               :clearable="clearable"
               :allow-create="allowCreate"
               reserve-keyword
               :collapse-tags="multiple && nativeValue && nativeValue.length > maxShowCount"
               :class="{multiselect: multiple,'cant-clear':!clearable}" ref="select" @change="change"
               :multiple="multiple" :disabled="disabled" size="small" v-model="nativeValue" :qgs_param="$vnode.data.model.expression">
        <slot></slot>
        <el-option v-for="(option, index) in displayOptions" :key="option[valueName] + index" :label="option[keyName]" :value="option[valueName]" :disabled="option.disabled"></el-option>
    </el-select>
</template>

<script>
    import http from '../pub/http';
    import util from '../pub/util';

    export default {
        props: {
            value: [String, Number, Array],

            //远程数据地址可选
            url: String,

            //拉取远程数据时需要知道展示出来的字段
            keyName: {
                type: String,
                default: 'name'
            },

            //拉取远程数据时需要知道实际的值的字段
            valueName: {
                type: String,
                default: 'value'
            },

            //是否可清除
            clearable: {
                type: Boolean,
                default: false
            },

            //创建条目
            allowCreate: {
                type: Boolean,
                default: false
            },

            //是否禁用
            disabled: {
                type: Boolean,
                default: false
            },

            //是否多选
            multiple: {
                type: Boolean,
                default: false
            },
            maxShowCount: {
                type: Number,
                default: 1
            },

            scrollAddList: {
                type: Boolean,
                default: false
            },

            //是否可搜索
            filter: {
                type: Boolean,
                default: true
            },

            //是否有全选选择
            selectAll: {
                type: Boolean,
                default: false
            },

            //全选的文本
            selectAllText: {
                type: String,
                default: '选择全部'
            },

            localData: {
                type: Array,
                default: () => {
                    return [];
                }
            },

            autoSelect: {
                type:Boolean,
                default: true
            },

            customId: {
                type: String,
                default: util.getRandomStr(9)
            }
        },

        data(){
            return {
                nativeValue: '',
                filterValue: '',
                displayOptions: [],
                sourceData: [],
                options: [],
                loaded: false,
                selectId: util.getRandomStr(9)
            }
        },


        watch: {
            nativeValue(v){
                if(v !== undefined && v !== null ){
                    let $selectAll = $(`.${this.selectId}`).find('.select-all');
                    if(v.length === this.sourceData.length){
                        $selectAll.addClass('selected');
                    }else{
                        $selectAll.removeClass('selected');
                    }
                    this.$emit('input', v);
                }else {
                    this.$emit('input', v);
                }
            },

            value(){
                this.nativeValue = this.value;
                if(this.multiple){
                    let displayOptionsIds = this.displayOptions.map(d => {
                        return d[this.valueName];
                    });

                    let selectedIdsNotInDisplay = this.nativeValue.filter(d => {
                        return displayOptionsIds.indexOf(d) < 0;
                    });

                    selectedIdsNotInDisplay = selectedIdsNotInDisplay.filter((d, index) => {
                        return index <= this.maxShowCount;
                    });

                    let cacheUnit = [];
                    for(let i = 0; i < this.options.length;i++){
                        let option = this.options[i];
                        if(selectedIdsNotInDisplay.indexOf(option[this.valueName]) >= 0){
                            this.displayOptions.push(util.cloneObj(option));
                            cacheUnit.push(option[this.valueName]);
                        }
                    }

                    for(let i = 0; i < this.options.length;i++){
                        let option = this.options[i];
                        if(cacheUnit.indexOf(option[this.valueName]) >= 0){
                            this.options.splice(i, 1);
                        }
                    }
                }
            },

            localData(){
                this.options = util.cloneObj(this.localData);
                this.sourceData = util.cloneObj(this.localData);
                this.displayOptions = [];
                this.displayOptions = this.displayOptions.concat(this.splitOptions());
                if(this.scrollAddList || this.disabled) {
                    this.displayOptions = this.displayOptions.concat(this.options.splice(0, this.options.length));
                }
            }
        },

        methods: {
            filterMethod(query){
                if (query) {
                    this.options = this.sourceData.filter(item => {
                        return item[this.keyName].indexOf(query) > -1;
                    });
                    this.displayOptions = [];
                    this.displayOptions = this.displayOptions.concat(this.splitOptions());
                } else {
                    this.displayOptions = [];
                    this.options = util.cloneObj(this.sourceData);
                    this.displayOptions = this.displayOptions.concat(this.splitOptions());
                }
            },

            change(){
                if(this.loaded){
                    //v-model的值有点延迟,这里加个延迟
                    Vue.nextTick(() => {
                        this.$emit('select-change');
                    });
                }
            },

            getOptions(){
                return this.sourceData;
            },

            visible(type){
                let that = this;
                if(type){
                    this.filterMethod();
                    let $scroll = $(`.${this.selectId}`);
                    if(this.selectAll && $scroll.find('.select-all').length <= 0){
                        $scroll.find('.el-select-dropdown__list').prepend('<li class="el-select-dropdown__item select-all"><span>'+that.selectAllText+'</span></li>');

                        let $selectAll = $scroll.find('.select-all');
                        $selectAll.hover(function () {
                            $(this).addClass('hover').siblings().removeClass('hover');
                        }, function () {
                            $(this).removeClass('hover');
                        });
                        $selectAll.on('click', function () {
                            if($(this).hasClass('selected')){
                                if(!$(this).hasClass('is-disabled')) {
                                    $(this).removeClass('selected');
                                }
                                let nativeValue = [];
                                that.sourceData.map(d => {
                                    if(d.disabled && that.nativeValue.indexOf(d[that.valueName])>=0) {
                                        nativeValue.push(d[that.valueName])
                                    }
                                    return d;
                                });
                                that.nativeValue = nativeValue;
                            }else{
                                if(!$(this).hasClass('is-disabled')) {
                                    $(this).addClass('selected');
                                }

                                let nativeValue = util.cloneObj(that.nativeValue);
                                that.sourceData.map(d => {
                                    if(!d.disabled) {
                                        nativeValue.push(d[that.valueName]);
                                    }
                                    return d;
                                });

                                that.nativeValue = [... new Set(nativeValue)]
                            }
                            // if($(this).hasClass('selected')){
                            //     $(this).removeClass('selected');
                            //     debugger;
                            //     if(!$(this).hasClass('is-disabled')) {
                            //         $(this).removeClass('selected');
                            //     }
                            //     let nativeValue = []
                            //     that.sourceData.map(d => {
                            //         if(d.disabled && that.nativeValue.indexOf(d[that.valueName])>=0) {
                            //             nativeValue.push(d[that.valueName])
                            //         }
                            //         return d;
                            //     });
                            //     that.nativeValue = nativeValue;
                            // }else{
                            //     debugger;
                            //     if(!$(this).hasClass('is-disabled')) {
                            //         $(this).addClass('selected');
                            //     }
                            //     let nativeValue = [];
                            //     that.sourceData.map(d => {
                            //         if(!d.disabled) {
                            //             nativeValue.push(d[that.valueName])
                            //         }
                            //         return d;
                            //     });
                            //     this.nativeValue = [... new Set(nativeValue.concat(nativeValue))];
                            // }
                            Vue.nextTick(() => {
                                that.$emit('select-change');
                            });
                        });
                    }
                }
                this.setScroll();
            },

            splitOptions(){
                if(this.options.length > 50){
                    return this.options.splice(0, 50);
                }else{
                    return this.options.splice(0, this.options.length);
                }
            },

            setScroll(){
                let $scroll = $(`.${this.selectId}`);
                let that = this;
                $scroll.find('.el-select-dropdown__wrap').off('scroll').on('scroll', function () {
                    let h = $(this).height();
                    let sh = $(this)[0].scrollHeight;
                    let st =$(this)[0].scrollTop;
                    if(h+st>=sh - 100){
                        that.displayOptions = that.displayOptions.concat(that.splitOptions());
                    }
                });
            }
        },

        created(){
            this.nativeValue = this.value;

            if(this.url){
                http.get(this.url).done((ret) => {
                    this.options = [...ret];
                    this.sourceData = util.cloneObj(ret);
                    this.displayOptions = this.displayOptions.concat(this.splitOptions());
                    if(!this.value && this.displayOptions[0] && this.autoSelect){
                        this.nativeValue = this.displayOptions[0][this.valueName];
                    }

                    if(this.scrollAddList || this.disabled) {
                        this.displayOptions = this.displayOptions.concat(this.options.splice(0, this.options.length));
                    }

                    Vue.nextTick(() => {
                        this.loaded = true;
                    });
                });
            }else{
                this.options = util.cloneObj(this.localData);
                this.sourceData = util.cloneObj(this.localData);
                this.displayOptions = this.displayOptions.concat(this.splitOptions());
                if(this.scrollAddList || this.disabled) {
                    this.displayOptions = this.displayOptions.concat(this.options.splice(0, this.options.length));
                }

                Vue.nextTick(() => {
                    this.loaded = true;
                });
            }
        },

        mounted(){
            this.setScroll();
        }
    }
</script>
<style lang="less">
    @import "../style/trans";

    //select下拉为空的文字提示字体
    .el-select-dropdown__empty{font-size: 12px}

    .el-select-dropdown__list{
        padding: 0;
    }

    .el-select-dropdown__item{
        max-width: 1200px;
        white-space: normal;
        word-break: break-all;
        font-size: 14px;
        padding: 0 10px;

        &.selected{
            color: #fff;
            background: #4D99F4;
            font-weight: normal;
        }
    }

    .el-select-dropdown{
        box-shadow: none;
        border: 1px solid #d9d9d9;
        border-radius: 0;
        .popper__arrow{display: none;}

        &.el-popper{
            margin: 3px 0;
        }
    }

    .el-input{
        .el-icon-arrow-up{
            &:before{display: none;}
            background-image: data-uri("../pub/image/icon-arrow.png");
            background-position: center;
            background-repeat: no-repeat;
            .transformOrigin(50% 50%);
        }
        .is-reverse{
            position: relative;
            top:-1px;
            .rotateZ(180deg);
        }
    }


    //多选的时候的样式
    .multiselect{
        &.cant-clear {
            .el-tag__close {
                display: none;
            }
        }
        max-height: 36px;
        line-height: 30px;
        .el-select__tags{
            -webkit-box-align: start;
            -ms-flex-align: start;
            align-items: start;
            max-height: 30px;
            overflow: hidden;
            .el-tag{
                border-radius: 0;
                background: #fff;
                color: #3b3b3b;
                height: 26px;
                line-height: 24px;
                border-color: #d9d9d9;
                cursor: default;
                &.v-leave-to,&.v-leave-active{display: none;}

                &:hover,&:active{
                    color: #0081fe;
                    border-color: #0081fe;
                }

                .el-tag__close{
                    &:before{display: none;}
                    .scale(1);
                    right: -1px;
                    top: -1px;
                    background: data-uri('../pub/image/icon-cross.png') center no-repeat;
                    &:hover{
                        background: data-uri('../pub/image/icon-cross-hover.png') center no-repeat;
                    }
                }

                &:hover{
                    .el-tag__close{
                        background: data-uri('../pub/image/icon-cross-hover.png') center no-repeat;
                    }
                }

                .el-select__tags-text{
                    margin-right: 10px;
                }
            }
        }
    }

    .el-select-dropdown.is-multiple{
        .el-select-dropdown__item:before{
            content: '';
            .borderBox();
            display: inline-block;
            width: 16px;
            height: 16px;
            border-radius:2px;
            border: 2px solid #aebfc6;
            margin-right: 10px;
            float: left;
            margin-top: 9px
        }

        .el-select-dropdown__item:after{
            box-sizing: content-box;
            content: "" !important;
            border: 1px solid #fff;
            border-left: 0;
            border-top: 0;
            height: 8px;
            left: 16px;
            position: absolute;
            top: 11px;
            -ms-transform: rotate(45deg) scaleY(0);
            transform: rotate(45deg) scaleY(0);
            width: 4px;
            -ms-transform-origin: center !important;
            transform-origin: center !important;
        }

        .el-select-dropdown__item.selected{
            color: #4285f4;

            &:before{
                background-color: #4285f4;
                border-color: #4285f4;
            }

            &:after{
                -ms-transform: rotate(45deg) scaleY(1);
                transform: rotate(45deg) scaleY(1);
            }
        }
    }
</style>