<template>
  <app-form @save="save" :model="postData" class="unit-select" ref="form" label-width="100px">
    <app-formitem label="类型" prop="type" :rules="rules.type">
      <app-select v-model="postData.type" placeholder="请输入" :maxlength="100" :local-data="placeType"></app-select>
    </app-formitem>
    <app-formitem label="点位名称">
      <app-input v-model="postData.pname" placeholder="请输入" :maxlength="100"></app-input>
    </app-formitem>
    <app-formitem label="缩略图" prop="pimg" :rules="rules.pimg">
      <app-file-input tip="只支持图片的文件格式,小于20M" max="20m" v-model="pimg" action="/uploadFile" accept=".gif|.jpeg|.png|.jpg|.bmp">
        <app-button>上传附件</app-button>
      </app-file-input>
    </app-formitem>
    <app-formitem label="地理位置">
      <app-input type="textarea" disabled v-model="postData.addr" placeholder="请输入" :maxlength="100"></app-input>
    </app-formitem>
    <div style="width: 100%;height: 400px;">
      <baidu-map @click="getClickInfo"
                 @ready="onBaiduMapReady"
                 @moving="syncCenterAndZoom"
                 @moveend="syncCenterAndZoom"
                 @zoomend="syncCenterAndZoom" :scroll-wheel-zoom="true" :center="center" :zoom="zoom" class="bm-view">
        <bm-view class="map"></bm-view>
        <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true"
                   animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
        <bm-control :offset="{width: '10px', height: '10px'}">
          <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}">
            <input type="text" placeholder="请输入搜索关键字" class="serachinput">
          </bm-auto-complete>
        </bm-control>
        <bm-local-search :keyword="keyword" :auto-viewport="true"
                         style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
      </baidu-map>
    </div>
  </app-form>
</template>

<script type="text/ecmascript-6">
  /**
   * Created by 周文博 on 2017/5/12.
   */
  import page from '@Pub/page';
  import place from '../js/place'
  import validate from '@Pub/validate';

  export default {
    data() {
      return {
        BMap: null,
        keyword: '西湖区',
        center: {lng: 120, lat: 30},
        zoom: 12,
        pimg: {url: ''},
        postData: {
          addr: '',
          pname: '',
          type: '',
          pimg: ''
        },
        rules: {
          devnum: validate.required('请填写'),
          type: validate.required('请选择'),
          pimg: validate.required('请选择')
        }
      }
    },
    watch: {
      pimg: {
        handler: function(file) {
          this.postData.pimg = file.url
        },
        deep: true
      }
    },
    mixins: [page, place],
    methods: {
      onBaiduMapReady(e) {
        this.BMap = e.BMap
      },
      getClickInfo(e) {
        this.zoom = e.target.getZoom()
        this.center.lng = e.point.lng
        this.center.lat = e.point.lat
        this.getAddress(e)
      },
      getAddress(e) {
        // 此时已经可以获取到BMap类
        if (this.BMap) {
          let that = this;
          // Geocoder() 类进行地址解析
          // 创建地址解析器的实例
          const geoCoder = new this.BMap.Geocoder()
          // getLocation() 类--利用坐标获取地址的详细信息
          // getPoint() 类--获取位置对应的坐标
          geoCoder.getLocation(e.point, function (res) {
            console.log('获取经纬度', e.point, '获取详细地址', res)
            const addrComponent = res.addressComponents
            const surroundingPois = res.surroundingPois
            const province = addrComponent.province
            const city = addrComponent.city
            const district = addrComponent.district
            let addr = addrComponent.street
            if (surroundingPois.length > 0 && surroundingPois[0].title) {
              if (addr) {
                addr += `-${surroundingPois[0].title}`
              } else {
                addr += `${surroundingPois[0].title}`
              }
            } else {
              addr += addrComponent.streetNumber
            }
            console.log(res.address + addr);
            that.postData.addr = res.address + addr
          })
        }
      },
      syncCenterAndZoom(e) {
        // const {lng, lat} = e.target.getCenter()
        // this.center.lng = lng
        // this.center.lat = lat
        this.zoom = e.target.getZoom()
      },
      save() {
        this.postData.jdu = this.center.lng
        this.postData.wdu = this.center.lat
        this.postData.adminname = ''
        let url = this.postData.pid ? '/modifyPoint' : '/addPoint'
        this.saveData(url, this.postData).then(res => {

        })
      }
    },
    mounted() {
      this.postData = this.data ? Object.assign(this.postData, this.data) : {}
      this.postData.type = this.data.type >= 0 ? Number(this.data.type) : ''
      this.pimg.url = this.data.pimg ? this.data.pimg : ''
      this.keyword = this.postData.addr
      // var map = new BMapGL.Map("container");
      // var point = new BMapGL.Point(116.404, 39.915);
      // map.centerAndZoom(point, 15);
    },
  };

</script>
<style lang="less" scoped rel="stylesheet/less">
  .bm-view {
    height: 100%;
    width: 100%;

    .map {
      height: 400px;
    }
  }
</style>