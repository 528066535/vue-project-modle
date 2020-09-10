<template>
    <el-scrollbar ref="scroll">
        <slot></slot>
    </el-scrollbar>
</template>

<script>
    /**
     * Created by 周文博 on 2018/4/13.
     * 生成一个空白页面,带自定义滚动条
     */
    import util from '@Core/util';

    export default {
        methods: {
            update(){
                util.debounce().then(() => {
                    this.$refs.scroll && this.$refs.scroll.update();
                });
            },

            scrollTop(num, animate){
                if(animate){
                    $(this.$el).find('.el-scrollbar__wrap').animate({scrollTop: (num || 0) + 'px'}, 250);
                }else{
                    $(this.$el).find('.el-scrollbar__wrap').scrollTop(num || 0);
                }
            },

            getScrollTop(){
                return $(this.$el).find('.el-scrollbar__wrap').scrollTop();
            }
        },

        mounted(){
            let that = this;
            $(this.$el).find('.el-scrollbar__wrap').on('scroll', function () {
                that.$emit('scroll', $(this).scrollTop());
            });
        }
    }
</script>
<style lang="less">
    .el-scrollbar{
        height: 100%;
        flex: 1;
        .el-scrollbar__wrap{
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            margin-bottom: 0 !important;
        }
    }
</style>