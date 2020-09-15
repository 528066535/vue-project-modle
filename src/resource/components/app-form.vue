<template>
    <div class="data-form">
        <el-form @submit.native.prevent
                 :label-width="labelWidth"
                 :label-suffix="labelSuffix"
                 :model="model"
                 :inline="inline"
                 :disabled="disabled"
                 ref="form"><slot></slot></el-form>
        <div style="text-align: right;overflow: hidden;" v-if="$slots.after">
            <slot name="after"></slot>
        </div>
        <div style="text-align: right;overflow: hidden;" v-else-if="!$parent.dialog">
            <app-button type="text" @click="close">关闭</app-button>
            <app-button v-if="!disabled" type="primary" size="big" :loading="$parent.posting" @click="save">保存</app-button>
        </div>
    </div>
</template>

<script>
    /**
     * Created by 周文博 on 2018/4/13.
     * 生成一个表单
     */
    import dialog from '../../resource/pub/dialog';

    export default {
        props: {
            //校验数据
            model: {
                type: Object,
                default: () => {
                    return {};
                }
            },

            //文字长度
            labelWidth: {
                type: String,
                default: '100px'
            },

            //是否行内
            inline: {
                type: Boolean,
                default: false
            },

            //文本后缀
            labelSuffix: {
                type: String,
                default: '：'
            },

            disabled: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            verify(callback) {
                this.$refs.form.validate(function (valid) {
                    if(valid){
                        callback && callback();
                    }
                });
            },

            reset(){
                Vue.nextTick(() => {
                    this.$refs.form.clearValidate();
                });
            },

            resetFiled(){
                this.$refs.form.resetFields();
            },

            close(){
                dialog.close();
                this.$emit('close');
            },

            save(){
                this.$emit('save');
            }
        },

        mounted(){
            this.resetFiled();
        }
    }
</script>