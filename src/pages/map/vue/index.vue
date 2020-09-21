<template>
  <div style="width: 100%;height: 100%;">
    <baidu-map v-if="center" @click="getClickInfo"
               @ready="onBaiduMapReady"
               @moving="syncCenterAndZoom"
               @moveend="syncCenterAndZoom"
               @zoomend="syncCenterAndZoom" :scroll-wheel-zoom="true" :center="center" :zoom="zoom" :map-click="false"
               class="bm-view">
      <bm-view class="map"></bm-view>
      <bm-point-collection :points="placeList" shape="BMAP_POINT_SHAPE_CIRCLE" color="#09f" size="BMAP_POINT_SIZE_BIG"
                           @click="clickHandler">
      </bm-point-collection>
      <bm-info-window :position="infoWindowPoint" title="" :show="show" @close="infoWindowClose" @open="infoWindowOpen">
        <div>
          <p>
            <img class="img" :src="infoWindowPoint.pimg" alt="">
          </p>
          <p>名称 : {{infoWindowPoint.pname}}</p>
          <p>类型 : {{['服务点','学校','医院'][infoWindowPoint.type]}}</p>
          <p>地址 : {{infoWindowPoint.addr}}</p>

        </div>

      </bm-info-window>
    </baidu-map>

    <div id="iCenter" style="display: none"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  /**
   * Created by 周文博 on 2017/5/12.
   */
  import page from '@Pub/page';
  import validate from '@Pub/validate';
  import http from '@Pub/http';

  export default {
    data() {
      return {
        BMap: null,
        map: null,
        center: {lng: 120, lat: 30.2},
        zoom: 12,
        placeList: [],
        infoWindowPoint: {
          address: ''
        },
        show: true
      }
    },
    computed: {},
    mixins: [page],
    methods: {
      setSourceCenter() {
        this.map && this.map.setCenter(this.center)
        this.map && this.map.panTo(this.center)
      },
      infoWindowClose() {
        this.show = false
      },
      infoWindowOpen() {
        this.show = true
      },
      clickHandler(e) {
        e.point.address = '正在获取...'
        this.infoWindowPoint = e.point
//        this.getAddress(e)
        this.getListAddress(e)
        Vue.nextTick().then(() => {
          this.show = true
        })
      },
      onBaiduMapReady(e) {
        this.BMap = e.BMap
        this.map = e.map
        // let that = this
        // const geolocation = new this.BMap.Geolocation();
        // geolocation.getCurrentPosition(function(r){
        //   console.log(r)
        //   console.log(e)
        //   that.center = {
        //     lng: r.longitude,
        //     lat: r.latitude
        //   }
        //   that.setSourceCenter()
        // },{ enableHighAccuracy: true })
        // this.getCurrenPosition()
        this.setSourceCenter()
      },
      getCurrenPosition() {
        let that = this
        navigator.geolocation.getCurrentPosition(function (position) {
          //得到html5定位结果
          let x = position.coords.longitude;
          let y = position.coords.latitude;

          that.center = {
            lng: x,
            lat: y
          }

          that.setSourceCenter()
        }, err => {
          //
        })
      },
      getClickInfo(e) {
        //
      },
      getListAddress(e) {
        this.placeList.forEach(data => {
          if (e.point.lng == data.lng && e.point.lat == data.lat) {
            this.infoWindowPoint = data
          }
        })
      },
      getAddress(e) {
        // 此时已经可以获取到BMap类
        if (this.BMap) {
          this.infoWindowPoint.address = ''
          let that = this;
          // Geocoder() 类进行地址解析
          // 创建地址解析器的实例
          const geoCoder = new this.BMap.Geocoder()
          // getLocation() 类--利用坐标获取地址的详细信息
          // getPoint() 类--获取位置对应的坐标
          geoCoder.getLocation(e.point, function (res) {
            const addrComponent = res.addressComponents
            const surroundingPois = res.surroundingPois
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
            that.infoWindowPoint.address = res.address + addr
          })
        }
      },
      syncCenterAndZoom(e) {
        // const {lng, lat} = e.target.getCenter()
        // this.center.lng = lng
        // this.center.lat = lat
        this.zoom = e.target.getZoom()
      },
      getPlaceList() {
        http.post('/queryPointsAllApp', {pageNumber: 1, pageSize: 200}).then(res => {
          // if (res.list.length > 0) {
          //   this.center = {
          //     lng: res.list[0].jdu,
          //     lat: res.list[0].wdu
          //   }
          // }
          // this.setSourceCenter()
          this.placeList = res.list.map(data => {
            return Object.assign(data, {lng: data.jdu, lat: data.wdu})
          })
        }).catch(error => {
        })
      },
      getLocation(successFunc, errorFunc) { //successFunc获取定位成功回调函数，errorFunc获取定位失败回调

      }
    },
    mounted() {
      this.getPlaceList()
      let mapObj = new AMap.Map('iCenter');
      let that = this
      mapObj.plugin('AMap.Geolocation', function () {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true,        //显示定位按钮，默认：true
          buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', function (j) {
          console.log(j)
          that.center = {
            lng: j.position.lng,
            lat: j.position.lat
          }
          that.setSourceCenter()
        });//返回定位信息
        // AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
      });
    },
  }

</script>
<style lang="less" scoped rel="stylesheet/less">
  .bm-view {
    height: 100%;
    width: 100%;

    .map {
      height: 100%;
    }
  }

  .img {
    max-width: 150px;
    max-height: 100px;
    top: 0;
    right: 0;
  }
</style>