<template>
  <div class="vehicle_monitoring_box">
    <!-- 过滤条件 -->
    <hw-base-filter
      style="width: calc(100% - 60px)"
      :filter-config="filterConfig"
      @changeGroupIdChange="getGroupId"
      @changeTreeSeled="getVehicleObj"
      @selectChange="selectChange"
    ></hw-base-filter>

    <!-- 地图功能 -->
    <div
      class="monitoring_map_out_box main_area_box"
      :class="ifFullScreen ? 'full_screen_box' : ''"
    >
      <div
        class="monitoring_map_box"
        :class="ifExpand ? 'monitoring_map_narrow' : ''"
      >
        <!-- 2D/3D 视图切换按钮 -->
        <div
          class="operate_box model_switch_box normal_words map_box_btn"
          @click="switchMapView"
        >
          {{ '2D/3D' }}
        </div>

        <!-- 车辆类型列表按钮 -->
        <div
          class="type_marker_box operate_box map_box_btn"
          @click="ifShowTypeList = !ifShowTypeList"
        >
          <span>{{ $t('mainPage.geo') }}</span>
          <icon-font
            type="icondropdownoriginal"
            class="type_marker_jump_btn"
            :class="{ reverse: ifShowTypeList }"
          ></icon-font>
        </div>

        <!-- 车辆类型列表 -->
        <ul v-show="ifShowTypeList" class="type_marker_box_ul">
          <li
            v-for="type in typeList"
            :key="type.id"
            class="type_marker_item"
            :class="{ activeItem: nowSeledTypeList.indexOf(type.id) > -1 }"
            @click="switchDrawMarker(type.id)"
          >
            <icon-font :type="type.icon" class="type_btn"></icon-font>
            <span class="normal_words">{{ $t(type.name) }}</span>
          </li>
        </ul>

        <!-- 区域搜索按钮 -->
        <div
          class="area-search-btn operate_box map_box_btn single-row-ellipsis"
          :class="{ 'back-blue': isAreaSearch }"
          :title="isAreaSearch ? '' : $t('mainPage.areaSearchInfoOne')"
          @click="areaSearch"
        >
          {{
            isAreaSearch
              ? $t('mainPage.cancelAreaSearch')
              : $t('mainPage.areaSearch')
          }}
        </div>

        <!-- 定位和全屏按钮 -->
        <div class="operate_btn_box operate_box map_box_btn">
          <div class="operate_btn" @click="setFitView(true)">
            <icon-font type="iconlocation" class="type_btn"></icon-font>
          </div>
          <div class="operate_btn_divider"></div>
          <div
            v-show="!ifFullScreen"
            class="operate_btn"
            @click="setFullScreen(true)"
          >
            <icon-font type="iconfullScreen" class="type_btn"></icon-font>
          </div>
          <div
            v-show="ifFullScreen"
            class="operate_btn"
            @click="setFullScreen(false)"
          >
            <icon-font type="iconexpand" class="type_btn"></icon-font>
          </div>
        </div>

        <!-- 聚合展示按钮 -->
        <div
          class="cluster-box operate_box map_box_btn"
          @click="clusterVehicle(false)"
        >
          <icon-font type="iconjuhejiedian" class="type_btn fl"></icon-font>
          <span class="fl" :style="{ opacity: isCluster ? 0.6 : 1 }">{{
            isCluster
              ? $t('mainPage.cancelClusterShow')
              : $t('mainPage.clusterShow')
          }}</span>
        </div>

        <!-- 地图容器 -->
        <div :id="mapRandomId" class="monitoring_map"></div>
      </div>

      <!-- 车辆操作面板 -->
      <vehicle-operate-pane
        ref="VehicleMonitorPaneRef"
        :now-vehicle-id="nowVehicleId"
        class="vehile_list_box"
        :class="ifExpand ? 'vehile_list_box_new' : ''"
        :if-do-full-screen="ifFullScreen"
        @changeWidth="changeWidth"
        @changeVehicle="changeVehicle"
        @sort="getRightListData"
      ></vehicle-operate-pane>

      <!-- 消息弹窗 -->
      <msg-box v-model:is-show-msg="isShowMsg" :is-handle="true">
        <template #customize>
          {{ $t('mainPage.clusterInfoOne')
          }}<span style="color: #ffd200">{{ invalidNum }}</span
          >{{ $t('mainPage.clusterInfoTwo') }}
        </template>
      </msg-box>
    </div>

    <!-- 用户指引 -->
    <!--    <page-guide v-if="showPageGuide" :guide-list="guideList"></page-guide>-->
  </div>
