<template>
  <app-page>
    <app-form ref="form" :model="buildData" label-width="80px" @save="save">
      <app-formitem label="标签名称">
        <app-input v-model="buildData.name"></app-input>
      </app-formitem>
      <app-formitem label="标签类型">
        <app-input v-model="buildData.manager"></app-input>
      </app-formitem>
    </app-form>
  </app-page>
</template>

<script type="text/ecmascript-6">
  /**
   * Created by 蒋鑫强 on 2017/5/12.
   */
  import page from '@Pub/page';
  import validate from '@Pub/validate';
  import http from '@Pub/http';
  import filter from '@Pub/filter';
  import dialog from '@Pub/dialog';

  let vm = null;
  export default {
    data(){
      return {
        inputValue: '',
        dynamicTags: ['标签一', '标签二', '标签三'],
        buildData: {
          name: '',
          manager: '',
          implUnit: '',
          implStatus: '',
          gradeProtectUnitId: '', //备案单位id
          gradeProtectUnitName: '', //备案单位名称
          gradeProtectSystemId: '', //备案系统id
          gradeProtectSystemName: '', //备案系统名称
          startTime: '', //整改开始日期
          endTime: '', //整改结束日期
          cause: '', //整改原因

          contact: '', //实施单位联系人
          phone: '',
          email: '',
          mobile: '', //移动电话
          address: '', //实施单位地址

          basis: '等级测评', //整改依据的类型 等级测评/安全检查/自查
          beforeAssessNumber: '', //整改前对应测评编号
          beforeAssessResult: '', //整改前测评结果
          checkResult: '', //
          feedBackName: '',
          feedBackPath: '',
          selfCheckResult: '', //自查结论

          isAssess: '否', //整改后是否经过测评: 是/否
          afterAssessNumber: '', //整改后测评报告编号
          afterAssessResult: '', //整改后测评结果
          plan: '', //整改方案简述
          assessSuggestion: '', //整改评审意见
          attachmentName: '', //附件名称
          attachmentPath: '', //附件路径
        },

        rules: {
//                    name: validate.required('整改辩题必须填写'),
//                    manager: validate.required('整改负责人必须填写'),
//                    implUnit: validate.required('整改实施单位必须填写'),
//                    implStatus: validate.required('建设整改实施状态必须选择'),
          gradeProtectUnitName: validate.required('备案单位必须填写'),
          gradeProtectSystemName: validate.required('备案信息系统必须填写'),
//                    cause: validate.required('整改原因必须填写'),
//                    contact: validate.required('实施单位联系人必须填写'),
//                    phone: validate.required('联系电话必须填写'),
//                    address: validate.required('实施单位地址必须填写'),
//                    basis: validate.required('状态必须选择'),
//                    beforeAssessResult: validate.required('整改前测试结果必须填写'),
//                    isAssess: validate.required('整改后是否经过测试必须选择'),
//                    afterAssessResult: validate.required('整改后测试结果必须填写'),
//                    plan: validate.required('整改方案简述必须填写'),
//                    assessSuggestion: validate.required('整改评审意见必须填写'),
        },

        buildFile: {},
        feedbackFile: {},

        implStatusList: [
          {name: '未实施', value: '未实施'},
          {name: '正在实施', value: '正在实施'},
          {name: '实施完成', value: '实施完成'},
        ],

        beforeAssessNumberList: [],
        inputVisible: true
      }
    },
    mixins: [page],

    computed: {},


    watch: {},
    methods: {
      downLoadFile(file){
        http.downloadFile(file.filePath, file.fileName)
      },
      save(){
        if (this.buildData.basis == '等级测评') {
          this.buildData.checkResult = '';
          this.buildData.feedBackName = '';
          this.buildData.feedBackPath = '';

          this.buildData.selfCheckResult = '';
        }
        else if (this.buildData.basis == '安全检查') {
          this.buildData.beforeAssessNumber = '';
          this.buildData.beforeAssessResult = '';

          this.buildData.selfCheckResult = '';
        }
        else if (this.buildData.basis == '自查') {
          this.buildData.beforeAssessNumber = '';
          this.buildData.beforeAssessResult = '';

          this.buildData.checkResult = '';
          this.buildData.feedBackName = '';
          this.buildData.feedBackPath = '';
        }

        if (this.buildData.isAssess == '否') {
          this.buildData.afterAssessResult = '';
          this.buildData.afterAssessNumber = '';
        }

        let postJson = Object.assign({}, this.buildData);
        postJson.startTime = postJson.startTime ? filter.date(postJson.startTime, 'yyyy-MM-dd hh:mm:ss') : '';
        postJson.endTime = postJson.endTime ? filter.date(postJson.endTime, 'yyyy-MM-dd hh:mm:ss') : '';

        if (this.data.id) {
          postJson.id = this.data.id;
          this.saveData('/grade_protect/rectification/modify', JSON.stringify(postJson));
        }
        else {
          this.saveData('/grade_protect/rectification/create', JSON.stringify(postJson));
        }
      },

      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    },

    mounted(){
      vm = this;
      let id = '';
      if (this.data) {
        id = this.data.id;
      } else {
        id = this.urlParam.id;
      }
      if (id) {
        http.get(`/grade_protect/rectification/info/${id}`).then((res)=> {
          this.buildData.id = id;
          this.buildData.name = res.name;
          this.buildData.manager = res.manager;
          this.buildData.implUnit = res.implUnit;
          this.buildData.implStatus = res.implStatus;
          this.buildData.gradeProtectUnitId = res.gradeProtectUnitId;
          this.buildData.gradeProtectUnitName = res.gradeProtectUnitName;
          this.buildData.gradeProtectSystemId = res.gradeProtectSystemId;
          this.buildData.gradeProtectSystemName = res.gradeProtectSystemName;
          this.buildData.startTime = res.startTime ? new Date(filter.date(res.startTime, 'yyyy/MM/dd hh:mm:ss')) : '';
          this.buildData.endTime = res.endTime ? new Date(filter.date(res.endTime, 'yyyy/MM/dd hh:mm:ss')) : '';
          this.buildData.cause = res.cause;
          this.buildData.contact = res.contact;
          this.buildData.phone = res.phone;
          this.buildData.email = res.email;
          this.buildData.mobile = res.mobile;
          this.buildData.address = res.address;
          this.buildData.basis = res.basis;
          this.buildData.beforeAssessNumber = res.beforeAssessNumber;
          this.buildData.beforeAssessResult = res.beforeAssessResult;
          this.buildData.isAssess = res.isAssess;
          this.buildData.afterAssessNumber = res.afterAssessNumber;
          this.buildData.afterAssessResult = res.afterAssessResult;
          this.buildData.plan = res.plan;
          this.buildData.assessSuggestion = res.assessSuggestion;
          this.buildData.attachmentName = res.attachmentName;
          this.buildData.attachmentPath = res.attachmentPath;
          this.buildData.checkResult = res.checkResult;
          this.buildData.feedBackName = res.feedBackName;
          this.buildData.feedBackPath = res.feedBackPath;
          this.buildData.selfCheckResult = res.selfCheckResult;

          this.buildFile = {
            fileName: res.attachmentName,
            filePath: res.attachmentPath
          };

          this.feedbackFile = {
            fileName: res.feedBackName,
            filePath: res.feedBackPath
          };

        });
      }
    }
  };

</script>
<style lang="less" scoped rel="stylesheet/less">
  .button-new-tag {
    vertical-align: middle;
  }
</style>