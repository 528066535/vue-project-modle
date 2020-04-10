<template>
    <el-dialog ref="dialog"
               :close-on-click-modal="false"
               @closed="onClose"
               :title="title"
               :visible="show"
               :width="width+'px'"
               top="0"
               :append-to-body="true"
    >
        <app-page ref="scroll" class="dialog__body">
            <div class="dialog__body--inner" :style="{width: width + 'px'}"></div>
        </app-page>
        <div class="dialog__footer" style="display: none;"></div>
    </el-dialog>
</template>

<script>
    /**
     * Created by 周文博 on 2017/4/14.
     */
    import ev from '../pub/ev';
    import util from '../pub/util';

    export default {
        props: {
            //对话框标题
            title: {
                type: String,
                default: '提示'
            },

            width:{
                type: [Number, String],
                default: 400
            }
        },

        data(){
            return {
                show: false,

                component: null
            }
        },

        methods: {
            onClose(){
                Vue.nextTick(() => {
                    this.component.$destroy();
                    this.component = null;

                    $(this.$el).find('.dialog__body  .dialog__body--inner').html('');
                    $(this.$el).find('.dialog__body').css('height', '');
                    $(this.$el).find('.dialog__footer').html('').hide();
                    $(this.$el).find('.el-dialog').css({
                        margin: 'auto'
                    });

                    $(this.$el).find('.el-scrollbar__thumb').css({
                        'transform': 'translateY(0%)'
                    });
                    this.$emit('close');
                });
            },

            open(component, data, parent){
                this.show = true;

                if(component.default){
                    const dialogComponent = Vue.extend(component.default);
                    this.component = new dialogComponent();
                    if(data){
                        this.component.data = util.cloneObj(data);
                        this.component.sourceDetailData = data;
                    }
                    this.component.dialog = this;
                    this.component.parent = parent || {};

                    Vue.nextTick(() => {
                        if(this.component){
                            let view = this.component.$mount().$el;
                            let $view = $(view);

                            const $footer = $view.find('.el-form + div');
                            if($footer.length > 0){
                                $(this.$el).find('.dialog__footer').show().html($footer);
                            }

                            const $body = $(this.$el).find('.dialog__body .dialog__body--inner');
                            $body.html(view);

                            this.update();
                        }
                    });
                }
            },

            close(){
                this.show = false;
            },

            update(){
                const $body = $(this.$el).find('.dialog__body');
                const maxHeight = ($(document).height() - 114) * 0.9;
                if($body.height() > maxHeight){
                    $body.height(maxHeight);
                }

                const $detailPageInner = $body.find('.detail-page--inner');
                if($detailPageInner.length > 0){
                    $detailPageInner.width(this.width - 56);
                }

                const $dialog = $(this.$el).find('.el-dialog');
                $dialog.css({
                    'margin-top': - $dialog.height() / 2 + 'px'
                });

                this.$refs.scroll && this.$refs.scroll.update();
            }
        },

        mounted(){
            $(this.$el).find('.el-dialog').find('.el-dialog__header .el-dialog__headerbtn').on('click', () => {this.close();});

            let that = this;
            ev.on('close-all-dialog', () => {
                that.close();
            });

            window.onresize = ()=>{
                Vue.nextTick(()=>{
                    const $body = $(that.$el).find('.dialog__body');
                    const maxHeight = ($(document).height() - 114) * 0.9;
                    if($('.dialog__body').height() > maxHeight || $('.dialog__body--inner').height()>$('.dialog__body').height()) {
                        let setHeight = maxHeight > $('.dialog__body--inner').height() ? $('.dialog__body--inner').height() : maxHeight;

                        $('.dialog__body').height(setHeight);

                        const $dialog = $('.el-dialog');
                        $dialog.css({
                            'margin-top': - (setHeight+120) / 2 + 'px'
                        });
                    }
                })
            }
        },

        destroyed(){
            window.onresize = null;
        },
    }
</script>
<style lang="less">
    @import "../style/trans";
    //弹框整体样式
    .el-message-box,.el-dialog{
        border-radius: 4px;
        box-shadow: 0 0 16px rgba(0,0,0,0.12);
        border: none;
        top: 50%;
    }
    .el-message-box{
        border-radius: 2px;
    }
    .el-dialog{overflow: hidden;}

    //设置弹框头部样式
    .el-dialog__header,.el-message-box__header{
        background: #fff;
        padding: 0 16px;
        line-height: 44px;
        height: 44px;
        position: relative;
        border-radius: 4px 4px 0 0;
    }
    .el-dialog__header .el-dialog__title,.el-message-box__header .el-message-box__title{
        font-weight:normal;
        color: #3b3b3b;
        font-size: 14px;
        line-height: 44px;
    }

    .el-dialog__header,.el-message-box__header{
        .el-dialog__headerbtn,.el-message-box__headerbtn{
            width: 25px;
            height: 25px;
            right: 8px;
            top: 9px;

            .el-icon-close{
                background: data-uri("../pub/image/icon-dialog-close.png") center no-repeat;
                width: 100%;
                height: 100%;
                &:before{content: '';}
            }
        }
    }

    //弹框body样式
    .el-dialog__body{
        padding: 0;
        .box();
        .box-column();

        .dialog__body{
            width: 100%;
            min-height: 17px;
            overflow: hidden;

            .dialog__body--inner{
                .data-form{
                    padding: 16px 28px 16px 28px;
                }

               .el-tree{
                   padding-top: 0 !important;
               }
            }
        }
        .dialog__footer{
            padding: 0 16px;
            line-height: 70px;
            height: 70px;
        }
    }

    .el-dialog__wrapper,.el-message-box__wrapper{overflow: hidden;z-index: 2001;}

    .v-modal{
        opacity: 0.7;
    }

    /**蓝色背景的弹框头**/
    .blue-header .el-dialog__header .el-icon-close{
        background: data-uri("../pub/image/icon-dialog-close-white.png") center no-repeat;
    }

    .blue-header{
        .el-dialog__header{
            background: #4285f4;
            .el-dialog__title{
                color: #fff;
            }
        }

        .el-dialog__body{
            .dialog__body{
                .dialog__body--inner{
                    .data-form{
                        padding: 0;
                    }
                }
            }
        }
    }
</style>