</template>
<script>
  import msgBox from '@/components/messageBox.vue';
  import imgFast from '@/assets/page_imgs/fast_black.png';
  import imgRuning from '@/assets/page_imgs/slow_black.png';
  import imgCharging from '@/assets/page_imgs/bus-recharge-green.png';
  import imgStop from '@/assets/page_imgs/stop_yellow.png';
  import imgOffline from '@/assets/page_imgs/offline.png';
  import imgFault from '@/assets/page_imgs/stop_red.png';
  import MapboxApi from '@/vendor/bcMapBox/MapBoxFench';
  import Mapboxgl from 'mapbox-gl';
  import '@/vendor/bcMap/hwMap_helper.min.css';
  import Service from '@/api/OverseasService';
  import hwBaseFilter from '@/components/HwBaseFilter/index.vue';
  import vehicleOperatePane from './vehicleMonitorOperatePane.vue';
  import loadMapApi from '@/vendor/bcMapApi';
  // import PageGuide from '@/components/pageGuide.vue';
  import $ from 'jquery';
  import {
    getSeledNodes,
    formatVehicleEnergyType,
    getMapboxStyle,
    formatDepotData,
    formatVehicleModelData,
    isValidOfLonLat,
    getPageGuideImgs,
  } from '@/utils';

  export default {
    name: 'HwVehicleMonitoring', // ---车辆监控页面
    components: { hwBaseFilter, vehicleOperatePane, msgBox },
    data() {
      return {
        mapRandomId: `vehicle-monitoring-map-${parseInt(
          Math.random() * 100000,
          10
        )}`,
        ifPitch: false, // 是否可倾斜
        ifFullScreen: false, // 是否全屏显示
        MPBMap: null,
        mapBoxMarkers: [],
        ifExpand: false,
        vehicleIds: '',
        listIds: '',
        vehiclesList: [],
        chargeStationsList: [],
        stationsListOCPP: [],
        fenceList: [],
        positionList: [],
        markerVehicleList: [],
        nowVehicleId: '', // 当前点击的车辆id
        otherClickedId: '', // 当前点击的其它打点id
        nowClickedMarkerType: '', // 当前点击的marker类型
        typeList: [
          {
            id: 'chargerStation',
            name: 'mainPage.newUIchargingStation',
            icon: 'iconcharger1',
          },
          {
            id: 'stationOCPP',
            name: 'mainPage.chargingStationOCPP',
            icon: 'iconcharger1',
          },
          {
            id: 'location',
            name: 'mainPage.locationAndDepot',
            icon: 'iconpoi',
          },
          {
            id: 'fence',
            name: 'mainPage.fence',
            icon: 'iconnet',
          },
        ],
        ifShowTypeList: false, // 是否显示打点类型列表
        nowSeledTypeList: [], // 当前选中的打点类型组成的数组---充电站、OCPP充电站、围栏、地点
        MapApi: null, // 经纬度解析地址
        showDialog: false, // 表盘弹窗是否显示，
        markertimer: null, // 地图打点定时器,
        markerFreshTime: 30 * 1000, // 地图打点定时器刷新时间
        nowMarkerId: '', // 当前点击的marker id
        ifFitview: false,
        isCluster: false,
        clusterVehicleId: '',
        initZoom: 12,
        isAreaSearch: false,
        invalidNum: -1,
        isShowMsg: false,
        clusterMarkerList: [],
        filterConfig: [
          {
            component: 'BaseSelect',
            value: '',
            type: 'station',
            filterProps: {
              placeholder: this.$t('mainPage.selDepot'),
              itemWidth: 150,
              prop: {
                value: 'vehicleDetails',
                label: 'stationName',
              },
              formatRes(res) {
                return formatDepotData(res);
              },
              apiName: 'getDepotList',
            },
          },
          {
            component: 'BaseSelect',
            value: '',
            type: 'model',
            filterProps: {
              placeholder: this.$t('mainPage.selVehicleModel'),
              itemWidth: 180,
              filterable: true,
              prop: {
                value: 'vehicleDetails',
                label: 'vehicleModelName',
              },
              apiName: 'getVehicleModelList',
              formatRes(res) {
                return formatVehicleModelData(res);
              },
            },
          },
        ],
        filterPar: {
          station: '',
          model: '',
        },
        selectedObj: [],
        isDeactivated: false,
        guideList: [],
        showPageGuide: true,
      };
    },
    watch: {
      $route(to, from) {
        this.showPageGuide =
          to.query.from === 'announcement' && to.name === 'hwVehicleMonitoring';
        this.getPageGuide();
        to.query.from = null;
        from.query.from = null;
      },
    },
    created() {
      const locate = window.location.href;
      this.showPageGuide =
        locate.indexOf('?from=announcement') > -1 ||
        localStorage.getItem('realInfo1') !== 'hide';
      this.getPageGuide();
      this.getChargerStationTreeData();
      this.getOCPPStationTreeData();
      this.getPositionList();
      this.getFenceList();
    },
    mounted() {
      this.initMap();
      document.addEventListener('visibilitychange', this.visibilityChange);
      const seledNodes = getSeledNodes('VEHICLEGROUP', this);
      if (seledNodes.length > 0) {
        this.selectedObj = seledNodes;
        this.initParamas();
      }
    },
    activated() {
      // FIXME
      this.isDeactivated && this.propsData(this.ifFitview);
      if (this.MPBMap) {
        this.$nextTick(() => {
          this.MPBMap.resize();
        });
      }
    },
    deactivated() {
      this.isDeactivated = true;
      this.ifFitview = false;
      this.clearTimer();
    },
    beforeUnmount() {
      this.clearTimer();
      this.MPBMap.remove();
      document.removeEventListener('visibilitychange', this.visibilityChange);
    },
    methods: {
      /** 获取引导图并展示引导 */
      getPageGuide() {
        if (this.showPageGuide) {
          this.guideList = getPageGuideImgs('realInfo', 5);
        }
      },
      selectChange(val) /** 场站、车型选择改变 */ {
        this.filterPar[val.type] = val.value;
        this.initParamas();
      },

      areaSearch() /** 区域查车 */ {
        if (this.isCluster) {
          this.$messageNew(
            'warning_color',
            this.$t('mainPage.areaSearchClickInfo')
          );
          return false;
        }
        this.isAreaSearch = !this.isAreaSearch;
        if (this.isAreaSearch) {
          this.areaDrawFence();
        } else {
          this.MPBMap.clearMarker({
            type: 'fence-special',
          });
          this.MPBMap.clearFence();
          this.MPBMap.clearDrawMode();
        }
        return true;
      },

      filterVehicles(
        fence
      ) /** 判断车辆位置是否在围栏区域中；是--取出，否--过滤掉 */ {
        const newList = this.vehiclesList.filter((item) =>
          this.MPBMap.isPointInPolygon(fence.geometry.coordinates, [
            item.lon,
            item.lat,
          ])
        );
        if (newList.length) {
          this.listIds = newList.map((item) => item.vehicleId).join(',');
          this.getRightListData();
        } else {
          this.$messageNew('warning_color', this.$t('mainPage.areaSearchNull'));
          this.MPBMap.clearMarker({
            id: fence.id,
          });
          this.MPBMap.clearFence();
        }
      },

      areaDrawFence() /** 区域画围栏 */ {
        this.MPBMap.drawFence({
          fenceShape: 2,
          fenceState: 'New',
          fenceType: 'Common',
          fenceApply: 'special',
          events: (fence) => {
            this.filterVehicles(fence);
          },
        });
      },

      getChargerStationTreeData() /** 获取充电站树数据 */ {
        if (this.$cache.getCache('HwSyncChargerStationTree')) {
          const { data } = this.$cache.getCache('HwSyncChargerStationTree');
          const stationIdStr = this.getAllChargerStationIds(data, []).join(',');
          this.getChargerStationLonLat(stationIdStr);
        } else {
          Service.requestApi('getChargingStationTree', {
            allStation: true,
            orgId: null,
            keywords: '',
          })
            .then((res) => {
              if (res.code === 1) {
                const stationIdStr = this.getAllChargerStationIds(
                  res.data,
                  []
                ).join(',');
                this.getChargerStationLonLat(stationIdStr);
                const cacheData = {
                  name: 'HwSyncChargerStationTree',
                  data: res.data,
                };
                this.$cache.setCache('HwSyncChargerStationTree', cacheData);
              }
            })
            .catch(() => {});
        }
      },

      getOCPPStationTreeData() /** 获取OCPP充电站树数据 */ {
        if (this.$cache.getCache('OCPPChargerStationTree')) {
          // 读缓存
          const { data } = this.$cache.getCache('OCPPChargerStationTree');
          const stationIdStr = this.getAllChargerStationIds(data, []).join(',');
          this.getOCPPStationLonLat(stationIdStr);
        } else {
          Service.requestApi('getDepotTree', {
            keywords: '',
            queryFiled: 'energyStationName',
          })
            .then((res) => {
              if (res.code === 1) {
                const stationIdStr = this.getAllChargerStationIds(
                  [res.data],
                  []
                ).join(',');
                this.getOCPPStationLonLat(stationIdStr);
                const cacheData = {
                  name: 'OCPPChargerStationTree',
                  data: [res.data],
                };
                this.$cache.setCache('OCPPChargerStationTree', cacheData);
              }
            })
            .catch(() => {});
        }
      },

      getAllChargerStationIds(data, ids) /** 遍历数据获取id */ {
        data.forEach((item) => {
          if (item.objectType === 'EleStation') {
            ids.push(item.objectId);
          } else if (item.children && item.children.length > 0) {
            this.getAllChargerStationIds(item.children, ids);
          }
        });
        return ids;
      },

      getChargerStationLonLat(idStr) /** 获取充电站数据 */ {
        Service.requestApi('getEleStationMapInfo', { chargeStationIds: idStr })
          .then((res) => {
            if (res.code === 1 && res.data.data.length > 0) {
              const { data } = res.data;
              this.chargeStationsList = this._.filter(data, (charger) =>
                isValidOfLonLat(charger.longitude, charger.latitude)
              );
              if (this.chargeStationsList.length > 0) {
                this.chargeStationsList.forEach((item) => {
                  this.getAddress(item.longitude, item.latitude)
                    .then((res) => {
                      item.address = res.address;
                      const idMarker = `chargerMarker_${item.chargeStationId}`;
                      const marker = this.MPBMap.getMarkerByType({
                        id: idMarker,
                      })[0];
                      if (marker) {
                        const element = marker.getElement();
                        $(element)
                          .find('.charger_map_address')
                          .text(item.address);
                      }
                    })
                    .catch(() => {
                      item.address = '-';
                    });
                });
              }
            }
          })
          .catch((rej) => {});
      },

      getOCPPStationLonLat(idStr) /** 获取OCPP充电站数据 */ {
        Service.requestApi('getDepotInfoList', { depotIds: idStr })
          .then((res) => {
            if (res.data && res.data.length > 0) {
              const { data } = res;
              this.stationsListOCPP = this._.filter(data, (charger) =>
                isValidOfLonLat(charger.gpsLongitude, charger.gpsLatitude)
              );
              if (this.stationsListOCPP.length > 0) {
                this.stationsListOCPP.forEach((item) => {
                  item.totalCount =
                    item.availableCount +
                    item.offLineCount +
                    item.unavailableCount +
                    item.usingCount -
                    0;
                  item.address = '-';
                  item.gpsLongitude -= 0;
                  item.gpsLatitude -= 0;
                  this.getAddress(item.gpsLongitude, item.gpsLatitude)
                    .then((res) => {
                      item.address = res.address;
                      const idMarker = `stationOCPPMarker_${item.depotId}`;
                      const marker = this.MPBMap.getMarkerByType({
                        id: idMarker,
                      })[0];
                      if (marker) {
                        const element = marker.getElement();
                        $(element)
                          .find('.station_OCPP_map_address')
                          .text(item.address);
                      }
                    })
                    .catch(() => {
                      item.address = '-';
                    });
                });
              }
            }
          })
          .catch((rej) => {});
      },

      getAddress(lon, lat) /** 异步解析经纬度 */ {
        return new Promise((resolve, reject) => {
          let addressNew = '';
          this.MapApi.getAddressByLonLat(lon, lat)
            .then((address) => {
              addressNew = address;
              resolve(addressNew);
            })
            .catch(() => {
              addressNew = '-';
              reject(addressNew);
            });
        });
      },

      getPositionList() /** 获取地点列表 */ {
        Service.requestApi('getDepotAndLocateList').then((res) => {
          if (res.code === 1 && res.data.length > 0) {
            this.positionList = this._.filter(res.data, (position) => {
              const lon =
                position.locationStationType - 0 === 1
                  ? position.longitude
                  : position.firstPoint.lon;
              const lat =
                position.locationStationType - 0 === 1
                  ? position.latitude
                  : position.firstPoint.lat;
              position.lon = lon;
              position.lat = lat;
              return isValidOfLonLat(lon, lat) && position.disableState !== 0;
            });
          }
        });
      },

      getFenceList() /** 获取围栏列表 */ {
        Service.requestApi('getEregionList').then((res) => {
          if (res.code === 1 && res.data.data.length > 0) {
            const { data } = res.data;
            this.fenceList = this._.filter(data, (fence) =>
              isValidOfLonLat(fence.firstPoint.lon, fence.firstPoint.lat)
            );
          }
        });
      },

      getRightListData(resetHeight = false) /** 获取右侧列表数据 */ {
        this.$refs.VehicleMonitorPaneRef.getVehicleInfoData({
          listIds: this.listIds,
          ifResetHeight: resetHeight,
        });
      },

      getVehiclesInfo(fitView = false) /** 获取车辆数据 */ {
        this.getRightListData(fitView);
        Service.requestApi('getV2VehicleListByIds', {
          vehicleIds: this.vehicleIds,
        })
          .then((res) => {
            if (res.code === 1 && res.data && res.data.length > 0) {
              const oldVehicleList = res.data || [];
              oldVehicleList.forEach((item) => {
                if (
                  !item.directionAngle ||
                  item.directionAngle === '-999999' ||
                  item.directionAngle == -999999
                ) {
                  item.directionAngle = 0;
                }
                if (item.lon === 0) {
                  item.lon = '0';
                } else if (item.lat === 0) {
                  item.lat = '0';
                }
              });
              const oldList = this._.filter(oldVehicleList, (item) =>
                isValidOfLonLat(item.lon, item.lat)
              );
              oldList.forEach((item) => {
                item.lon -= 0;
                item.lat -= 0;
                item.vehicleName = item.vehicleName ? item.vehicleName : '-';
                item.energyLeft = item.energyLeft ? item.energyLeft : '-';
                item.itlgtSpdLmtStatus = item.itlgtSpdLmtStatus || '';
                item.directionAngle -= 0;
                if (item.vehicleSpeed) {
                  item.vehicleSpeed = item.vehicleSpeed;
                } else {
                  item.vehicleSpeed = 0;
                }
                if (item.vehicleState === 4) {
                  item.vehicleSpeed = '-';
                } else if (item.vehicleState === 2) {
                  item.vehicleSpeed = '0.0';
                }
              });
              this.vehiclesList = oldList;
              const vehicleIdArr = this.vehicleIds.split(',');
              this.invalidNum = vehicleIdArr.length - oldList.length;
              if (!this.isCluster) {
                if (oldList.length === 0) {
                  this.$messageNew(
                    'warning_color',
                    this.$t('mainPage.nowPositionInvalid')
                  );
                }
                this.vehicleDrowOnMap(fitView);
              } else {
                if (this.invalidNum === 0) {
                  this.isShowMsg = false;
                } else {
                  this.isShowMsg = true;
                }
                fitView && this.setInitZoom(this.vehiclesList);
                this.clusterVehicle(true);
              }
            } else {
              this.vehiclesList = [];
            }
          })
          .catch(() => {
            this.vehiclesList = [];
          });
      },

      setInitZoom(list) /** 在聚合状态下切换查询条件，设置地图setFiew */ {
        const lonLot = [];
        list.forEach((item) => {
          const itemLonLat = [];
          itemLonLat.push(item.lon, item.lat);
          lonLot.push(itemLonLat);
        });

        this.MPBMap.setFitViewByPoints(lonLot);
      },

      clearTimer() /** 清除定时器 */ {
        if (this.markertimer) {
          clearInterval(this.markertimer);
          this.markertimer = null;
        }
      },

      propsData(fitView = false) /** 传递参数，开启定时器 */ {
        this.isDeactivated = false;
        this.clearTimer();
        if (this.vehicleIds) {
          this.getVehiclesInfo(fitView);
          this.markertimer = setInterval(() => {
            this.getVehiclesInfo();
          }, this.markerFreshTime);
        }
      },

      initParamas() /** 构建车辆参数 */ {
        this.ifFitview = true;
        this.nowMarkerId = '';
        this.nowVehicleId = '';
        const stationIds = this.filterPar.station;
        const modelIds = this.filterPar.model;
        const nodeIds = [];
        this.selectedObj.forEach((item) => {
          const isInStation =
            !stationIds ||
            stationIds.some((station) => station.objectId === item.objectId);
          const isInModel =
            !modelIds ||
            modelIds.some((model) => model.objectId === item.objectId);
          isInStation && isInModel && nodeIds.push(item.objectId);
        });
        if (nodeIds.length === 0) {
          this.vehicleIds = '';
          this.listIds = '';
          this.getRightListData(true);
          setTimeout(() => {
            this.MPBMap.clear();
          }, 1000);
        } else {
          this.vehicleIds = nodeIds.join(',');
          this.listIds = nodeIds.join(',');
          this.propsData(true);
        }
      },

      getVehicleObj(objArr) /** 获取手动选择节点 */ {
        this.selectedObj = objArr;
        this.initParamas();
      },

      getGroupId(val) /** 获取快捷选择节点 */ {
        let nowVehicleArr = [];
        if (val === 'tree') {
          // 不选组,直接选树
          nowVehicleArr = JSON.parse(
            localStorage.getItem('handleSelVehicleTree')
          );
        } else {
          const arrGroup = JSON.parse(localStorage.getItem('VEHICLEGROUP'));
          const nowObjArr = _.filter(arrGroup, (item) => {
            return item.id === val;
          });
          nowVehicleArr = nowObjArr[0].seledTreeNode;
        }
        this.selectedObj = nowVehicleArr;
        this.initParamas();
      },

      initMap() /** 初始化地图 */ {
        const lon = this.$store.getters.introduction.orgCityLon
          ? this.$store.getters.introduction.orgCityLon
          : 113.523094;
        const lat = this.$store.getters.introduction.orgCityLat
          ? this.$store.getters.introduction.orgCityLat
          : 34.742813;
        loadMapApi({ mapType: 'baidu' }).then((MapApi) => {
          this.MapApi = MapApi;
        });
        this.MPBMap = new MapboxApi({
          container: this.mapRandomId, // container id 绑定的组件的id
          style: getMapboxStyle(),
          center: [lon, lat],
          ifRotateAble: true, // 是否让marker跟随地图旋转角度的变化而变化
          pitchWithRotate: this.ifPitch, // 拖拽地图旋转时是否允许地图倾斜
          pitch: 0, // 地图的角度，不写默认是0，取值是0-60度，一般在3D中使用
        });

        this.MPBMap.loadReady.then((isReady) => {
          if (isReady) {
            const imgArr = [
              {
                name: 'img-fast',
                url: imgFast,
              },
              {
                name: 'img-runing',
                url: imgRuning,
              },
              {
                name: 'img-stop',
                url: imgStop,
              },
              {
                name: 'img-charging',
                url: imgCharging,
              },
              {
                name: 'img-offline',
                url: imgOffline,
              },
              {
                name: 'img-fault',
                url: imgFault,
              },
            ];
            imgArr.forEach((item) => {
              this.MPBMap.Map.loadImage(item.url, (error, vehicelImg) => {
                if (error) throw error;
                this.MPBMap.Map.addImage(item.name, vehicelImg);
              });
            });
          }
        });
      },

      getVehicleMarkerList(fitView) /** 获取车辆marker */ {
        this.markerVehicleList = this.MPBMap.getMarkerByType({
          type: 'vehicle_marker',
        });
        if (fitView) {
          this.setFitView(false);
        }
      },

      formatEnergyLeft(left, blog) /** 格式化能源余量获取对应的图片 */ {
        let imgUrl = '';
        if (left === '-') {
          imgUrl =
            blog === 'E' || blog === 'T'
              ? require('@/assets/page_imgs/ele-0.png')
              : blog === 'O' || blog === 'F'
              ? require('@/assets/page_imgs/oil-0.png')
              : '';
        } else if (left - 0 <= 20) {
          imgUrl =
            blog === 'E' || blog === 'T'
              ? require('@/assets/page_imgs/ele-20.png')
              : blog === 'O' || blog === 'F'
              ? require('@/assets/page_imgs/oil-20.png')
              : '';
        } else if (left - 0 <= 40) {
          imgUrl =
            blog === 'E' || blog === 'T'
              ? require('@/assets/page_imgs/ele-40.png')
              : blog === 'O' || blog === 'F'
              ? require('@/assets/page_imgs/oil-40.png')
              : '';
        } else if (left - 0 <= 60) {
          imgUrl =
            blog === 'E' || blog === 'T'
              ? require('@/assets/page_imgs/ele-60.png')
              : blog === 'O' || blog === 'F'
              ? require('@/assets/page_imgs/oil-60.png')
              : '';
        } else if (left - 0 <= 80) {
          imgUrl =
            blog === 'E' || blog === 'T'
              ? require('@/assets/page_imgs/ele-80.png')
              : blog === 'O' || blog === 'F'
              ? require('@/assets/page_imgs/oil-80.png')
              : '';
        } else {
          imgUrl =
            blog === 'E' || blog === 'T'
              ? require('@/assets/page_imgs/ele-100.png')
              : blog === 'O' || blog === 'F'
              ? require('@/assets/page_imgs/oil-100.png')
              : '';
        }
        return { imgUrl };
      },

      drawUnclusterMarker(vehicle) /** 绘制未聚合的点 */ {
        const { Map } = this.MPBMap;
        const getIsa = this.formatISA(vehicle);
        const typeBlog = formatVehicleEnergyType(vehicle.energyType);
        const energyLeft = this._.isNil(vehicle.energyLeft)
          ? '-'
          : vehicle.energyLeft;
        const { imgUrl } = this.formatEnergyLeft(energyLeft, typeBlog);
        const markerHtml = $(`<div class="cluster_out_box">
      <div class="marker_icon_box">
      <div class="aiSpeedLimmit"
      style="color: ${getIsa.isaColor};display: ${getIsa.ifShowStyle}">ISA</div>
      <div class="vehicle_all_info_content_box" style="display: block;">
      <div class="vehicle_all_info_content">
      <span>${vehicle.vehicleName}</span>
      <img class="battery-box" src="${imgUrl}" alt="">
      <span class="devider_line"></span>
      <span>${typeBlog}</span>
      <span>${`${vehicle.vehicleSpeed}km/h`}</span>
      </div>
      </div>
      </div>
      </div>`)[0];

        const marker = new Mapboxgl.Marker({
          element: markerHtml,
        })
          .setLngLat([vehicle.lon, vehicle.lat])
          .addTo(Map);
        this.clusterMarkerList.push(marker);
      },

      clearUnclusterMarker() /** 清除未聚合点marker */ {
        const list = this.clusterMarkerList;
        if (list.length) {
          list.forEach((item) => item.remove());
          this.clusterMarkerList = [];
        }
      },

      unclusteredClick(e) /** unclustered点击事件 */ {
        this.clearUnclusterMarker();
        const coordinates = e.features[0].geometry.coordinates.slice();
        const info = e.features[0].properties;
        info.lon = coordinates[0];
        info.lat = coordinates[1];
        if (this.clusterVehicleId === info.vehicleId) {
          this.clusterVehicleId = '';
          return false;
        }

        this.clusterVehicleId = info.vehicleId;
        this.drawUnclusterMarker(info);

        if (this.listIds !== info.vehicleId) {
          this.listIds = info.vehicleId;
          this.getRightListData(true);
        }
      },

      clustersClick(e) /** clusters点击事件 */ {
        this.clearUnclusterMarker();
        const { Map } = this.MPBMap;
        const features = Map.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        });
        const clusterId = features[0].properties.cluster_id;
        const pointCount = features[0].properties.point_count;
        Map.getSource('vehicleClusters').getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err) return;

            Map.easeTo({
              center: features[0].geometry.coordinates,
              zoom,
            });
          }
        );

        Map.getSource('vehicleClusters').getClusterLeaves(
          clusterId,
          pointCount,
          0,
          (err, leaves) => {
            if (err) return;

            this.listIds = leaves
              .map((item) => item.properties.vehicleId)
              .join(',');
            this.getRightListData();
          }
        );
      },

      layerMouseEnter() {
        this.MPBMap.Map.getCanvas().style.cursor = 'pointer';
      },

      layerMouseLeave() {
        this.MPBMap.Map.getCanvas().style.cursor = '';
      },

      clusterVehicle(isRefresh) /** 车辆聚合展示 */ {
        if (this.isAreaSearch) {
          this.$messageNew(
            'warning_color',
            this.$t('mainPage.clusterClickInfo')
          );
          return false;
        }

        this.MPBMap.clearMarker({
          type: 'vehicle_marker',
        });

        const { Map } = this.MPBMap;
        if (!isRefresh) {
          this.nowMarkerId = '';
          this.isCluster = !this.isCluster;
          if (this.isCluster) {
            if (this.invalidNum !== 0) {
              this.isShowMsg = true;
            }
            Map.setZoom(this.initZoom);
          } else {
            this.isShowMsg = false;
          }
          this.$log &&
            this.$log({
              actionId: 'log.toggleTogether',
              vm: this,
              param: { isCluster: this.isCluster },
            });
        }
        if (!this.isCluster || isRefresh) {
          const layerIdArr = ['clusters', 'cluster-count', 'unclustered-point'];
          layerIdArr.forEach((item) => {
            if (Map.getLayer(item)) {
              Map.removeLayer(item);
            }
          });

          Map.getSource('vehicleClusters') &&
            Map.removeSource('vehicleClusters');

          if (!this.isCluster) {
            $('.cluster_out_box').css('display', 'none');
            this.listIds = this.vehicleIds;
            this.propsData(true);

            return false;
          }
        }

        const sourceData = {
          type: 'FeatureCollection',
          features: [],
        };
        const keyArr = [
          'vehicleId',
          'vehicleName',
          'vehicleSpeed',
          'vehicleState',
          'itlgtSpdLmtStatus',
          'directionAngle',
          'energyType',
          'energyLeft',
        ];
        this.vehiclesList.forEach((vehicle) => {
          const feature = {
            type: 'Feature',
            properties: {},
            geometry: { type: 'Point', coordinates: [] },
          };
          keyArr.forEach((key) => {
            if (key === 'vehicleState') {
              if (vehicle.alarmStatus2 - 0 === 1) {
                feature.properties[key] = 6;
              } else if (
                vehicle.vehicleState === 1 &&
                vehicle.vehicleSpeed - 0 >= 60
              ) {
                feature.properties[key] = 5;
              } else {
                feature.properties[key] = vehicle[key] - 0;
              }
            } else {
              feature.properties[key] = vehicle[key];
            }
          });

          feature.geometry.coordinates = [vehicle.lon, vehicle.lat];

          sourceData.features.push(feature);
        });
        Map.addSource('vehicleClusters', {
          type: 'geojson',
          data: sourceData,
          cluster: true,
          clusterRadius: 70,
          maxzoom: 24,
        });
        Map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'vehicleClusters',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#8cc63f',
              100,
              '#ffd200',
              200,
              '#ff0000',
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              200,
              40,
            ],
          },
        });
        Map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'vehicleClusters',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-size': 12,
          },
        });
        Map.addLayer({
          id: 'unclustered-point',
          type: 'symbol',
          source: 'vehicleClusters',
          filter: ['!', ['has', 'point_count']],
          layout: {
            'icon-image': [
              'step',
              ['get', 'vehicleState'],
              'img-runing',
              2,
              'img-stop',
              3,
              'img-charging',
              4,
              'img-offline',
              5,
              'img-fast',
              6,
              'img-fault',
            ],
            'icon-size': 0.8,
            'icon-rotate': ['get', 'directionAngle'],
            'text-allow-overlap': true,
            'text-field': ['get', 'vehicleName'],
            'text-offset': [0, -2],
            'text-size': 12,
          },
          paint: {
            'text-halo-color': '#fff',
            'text-halo-width': 1.5,
          },
        });

        const list = this.clusterMarkerList.length;
        if (isRefresh && list.length > 0) {
          const nowRefreshVehicle = this.vehiclesList.find(
            (item) => item.vehicleId === this.clusterVehicleId
          );
          const marker = list[0];
          // eslint-disable-next-line no-unused-expressions
          nowRefreshVehicle &&
            marker.setLngLat([nowRefreshVehicle.lon, nowRefreshVehicle.lat]);
        }

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        Map.off('click', 'clusters', that.clustersClick).on(
          'click',
          'clusters',
          that.clustersClick
        );
        Map.off('click', 'unclustered-point', that.unclusteredClick).on(
          'click',
          'unclustered-point',
          that.unclusteredClick
        );

        const eventTypeArr = ['mouseenter', 'mouseleave'];
        const triggerArr = ['clusters', 'unclustered-point'];
        eventTypeArr.forEach((event) => {
          triggerArr.forEach((trig) => {
            const func =
              event === 'mouseenter'
                ? that.layerMouseEnter
                : that.layerMouseLeave;
            Map.off(event, trig, func).on(event, trig, func);
          });
        });
      },

      formatISA(vehicle) /** 格式化智能限速 */ {
        /** 2021-10对齐版本中添加智能限速提示，字段值语颜色对照如下：
         * 智能限速提示文字：“ISA”
         * itlgtSpdLmtStatus = null，不显示提示文字
         * itlgtSpdLmtStatus = 1，color：#8CC63F -- 绿色
         * itlgtSpdLmtStatus = 2，color：#FFFFFF -- 白色 -- 暗色主题，color：#000000 -- 黑色 -- 亮色主题
         * itlgtSpdLmtStatus = 3，color：#F5A623 -- 橘色
         */
        const retrunObj = {
          isaColor: '#8CC63F',
          ifShowStyle: 'block',
        };
        if (vehicle.itlgtSpdLmtStatus && vehicle.vehicleState !== 4) {
          retrunObj.ifShowStyle = 'block';
          if (vehicle.itlgtSpdLmtStatus === 1) {
            retrunObj.isaColor = '#8CC63F';
          } else if (vehicle.itlgtSpdLmtStatus === 2) {
            // 判断当前主题，根据主题设置颜色
            if (localStorage.getItem('userTheme') === 'black') {
              retrunObj.isaColor = '#FFF';
            } else {
              retrunObj.isaColor = '#000';
            }
          } else if (vehicle.itlgtSpdLmtStatus === 3) {
            retrunObj.isaColor = '#F5A623';
          }
        } else {
          retrunObj.ifShowStyle = 'none';
        }

        return retrunObj;
      },

      vehicleDrowOnMap(fitView) /** marker---车辆 */ {
        const markerArr = [];
        this.vehiclesList.forEach((vehicle) => {
          let iconMarker = '';
          const idMarker = `vehicleMarker_${vehicle.vehicleId}`;
          if (vehicle.alarmStatus2 - 0 === 1) {
            iconMarker = imgFault;
          } else if (vehicle.vehicleState === 4) {
            iconMarker = imgOffline;
          } else if (vehicle.vehicleState === 3) {
            iconMarker = imgCharging;
          } else if (vehicle.vehicleState === 2) {
            iconMarker = imgStop;
          } else if (vehicle.vehicleState === 1) {
            if (vehicle.vehicleSpeed - 0 >= 60) {
              iconMarker = imgFast;
            } else {
              iconMarker = imgRuning;
            }
          }

          const energyLeft = this._.isNil(vehicle.energyLeft)
            ? '-'
            : vehicle.energyLeft;
          const typeBlog = formatVehicleEnergyType(vehicle.energyType);
          const { imgUrl } = this.formatEnergyLeft(energyLeft, typeBlog);
          const getIsa = this.formatISA(vehicle);
          const markerHtml = $(`<div class="marker_out_box">
        <div class="marker_icon_box" id="${idMarker}">
        <div class="aiSpeedLimmit"
        style="color: ${getIsa.isaColor};display: ${
            getIsa.ifShowStyle
          }">ISA</div>
        <div class="vehicle_info_content">
        <span class="content-word">${vehicle.vehicleName}</span>
        <img class="battery-box" src="${imgUrl}" alt="">
        </div>
        <div class="vehicle_all_info_content_box">
        <div class="vehicle_all_info_content">
        <span>${vehicle.vehicleName}</span>
        <img class="battery-box" src="${imgUrl}" alt="">
        <span class="devider_line"></span>
        <span>${typeBlog}</span>
        <span class="vehicle_all_info_speed">${`${vehicle.vehicleSpeed}km/h`}</span>
        </div>
        </div>
        </div>
        </div>`)[0];

          markerArr.push({
            element: markerHtml,
            icon: iconMarker,
            id: idMarker,
            moveType:
              vehicle.vehicleId === this.nowVehicleId ? 'static' : 'static',
            direction: vehicle.directionAngle - 0,
            lon: vehicle.lon - 0,
            lat: vehicle.lat - 0,
            label: vehicle.vehicleName,
            energyLeft,
            vehicleSpeed: vehicle.vehicleSpeed,
            reportTime: vehicle.reportTime,
            events: {
              click: (item) => {
                this.switchVehicleShowInfo(item.id, true);
              },
            },
          });
        });
        // 平滑移动的点
        // FIXME 残影和label 移动中无法更新的问题
        // this.MPBMap.clearMarker({
        //   type: 'vehicle_marker_smooth'
        // })
        this.MPBMap.websocketMarker(markerArr, {
          type: 'vehicle_marker',
          isClear: true,
          fitView: false,
        });
        // 正常打点的点
        // this.MPBMap.addMarkerList(markerArr, {
        //   isClear: true,
        //   fitView: false,
        //   type: 'vehicle_marker'
        // })
        this.getVehicleMarkerList(fitView); // 这个方法里面 如果fitView = true 会进行一次视野聚焦（单点）
        if (!fitView) {
          if (this.nowVehicleId) {
            // 如果正在追踪某个车（右侧有车被选中了），则地图中心要跟着车走
            this.switchVehicleShowInfo(
              `vehicleMarker_${this.nowVehicleId}`,
              true
            );
          } else {
            this.switchVehicleShowInfo(
              `vehicleMarker_${this.nowVehicleId}`,
              false
            );
          }
        } else {
          this.initZoom = this.MPBMap.Map.getZoom();
        }
      },

      chargeDrowOnMap() /** marker---充电站 */ {
        if (this.nowSeledTypeList.indexOf('chargerStation') > -1) {
          const markerArr = [];
          const iconCharger = require('@/assets/page_imgs/charger_black.png');
          const iconChargerFault = require('@/assets/page_imgs/charger_red.png');
          const workName = this.$t('mainPage.chargingPileStateWorking');
          const freeName = this.$t('mainPage.chargingPileStateIdle');
          const faultName = this.$t('mainPage.chargingPileStateFault');
          const offlineName = this.$t('mainPage.offline');
          // 根据充电机经纬度进行打点
          this.chargeStationsList.forEach((charge) => {
            let iconMarker = '';
            const idMarker = `chargerMarker_${charge.chargeStationId}`;
            if (charge.faultNumber > 0) {
              iconMarker = iconChargerFault;
            } else {
              iconMarker = iconCharger;
            }
            const offlineNumber =
              charge.totalNumber -
              charge.workingNumber -
              charge.freeNumber -
              charge.faultNumber;
            const markerHtml = $(`<div class="marker_out_box">
          <div class="marker_icon_box" id="${idMarker}">
          <div class="vehicle_info_content">${`${charge.displayName} (${charge.freeNumber}/${charge.totalNumber} )`}</div>
          <div class="vehicle_all_info_content_box">
          <div class="charger_all_info_content">
          <div class="charger_left_box"><div class="charger_name">${
            charge.displayName
          }</div>
          <div class="charger_state_box">
          <div class="charger_state">
          <div class="charger_circle green_color" title="${workName}"></div>
          <div class="">${charge.workingNumber}</div></div>
          <div class="charger_state">
          <div class="charger_circle yellow_color" title="${freeName}"></div>
          <div class="">${charge.freeNumber}</div></div>
          <div class="charger_state">
          <div class="charger_circle red_color" title="${faultName}"></div>
          <div class="">${charge.faultNumber}</div></div>
          <div class="charger_state">
          <div class="charger_circle grey_color" title="${offlineName}"></div>
          <div class="">${offlineNumber}</div></div>
          </div>
          </div>
          <div class="devider_line_box"></div>
          <div class="charger_right_box  charger_map_address">${
            charge.address
          }</div>
          </div>
          </div>
          </div>
          </div>`)[0];
            markerArr.push({
              element: markerHtml,
              icon: iconMarker,
              id: idMarker,
              lon: charge.longitude,
              lat: charge.latitude,
              events: {
                click: (item) => {
                  this.switchVehicleShowInfo(item.id);
                },
              },
            });
          });
          this.MPBMap.addMarkerList(markerArr, {
            isClear: true,
            fitView: false,
            type: 'chargerStation_marker',
          });
        } else {
          this.MPBMap.clearMarker({
            type: 'chargerStation_marker',
          });
        }
      },

      stationOCPPDrowOnMap() /** marker---OCPP充电站 */ {
        if (this.nowSeledTypeList.indexOf('stationOCPP') > -1) {
          const markerArr = [];
          const iconCharger = require('@/assets/page_imgs/charger_black.png');
          const iconChargerFault = require('@/assets/page_imgs/charger_red.png');
          const usingName = this.$t('mainPage.using');
          const availableName = this.$t('mainPage.available');
          const unavailableName = this.$t('mainPage.unavailable');
          const offlineName = this.$t('mainPage.offline');
          // 根据OCPP充电站经纬度进行打点
          this.stationsListOCPP.forEach((charge) => {
            let iconMarker = '';
            const idMarker = `stationOCPPMarker_${charge.depotId}`;
            if (charge.unavailableCount > 0) {
              iconMarker = iconChargerFault;
            } else {
              iconMarker = iconCharger;
            }

            const markerHtml = $(`<div class="marker_out_box">
          <div class="marker_icon_box" id="${idMarker}">
          <div class="vehicle_info_content">${`${charge.depotName} (${charge.availableCount}/${charge.totalCount} )`}</div>
          <div class="vehicle_all_info_content_box">
          <div class="charger_all_info_content">
          <div class="charger_left_box"><div class="charger_name">${
            charge.depotName
          }</div>
          <div class="charger_state_box">
          <div class="charger_state">
          <div class="charger_circle blue_color" title="${usingName}"></div>
          <div class="">${charge.usingCount}</div>
          </div>
          <div class="charger_state">
          <div class="charger_circle green_color" title="${availableName}"></div>
          <div>${charge.availableCount}</div>
          </div>
          <div class="charger_state">
          <div class="charger_circle red_color" title="${unavailableName}"></div>
          <div class="">${charge.unavailableCount}</div>
          </div>
          <div class="charger_state">
          <div class="charger_circle grey_color" title="${offlineName}"></div>
          <div class="">${charge.offLineCount}</div>
          </div>
          </div>
          </div>
          <div class="devider_line_box"></div>
          <div class="charger_right_box  station_OCPP_map_address">${
            charge.address
          }</div>
          </div>
          </div>
          </div>
          </div>`)[0];
            markerArr.push({
              element: markerHtml,
              icon: iconMarker,
              id: idMarker,
              lon: charge.gpsLongitude,
              lat: charge.gpsLatitude,
              events: {
                click: (item) => {
                  this.switchVehicleShowInfo(item.id);
                },
              },
            });
          });
          this.MPBMap.addMarkerList(markerArr, {
            isClear: true,
            fitView: false,
            type: 'stationOCPP_marker',
          });
        } else {
          this.MPBMap.clearMarker({
            type: 'stationOCPP_marker',
          });
        }
      },

      fenceDrowOnMap() /** marker---围栏 */ {
        if (this.nowSeledTypeList.indexOf('fence') > -1) {
          const markerArr = [];
          // 根据围栏经纬度进行打点
          this.fenceList.forEach((fence) => {
            const iconMarker = require('@/assets/page_imgs/fence.png');
            const idMarker = `fenceMarker_${fence.eregionId}`;
            const markerHtml = $(`<div class="marker_out_box">
          <div class="marker_icon_box" id="${idMarker}">
          <div class="vehicle_info_content">${fence.eregionName}</div>
          </div>
          </div>`)[0];
            // 踩坑记录：markerHtml不能放在循环外边，否则地图上的点只有一个，什么原因呢，还不清楚。
            markerArr.push({
              element: markerHtml,
              icon: iconMarker,
              id: idMarker,
              lon: fence.firstPoint.lon,
              lat: fence.firstPoint.lat,
            });
          });
          this.MPBMap.addMarkerList(markerArr, {
            isClear: true,
            fitView: false,
            type: 'fence_marker',
          });
        } else {
          this.MPBMap.clearMarker({
            type: 'fence_marker',
          });
        }
      },

      positionDrowOnMap() /** marker---地点 */ {
        if (this.nowSeledTypeList.indexOf('location') > -1) {
          const markerArr = [];
          // 根据地点经纬度进行打点
          this.positionList.forEach((position) => {
            const iconMarker =
              +position.locationStationType === 1
                ? require('@/assets/page_imgs/black.png')
                : require('@/assets/page_imgs/fence.png');
            const idMarker = `positionMarker_${position.id}`;
            const markerHtml = $(`<div class="marker_out_box">
          <div class="marker_icon_box" id="${idMarker}">
          <div class="vehicle_info_content">${position.name}</div>
          <div class="vehicle_all_info_content_box">
          <div class="charger_all_info_content">
          <div class="charger_left_box" style="width: 200px;">
          <div class="position_name">${position.name}</div>
          <div class="position_name">${position.phoneNum}</div>
          <div class="position_name">${position.remark}</div>
          </div>
          <div class="devider_line_box"></div>
          <div class="charger_right_box">${position.detail}</div>
          </div>
          </div>
          </div>
          </div>`)[0];
            markerArr.push({
              element: markerHtml,
              icon: iconMarker,
              id: idMarker,
              lon: position.lon,
              lat: position.lat,
              locationStationType: +position.locationStationType,
              events: {
                click: (item) => {
                  item.locationStationType === 1 &&
                    this.switchVehicleShowInfo(item.id);
                },
              },
            });
          });
          this.MPBMap.addMarkerList(markerArr, {
            isClear: true,
            fitView: false,
            type: 'location_marker',
          });
        } else {
          this.MPBMap.clearMarker({
            type: 'location_marker',
          });
        }
      },

      switchVehicleShowInfo(id, ifFitView) /** 切换车辆marker展示 */ {
        if (this.isAreaSearch) {
          this.MPBMap.Draw.changeMode('simple_select');
          this.MPBMap.Draw.changeMode('draw_rectangle');
        }
        const blogId = id.split('_')[0];
        if (blogId === 'vehicleMarker') {
          this.nowVehicleId = id.split('_')[1];
          this.nowMarkerId = id;
          if (ifFitView) {
            this.setFitView(false);
          }
        } else {
          this.nowVehicleId = '';
        }
        if (blogId === 'fenceMarker') return;
        // FIXME 此处需要优化 有时候会自动把 详细信息收起来
        $('.Mapbox_marker').removeClass('active_marker');
        $(`#${id}`).addClass('active_marker');
        $('.marker_out_box').find('.vehicle_info_content').show();
        $(`#${id}`).find('.vehicle_info_content').hide();
        $('.marker_out_box').find('.vehicle_all_info_content_box').hide();
        $(`#${id}`).find('.vehicle_all_info_content_box').show();
      },

      changeWidth(val) /** 操作列表折叠/展开 */ {
        this.ifExpand = val;
        this.$nextTick(() => {
          this.MPBMap.resize();
        });
      },

      changeVehicle(item) /** 切换车辆 */ {
        if (isValidOfLonLat(item.lon, item.lat)) {
          this.isCluster
            ? this.setInitZoom([item])
            : this.switchVehicleShowInfo(
                `vehicleMarker_${item.vehicleId}`,
                true
              );
        } else {
          this.$messageNew(
            'warning_color',
            this.$t('mainPage.nowPositionInvalid')
          );
        }
      },

      switchMapView() /** 切换2D/3D */ {
        this.ifPitch = !this.ifPitch;
        this.MPBMap.setMapView({
          viewMode3D: this.ifPitch,
        });
        this.$log &&
          this.$log({
            actionId: 'log.toggle2dOr3d',
            vm: this,
            param: { ifPitch: this.ifPitch },
          });
      },

      setFitView(ifAll) /** 视野居中 */ {
        this.$log && this.$log({ actionId: 'log.mapCenterPoint', vm: this });
        // ifAll: 是否点击居中按钮居中当前选择全部车辆点--主要是为了区分居中按钮和页面居中逻辑调用
        const nowMarker = this._.filter(this.markerVehicleList, (item) => {
          return item._element.id === this.nowMarkerId;
        });
        if (ifAll) {
          this.nowMarkerId = '';
          this.nowVehicleId = '';
          this.MPBMap.setFitView(this.markerVehicleList, {}, this.isCluster);
        } else if (nowMarker.length > 0) {
          this.MPBMap.setFitView(nowMarker, {}, this.isCluster);
        } else {
          this.MPBMap.setFitView(this.markerVehicleList, {}, this.isCluster);
        }
      },

      setFullScreen(val) /** 全屏、非全屏 */ {
        this.$log &&
          this.$log({
            actionId: 'log.fullScreen',
            vm: this,
            param: { ifFullScreen: val },
          });
        this.ifFullScreen = val;
        this.$nextTick(() => {
          this.MPBMap.resize();
        });
      },

      switchDrawMarker(id) /** 切换充电机、围栏、地点打点 */ {
        const index = this.nowSeledTypeList.indexOf(id);
        if (index > -1) {
          this.nowSeledTypeList.splice(index, 1);
        } else {
          this.nowSeledTypeList.push(id);
        }
        switch (id) {
          case 'chargerStation':
            this.$log &&
              this.$log({ actionId: 'log.geoChangeStation', vm: this });
            this.chargeDrowOnMap();
            break;
          case 'stationOCPP':
            this.$log &&
              this.$log({ actionId: 'log.geoChangeStationOcpp', vm: this });
            this.stationOCPPDrowOnMap();
            break;
          case 'location':
            this.$log && this.$log({ actionId: 'log.geoAddress', vm: this });
            this.positionDrowOnMap();
            break;
          case 'fence':
            this.$log && this.$log({ actionId: 'log.geoFence', vm: this });
            this.fenceDrowOnMap();
            break;
        }
      },

      visibilityChange() /** 监听窗口变化 */ {
        // 浏览器tab标签切换事件
        if (document.visibilityState == 'hidden') {
          // 状态判断 没在当前页面呆着
          this.ifFitview = false;
          this.clearTimer();
        } else {
          // 回来了
          if (this.$route.name === 'hwVehicleMonitoring') {
            this.propsData();
          }
        }
      },
    },
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  .vehicle_monitoring_box {
    width: 100%;
    height: 100%;
    position: relative;
    .normal_words {
      font-size: 12px;
      line-height: 18px;
    }

    .monitoring_map_out_box {
      width: 100%;
      height: calc(100% - 40px);
      border-radius: 6px;
      .monitoring_map_box {
        float: left;
        width: calc(100% - 450px);
        height: 100%;
        position: relative;
        overflow: hidden;
        .operate_box {
          position: absolute;
          top: 20px;
          border: 1px solid rgba(130, 140, 163, 0.5);
          border-radius: 2px;
          z-index: 1;
          cursor: pointer;
          .type_btn {
            line-height: 18px;
          }
        }
        .model_switch_box {
          width: 74px;
          height: 20px;
          left: 20px;
          text-align: center;
        }
        .type_marker_box {
          cursor: pointer;
          right: 105px;
          height: 30px;
          padding: 4px 10px;
          span {
            float: left;
            line-height: 20px;
          }
          .type_marker_jump_btn {
            float: left;
            margin-left: 5px;
          }
        }
        .type_marker_box_ul {
          position: absolute;
          right: 105px;
          top: 54px;
          z-index: 10;
          padding: 10px 10px;
          .type_marker_item {
            cursor: pointer;
            min-width: 100px;
            padding: 0 10px;
            overflow: hidden;
            margin-bottom: 11px;
            &:nth-of-type(4) {
              margin-bottom: 0px;
            }
            &:hover {
              background: rgba(130, 140, 163, 0.2);
            }
            .type_btn {
              float: left;
              margin-right: 10px;
            }
            span {
              float: left;
            }
          }
          .activeItem {
            background: rgba(130, 140, 163, 0.2);
          }
        }
        .operate_btn_box {
          width: 75px;
          height: 30px;
          right: 20px;
          padding: 4px 8px;
          box-sizing: border-box;
          overflow: hidden;
          .operate_btn {
            float: left;
            width: 20px;
            height: 20px;
            text-align: center;
            &:hover {
              background: rgba(130, 140, 163, 0.2);
            }
          }
          .operate_btn_divider {
            float: left;
            width: 1px;
            height: 20px;
            background: #828ca3;
            margin: 0 8px;
          }
        }

        .cluster-box {
          height: 30px;
          padding: 4px 8px;
          right: 20px;
          bottom: 20px;
          top: auto !important;
          span {
            line-height: 18px;
            margin-left: 5px;
          }
        }

        .area-search-btn {
          cursor: pointer;
          right: 180px;
          max-width: 150px;
          height: 30px;
          padding: 4px 10px;
          line-height: 20px;
        }

        .back-blue {
          background: #026ae3;
          color: #fff;
          border: none;
          padding: 5px 10px;
        }

        .monitoring_map {
          width: 100%;
          height: 100%;
        }
      }
      .vehile_list_box {
        float: right;
        width: 450px;
        height: 100%;
      }
      .monitoring_map_narrow {
        width: calc(100% - 770px);
      }
      .vehile_list_box_new {
        width: 770px;
      }
    }
  }
</style>
