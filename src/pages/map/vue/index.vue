<template>
  <div style="width: 100%;height: 100%;">
    <baidu-map @click="getClickInfo"
               @ready="onBaiduMapReady"
               @moving="syncCenterAndZoom"
               @moveend="syncCenterAndZoom"
               @zoomend="syncCenterAndZoom" :scroll-wheel-zoom="true" :center="center" :zoom="zoom" :map-click="false" class="bm-view">
      <bm-view class="map"></bm-view>
      <bm-point-collection :points="placePoints" shape="BMAP_POINT_SHAPE_RHOMBUS" color="#09f" size="BMAP_POINT_SIZE_HUGE" @click="clickHandler">
      </bm-point-collection>
      <bm-point-collection :points="placePoints1" shape="BMAP_POINT_SHAPE_RHOMBUS" color="red" size="BMAP_POINT_SIZE_HUGE" @click="clickHandler">
      </bm-point-collection>
      <bm-info-window :position="infoWindowPoint" title="地址" :show="show" @close="infoWindowClose" @open="infoWindowOpen">
        <p>{{infoWindowPoint.address}}</p>
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

  export default {
    data() {
      return {
        BMap: null,
        center: {lng: 120, lat: 30.2},
        zoom: 12,
        placeList1: [
          {
            "createtime": "20200604151736",
            "adminname": "15658047571",
            "pname": "睩客科技总部",
            "wdu": "30.3",
            "pid": 9,
            "jdu": "119.2",
            "type": 0,
            "addr": "浙江省杭州市余杭区龙潭路龙潭路-天时科创园"
          },
          {
            "createtime": "20200604151736",
            "adminname": "15658047571",
            "pname": "睩客科技总部1",
            "wdu": "30.11",
            "pid": 9,
            "jdu": "119.9",
            "type": 0,
            "addr": "浙江省杭州市余杭区龙潭路龙潭路-天时科创园1"
          }
        ],
        placeList: [
          {
            "createtime": "20200604151736",
            "adminname": "15658047571",
            "pname": "睩客科技总部",
            "wdu": "30.282838",
            "pid": 9,
            "jdu": "119.989227",
            "type": 0,
            "addr": "浙江省杭州市余杭区龙潭路龙潭路-天时科创园"
          },
          {
            "createtime": "20200604151736",
            "adminname": "15658047571",
            "pname": "睩客科技总部1",
            "wdu": "30.1",
            "pid": 9,
            "jdu": "119.92",
            "type": 0,
            "addr": "浙江省杭州市余杭区龙潭路龙潭路-天时科创园1"
          }
        ],
        infoWindowPoint: {
          address: ''
        },
        show: true
      }
    },
    computed: {
      placePoints1() {
        return this.placeList1.map(data => {
          return Object.assign(data, { lng: data.jdu, lat: data.wdu })
        })
      },
      placePoints() {
        return this.placeList.map(data => {
          return Object.assign(data, { lng: data.jdu, lat: data.wdu })
        })
      }
    },
    mixins: [page],
    methods: {
      infoWindowClose () {
        this.show = false
      },
      infoWindowOpen () {
        this.show = true
      },
      clickHandler(e) {
        e.point.address = '正在获取...'
        this.infoWindowPoint = e.point
        this.getAddress(e)
        Vue.nextTick().then(()=>{
          this.show = true
        })
      },
      onBaiduMapReady(e) {
        this.BMap = e.BMap
      },
      getClickInfo(e) {
        //
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
            console.log('获取经纬度', e.point, '获取详细地址', res)
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
</style>