<template>
  <div style="width: 100%;height: 100%;">
    <baidu-map @click="getClickInfo"
               @ready="onBaiduMapReady"
               @moving="syncCenterAndZoom"
               @moveend="syncCenterAndZoom"
               @zoomend="syncCenterAndZoom" :scroll-wheel-zoom="true" :center="center" :zoom="zoom" :map-click="false" class="bm-view">
      <bm-view class="map"></bm-view>
      <bm-point-collection :points="placeList" shape="BMAP_POINT_SHAPE_CIRCLE" color="#09f" size="BMAP_POINT_SIZE_BIG" @click="clickHandler">
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
    computed: {
    },
    mixins: [page],
    methods: {
      setSourceCenter() {
        this.map.setCenter(this.center)
        this.map.panTo(this.center)
      },
      infoWindowClose () {
        this.show = false
      },
      infoWindowOpen () {
        this.show = true
      },
      clickHandler(e) {
        e.point.address = '正在获取...'
        this.infoWindowPoint = e.point
//        this.getAddress(e)
        this.getListAddress(e)
        Vue.nextTick().then(()=>{
          this.show = true
        })
      },
      onBaiduMapReady(e) {
        this.BMap = e.BMap
        this.map = e.map
        let that = this
        const geolocation = new this.BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          console.log(r)
          console.log(e)
          that.center = {
            lng: r.longitude,
            lat: r.latitude
          }
          that.setSourceCenter()
        },{ enableHighAccuracy: true })
      },
      getClickInfo(e) {
        //
      },
      getListAddress(e) {
        this.placeList.forEach(data => {
          if(e.point.lng == data.lng && e.point.lat == data.lat) {
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
          geoCoder.getLocation(e.point, function(res) {
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
      }
    },
    mounted() {
      http.post('/queryPointsAllApp',{pageNumber: 1, pageSize: 200}).then(res=>{
        this.placeList = res.list.map(data => {
          return Object.assign(data, { lng: data.jdu, lat: data.wdu })
        })
      }).catch(error=>{
      })
    },
  };

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