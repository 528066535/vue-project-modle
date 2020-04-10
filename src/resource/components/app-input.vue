<template>
    <el-input
            v-if="type.indexOf('date') < 0"
            :clearable="!readonly && !disabled"
            @clear="clear"
            @keyup.native.13="keyupEnter"
            @focus="focus"
            ref="input"
            @blur="blur"
            @change="change"
            :type="type"
            :disabled="disabled"
            :readonly="readonly"
            :maxlength="maxlength"
            :class="{'self-input': hasDefaultSlot, 'self-input-focus':hasFocus&&hasDefaultSlot}"
            :placeholder="placeholder" v-model="nativeValue" size="small">
        <template slot="prepend" v-if="hasDefaultSlot">
            <slot></slot>
        </template>
        <template slot="append" v-if="hasAppendSlot">
            <slot name="append"></slot>
        </template>
    </el-input>
    <div v-else-if="type.indexOf('range') >= 0" class="date-range-picker-wrap" :class="{'no-clear': !clearAble}">
        <div class="icon icon-date"></div>
        <el-date-picker
                :editable="false"
                :picker-options="pickerStartOptions" size="small" :type="type.replace('range', '')" placeholder="开始日期"
                :readonly="readonly"
                v-model="nativeValue[0]"
                :disabled="disabled"
                :clearable="clearAble"
                @change="change"
        ></el-date-picker>
        <div class="range-split">至</div>
        <el-date-picker
                :editable="false"
                :clearable="clearAble"
                :picker-options="pickerEndOptions" size="small" :type="type.replace('range', '')" placeholder="结束日期"
                :readonly="readonly"
                v-model="nativeValue[1]"
                :disabled="disabled"
                @change="change"
        ></el-date-picker>
    </div>
    <el-date-picker
            v-else-if="showPicker"
            :clearable="clearAble" :editable="false"
            :picker-options="pickerOptions" size="small" :type="type" :placeholder="placeholder?placeholder:'选择日期'"
            :readonly="readonly"
            v-model="nativeValue"
            :disabled="disabled"
            @focus="focus"
            @blur="blur"
            @change="change"
            @clear="clear"
    ></el-date-picker>
</template>

<script>
    /**
     * Created by 周文博 on 2017/4/1.
     */
    import filter from '@Pub/filter';

    export default {
        props: {
            value: [String, Number, Date,Array],

            //输入的最大长度
            maxlength: {
                type: Number,
                default: 60
            },

            //文本内容空时的占位提示
            placeholder: {
                type: String,
                default: '请输入'
            },

            //文本框内容，跟原生input的值一致
            //选择类型,date:选择日期, daterange:日期范围, datetime: 选中日期时间, datetimerange: 日期时间范围
            type: {
                type: String,
                default: 'text'
            },

            //文本框禁用，true: 禁用，false: 启用
            disabled: {
                type: Boolean,
                default: false
            },

            //文本框只读，true: 只读，false: 可编辑
            readonly: {
                type: Boolean,
                default: false
            },

            pickerOptions: {
                type: Object,
                default: function () {
                    return {
                        disabledDate: function (time) {
                            return time.getTime() < Date.now() - 8.64e7;
                        }
                    };
                }
            },

            timeStartOptions: null,

            timeEndOptions: null,

            clearAble: {
                type: Boolean,
                default: true
            },

            min: [Number,String],

            step: [Number,String],

            max: [Number,String]

        },

        data(){
            return {
                nativeValue: '',
                hasDefaultSlot: false,
                hasAppendSlot: false,
                hasFocus: false,

                showPicker: true,

                pickerStartOptions: null,

                pickerEndOptions: null
            }
        },

        watch: {
            nativeValue(v){
                this.$emit('input', v);
            },

            value(){
                if(this.value){
                    this.nativeValue = this.value;
                }else{
                    if(this.type == 'daterange' || this.type == 'datetimerange') {
                        this.nativeValue = [null, null];
                    }
                    else {
                        this.nativeValue = this.value;
                    }
                }
            }
        },

        methods: {
            focus(){
                this.hasFocus = true;
                this.$emit('focus');
            },

            blur(){
                if (this.type !== 'textarea' && this.type.indexOf('date') < 0) {
                    this.nativeValue = $.trim(this.nativeValue);
                }
                this.hasFocus = false;
                this.$emit('blur');
            },

            keyupEnter(){
                this.$emit('keyup');
            },

            change(){
                this.$emit('change', this.nativeValue);
            },

            //点击清除按钮时触发,此时input上的值为空还未清除
            clear(){
                this.hasFocus = false;
                this.$emit('clear');
            },

            setFocus(){
                this.$refs.input.focus();
            }
        },

        created(){
            if(this.type.indexOf('range') >= 0){
                let date = [];
                if(this.value){
                    date[0] = this.value[0]?new Date(filter.date(this.value[0], 'yyyy/MM/dd hh:mm:ss')):null;
                    date[1] = this.value[1]?new Date(filter.date(this.value[1], 'yyyy/MM/dd hh:mm:ss')):null;
                }else{
                    date = [null, null];
                }
                this.nativeValue = date;
            }else{
                this.nativeValue = this.value;
            }
            this.hasDefaultSlot = !!this.$slots.default;
            this.hasAppendSlot = !!this.$slots.append;
        },

        mounted(){
            Vue.nextTick(() => {
                this.showPicker = true;


                if(this.type.indexOf('range') >= 0){
                    let $wrap = $(this.$el);
                    $wrap.find('input').on('focus', () => {
                        $wrap.addClass('focus');
                    }).on('blur', () => {
                        $wrap.removeClass('focus');
                    })
                }

                this.pickerStartOptions = this.timeStartOptions ? this.timeStartOptions : {
                    disabledDate: time => {
                        if(this.nativeValue[1]){
                            return time.getTime() > this.nativeValue[1];
                        }else{
                            return false;
                        }
                    }
                };

                this.pickerEndOptions = this.timeEndOptions ? this.timeEndOptions : {
                    disabledDate: time => {
                        if(this.nativeValue[0]){
                            return time.getTime() < this.nativeValue[0];
                        }else{
                            return false;
                        }
                    }
                };
            });
        }
    }
</script>
<style lang="less">
    @import "../style/trans";
    .date-range-picker-wrap{
        border-radius: 2px;
        border: 1px solid #ccc;
        box-shadow: 0 0 0 1px #f4f4f4;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        height: 30px;
        .borderBox();

        &:hover{
            border: 1px solid #abafb4;
            box-shadow: 0 0 0 1px #dddfe2;
        }

        &.focus{
            border-color: #409EFF;
        }
        .box();
        .icon{
            width: 28px;
            height: 28px;
            margin-right: 0;
            /*background: data-uri('../image/icon-datepicker.png') center no-repeat;*/
        }

        .range-split{
            height: 28px;
            line-height: 28px;
            width: 28px;
            font-size: 14px;
            color: #3b3b3b;
            text-align: center;
        }

        .el-date-editor{
            .box-flex(1);
            font-size: 0;
            input{
                height: 28px;
                line-height: 28px;
                font-size: 13px;
                color: #606266;
                border: none !important;
                text-align: center;
                padding-left: 0 !important;
                box-shadow: none !important;
            }

            .el-input__prefix{display: none;}
        }

        &.no-clear{
            .el-date-editor{
                input{
                    padding-right: 0 !important;
                }
            }
        }
    }
</style>