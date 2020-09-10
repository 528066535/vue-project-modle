<template>
    <el-autocomplete :placeholder="placeholder"
                     @select="change"
                     @blur="blur"
                     size="small"
                     :maxlength="maxlength"
                     :fetch-suggestions="querySearch"
                     :clearable="clearable"
                     :value-key="valueName"
                     v-model="nativeValue"
                     :select-when-unmatched="true"
                     :disabled="disabled"></el-autocomplete>
</template>

<script>
    import http from '../pub/http';
    import util from '../pub/util';

    export default {
        props: {
            value: [String, Number, Array],

            placeholder: {
                type: String,
                default: '请输入'
            },

            //远程数据地址可选
            url: String,

            //拉取远程数据时需要知道实际的值的字段
            valueName: {
                type: String,
                default: 'value'
            },

            //是否可清除
            clearable: {
                type: Boolean,
                default: true
            },

            maxlength: {
                type: Number,
                default: 100
            },

            //是否禁用
            disabled: {
                type: Boolean,
                default: false
            },

            localData: {
                type: Array,
                default: () => {
                    return [];
                }
            },

            customId: {
                type: String,
                default: util.getRandomStr(9)
            }
        },

        data(){
            return {
                nativeValue: '',
                sourceData: [],
                options: [],
                loaded: false,
                selectId: util.getRandomStr(9)
            }
        },


        watch: {
            nativeValue(v){
                this.$emit('input', v);
            },

            value(){
                this.nativeValue = this.value;
            },

            localData(){
                this.options = util.cloneObj(this.localData);
                this.sourceData = util.cloneObj(this.localData);
            }
        },

        methods: {
            change(){
                if(this.loaded){
                    //v-model的值有点延迟,这里加个延迟
                    Vue.nextTick(() => {
                        this.$emit('select-change');
                    });
                }
            },
            blur(){
                if(this.loaded){
                    Vue.nextTick(() => {
                        this.$emit('blur');
                    });
                }
            },

            getOptions(){
                return this.sourceData;
            },

            querySearch(queryString, cb) {
                var restaurants = this.options;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },

            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant[this.valueName]?restaurant[this.valueName].toLowerCase().indexOf(queryString.toLowerCase()) === 0:false);
                };
            },

        },

        created(){
            this.nativeValue = this.value;

            if(this.url){
                http.get(this.url).done((ret) => {
                    this.options = ret;
                    this.sourceData = util.cloneObj(ret);

                    Vue.nextTick(() => {
                        this.loaded = true;
                    });
                });
            }else{
                this.options = util.cloneObj(this.localData);
                this.sourceData = util.cloneObj(this.localData);

                Vue.nextTick(() => {
                    this.loaded = true;
                });
            }
        },

        mounted(){

        }
    }
</script>
<style lang="less">
    .el-autocomplete {
        width: 100%;
    }
</style>
