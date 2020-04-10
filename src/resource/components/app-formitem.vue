<template>
    <el-form-item :label="label" :prop="prop" :qgs-prop="prop" :required="required" :rules="rules" :label-width="labelWidth">
        <slot></slot>
    </el-form-item>
</template>

<script>
    /**
     * Created by 周文博 on 2018/4/13.
     * 生成一个表单内容项
     */

    export default {
        props: {
            //文本
            label: {
                type: String,
                default: ''
            },

            //是否必填
            required: Boolean,

            labelWidth: String,

            //校验属性
            prop: String,

            //校验规则
            rules: {
                type: [Array, Object],
                default: () => {
                    return {};
                }
            }
        }
    }
</script>