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
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, defineProps } from 'vue';
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
import blackIcon from '@/assets/page_imgs/black.png';
import fenceIcon from '@/assets/page_imgs/fence.png';
import iconCharger from '@/assets/page_imgs/charger_black.png'; // 使用import语法引入图片
import iconChargerFault from '@/assets/page_imgs/charger_red.png';
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

// 定义车辆信息接口
interface Vehicle {
  vehicleId: string;
  vehicleName: string;
  vehicleSpeed: number;
  vehicleState: number;
  itlgtSpdLmtStatus: number;
  directionAngle: number;
  energyType: string;
  energyLeft: string;
  lon: number;
  lat: number;
  reportTime: number;
  alarmStatus2: number;
}
// 定义组件属性
const props = defineProps<{
  vehiclesList: Vehicle[]; // 车辆列表
  nowVehicleId: string; // 当前车辆ID
  vehicleIds: string; // 车辆ID列表
}>();
    const mapRandomId = `vehicle-monitoring-map-${parseInt(Math.random() * 100000, 10)}`;
    const ifPitch = ref(false); // 是否可倾斜
    const ifFullScreen = ref(false); // 是否全屏显示
    const MPBMap = ref(null);
    const mapBoxMarkers = ref([]);
    const ifExpand = ref(false);
    const vehicleIds = ref('');
    const listIds = ref('');
    const vehiclesList = ref([]);
    const chargeStationsList = ref([]);
    const stationsListOCPP = ref([]);
    const fenceList = ref([]);
    const positionList = ref([]);
    const markerVehicleList = ref([]);
    const nowVehicleId = ref(''); // 当前点击的车辆id
    const otherClickedId = ref(''); // 当前点击的其它打点id
    const nowClickedMarkerType = ref(''); // 当前点击的marker类型
	const typeList = ref([
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
    ]);
    const ifShowTypeList = ref(false); // 是否显示打点类型列表
    const nowSeledTypeList = ref([]); // 当前选中的打点类型组成的数组---充电站、OCPP充电站、围栏、地点
    const MapApi = ref(null); // 经纬度解析地址
    const showDialog = ref(false); // 表盘弹窗是否显示，
    let markertimer = null; // 地图打点定时器,
    const markerFreshTime = 30 * 1000; // 地图打点定时器刷新时间
    const nowMarkerId = ref(''); // 当前点击的marker id
    const ifFitview = ref(false);
    const isCluster = ref(false);
    const clusterVehicleId = ref('');
    const initZoom = 12;
    const isAreaSearch = ref(false);
    const invalidNum = ref(-1);
    const isShowMsg = ref(false);
    const clusterMarkerList = ref([]);
    const filterConfig = ref([
      {
        component: 'BaseSelect',
        value: '',
        type: 'station',
        filterProps: {
          placeholder: 'mainPage.selDepot',
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
          placeholder: 'mainPage.selVehicleModel',
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
    ]);
    const filterPar = ref({
      station: '',
      model: '',
    });
    const selectedObj = ref([]);
    const isDeactivated = ref(false);
    const guideList = ref([]);
    const showPageGuide = ref(true);
	
	// 在模板中使用的数据
const nowSeledTypeList = ref<string[]>([]); // 当前选中的地图类型列表
const chargeStationsList = ref<any[]>([]); // 充电站列表
const stationsListOCPP = ref<any[]>([]); // OCPP充电站列表
const fenceList = ref<any[]>([]); // 围栏列表
const positionList = ref<any[]>([]); // 地点列表
	// 定义计算属性
    const computedProp = computed(() => {
      // 计算属性的逻辑
    });

    // 监听路由变化
    const route = useRoute();
    const fromAnnouncement = route.query.from === 'announcement' && route.name === 'hwVehicleMonitoring';
    watch(
      () => route.query.from,
      (newValue) => {
        showPageGuide.value = newValue === 'announcement' && route.name === 'hwVehicleMonitoring';
        getPageGuide();
        route.query.from = null;
      }
    );

    // 生命周期钩子转换
    onMounted(() => {
      const locate = window.location.href;
      showPageGuide.value = locate.indexOf('?from=announcement') > -1 || localStorage.getItem('realInfo1') !== 'hide';
      getPageGuide();
      getChargerStationTreeData();
      getOCPPStationTreeData();
      getPositionList();
      getFenceList();
      initMap();
      document.addEventListener('visibilitychange', visibilityChange);
      const seledNodes = getSeledNodes('VEHICLEGROUP', this);
      if (seledNodes.length > 0) {
        selectedObj.value = seledNodes;
        initParamas();
      }
    });

    onActivated(() => {
      isDeactivated.value && propsData(ifFitview.value);
      if (MPBMap.value) {
        nextTick(() => {
          MPBMap.value.resize();
        });
      }
    });

    onDeactivated(() => {
      isDeactivated.value = true;
      ifFitview.value = false;
      clearTimer();
    });

    onBeforeUnmount(() => {
      clearTimer();
      MPBMap.value.remove();
      document.removeEventListener('visibilitychange', visibilityChange);
    });
	// 获取引导图并展示引导
const getPageGuide = () => {
  if (showPageGuide.value) {
    guideList.value = getPageGuideImgs('realInfo', 5);
  }
};

// 场站、车型选择改变
const selectChange = (val: any) => {
  filterPar.value[val.type] = val.value;
  initParamas();
};

// 区域查车
const areaSearch = () => {
  if (isCluster.value) {
    $messageNew('warning_color', $t('mainPage.areaSearchClickInfo'));
    return false;
  }
  isAreaSearch.value = !isAreaSearch.value;
  if (isAreaSearch.value) {
    areaDrawFence();
  } else {
    MPBMap.value.clearMarker({
      type: 'fence-special',
    });
    MPBMap.value.clearFence();
    MPBMap.value.clearDrawMode();
  }
  return true;
};
// 初始化地图
const initMap = () => {
  // 设置默认经纬度
  const lon = $store.getters.introduction.orgCityLon || 113.523094;
  const lat = $store.getters.introduction.orgCityLat || 34.742813;
  // 加载地图 API
  loadMapApi({ mapType: 'baidu' }).then((api) => {
    MapApi.value = api;
  });
  // 创建地图实例
  MPBMap.value = new MapboxApi({
    container: mapRandomId.value,
    style: getMapboxStyle(),
    center: [lon, lat],
    ifRotateAble: true,
    pitchWithRotate: ifPitch.value,
    pitch: 0,
  });

  MPBMap.value.loadReady.then((isReady: boolean) => {
    if (isReady) {
      const imgArr = [
        {
          name: 'img-fast',
          url: imgFast,
        },
        // 其他图片项...
      ];
      // 加载地图图片
      imgArr.forEach((item) => {
        MPBMap.value.Map.loadImage(item.url, (error: any, vehicelImg: any) => {
          if (error) throw error;
          MPBMap.value.Map.addImage(item.name, vehicelImg);
        });
      });
    }
  });
};

// 获取车辆 marker 列表
const getVehicleMarkerList = (fitView: boolean) => {
  markerVehicleList.value = MPBMap.value.getMarkerByType({
    type: 'vehicle_marker',
  });
  if (fitView) {
    setFitView(false);
  }
};

// 判断车辆位置是否在围栏区域中；是--取出，否--过滤掉
const filterVehicles = (fence: any) => {
  const newList = vehiclesList.value.filter((item: any) =>
    MPBMap.value.isPointInPolygon(fence.geometry.coordinates, [item.lon, item.lat])
  );
  if (newList.length) {
    listIds.value = newList.map((item: any) => item.vehicleId).join(',');
    getRightListData();
  } else {
    $messageNew('warning_color', $t('mainPage.areaSearchNull'));
    MPBMap.value.clearMarker({
      id: fence.id,
    });
    MPBMap.value.clearFence();
  }
};
// 获取右侧列表数据
const getRightListData = (resetHeight = false) => {
  $refs.VehicleMonitorPaneRef.getVehicleInfoData({
    listIds: listIds.value,
    ifResetHeight: resetHeight,
  });
};

// 获取车辆数据
const getVehiclesInfo = (fitView = false) => {
  getRightListData(fitView);
  Service.requestApi('getV2VehicleListByIds', {
    vehicleIds: vehicleIds,
  })
    .then((res) => {
      if (res.code === 1 && res.data && res.data.length > 0) {
        const oldVehicleList = res.data || [];
        oldVehicleList.forEach((item) => {
          if (!item.directionAngle || item.directionAngle === '-999999' || item.directionAngle == -999999) {
            item.directionAngle = 0;
          }
          if (item.lon === 0) {
            item.lon = '0';
          } else if (item.lat === 0) {
            item.lat = '0';
          }
        });
        const oldList = oldVehicleList.filter((item) => isValidOfLonLat(item.lon, item.lat));
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
        vehiclesList.value = oldList;
        const vehicleIdArr = vehicleIds.split(',');
        invalidNum.value = vehicleIdArr.length - oldList.length;
        if (!isCluster.value) {
          if (oldList.length === 0) {
            $messageNew('warning_color', $t('mainPage.nowPositionInvalid'));
          }
          vehicleDrowOnMap(fitView);
        } else {
          if (invalidNum.value === 0) {
            isShowMsg.value = false;
          } else {
            isShowMsg.value = true;
          }
          fitView && setInitZoom(vehiclesList.value);
          clusterVehicle(true);
        }
      } else {
        vehiclesList.value = [];
      }
    })
    .catch(() => {
      vehiclesList.value = [];
    });
};

// 设置初始缩放
const setInitZoom = (list: any[]) => {
  const lonLatList = list.map((item) => [item.lon, item.lat]);
  MPBMap.value.setFitViewByPoints(lonLatList);
};

// 清除定时器
const clearTimer = () => {
  if (markertimer) {
    clearInterval(markertimer);
    markertimer = null;
  }
};

// 开始传递参数
const propsData = (fitView = false) => {
  isDeactivated.value = false;
  clearTimer();
  if (vehicleIds) {
    getVehiclesInfo(fitView);
    markertimer = setInterval(() => {
      getVehiclesInfo();
    }, markerFreshTime.value);
  }
};

// 构建车辆参数
const initParamas = () => {
  ifFitview.value = true;
  nowMarkerId.value = '';
  nowVehicleId.value = '';
  const stationIds = filterPar.value.station;
  const modelIds = filterPar.value.model;
  const nodeIds = [];
  selectedObj.value.forEach((item: any) => {
    const isInStation = !stationIds || stationIds.some((station) => station.objectId === item.objectId);
    const isInModel = !modelIds || modelIds.some((model) => model.objectId === item.objectId);
    if (isInStation && isInModel) {
      nodeIds.push(item.objectId);
    }
  });
  if (nodeIds.length === 0) {
    vehicleIds = '';
    listIds.value = '';
    getRightListData(true);
    setTimeout(() => {
      MPBMap.value.clear();
    }, 1000);
  } else {
    vehicleIds = nodeIds.join(',');
    listIds.value = nodeIds.join(',');
    propsData(true);
  }
};

// 获取手动选择节点
const getVehicleObj = (objArr: any[]) => {
  selectedObj.value = objArr;
  initParamas();
};

// 获取快捷选择节点
const getGroupId = (val: string) => {
  let nowVehicleArr: any[] = [];
  if (val === 'tree') {
    nowVehicleArr = JSON.parse(localStorage.getItem('handleSelVehicleTree'));
  } else {
    const arrGroup = JSON.parse(localStorage.getItem('VEHICLEGROUP'));
    const nowObjArr = arrGroup.filter((item: any) => item.id === val);
    nowVehicleArr = nowObjArr[0].seledTreeNode;
  }
  selectedObj.value = nowVehicleArr;
  initParamas();
};
// 获取地点列表
const getPositionList = () => {
  Service.requestApi('getDepotAndLocateList').then((res) => {
    if (res.code === 1 && res.data.length > 0) {
      positionList.value = res.data.filter((position: any) => {
        const lon = position.locationStationType - 0 === 1 ? position.longitude : position.firstPoint.lon;
        const lat = position.locationStationType - 0 === 1 ? position.latitude : position.firstPoint.lat;
        position.lon = lon;
        position.lat = lat;
        return isValidOfLonLat(lon, lat) && position.disableState !== 0;
      });
    }
  });
};

// 获取围栏列表
const getFenceList = () => {
  Service.requestApi('getEregionList').then((res) => {
    if (res.code === 1 && res.data.data.length > 0) {
      const { data } = res.data;
      fenceList.value = data.filter((fence: any) => isValidOfLonLat(fence.firstPoint.lon, fence.firstPoint.lat));
    }
  });
};
// 格式化能源余量对应的图片路径
const formatEnergyLeft = (left: string, blog: string) => {
  let imgUrl = '';

  const eleImgPrefix = '@/assets/page_imgs/ele-';
  const oilImgPrefix = '@/assets/page_imgs/oil-';

  if (left === '-') {
    imgUrl =
      blog === 'E' || blog === 'T'
        ? import(`${eleImgPrefix}0.png`)
        : blog === 'O' || blog === 'F'
        ? import(`${oilImgPrefix}0.png`)
        : '';
  } else if (+left <= 20) {
    imgUrl =
      blog === 'E' || blog === 'T'
        ? import(`${eleImgPrefix}20.png`)
        : blog === 'O' || blog === 'F'
        ? import(`${oilImgPrefix}20.png`)
        : '';
  } else if (+left <= 40) {
    imgUrl =
      blog === 'E' || blog === 'T'
        ? import(`${eleImgPrefix}40.png`)
        : blog === 'O' || blog === 'F'
        ? import(`${oilImgPrefix}40.png`)
        : '';
  } else if (+left <= 60) {
    imgUrl =
      blog === 'E' || blog === 'T'
        ? import(`${eleImgPrefix}60.png`)
        : blog === 'O' || blog === 'F'
        ? import(`${oilImgPrefix}60.png`)
        : '';
  } else if (+left <= 80) {
    imgUrl =
      blog === 'E' || blog === 'T'
        ? import(`${eleImgPrefix}80.png`)
        : blog === 'O' || blog === 'F'
        ? import(`${oilImgPrefix}80.png`)
        : '';
  } else {
    imgUrl =
      blog === 'E' || blog === 'T'
        ? import(`${eleImgPrefix}100.png`)
        : blog === 'O' || blog === 'F'
        ? import(`${oilImgPrefix}100.png`)
        : '';
  }

  return { imgUrl };
};


// 格式化智能限速信息
const formatISA = (vehicle: Vehicle) => {
  const retrunObj = {
    isaColor: '#8CC63F',
    ifShowStyle: 'block',
  };
  if (vehicle.itlgtSpdLmtStatus && vehicle.vehicleState !== 4) {
    retrunObj.ifShowStyle = 'block';
    if (vehicle.itlgtSpdLmtStatus === 1) {
      retrunObj.isaColor = '#8CC63F';
    } else if (vehicle.itlgtSpdLmtStatus === 2) {
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
};

// 绘制未聚合的点
const drawUnclusterMarker = (vehicle: any) => {
  const { Map } = MPBMap;
  const getIsa = formatISA(vehicle);
  const typeBlog = formatVehicleEnergyType(vehicle.energyType);
  const energyLeft = _.isNil(vehicle.energyLeft)
    ? '-'
    : vehicle.energyLeft;
  const { imgUrl } = formatEnergyLeft(energyLeft, typeBlog);

  const markerHtml = $(`
    <div class="cluster_out_box">
      <div class="marker_icon_box">
        <div class="aiSpeedLimmit"
             style="color: ${getIsa.isaColor}; display: ${getIsa.ifShowStyle}">
          ISA
        </div>
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
    </div>
  `)[0];

  const marker = new Mapboxgl.Marker({
    element: markerHtml,
  })
    .setLngLat([vehicle.lon, vehicle.lat])
    .addTo(Map);
  // clusterMarkerList.push(marker);
};

// 清除未聚合点标记
const clearUnclusterMarker = () => {
  const list = this.clusterMarkerList;
  if (list.length) {
    list.forEach((item) => item.remove());
    this.clusterMarkerList = [];
  }
};

// 处理未聚合点的点击事件
const unclusteredClick = (e: any) => {
  clearUnclusterMarker();
  const coordinates = e.features[0].geometry.coordinates.slice();
  const info = e.features[0].properties;
  info.lon = coordinates[0];
  info.lat = coordinates[1];
  if (this.clusterVehicleId === info.vehicleId) {
    this.clusterVehicleId = '';
    return false;
  }
  this.clusterVehicleId = info.vehicleId;
  drawUnclusterMarker(info);

  if (this.listIds !== info.vehicleId) {
    this.listIds = info.vehicleId;
    // this.getRightListData(true); // 假设您有一个方法来获取正确的列表数据
  }
};

// 处理聚合点的点击事件
const clustersClick = (e: any) => {
  clearUnclusterMarker();
  const Map = this.MPBMap;
  const features = Map.queryRenderedFeatures(e.point, {
    layers: ['clusters'],
  });
  const clusterId = features[0].properties.cluster_id;
  const pointCount = features[0].properties.point_count;
  Map.getSource('vehicleClusters').getClusterExpansionZoom(
    clusterId,
    (err: any, zoom: any) => {
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
    (err: any, leaves: any) => {
      if (err) return;
      this.listIds = leaves
        .map((item: any) => item.properties.vehicleId)
        .join(',');
      // this.getRightListData(); // 假设您有一个方法来获取正确的列表数据
    }
  );
};

// 鼠标进入图层时的事件处理
const layerMouseEnter = () => {
  this.MPBMap.Map.getCanvas().style.cursor = 'pointer';
};

// 鼠标离开图层时的事件处理
const layerMouseLeave = () => {
  this.MPBMap.Map.getCanvas().style.cursor = '';
};


// 车辆聚合展示
const clusterVehicle = (isRefresh: boolean) => {
  if (isAreaSearch.value) {
    $messageNew('warning_color', $t('mainPage.clusterClickInfo'));
    return false;
  }

  MPBMap.clearMarker({
    type: 'vehicle_marker',
  });

  const { Map } = MPBMap;
  if (!isRefresh) {
    nowMarkerId.value = '';
    isCluster.value = !isCluster.value;
    if (isCluster.value) {
      if (invalidNum.value !== 0) {
        isShowMsg.value = true;
      }
      Map.setZoom(initZoom.value);
    } else {
      isShowMsg.value = false;
    }
    $log &&
      $log({
        actionId: 'log.toggleTogether',
        vm: this,
        param: { isCluster: isCluster.value },
      });
  }
  if (!isCluster.value || isRefresh) {
    const layerIdArr = ['clusters', 'cluster-count', 'unclustered-point'];
    layerIdArr.forEach((item) => {
      if (Map.getLayer(item)) {
        Map.removeLayer(item);
      }
    });

    Map.getSource('vehicleClusters') && Map.removeSource('vehicleClusters');

    if (!isCluster.value) {
      $('.cluster_out_box').css('display', 'none');
      listIds.value = vehicleIds.value;
      propsData(true);

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
  vehiclesList.value.forEach((vehicle: any) => {
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

  const list = clusterMarkerList.value.length;
  if (isRefresh && list.length > 0) {
    const nowRefreshVehicle = vehiclesList.value.find(
      (item: any) => item.vehicleId === clusterVehicleId.value
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
};

// 车辆打点在地图上
const vehicleDrowOnMap = (fitView: boolean) => {
  const markerArr: any[] = [];
  vehiclesList.forEach((vehicle: any) => {
    let iconMarker = '';
    const idMarker = `vehicleMarker_${vehicle.vehicleId}`;
    // 根据车辆状态选择对应的图标
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

    const energyLeft = _.isNil(vehicle.energyLeft)
      ? '-'
      : vehicle.energyLeft;
    const typeBlog = formatVehicleEnergyType(vehicle.energyType);
    const { imgUrl } = formatEnergyLeft(energyLeft, typeBlog);
    const getIsa = formatISA(vehicle);

    const markerHtml = $(`
      <div class="marker_out_box">
        <div class="marker_icon_box" id="${idMarker}">
          <div class="aiSpeedLimmit"
               style="color: ${getIsa.isaColor}; display: ${getIsa.ifShowStyle}">
            ISA
          </div>
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
      </div>
    `)[0];

    markerArr.push({
      element: markerHtml,
      icon: iconMarker,
      id: idMarker,
      moveType:
        vehicle.vehicleId === nowVehicleId ? 'static' : 'static',
      direction: vehicle.directionAngle - 0,
      lon: vehicle.lon - 0,
      lat: vehicle.lat - 0,
      label: vehicle.vehicleName,
      energyLeft,
      vehicleSpeed: vehicle.vehicleSpeed,
      reportTime: vehicle.reportTime,
      events: {
        click: (item: any) => {
          switchVehicleShowInfo(item.id, true);
        },
      },
    });
  });

  MPBMap.websocketMarker(markerArr, {
    type: 'vehicle_marker',
    isClear: true,
    fitView: false,
  });

  getVehicleMarkerList(fitView);

  if (!fitView) {
    if (nowVehicleId) {
      switchVehicleShowInfo(
        `vehicleMarker_${nowVehicleId}`,
        true
      );
    } else {
      switchVehicleShowInfo(
        `vehicleMarker_${nowVehicleId}`,
        false
      );
    }
  } else {
    initZoom = MPBMap.Map.getZoom();
  }
};
// 清除所有地图标记
const clearMarkers = () => {
  MPBMap.clearMarker({
    type: 'chargerStation_marker',
  });
  MPBMap.clearMarker({
    type: 'stationOCPP_marker',
  });
  MPBMap.clearMarker({
    type: 'fence_marker',
  });
  MPBMap.clearMarker({
    type: 'location_marker',
  });
};

// marker---充电站
const chargeDrowOnMap = () => {
  if (nowSeledTypeList.value.indexOf('chargerStation') > -1) {
    const markerArr: any[] = [];
    const workName = $t('mainPage.chargingPileStateWorking');
    const freeName = $t('mainPage.chargingPileStateIdle');
    const faultName = $t('mainPage.chargingPileStateFault');
    const offlineName = $t('mainPage.offline');
    
    // 根据充电机经纬度进行打点
    chargeStationsList.forEach(charge => {
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
      
      const markerHtml = (
        <div class="marker_out_box">
          <div class="marker_icon_box" id={idMarker}>
            <div class="vehicle_info_content">
              {`${charge.displayName} (${charge.freeNumber}/${charge.totalNumber})`}
            </div>
            <div class="vehicle_all_info_content_box">
              <div class="charger_all_info_content">
                <div class="charger_left_box">
                  <div class="charger_name">{charge.displayName}</div>
                  <div class="charger_state_box">
                    <div class="charger_state">
                      <div class="charger_circle green_color" title={workName}></div>
                      <div class="">{charge.workingNumber}</div>
                    </div>
                    <div class="charger_state">
                      <div class="charger_circle yellow_color" title={freeName}></div>
                      <div class="">{charge.freeNumber}</div>
                    </div>
                    <div class="charger_state">
                      <div class="charger_circle red_color" title={faultName}></div>
                      <div class="">{charge.faultNumber}</div>
                    </div>
                    <div class="charger_state">
                      <div class="charger_circle grey_color" title={offlineName}></div>
                      <div class="">{offlineNumber}</div>
                    </div>
                  </div>
                </div>
                <div class="devider_line_box"></div>
                <div class="charger_right_box charger_map_address">
                  {charge.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
      markerArr.push({
        element: markerHtml,
        icon: iconMarker,
        id: idMarker,
        lon: charge.longitude,
        lat: charge.latitude,
        events: {
          click: (item: any) => {
            switchVehicleShowInfo(item.id);
          },
        },
      });
    });
    
    MPBMap.addMarkerList(markerArr, {
      isClear: true,
      fitView: false,
      type: 'chargerStation_marker',
    });
  } else {
    MPBMap.clearMarker({
      type: 'chargerStation_marker',
    });
  }
};

// marker---OCPP充电站
const stationOCPPDrowOnMap = () => {
  if (nowSeledTypeList.value.indexOf('stationOCPP') > -1) {
    const markerArr: any[] = [];
    const usingName = $t('mainPage.using');
    const availableName = $t('mainPage.available');
    const unavailableName = $t('mainPage.unavailable');
    const offlineName = $t('mainPage.offline');

    // 根据OCPP充电站经纬度进行打点
    stationsListOCPP.forEach(charge => {
      let iconMarker = '';
      const idMarker = `stationOCPPMarker_${charge.depotId}`;

      if (charge.unavailableCount > 0) {
        iconMarker = iconChargerFault;
      } else {
        iconMarker = iconCharger;
      }

      const markerHtml = (
        <div class="marker_out_box">
          <div class="marker_icon_box" id={idMarker}>
            <div class="vehicle_info_content">
              {`${charge.depotName} (${charge.availableCount}/${charge.totalCount})`}
            </div>
            <div class="vehicle_all_info_content_box">
              <div class="charger_all_info_content">
                <div class="charger_left_box">
                  <div class="charger_name">{charge.depotName}</div>
                  <div class="charger_state_box">
                    <div class="charger_state">
                      <div class="charger_circle blue_color" title={usingName}></div>
                      <div class="">{charge.usingCount}</div>
                    </div>
                    <div class="charger_state">
                      <div class="charger_circle green_color" title={availableName}></div>
                      <div>{charge.availableCount}</div>
                    </div>
                    <div class="charger_state">
                      <div class="charger_circle red_color" title={unavailableName}></div>
                      <div class="">{charge.unavailableCount}</div>
                    </div>
                    <div class="charger_state">
                      <div class="charger_circle grey_color" title={offlineName}></div>
                      <div class="">{charge.offLineCount}</div>
                    </div>
                  </div>
                </div>
                <div class="devider_line_box"></div>
                <div class="charger_right_box station_OCPP_map_address">
                  {charge.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

      markerArr.push({
        element: markerHtml,
        icon: iconMarker,
        id: idMarker,
        lon: charge.gpsLongitude,
        lat: charge.gpsLatitude,
        events: {
          click: (item: any) => {
            switchVehicleShowInfo(item.id);
          },
        },
      });
    });

    MPBMap.addMarkerList(markerArr, {
      isClear: true,
      fitView: false,
      type: 'stationOCPP_marker',
    });
  } else {
    MPBMap.clearMarker({
      type: 'stationOCPP_marker',
    });
  }
};

// marker---围栏
const fenceDrowOnMap = () => {
  if (nowSeledTypeList.value.indexOf('fence') > -1) {
    const markerArr: any[] = [];

    // 根据围栏经纬度进行打点
    fenceList.forEach(fence => {
      const iconMarker = fenceIcon;
      const idMarker = `fenceMarker_${fence.eregionId}`;

      const markerHtml = (
        <div class="marker_out_box">
          <div class="marker_icon_box" id={idMarker}>
            <div class="vehicle_info_content">{fence.eregionName}</div>
          </div>
        </div>
      );

      markerArr.push({
        element: markerHtml,
        icon: iconMarker,
        id: idMarker,
        lon: fence.firstPoint.lon,
        lat: fence.firstPoint.lat,
      });
    });

    MPBMap.addMarkerList(markerArr, {
      isClear: true,
      fitView: false,
      type: 'fence_marker',
    });
  } else {
    MPBMap.clearMarker({
      type: 'fence_marker',
    });
  }
};

// marker---地点
const positionDrowOnMap = () => {
  if (nowSeledTypeList.value.indexOf('location') > -1) {
    const markerArr: any[] = [];

    // 根据地点经纬度进行打点
    positionList.forEach(position => {
      const iconMarker =
        +position.locationStationType === 1 ? blackIcon : fenceIcon;
      const idMarker = `positionMarker_${position.id}`;

      const markerHtml = (
        <div class="marker_out_box">
          <div class="marker_icon_box" id={idMarker}>
            <div class="vehicle_info_content">{position.name}</div>
            <div class="vehicle_all_info_content_box">
              <div class="charger_all_info_content">
                <div class="charger_left_box" style="width: 200px;">
                  <div class="position_name">{position.name}</div>
                  <div class="position_name">{position.phoneNum}</div>
                  <div class="position_name">{position.remark}</div>
                </div>
                <div class="devider_line_box"></div>
                <div class="charger_right_box">{position.detail}</div>
              </div>
            </div>
          </div>
        </div>
      );

      markerArr.push({
        element: markerHtml,
        icon: iconMarker,
        id: idMarker,
        lon: position.lon,
        lat: position.lat,
        locationStationType: +position.locationStationType,
        events: {
          click: item => {
            item.locationStationType === 1 && switchVehicleShowInfo(item.id);
          },
        },
      });
    });

    MPBMap.addMarkerList(markerArr, {
      isClear: true,
      fitView: false,
      type: 'location_marker',
    });
  } else {
    MPBMap.clearMarker({
      type: 'location_marker',
    });
  }
};

// 切换车辆marker展示
const switchVehicleShowInfo = (id: string, ifFitView: boolean): void => {
  // 如果正在进行区域搜索，则切换到简单选择模式和绘制矩形模式
  if (isAreaSearch.value) {
    MPBMap.Draw.changeMode('simple_select');
    MPBMap.Draw.changeMode('draw_rectangle');
  }
  // 根据ID获取标记的类型
  const blogId = id.split('_')[0];
  // 如果是车辆标记
  if (blogId === 'vehicleMarker') {
    nowVehicleId.value = id.split('_')[1];
    nowMarkerId.value = id;
    // 如果需要自适应视图
    if (ifFitView) {
      setFitView(false);
    }
  } else {
    nowVehicleId.value = '';
  }
  // 如果不是围栏标记
  if (blogId !== 'fenceMarker') {
    // FIXME: 此处需要优化，有时候会自动把详细信息收起来
    const markers = document.querySelectorAll('.Mapbox_marker');
    markers.forEach(marker => marker.classList.remove('active_marker'));
    document.getElementById(id)?.classList.add('active_marker');
    $('.marker_out_box').find('.vehicle_info_content').show();
    $(`#${id}`).find('.vehicle_info_content').hide();
    $('.marker_out_box').find('.vehicle_all_info_content_box').hide();
    $(`#${id}`).find('.vehicle_all_info_content_box').show();
  }
};

// 操作列表折叠/展开
const changeWidth = (val: boolean): void => {
  ifExpand.value = val;
  nextTick(() => {
    MPBMap.resize();
  });
};

// 切换车辆
const changeVehicle = (item: any): void => {
  // 如果经纬度有效
  if (isValidOfLonLat(item.lon, item.lat)) {
    // 如果是聚合状态
    if (isCluster.value) {
      setInitZoom([item]);
    } else {
      switchVehicleShowInfo(`vehicleMarker_${item.vehicleId}`, true);
    }
  } else {
    $messageNew('warning_color', $t('mainPage.nowPositionInvalid'));
  }
};

// 切换2D/3D视图
const switchMapView = (): void => {
  ifPitch.value = !ifPitch.value;
  MPBMap.setMapView({
    viewMode3D: ifPitch.value,
  });
  $log &&
    $log({
      actionId: 'log.toggle2dOr3d',
      vm: this,
      param: { ifPitch: ifPitch.value },
    });
};

// 设置视野自适应
const setFitView = (ifAll: boolean): void => {
  $log && $log({ actionId: 'log.mapCenterPoint', vm: this });
  // 根据当前标记ID获取对应的标记
  const nowMarker = markerVehicleList.filter(item => {
    return item._element.id === nowMarkerId.value;
  });
  // 如果需要全部居中
  if (ifAll) {
    nowMarkerId.value = '';
    nowVehicleId.value = '';
    MPBMap.setFitView(markerVehicleList, {}, isCluster.value);
  } else if (nowMarker.length > 0) {
    MPBMap.setFitView(nowMarker, {}, isCluster.value);
  } else {
    MPBMap.setFitView(markerVehicleList, {}, isCluster.value);
  }
};

// 设置全屏/非全屏
const setFullScreen = (val: boolean): void => {
  $log &&
    $log({
      actionId: 'log.fullScreen',
      vm: this,
      param: { ifFullScreen: val },
    });
  ifFullScreen.value = val;
  nextTick(() => {
    MPBMap.resize();
  });
};

// 切换绘制标记
const switchDrawMarker = (id: string): void => {
  // 切换标记选中状态
  const index = nowSeledTypeList.value.indexOf(id);
  if (index > -1) {
    nowSeledTypeList.value.splice(index, 1);
  } else {
    nowSeledTypeList.value.push(id);
  }
  // 根据不同的标记类型进行绘制
  switch (id) {
    case 'chargerStation':
      $log && $log({ actionId: 'log.geoChangeStation', vm: this });
      chargeDrowOnMap();
      break;
    case 'stationOCPP':
      $log && $log({ actionId: 'log.geoChangeStationOcpp', vm: this });
      stationOCPPDrowOnMap();
      break;
    case 'location':
      $log && $log({ actionId: 'log.geoAddress', vm: this });
      positionDrowOnMap();
      break;
    case 'fence':
      $log && $log({ actionId: 'log.geoFence', vm: this });
      fenceDrowOnMap();
      break;
  }
};

// 监听窗口变化
const visibilityChange = (): void => {
  // 浏览器tab标签切换事件
  if (document.visibilityState == 'hidden') {
    // 状态判断，未在当前页面
    ifFitview.value = false;
    clearTimer();
  } else {
    // 回到页面
    if ($route.name === 'hwVehicleMonitoring') {
      propsData();
    }
  }
};
// 获取充电站树数据
const getChargerStationTreeData = () => {
  if ($cache.getCache('HwSyncChargerStationTree')) {
    const { data } = $cache.getCache('HwSyncChargerStationTree');
    const stationIdStr = getAllChargerStationIds(data, []).join(',');
    getChargerStationLonLat(stationIdStr);
  } else {
    Service.requestApi('getChargingStationTree', {
      allStation: true,
      orgId: null,
      keywords: '',
    })
      .then((res) => {
        if (res.code === 1) {
          const stationIdStr = getAllChargerStationIds(res.data, []).join(',');
          getChargerStationLonLat(stationIdStr);
          const cacheData = {
            name: 'HwSyncChargerStationTree',
            data: res.data,
          };
          $cache.setCache('HwSyncChargerStationTree', cacheData);
        }
      })
      .catch(() => {});
  }
};

// 获取OCPP充电站树数据
const getOCPPStationTreeData = () => {
  if ($cache.getCache('OCPPChargerStationTree')) {
    const { data } = $cache.getCache('OCPPChargerStationTree');
    const stationIdStr = getAllChargerStationIds(data, []).join(',');
    getOCPPStationLonLat(stationIdStr);
  } else {
    Service.requestApi('getDepotTree', {
      keywords: '',
      queryFiled: 'energyStationName',
    })
      .then((res) => {
        if (res.code === 1) {
          const stationIdStr = getAllChargerStationIds([res.data], []).join(',');
          getOCPPStationLonLat(stationIdStr);
          const cacheData = {
            name: 'OCPPChargerStationTree',
            data: [res.data],
          };
          $cache.setCache('OCPPChargerStationTree', cacheData);
        }
      })
      .catch(() => {});
  }
};

// 遍历数据获取id
const getAllChargerStationIds = (data: any[], ids: string[]) => {
  data.forEach((item) => {
    if (item.objectType === 'EleStation') {
      ids.push(item.objectId);
    } else if (item.children && item.children.length > 0) {
      getAllChargerStationIds(item.children, ids);
    }
  });
  return ids;
};

// 获取充电站数据
const getChargerStationLonLat = (idStr: string) => {
  Service.requestApi('getEleStationMapInfo', { chargeStationIds: idStr })
    .then((res) => {
      if (res.code === 1 && res.data.data.length > 0) {
        const { data } = res.data;
        chargeStationsList.value = data.filter((charger: any) =>
          isValidOfLonLat(charger.longitude, charger.latitude)
        );
        if (chargeStationsList.value.length > 0) {
          chargeStationsList.value.forEach((item: any) => {
            getAddress(item.longitude, item.latitude)
              .then((res) => {
                item.address = res.address;
                const idMarker = `chargerMarker_${item.chargeStationId}`;
                const marker = MPBMap.getMarkerByType({ id: idMarker })[0];
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
    .catch(() => {});
};

// 获取OCPP充电站数据
const getOCPPStationLonLat = (idStr: string) => {
  Service.requestApi('getDepotInfoList', { depotIds: idStr })
    .then((res) => {
      if (res.data && res.data.length > 0) {
        const { data } = res;
        stationsListOCPP.value = data.filter((charger: any) =>
          isValidOfLonLat(charger.gpsLongitude, charger.gpsLatitude)
        );
        if (stationsListOCPP.value.length > 0) {
          stationsListOCPP.value.forEach((item: any) => {
            item.totalCount =
              item.availableCount +
              item.offLineCount +
              item.unavailableCount +
              item.usingCount -
              0;
            item.address = '-';
            item.gpsLongitude -= 0;
            item.gpsLatitude -= 0;
            getAddress(item.gpsLongitude, item.gpsLatitude)
              .then((res) => {
                item.address = res.address;
                const idMarker = `stationOCPPMarker_${item.depotId}`;
                const marker = MPBMap.getMarkerByType({ id: idMarker })[0];
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
    .catch(() => {});
};

// 异步解析经纬度
const getAddress = (lon: number, lat: number) => {
  return new Promise<{ address: string }>((resolve, reject) => {
    let addressNew = '';
    MapApi.getAddressByLonLat(lon, lat)
      .then((address: string) => {
        addressNew = address;
        resolve({ address: addressNew });
      })
      .catch(() => {
        addressNew = '-';
        reject({ address: addressNew });
      });
  });
};
// 区域画围栏
const areaDrawFence = () => {
  MPBMap.drawFence({
    fenceShape: 2,
    fenceState: 'New',
    fenceType: 'Common',
    fenceApply: 'special',
    events: (fence: any) => {
      filterVehicles(fence);
    },
  });
};
</script>
<style lang="less" scoped>
.vehicle_monitoring_box {
  width: 100%; /* 整个监控盒子的宽度为100% */
  height: 100%; /* 整个监控盒子的高度为100% */
  position: relative; /* 相对定位，以便子元素绝对定位时参考的父元素 */
  
  /* 以下是地图盒子的样式 */
  .monitoring_map_out_box {
    width: 100%; /* 地图盒子的宽度为100% */
    height: calc(100% - 40px); /* 地图盒子的高度为整个盒子高度减去40px（底部的控制区域） */
    border-radius: 6px; /* 地图盒子的边框圆角为6px */
    
    /* 地图容器的样式 */
    .monitoring_map_box {
      float: left; /* 左浮动，使地图和列表并排显示 */
      width: calc(100% - 450px); /* 地图宽度为整个盒子宽度减去450px（列表宽度） */
      height: 100%; /* 地图高度为100% */
      position: relative; /* 相对定位，以便绝对定位的操作区域参考的父元素 */
      overflow: hidden; /* 隐藏超出盒子范围的内容 */
      
      /* 操作区域的样式 */
      .operate_box {
        position: absolute; /* 绝对定位，以便操作区域放在地图上的指定位置 */
        top: 20px; /* 与顶部的距离为20px */
        border: 1px solid rgba(130, 140, 163, 0.5); /* 边框为1px的淡蓝色 */
        border-radius: 2px; /* 边框圆角为2px */
        z-index: 1; /* 层级为1，使操作区域位于地图之上 */
        cursor: pointer; /* 鼠标悬停时显示指针光标 */
        
        /* 操作按钮的样式 */
        .type_btn {
          line-height: 18px; /* 按钮文字的行高为18px */
        }
      }
      
      /* 切换模式按钮的样式 */
      .model_switch_box {
        width: 74px; /* 模式切换按钮盒子的宽度为74px */
        height: 20px; /* 模式切换按钮盒子的高度为20px */
        left: 20px; /* 与左侧的距离为20px */
        text-align: center; /* 文字居中对齐 */
      }
      
      /* 切换类型标记按钮的样式 */
      .type_marker_box {
        cursor: pointer; /* 鼠标悬停时显示指针光标 */
        right: 105px; /* 与右侧的距离为105px */
        height: 30px; /* 高度为30px */
        padding: 4px 10px; /* 内边距为4px（上下）和10px（左右） */
        
        /* 文字和按钮的样式 */
        span {
          float: left; /* 左浮动，使文字和按钮并排显示 */
          line-height: 20px; /* 行高为20px */
        }
        .type_marker_jump_btn {
          float: left; /* 左浮动，使按钮在文字旁边显示 */
          margin-left: 5px; /* 与文字之间的左边距为5px */
        }
      }
      
      /* 类型标记按钮下拉框的样式 */
      .type_marker_box_ul {
        position: absolute; /* 绝对定位，以便下拉框放在指定位置 */
        right: 105px; /* 与右侧的距离为105px */
        top: 54px; /* 距离顶部的距离为54px */
        z-index: 10; /* 层级为10，使下拉框位于其他元素之上 */
        padding: 10px 10px; /* 内边距为10px（上下）和10px（左右） */
        
        /* 类型标记项的样式 */
        .type_marker_item {
          cursor: pointer; /* 鼠标悬停时显示指针光标 */
          min-width: 100px; /* 最小宽度为100px */
          padding: 0 10px; /* 内边距为0（上下）和10px（左右） */
          overflow: hidden; /* 超出隐藏 */
          margin-bottom: 11px; /* 底部外边距为11px */
          
          /* 鼠标悬停时的样式 */
          &:hover {
            background: rgba(130, 140, 163, 0.2); /* 背景颜色为淡蓝色 */
          }
          
          /* 按钮和文字的样式 */
          .type_btn {
            float: left; /* 左浮动，使按钮和文字并排显示 */
            margin-right: 10px; /* 按钮右边距为10px */
          }
          span {
            float: left; /* 左浮动，使文字显示在按钮旁边 */
          }
          
          /* 激活项的样式 */
          .activeItem {
            background: rgba(130, 140, 163, 0.2); /* 激活项的背景颜色为淡蓝色 */
          }
        }
      }
      
      /* 操作按钮盒子的样式 */
      .operate_btn_box {
        width: 75px; /* 操作按钮盒子的宽度为75px */
        height: 30px; /* 操作按钮盒子的高度为30px */
        right: 20px; /* 与右侧的距离为20px */
        padding: 4px 8px; /* 内边距为4px（上下）和8px（左右） */
        box-sizing: border-box; /* 盒子的宽高包括内边距和边框 */
        overflow: hidden; /* 超出隐藏 */
        
        /* 操作按钮的样式 */
        .operate_btn {
          float: left; /* 左浮动，使按钮并排显示 */
          width: 20px; /* 按钮的宽度为20px */
          height: 20px; /* 按钮的高度为20px */
          text-align: center; /* 文字居中对齐 */
          
          /* 鼠标悬停时的样式 */
          &:hover {
            background: rgba(130, 140, 163, 0.2); /* 背景颜色为淡蓝色 */
          }
        }
        
        /* 操作按钮之间的分隔线样式 */
        .operate_btn_divider {
          float: left; /* 左浮动，使分隔线并排显示 */
          width: 1px; /* 分隔线的宽度为1px */
          height: 20px; /* 分隔线的高度为20px */
          background: #828ca3; /* 背景颜色为深蓝色 */
          margin: 0 8px; /* 左右外边距为8px */
        }
      }
      
      /* 聚合按钮的样式 */
      .cluster-box {
        height: 30px; /* 高度为30px */
        padding: 4px 8px; /* 内边距为4px（上下）和8px（左右） */
        right: 20px; /* 与右侧的距离为20px */
        bottom: 20px; /* 与底部的距离为20px */
        top: auto !important; /* 重写top属性，使其从底部定位 */
        
        /* 文字的样式 */
        span {
          line-height: 18px; /* 行高为18px */
          margin-left: 5px; /* 左边距为5px */
        }
      }
      
      /* 区域搜索按钮的样式 */
      .area-search-btn {
        cursor: pointer; /* 鼠标悬停时显示指针光标 */
        right: 180px; /* 与右侧的距离为180px */
        max-width: 150px; /* 最大宽度为150px */
        height: 30px; /* 高度为30px */
        padding: 4px 10px; /* 内边距为4px（上下）和10px（左右） */
        line-height: 20px; /* 行高为20px */
      }
      
      /* 蓝色背景按钮的样式 */
      .back-blue {
        background: #026ae3; /* 背景颜色为蓝色 */
        color: #fff; /* 文字颜色为白色 */
        border: none; /* 去掉边框 */
        padding: 5px 10px; /* 内边距为5px（上下）和10px（左右） */
      }
      
      /* 地图的样式 */
      .monitoring_map {
        width: 100%; /* 地图宽度为100% */
        height: 100%; /* 地图高度为100% */
      }
    }
    
    /* 列表盒子的样式 */
    .vehile_list_box {
      float: right; /* 右浮动，使列表在地图旁边显示 */
      width: 450px; /* 列表宽度为450px */
      height: 100%; /* 列表高度为100% */
    }
    
    /* 地图缩小时列表的样式 */
    .monitoring_map_narrow {
      width: calc(100% - 770px); /* 地图缩小时，地图宽度为整个盒子宽度减去770px（列表宽度） */
    }
    
    /* 新的列表盒子的样式 */
    .vehile_list_box_new {
      width: 770px; /* 列表宽度为770px */
    }
  }
}
</style>

