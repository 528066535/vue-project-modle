<template>
    <div class="data-grid" :class="{ie: isIe, 'big-data': bigData}">
        <el-table ref="dataGrid"
                  :show-summary="summary"
                  :summary-method="summaryMethod"
                  :highlight-current-row="true"
                  :data="tableData"
                  :border="summary"
                  @sort-change="sortStatusChange"
                  @row-click="rowClick"
                  @row-dblclick="rowDblClick"
                  @selection-change="selectionChange"
                  @select-all="selectAll"
                  :stripe="stripe"
                  :height="height"
                  :select-on-indeterminate="true"
                  v-loading="loading"
                  :empty-text="emptyText"
        >
            <el-table-column :selectable="canCheck" class-name="no-padding" v-if="multiSelect" type="selection" width="38"></el-table-column>
            <el-table-column v-if="!multiSelect && !noNumber" label="序号" type="index" width="38" align="center" class-name="no-padding"></el-table-column>
            <slot></slot>
        </el-table>
        <div class="data-grid__page-footer" v-if="paging && pagingSite === 'bottom'">
            <!--<span style="line-height: 30px;vertical-align: top;">-->
            <!--<span class="total-page" v-if="total>0">共{{total}}</span>条-->
            <!--</span>-->

            <div style="display: inline-block;">
                <el-pagination  v-if="total > 0  && !simplePaging" @current-change="pageChange"
                                @size-change="sizeChange"
                                :current-page="searchParams.pageNumber"
                                :page-sizes="pages"
                                :pager-count="9"
                                :popper-class="tableId"
                                :page-size="searchParams.pageSize"
                                layout="total, sizes,prev, pager, next" :total="total">
                </el-pagination>
                <el-pagination  v-if="total > 0  && simplePaging" @current-change="pageChange"
                                @size-change="sizeChange"
                                :current-page="searchParams.pageNumber"
                                :pager-count="5"
                                :popper-class="tableId"
                                :page-size="searchParams.pageSize"
                                layout="total, prev, pager, next" :total="total">
                </el-pagination>
                <div  v-if="simplePaging && total <= 0">
                    <el-button-group>
                        <app-button @click="prev" :disabled="searchParams.pageNumber===1">上一页</app-button><qgs-button :disabled="isLastPage" @click="next" style="margin-left: 0;">下一页</qgs-button>
                    </el-button-group>
                </div>
            </div>

        </div>
        <div class="data-grid__page-top" v-if="paging && pagingSite === 'top' && total > 0">
            <span class="overview">{{searchParams.pageNumber}} / {{Math.ceil(total / searchParams.pageSize)}}</span>
            <el-pagination  class="fr" :current-page="searchParams.pageNumber" :page-size="searchParams.pageSize"  @current-change="pageChange"
                            layout="prev, next" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import http from '../pub/http';
    import util from '../pub/util';
    import {isIe} from '../pub/util';
    import dialog from '../pub/dialog';
    import router from '../pub/router';

    export default {
        props: {
            //列表的key
            listKey: {
                type: String,
                default: 'list'
            },
            //远程数据地址
            url: String,

            //远程数据地址
            emptyText: {
                type: String,
                default: '暂无数据'
            },

            //远程数据地址接收的参数
            param: Object,

            //是否多选
            multiSelect: {
                type: Boolean,
                default: true
            },

            isSingleSelect: {
                type: Boolean,
                default: false
            },

            //是否分页
            paging: {
                type: Boolean,
                default: true
            },

            simplePaging: {
                type: Boolean,
                default: false
            },

            //分页位置, top,bottom
            pagingSite: {
                type: String,
                default: 'bottom'
            },

            pageSize: Number,

            //是否显示合计
            summary: {
                type: Boolean,
                default: false
            },

            //合计的方法
            summaryMethod: Function,

            //最后一行是否是总计,分页的时候后台一页返回30条数据，如果需要合计行，会插入第31条合计数据
            lastSummary: {
                type: Boolean,
                default: true
            },

            //表格高度
            tableHeight: {
                type: Number,
                default: 0
            },

            //是否显示序号,默认不是多选的会显示序号，也有特殊的不是多选又不要显示序号的
            noNumber: {
                type: Boolean,
                default: false
            },

            cacheParam: {
                type: Boolean,
                default: true
            },

            noCache: {
                type: Boolean,
                default: false
            },

            //本地数据,不用url时可以通过这个参数加载本地表格数据
            localData: Array,

            //检测是否可选中,多选时监测这一行能不能被选中,返回true能选中，false不能选中
            canCheck: {
                type: Function,
                default: function () {
                    return true;
                }
            },

            //默认选中的项
            checkRow: {
                type: Function,
                default: function () {
                    return false;
                }
            },

            stripe: {
                type: Boolean,
                default: true
            },

            bigData: {
                type: Boolean,
                default: false
            },

            //是否美化滚动条
            niceScroll:{
                type: Boolean,
                default: false
            },

            scrollColor: String,

            //主要是给分下下拉的popover设置一个自定义class，来重置样式
            tableId: String
        },

        data() {
            //通过history获取之前保存的查询参数
            let cacheParam = util.getCacheParams();

            return {
                loadTime: 1,
                loading: false,
                loadAll: false,
                localMode: false, //用于获取远程数据，但又不是分页，且返回的数据是一个数组的情况下,认为他是本地分页模式

                searchParams: {
                    pageNumber: 1,
                    pageSize: 30
                },

                pages: [30, 300, 600, 1000],

                tableData: [],
                localSourceData: [],

                sourceData: [], //原始数据

                total: 0,
                summaryData: null,

                selections: [],

                height: 0,

                tablePosition: cacheParam.tablePosition || {},

                isIe: isIe,

                timer: null,

                isLastPage: false,

                resData: null
            };
        },

        watch:{
            localData(){
                this.tableData = [];
                this.localSourceData = util.cloneObj(this.localData);
                this.sourceData = util.cloneObj(this.localData);
                this.loadLocalData();
            }
        },

        methods: {
            pageChange: function (currentPage) {
                this.searchParams.pageNumber = currentPage;
                this.loadData(true);
            },

            sizeChange: function (size) {
                this.searchParams.pageSize = size;
                this.loadData(true);
            },

            prev(){
                this.searchParams.pageNumber -= 1;
                this.loadData(true);
            },

            next(){
                this.searchParams.pageNumber += 1;
                this.loadData(true);
            },

            sortStatusChange(res) {
                let result = '';
                if(res.order === 'ascending'){
                    result = 'asc';
                }else if(res.order === 'descending'){
                    result = 'desc';
                }
                this.$emit('sort-change', result);
            },

            rowDblClick(row){
                this.$emit('row-dblclick', row);
            },

            rowClick(row){
                this.setQueryCache(row);
                this.$emit('row-click', row);
            },

            selectionChange(list){
                if(this.isSingleSelect){
                    if(list.length > 1){
                        if(list.length === this.tableData.length){
                            for(let i = 0; i < list.length; i++){
                                this.$refs.dataGrid.togglelistelection(list[i], false);
                            }
                        }else{
                            for(let i = 0; i < this.selections.length; i++){
                                this.$refs.dataGrid.togglelistelection(this.selections[i], false);
                            }
                        }
                        return false;
                    }
                }

                this.selections = list;
                if(this.selections.length === this.tableData.length){
                    this.selections = this.sourceData;
                }
                this.$emit('selection-change', this.selections, this.tableData);
            },

            setQueryCache(row){
                let parentVue = this.$parent;
                let query = {tableQuery:this.searchParams};
                if(parentVue){
                    query.currentActive = parentVue.currentActive;
                    query.currentSubActive = parentVue.currentSubActive;
                    query.conditions = parentVue.conditions;
                }
                if(row){
                    query.tablePosition = {id: row.id, scrollTop: $(this.$el).find('.el-table__body-wrapper').scrollTop()};
                }else{
                    query.tablePosition = this.tablePosition;
                }

                if((parentVue.rootView || $(parentVue.$el).hasClass('rootView')) && this.paging && this.cacheParam){
                    history.replaceState({cacheParams: query}, null, '#' + router.url);
                }
            },

            reload: function (param) {
                this.tableData = [];
                if(this.noCache) {
                    this.searchParams = param;
                    this.loadDataNoCache(this.param);
                }
                else {
                    param.pageNumber = param.pageNumber || 1;
                    param.pageSize = this.searchParams.pageSize;
                    this.searchParams = param;
                    this.loadData(true);
                }
            },

            loadDataNoCache: function(param) {
                this.timer && clearTimeout(this.timer);
                this.loading = false;

                this.loadTime ++;
                let localLoadTime = this.loadTime;

                if(!this.loading && this.url){
                    this.loading = true;

                    this.timer = window.setTimeout(() => {
                        this.setQueryCache();
                        http.get(this.url, param).done((data) => {
                            if(this.loadTime !== localLoadTime) {
                                return;
                            }
                            if(!this._isDestroyed && (!data.page || data.page === this.searchParams.pageNumber)){
                                this.formatData(data, true);
                            }
                        }).fail(() => {
                            this.loading = false;
                        });
                    }, 400);
                }
            },

            loadData: function (isReload) {
                this.timer && clearTimeout(this.timer);
                this.loading = false;

                this.loadTime ++;
                let localLoadTime = this.loadTime;

                if(!this.loading && this.url){
                    this.loading = true;

                    this.timer = window.setTimeout(() => {
                        this.setQueryCache();
                        http.get(this.url, this.searchParams).done((data, response, param) => {
                            if(this.loadTime !== localLoadTime) {
                                return;
                            }
                            if(!this._isDestroyed && (!data.page || data.page === this.searchParams.pageNumber)){
                                this.formatData(data, isReload);
                            }
                        }).fail(() => {
                            this.loading = false;
                        });
                    }, 400);
                }
            },

            loadLocalData(){
                const spliceData = this.spliceLocalData();
                for(let i = 0; i < spliceData.length; i++){
                    this.tableData.push(spliceData[i]);
                }
                this.loadAll = this.localSourceData.length <= 0;

                util.delay(100).then(() => {
                    this.tableData.forEach(row => {
                        if(this.checkRow(row)){
                            this.$refs.dataGrid.togglelistelection(row, true);
                        }
                    });
                });
            },

            formatData: function (data, isReload) {
                this.total = data.total;
                this.resData = data;

                doRender.call(this);

                function doRender() {
                    if(isReload){
                        this.tableData = [];
                        this.localSourceData = [];
                        this.sourceData = [];
                    }

                    if(util.isArray(data)){
                        if(this.lastSummary && this.summary){
                            this.summaryData = data.splice(data.length-1, 1)[0];
                        }
                        this.localSourceData = data;
                        this.sourceData = util.cloneObj(data);
                        this.loadLocalData();
                        this.localMode = true;
                    }else if(util.isObject(data)){
                        if(this.lastSummary && this.summary){
                            let summaryData = data[this.listKey].splice(data[this.listKey].length-1, 1)[0];
                            summaryData.cols.id = summaryData.id;
                            this.summaryData = summaryData.cols;
                        }

                        if(!this.paging){
                            let local = data[this.listKey];
                            this.localSourceData = this.localSourceData.concat(local);
                            this.sourceData = this.sourceData.concat(local);
                            this.loadLocalData();
                        }else{
                            this.tableData = data[this.listKey];
                            this.sourceData = util.cloneObj(this.$data.tableData);
                            this.isLastPage = data[this.listKey].length < this.searchParams.pageSize;
                        }
                    }

                    if(this.niceScroll){
                        util.scrollDiv($(this.$el).find('.el-table__body-wrapper'), this.scrollColor);
                    }
                    util.delay(100).then(() => {
                        isReload && $(this.$el).find('.el-table__body-wrapper').scrollTop(0);
                        this.loading = false;

                        if(!this.paging){
                            this.searchParams.pageNumber += 1;
                        }

                        this.tableData.forEach(row => {
                            if(this.checkRow(row)){
                                this.$refs.dataGrid.togglelistelection(row, true);
                            }
                        });

                        this.$emit('loaded', this.tableData, data);

                        if(this.tablePosition.id){
                            let currentRow = this.tableData.filter(d => {return d.id === this.tablePosition.id;});
                            if(currentRow.length > 0){
                                this.$refs.dataGrid.setCurrentRow(currentRow[0]);
                                $(this.$el).find('.el-table__body-wrapper').scrollTop(this.tablePosition.scrollTop || 0);
                            }
                            this.tablePosition = {};
                        }
                    });
                }
            },

            /**
             * 根据传入行，更新表格,不传则更新全部的行
             * @param row
             */
            refresh: function (row) {
                if(row && row.id){
                    let data = this.tableData.getById(row.id);
                    for(let key in row){
                        Vue.set(data, key, row[key]);
                    }
                }else{
                    this.loadData(true);
                }
            },

            /**
             * 多选时，获取选中的行
             */
            getSelection: function () {
                return this.selections;
            },

            /**
             * 获取总条数
             */
            getTotal: function () {
                return this.total;
            },

            /**
             * 获取原始数据
             */
            getResData: function () {
                return this.resData;
            },

            setLoading(){
                this.loading = true;
            },

            getSummaryData(){
                return this.summaryData;
            },

            /**
             * 删除一行
             * @param url
             * @param id
             * @param tips
             * @param method
             */
            delSelectedSinglelistByMethods: function (url, params, tips, method) {
                return new Promise((resolve, reject) => {
                    dialog.confirm(tips?tips:'您确认要删除这条数据吗？').then(() => {
                        if(url){
                            http[method || 'post'](`${url}`, params).done(() => {
                                dialog.success('操作成功');
                                if(this.paging){
                                    this.refresh();
                                }else{
                                    this.refresh();

                                    // const index = this.tableData.indexOf(this.tableData.getById(id));
                                    // this.tableData.splice(index, 1);
                                    // this.total -= 1;
                                }
                            }).always(() => {
                                resolve();
                            });
                        }
                    });
                });
            },

            delSelectedSinglelist(url, id, tips){
                return this.delSelectedSinglelistByMethods(url, id, tips, 'delete');
            },

            delSelectedSinglelistPost(url, id, tips){
                return this.delSelectedSinglelistByMethods(url, id, tips, 'post');
            },

            /**
             * 删除选中的行
             * @param url
             * @param tips
             * @param callback //判断是否能删除
             * @param method 参数提交方式
             */
            delSelectedlistByMethod: function (url, tips, callback, method) {
                return new Promise((resolve, reject) => {
                    const sections = this.selections;
                    if(sections.length <= 0){
                        dialog.alert(`请您选择要删除的${tips || '数据'}!`);
                    }else{
                        if(callback){
                            if(!callback(sections)){
                                return false;
                            }
                        }
                        dialog.confirm(`您确认要删除选择的${tips || '数据'}吗？`).then(() => {
                            if(url){
                                const ids = sections.map(d => {return d.id;});
                                http[method || 'delete'](`${url}/${ids.join(',')}`).done((data) => {
                                    dialog.success(data.msg?data.msg:'操作成功');

                                    this.refresh();
                                }).always(() => {
                                    resolve(ids);
                                });
                            }
                        });
                    }
                });

            },

            delSelectedlist: function (url, tips, callback) {
                return this.delSelectedlistByMethod(url, tips, callback, 'delete');

            },
            delSelectedlistPost: function (url, tips, callback) {
                return this.delSelectedlistByMethod(url, tips, callback, 'post');
            },

            //分隔本地数据
            spliceLocalData(){
                return this.localSourceData.splice(0, 20);
            },

            //选中表格中的一行,如通过key来指定用哪个字段判断是否是同一行
            selectRow(list, key, unSelect){
                key = key || 'id';
                if(key !== 'index'){
                    for(let i = 0; i < list.length; i++){
                        let id = list[i][key];
                        const row = this.tableData.filter(d => {return id === d[key];});
                        if(row[0]){
                            if(this.multiSelect){
                                this.$refs.dataGrid.togglelistelection(row[0], !unSelect);
                            }else{
                                this.$refs.dataGrid.setCurrentRow(row[0], true);
                            }
                        }
                    }
                }else{
                    const row = this.tableData[list];
                    if(row){
                        this.$refs.dataGrid.setCurrentRow(row, true);
                    }
                }
            },

            clearSelectRow(){
                this.$refs.dataGrid.setCurrentRow();
            },

            selectAll(data){
                this.$emit('select-all',data);
            },

            //清空表格
            clear(){
                this.loading = false;
                this.loadAll = false;
                this.tableData = [];
            },

            //设置下拉滚动加载更多
            setScroll(){
                let that = this;
                $(this.$el).find('.el-table__body-wrapper').off('scroll').on('scroll', function () {
                    let h = $(this).height();
                    let sh = $(this)[0].scrollHeight;
                    let st =$(this)[0].scrollTop;

                    if(h+st>=sh - 50){
                        if(!that.paging){
                            if(!that.localData && !that.localMode){
                                if(!that.loading && !that.loadAll){
                                    that.loadData(true);
                                }
                            }else{
                                if(that.localSourceData.length > 0){
                                    that.loadLocalData();
                                }
                            }
                        }
                    }
                });
            },

            resize: function () {
                Vue.nextTick(() => {
                    console.log($(this.$el).parent().height())
                    this.height = $(this.$el).parent().height() - (this.paging && this.pagingSite === 'bottom'?62: 10);
                });
            }
        },

        destroyed(){
            this.tableData = [];
            this.localSourceData = [];
            this.sourceData = [];
            this.selections = [];
        },

        mounted: function () {
            if(!this.noCache) {
                let cacheParam = util.getCacheParams();
                let params = cacheParam.tableQuery || {
                    pageNumber: 1,
                    pageSize: 30
                };
                this.searchParams = params;
            }

            if(this.localData){
                this.localSourceData = util.cloneObj(this.localData);
                this.sourceData = util.cloneObj(this.localData);
                this.loadLocalData();
            }else{
                let param = {};
                for(let key in this.param){
                    param[key] = this.param[key];
                }
                param.pageNumber = this.searchParams.pageNumber;
                this.reload(param);
            }

            if(this.tableHeight){
                this.height = this.tableHeight;
            }

            if(!this.tableHeight){
                $(window).on('resize', ()=>{
                    this.resize();
                });
                this.resize();
            }

            if(!this.paging){
                this.setScroll();
            }

            if(this.pageSize){
                this.searchParams.pageSize = this.pageSize;
            }

        }
    }
</script>
