<template>
    <el-button
            :class="icon?'icon-button':'text-button'"
            :icon="icon?'el-icon-'+icon : ''"
            :disabled="disabled"
            :loading="loading"
            :type="type"
            :size="size"
            @click="click">
        <slot></slot>
    </el-button>
</template>

<script>
    /**
     * Created by 周文博 on 2017/4/12.
     */
    export default {
        props: {
            //按钮类型:default,primary,success,danger,text
            type: {
                type: String,
                default: 'default'
            },

            //图标
            icon: String,

            //按钮大小 small
            size: {
                type: String,
                default: 'small'
            },

            //是否禁用
            disabled: {
                type: Boolean,
                default: false
            },

            //是否加载中
            loading: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            click(){
                this.$emit('click');
            }
        }
    }
</script>