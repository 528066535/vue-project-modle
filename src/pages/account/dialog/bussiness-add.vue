<template>
    <app-form @save="save" :model="postData" class="unit-select"  ref="form" label-width="150px">
        <app-formitem label="运营商名称" prop="carriername" :rules="rules.carriername">
            <app-input type="text" v-model="postData.carriername" placeholder="请输入" :maxlength="100"></app-input>
        </app-formitem>
        <app-formitem v-if="!data.carrierid" label="运营商登录账号" prop="newadminname" :rules="rules.newadminname">
            <app-input type="text" v-model="postData.newadminname" placeholder="请输入" :maxlength="100"></app-input>
        </app-formitem>
        <app-formitem label="手机号" prop="phone" :rules="rules.phone">
            <app-input type="text" v-model="postData.phone" placeholder="请输入" :maxlength="100"></app-input>
        </app-formitem>
        <app-formitem v-if="!data.carrierid" label="新密码" prop="adminpwd" :rules="rules.adminpwd">
            <app-input v-model="postData.adminpwd" placeholder="请输入" :maxlength="100"></app-input>
        </app-formitem>

        <app-formitem label="省份">
            <app-select v-model="postData.pcode" :local-data="province"></app-select>
        </app-formitem>

        <app-formitem label="城市">
            <app-select v-model="postData.scode" :local-data="city"></app-select>
        </app-formitem>

        <app-formitem label="区县">
            <app-select v-model="postData.citycode" :local-data="country"></app-select>
        </app-formitem>
    </app-form>
</template>

<script type="text/ecmascript-6">
    /**
     * Created by 周文博 on 2017/5/12.
     */
    import page from '@Pub/page';
    import validate from '@Pub/validate';
    import options from '@Resource/third/position';
    console.log(options)

    export default {
        data(){
            return {
                areas: [],
                postData: {carriername: '',adminpwd: '', newadminname: '', pcode: '', scode: '', citycode: '', phone: ''},
                rules: {
                    adminpwd: validate.required('请填写'),
                    carriername: validate.required('请填写'),
                    phone: validate.required('请填写'),
                    newadminname: validate.required('请填写'),
                },
            }
        },
        computed: {
            province(){
                return this.areas ? this.areas.map(d => {
                    return d;
                }) : [];
            },

            city(){
                let city = []
                if(this.postData.pcode){
                    city = this.areas.getByKey('value', this.postData.pcode);
                    city = city.children;
                }
                return city;
            },

            country(){
                let result = [];
                let city = [];
                if(this.postData.pcode){
                    city = this.areas.getByKey('value', this.postData.pcode);
                    city = city.children;
                }

                if(this.postData.scode){
                    result = city.getByKey('value', this.postData.scode);
                    result = result.children;
                }

                return result;
            }
        },

        watch: {
            'postData.pcode'(){
                let city = this.province.getByKey('name', this.postData.pcode) || {city: []};
                if(city.city.length > 0){
                    let currentCity = city.getByKey('name', this.postData.scode);
                    if(!currentCity){
                        this.postData.city = '';
                        this.postData.citycode = '';
                    }
                }
            },

            'postData.city'(){
                let area = this.city.getByKey('name', this.postData.scode) || {area: []};
                if(area.area.length > 0){
                    let currentArea = area.getByKey('name', this.postData.citycode);
                    if(!currentArea){
                        this.postData.citycode = '';
                    }
                }
            }
        },
        mixins: [page],
        methods: {
            save() {
                if(this.data.carrierid) {
                    this.saveData('/modifyCarrier',this.postData).then(res=>{

                    })
                }
                else {
                    this.saveData('/addCarrier', this.postData).then(res => {

                    })
                }
            }
        },
        mounted(){
            this.areas = options
            if(this.data.carrierid) {
                Object.assign(this.postData, this.data)
            }
        },
    };

</script>