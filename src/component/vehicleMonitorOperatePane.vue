<template>
  <template>
  <div class="vehicle_monitor_operatePane_box">
    <!-- 右侧列表导出功能 -->
    <svg-icon
      icon-class="iconsave"
      class="download-btn"
      v-auth="'eap.realMapMonitor.export'"
      @click.native="downloadList"
    ></svg-icon>
    <!-- 右侧饼图功能 -->
    <svg-icon
      icon-class="iconcircular"
      class="download-btn"
      style="right: 40px"
      @click.native="showPieChartBox"
    ></svg-icon>
    <!-- 车辆置顶pane -->
    <div class="vehicle_details_info_box" v-show="topVehiclesList.length > 0">
      <details-pane
        v-for="pane in topVehiclesList"
        :key="pane.vehicleId"
        :seledVehicleObj="pane"
        @cancelTop="cancelTop"
        :ifIsTopDetails="true"
      ></details-pane>
    </div>
    <!-- 当前车辆详细信息 -->
    <div class="vehicle_details_info_box" v-show="ifShowDetails">
      <!-- 车辆详情 -->
      <details-pane
        :seledVehicleObj="nowVehicleObj"
        @closeDetails="closeDetails"
        v-show="nowState !== 'fault'"
      ></details-pane>
      <div
        class="fault_list_box"
        v-if="nowState === 'fault' && nowVehicleObj.alarmStatus2 - 0 === 1"
      >
        <div class="normal_words"
          >{{ nowVehicleObj.vehicleName + '('
          }}{{ nowVehicleObj.energyType | formatType }}{{ ')' }}</div
        >
        <progress-bar
          :percentage="nowVehicleObj.energyLeft"
          class="progress_bar_box"
        ></progress-bar>
        <div class="fault_list_item_box">
          <div
            class="fault_list_item"
            v-for="fault in faultList"
            :key="fault.neFaultCode"
            v-show="faultList.length > 0"
          >
            <div class="list_item">
              <svg-icon
                icon-class="iconred"
                class="show_icon"
                :style="{
                  color:
                    fault.faultLevel === '1'
                      ? '#FF0000'
                      : fault.faultLevel === '2'
                      ? '#FF6712'
                      : '#FFD100',
                }"
              ></svg-icon>
            </div>
            <div class="list_item normal_words" :title="fault.neFaultCode">{{
              fault.neFaultCode
            }}</div>
            <div class="list_item normal_words" :title="fault.faultCodeName">{{
              fault.faultCodeName
            }}</div>
            <div class="list_item normal_words" :title="fault.reportTime">{{
              fault.reportTime
            }}</div>
          </div>
          <query-loading
            :queryConfig="queryStatusTwo"
            v-show="faultList.length === 0"
          ></query-loading>
        </div>
      </div>
    </div>
    <!-- 各种车辆状态及故障按钮 -->
    <div class="vehicle_state_fault_box">
      <div
        class="veicle_state normal_words"
        @click="changeState(state.id)"
        v-for="state in stateList"
        :key="state.id"
        :title="$t(state.name)"
      >
        <svg-icon
          v-if="state.id !== 'driving'"
          :icon-class="nowState === state.id ? state.icon_checked : state.icon"
          class="veicle_state_icon"
          :style="{ color: state.color }"
        ></svg-icon>
        <img
          v-else
          :src="nowState === state.id ? state.src_checked : state.src"
          class="veicle_state_img"
          alt=""
        />
        <span
          :style="{ color: nowState === state.id ? state.color : '' }"
          class="veicle_state_num"
          >{{ state.num }}</span
        >
      </div>
    </div>
    <!-- 标题tab -->
    <div class="monitor_operatePane_tit_box">
      <!-- 面板标题栏 -->
      <div
        class="monitor_operatePane_tit_list"
        v-for="tit in tabTitleList"
        :key="tit.key"
        :style="{
          width: calcWidth(tit.width) + '%',
          cursor: tit.ifShowSort ? 'pointer' : 'default',
        }"
        v-show="tit.show"
      >
        <!-- 排序按钮 -->
        <div
          class="sort_btn_box"
          :class="tit.key === 'vehicleName' && 'ml-20'"
          @click="sortListData(tit, 'asc')"
          v-show="tit.ascDesc && tit.ascDesc === 'default'"
        >
          <svg-icon
            icon-class="icondropdownoriginal"
            class="sort_btn"
            v-show="tit.ifShowSort"
          ></svg-icon>
        </div>
        <div
          class="sort_btn_box"
          :class="tit.key === 'vehicleName' && 'ml-20'"
          @click="sortListData(tit, 'default')"
          v-show="tit.ascDesc && tit.ascDesc === 'desc'"
        >
          <svg-icon
            icon-class="icondropdownoriginal"
            class="sort_btn"
            v-show="tit.ifShowSort"
          ></svg-icon>
        </div>
        <div
          class="sort_btn_box"
          :class="tit.key === 'vehicleName' && 'ml-20'"
          style="transform: rotateZ(180deg)"
          @click="sortListData(tit, 'desc')"
          v-show="tit.ascDesc && tit.ascDesc === 'asc'"
        >
          <svg-icon
            icon-class="icondropdownoriginal"
            class="sort_btn"
            v-show="tit.ifShowSort"
          ></svg-icon>
        </div>
        <div
          class="sort_btn_box"
          :class="tit.key === 'vehicleName' && 'ml-20'"
          v-show="!tit.ascDesc"
        >
          <svg-icon
            icon-class="icondropdownoriginal"
            class="sort_btn"
            v-show="tit.ifShowSort"
          ></svg-icon>
        </div>
        <!-- 列表名称 -->
        <el-tooltip
          v-if="
            (tit.key === 'vehicleName' || tit.key === 'drivingRange') &&
            tit.infoContent
          "
          :effect="effectType"
          placement="top"
        >
          <div slot="content">
            <div v-for="content in tit.infoContent">
              <i
                v-if="content.icon"
                class="iconfont"
                :class="content.icon"
                :style="{ color: content.color }"
              ></i>
              <span>{{
                $t(content.name) +
                ((content.desc && ` : ${$t(content.desc)}`) || '')
              }}</span>
            </div>
          </div>
          <div
            class="content_titName"
            :class="tit.key === 'vehicleName' && 'ml-20'"
          >
            <span
              class="content_title_name normal_words"
              :title="$t(tit.label)"
              style="max-width: calc(100% - 16px)"
              >{{ $t(tit.label) }}</span
            >
            <svg-icon icon-class="iconinfobeifen"></svg-icon>
          </div>
        </el-tooltip>
        <div
          class="content_titName"
          :class="tit.key === 'vehicleName' && 'ml-20'"
          v-else
        >
          <span
            v-if="tit.label"
            class="content_title_name normal_words"
            :title="$t(tit.label)"
            >{{ $t(tit.label) }}</span
          >
          <svg-icon
            v-else
            :icon-class="tit.icon"
            class="show_icon"
            :style="{ color: tit.color }"
          ></svg-icon>
        </div>
      </div>
      <!-- 面板展开收缩按钮 -->
      <svg-icon
        icon-class="iconarrowrightoriginal"
        class="fold_expand_btn"
        :style="{
          top: '19px',
          left: '5px',
          transform: ifExpandList ? 'rotateZ(0deg)' : 'rotateZ(180deg)',
        }"
        @click.native="expandList"
      ></svg-icon>
      <!-- 面板自定义显示列 -->
      <div class="handle_column_box" v-show="nowState !== 'fault'">
        <column-panel
          :columns="columnsMenu"
          class="fr"
          @settingColumn="handleSettingColumn"
        ></column-panel>
      </div>
    </div>
    <!-- 车辆列表展示 -->
    <div class="operatePane_content_box_out">
      <!-- 无数据时展示 -->
      <query-loading :queryConfig="queryStatus"></query-loading>
      <!-- 面板下列表 -->
      <ul class="operatePane_content_box" v-show="statusCode === 'loaded'">
        <li
          v-for="(item, indx) in dataList"
          :key="indx"
          class="list_single"
          :class="item.vehicleId === clickedVehicleId ? 'active_list' : ''"
          @click="seledNowList(item)"
        >
          <div class="vehicle_base_info_box">
            <div
              class="vehicle_base_info normal_words"
              v-for="vehicleData in tabTitleList"
              :key="vehicleData.key"
              :style="{ width: calcWidth(vehicleData.width) + '%' }"
              v-show="vehicleData.show"
            >
              <span v-if="vehicleData.key === 'vehicleName'">
                <i
                  class="iconfont iconvehicle_icon"
                  :title="item.vehicleState | formatVehicleState(item)"
                  :class="formatIcon(item, vehicleData)"
                ></i>
                <span :title="item[vehicleData.key]">{{
                  item[vehicleData.key] | filterFormat(vehicleData)
                }}</span>
              </span>
              <span
                :title="item[vehicleData.key] | formatHoverContent"
                v-else-if="vehicleData.key === 'energyType'"
              >
                {{ item[vehicleData.key] | filterFormat(vehicleData) }}
              </span>
              <span
                v-else
                :title="
                  (item[vehicleData.key] + vehicleData.unit)
                    | filterFormat(vehicleData, item)
                "
              >
                {{ item[vehicleData.key] | filterFormat(vehicleData, item)
                }}{{ vehicleData.unit }}
              </span>
            </div>
          </div>
          <!-- 能源余量进度条 -->
          <progress-bar
            :percentage="item.energyLeft"
            class="progress_bar_box_list"
          ></progress-bar>
          <!-- 列操作按钮 -->
          <div class="operat_menu_out_box" v-show="nowState !== 'fault'">
            <svg-icon
              icon-class="iconlist"
              class="fold_expand_btn"
              style="top: -21px; right: -20px"
              @click.native.stop="showNowMenuList(item.vehicleId)"
            ></svg-icon>
            <div
              class="operat_menu_box operate_base_menu_box"
              v-show="clickedMenuId === item.vehicleId"
            >
              <div
                class="operat_menu normal_words"
                :title="$t('mainPage.instrumentPanel')"
                @click.stop="gotoCluster(item.vehicleId)"
                >{{ $t('mainPage.instrumentPanel') }}</div
              >
              <div
                class="operat_menu normal_words"
                :title="$t('route.hwVehicleDetail')"
                @click.stop="gotoDetails(item.vehicleId)"
                >{{ $t('route.hwVehicleDetail') }}</div
              >
              <div class="operat_menu_line"></div>
              <div
                class="operat_menu_btn"
                :title="$t('mainPage.upTop')"
                @click.stop="upTop(item)"
              >
                <svg-icon
                  icon-class="iconpin-original"
                  class="up_top_btn"
                ></svg-icon>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--仪表盘-->
    <el-dialog
      :title="$t('mainPage.instrumentPanel')"
      :visible.sync="showDialog"
      width="1000px"
      top="12vh"
      @close="showDialog = false"
      class="vehicle_instrument_panel dialog_header_close_btn"
    >
      <dash-board
        :vehicleId="dashBoardVehicleId"
        :ifCloseDialog="showDialog"
      ></dash-board>
    </el-dialog>

    <!-- 饼图弹窗 -->
    <transition name="el-zoom-in-right">
      <div class="pie-chart-box type_marker_box_ul" v-if="isShowPieChartBox">
        <div class="chart-title">
          <span>{{ $t('mainPage.monitorPanel') }}</span>
          <svg-icon
            icon-class="iconcloseoriginal fr"
            @click.native="isShowPieChartBox = false"
          ></svg-icon>
        </div>
        <div class="chart-box-out">
          <div class="chart-box border-all">
            <div
              class="chart-title border-bottom"
              style="margin-bottom: 20px"
              >{{ $t('mainPage.vehicleStatusDistribution') }}</div
            >
            <div class="fl">
              <echarts
                :options="options"
                :init-options="initOptions"
                :height="'250px'"
                :width="'400px'"
                ref="echarts"
              ></echarts>
            </div>
            <div class="chart-tab fr">
              <ul class="border-all tab-ul">
                <li
                  v-for="chartTit in titList"
                  :key="chartTit.id"
                  :title="$t(chartTit.name)"
                  class="fl tit-item text-bolder single-row-ellipsis"
                  >{{ $t(chartTit.name) }}</li
                >
              </ul>
              <ul>
                <li
                  class="border-bottom tab-ul"
                  v-for="chartState in stateList"
                  :key="chartState.id + '_chart'"
                  v-show="chartState.id !== 'all' && chartState.id !== 'fault'"
                >
                  <div class="fl tit-item">
                    <div
                      class="color-box fl"
                      :style="{ background: chartState.color }"
                    ></div>
                    <span class="fl">{{ $t(chartState.name) }}</span>
                  </div>
                  <div class="fl tit-item">{{ chartState.ratio }}</div>
                  <div class="fl tit-item">{{ chartState.num }}</div>
                  <div class="fl tit-item">{{ chartState.faultNum }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { debounce } from 'lodash';
import echarts from '@/components/Charts';
import columnPanel from '@/components/ColumnPanel';
import dashBoard from './dashBoard.vue';
import progressBar from '@/components/ProgressBar';
import Service from '@/api/OverseasService';
import detailsPane from './vehicleDetailsPane.vue';
import Clickoutside from '@/directive/clickoutside';
import queryLoading from '@/components/queryLoading';
import Sortable from 'sortablejs';
import {
  formatVehicleEnergyType,
  setUserGridCookie,
  getUserGridCookie,
  formatVehicleName,
  formatEnergyTypeHover,
} from '@/utils';
import { formatVehicleState } from '@/filters';
import Sortable from 'sortablejs';
import { debounce } from 'lodash';

// 数据
const statusCode = ref('noData');
const queryStatus = reactive({
  style: {},
  setQueryStatus: function (status: string) {
    return status;
  },
});
const queryStatusTwo = reactive({
  style: {},
  setQueryStatus: function (status: string) {
    return 'noData';
  },
});
const vehicleTitleList = [
  {
    label: 'mainPage.pileType',
    key: 'energyType',
    unit: '',
    show: true,
    width: 12,
    filter: (val: any) => {
      return formatVehicleEnergyType(val);
    },
  },
  // TODO 其他标题项...
];
const faultTitleList = [
  {
    label: 'mainPage.pileType',
    key: 'energyType',
    unit: '',
    show: true,
    filter: (val: any) => {
      return formatVehicleEnergyType(val);
    },
  },
  // TODO 其他标题项...
];
const tabTitleList = [];
const vehicleInfoList = [];
const dataList = [];
// TODO 其他数据...

// 你的计算属性
const isShowPieChartBox = ref(false); // 是否显示饼图弹窗
// 其他计算属性...

// 响应式的 Props
const props = defineProps({
  nowVehicleId: {
    type: String,
    default: '',
  },
  ifDoFullScreen: {
    type: Boolean,
    default: false,
  },
});

// 自定义过滤器函数
const filterFormat = (val, objTitle, item) => {
  let newVal = '';
  const filter = objTitle.filter;
  if (filter && typeof filter === 'function') {
    newVal = filter(val, item);
  } else {
    newVal = val === undefined || val === null ? '-' : val;
  }
  return newVal;
};

// 计算属性或普通函数来实现过滤功能
const formatType = (val) => {
  return formatVehicleEnergyType(val);
};

const formatHoverContent = (val) => {
  return formatEnergyTypeHover(val);
};

// 计算属性来计算 columnsMenu
const columnsMenu = computed(() => {
  const columns = [];
  vehicleTitleList.value.forEach((item) => {
    if (item.showInList === false || item.actions) {
      return;
    }
    columns.push({
      name: item.key,
      text: item.isFormatLabel === false ? item.label : t(item.label),
      disabled: item.disabled || false,
      show: item.show,
    });
  });
  return columns;
});

// 监听 statusCode 的变化
watch('statusCode', (nv, ov) => {
  queryStatus.setQueryStatus(nv);
});

// 监听 nowVehicleId 的变化
watch('nowVehicleId', (nv, ov) => {
  clickedVehicleId.value = nv;
  if (nv !== '') {
    getClickedVehicleInfo();
  }
});

// 监听 ifDoFullScreen 的变化
watch('ifDoFullScreen', (nv, ov) => {
  vehicleListHeight.value = $('.operatePane_content_box_out').height();
  nextTick(() => {
    resetHeight(true);
  });
});

// 在组件即将被挂载前执行的操作
onBeforeMount(() => {
  // 列表项缓存
  const asseptCookie = getUserGridCookie(
    'vehicleMonitorOperatePane',
    false,
    vehicleTitleList,
    this
  );
  if (asseptCookie) {
    const vehicleModelItem = vehicleTitleList.find(
      (item) => item.key === 'vehicleModelName'
    );
    vehicleModelItem.show = true;
    vehicleTitleList = getUserGridCookie(
      'vehicleMonitorOperatePane',
      true,
      vehicleTitleList,
      this
    );
  }

  addProperty(vehicleTitleList);
  addProperty(faultTitleList);
  tabTitleList.value = vehicleTitleList;
});

// 在组件被挂载后执行的操作
onMounted(() => {
  effectType.value = window.effectType;
  vehicleListHeight.value = $('.operatePane_content_box_out').height();
  columnDrop();
  window.onresize = () => {
    handleResizeNew();
  };
});

// 添加infoContent属性
const addProperty = (data) => {
  data.forEach((item) => {
    if (item.key === 'vehicleName') {
      item.infoContent = stateDescList;
    } else if (item.key === 'drivingRange') {
      item.infoContent = [{ name: 'mainPage.nounExplainOne' }];
    }
  });
};

// 格式化车辆状态
const formatVehicleStateFunc = formatVehicleState;

// 显示车辆状态分布
const isShowPieChartBox = ref(false);
const showPieChartBox = () => {
  isShowPieChartBox.value = true;
  $log && $log({ actionId: 'log.realMonitorPanel', vm: this });
};

// 渲染图表
const options = ref({});
const setEcharts = () => {
  const data = stateList;

  options.value = {
    legend: {
      right: 50,
      top: 80,
      orient: 'vertical',
      itemWidth: 8,
      itemHeight: 8,
      icon: 'circle',
    },
    tooltip: {
      trigger: 'item',
      show: true,
    },
    series: [
      {
        type: 'pie',
        width: '60%',
        height: '90%',
        radius: ['70%', '90%'],
        clockwise: false,
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: { label: { show: false } },
        data: [
          {
            value: data[1].num,
            name: $t(data[1].name),
            itemStyle: { color: data[1].color },
          },
          {
            value: data[2].num,
            name: $t(data[2].name),
            itemStyle: { color: data[2].color },
          },
          {
            value: data[3].num,
            name: $t(data[3].name),
            itemStyle: { color: data[3].color },
          },
          {
            value: data[4].num,
            name: $t(data[4].name),
            itemStyle: { color: data[4].color },
          },
        ],
      },
    ],
  };
};

// 下载右侧车辆列表
const downloadList = () => {
  $log && $log({ actionId: 'log.export', vm: this });

  const fieldsStr = tabTitleList
    .filter((item) => item.key === 'vehicleState' || item.show)
    .map((field) => field.key)
    .join(',');

  const idStr = dataList.map((item) => item.vehicleId).join(',');

  if (!idStr) {
    $messageNew('warning_color', $t('mainPage.noVehicleExport'));
    return false;
  }

  const params = {
    fields: fieldsStr,
    vehicleIds: idStr,
  };

  Service.requestApi('exportV2VehicleListByIds', params)
    .then((res) => {
      if (res.code === 1) {
        if (res.data && res.data.fileUrl) {
          $store.dispatch('downloadFile', res.data.fileUrl);
        } else {
          $MessageNewObj.success($t('mainPage.creatExportTaskSuccess'));
        }
      }
    })
    .catch(() => {
      $notify({
        title: 'error',
        message: $t('mainPage.exportDataError'),
        type: 'error',
        center: true,
        duration: 2000,
        position: 'bottom-right',
      });
    });
};

// 响应式数据
const vehicleListHeight = ref(0);
const ifExpandList = ref(false);
const nowState = ref('all');
const nowWidth = ref(20);
const nowLength = ref(8);
const vehicleTitleList = ref([
  // ... your vehicleTitleList data
]);

// resize 时触发函数
const handleResizeNew = debounce(() => {
  vehicleListHeight.value = $('.operatePane_content_box_out').height();
  nextTick(() => {
    resetHeight(true);
  });
}, 200);

// 计算宽度
const calcWidth = (width) => {
  const num = ifExpandList.value ? 100 : 5;
  const total = vehicleTitleList.value
    .filter((item) => item.showInList !== false && item.show)
    .map((item) => item.width)
    .slice(0, num)
    .reduce((sum, curr) => sum + curr, 0);

  return (width * 100) / total;
};

// 改变 Tab 宽度
const changeTabWidth = () => {
  if (nowState.value === 'fault') {
    nowWidth.value = 20;
  } else {
    if (ifExpandList.value) {
      nowWidth.value = 100 / nowLength.value;
    } else {
      if (nowLength.value < 5) {
        nowWidth.value = 100 / nowLength.value;
      } else {
        nowWidth.value = 20;
      }
    }
  }
};

// 响应式数据
const nowLength = ref(8);
const vehicleTitleList = ref([
  // ... your vehicleTitleList data
]);

// 自定义显示列设置
const handleSettingColumn = (val) => {
  nowLength.value = val.length;
  changeTabWidth();
  const list = [];
  vehicleTitleList.value.forEach((item, index) => {
    if (val.indexOf(item.key) === -1) {
      // 此列被设为隐藏了
      list.push(index);
      item.show = false;
    } else {
      item.show = true;
    }
  });
  tabTitleList.value = vehicleTitleList.value;
  setUserGridCookie(list, 'vehicleMonitorOperatePane', this);
};

// 拖拽函数
const columnDrop = () => {
  nextTick(() => {
    const wrapperTr = document.querySelector('.monitor_operatePane_tit_box');
    if (wrapperTr) {
      const sortable = new Sortable(wrapperTr, {
        animation: 150,
        handle: '.monitor_operatePane_tit_list',
        chosenClass: 'operate-ghost',
        // 拖拽开始
        onStart: (evt) => {},
        // 拖拽结束
        // 列表单元拖放结束后的回调函数
        onEnd: (evt) => {
          const oldIndex = evt.oldIndex - 0;
          const newIndex = evt.newIndex - 0;
          const oldItem = tabTitleList.value[oldIndex];
          const newItem = tabTitleList.value[newIndex];
          let oldColumnIndex;
          let newColumnIndex;
          tabTitleList.value.forEach((item, index) => {
            if (item.key === oldItem.key) {
              oldColumnIndex = index;
            }
            if (item.key === newItem.key) {
              newColumnIndex = index;
            }
          });
          const currList = tabTitleList.value.splice(oldColumnIndex, 1)[0];
          tabTitleList.value.splice(newColumnIndex, 0, currList);
        },
        // 当拖动列表单元时会生成一个副本作为影子单元来模拟被拖动单元排序的情况，
        // 此配置项就是来给这个影子单元添加一个class，
        // 我们可以通过这种方式来给影子元素进行编辑样式
        // dragClass: "hide-ghost",
        forceFallback: true,
      });
    }
  });
};

// 响应式数据
const ifExpandList = ref(false);
const clickedMenuId = ref('');
const showDialog = ref(false);
const dashBoardVehicleId = ref('');
const clickedVehicleId = ref('');
const topVehiclesList = ref([]);

// 排序
const sortListData = (obj, sort) => {
  if (!obj.ifShowSort) {
    return false;
  }
  tabTitleList.value.forEach((item) => {
    if (item.ascDesc) {
      if (item.key === obj.key) {
        item.ascDesc = sort;
      } else {
        item.ascDesc = 'default';
      }
    }
  });

  sortWords.value = sort === 'default' ? '' : obj.key + '|' + sort;
  emit('sort');
};

// 展开列表
const expandList = () => {
  ifExpandList.value = !ifExpandList.value;
  emit('changeWidth', ifExpandList.value);
  changeTabWidth();
};

// 点击打开仪表盘弹窗
const gotoCluster = (vehicleId) => {
  $log && $log({ actionId: 'log.dashboard', vm: this });
  showDialog.value = true;
  clickedMenuId.value = '';
  dashBoardVehicleId.value = vehicleId;
};

// 点击前往车辆档案页面
const gotoDetails = (vehicleId) => {
  $log && $log({ actionId: 'log.hwVehicleDetail', vm: this });
  clickedMenuId.value = '';
  $router.push({
    path: 'hwVehicleDetail',
    query: {
      vehicleId: vehicleId,
    },
  });
};

// 点击置顶当前车辆信息
const upTop = (vehicle) => {
  $log && $log({ actionId: 'log.stickyTop', vm: this });
  if (vehicle.vehicleId === clickedVehicleId.value) {
    closeDetails();
  }
  clickedMenuId.value = '';
  const length = topVehiclesList.value.length;
  if (length === 0) {
    topVehiclesList.value.push(vehicle);
    $nextTick(() => {
      resetHeight(true);
    });
  } else if (length === 1) {
    if (topVehiclesList.value[0].vehicleId !== vehicle.vehicleId) {
      topVehiclesList.value.unshift(vehicle);
      $nextTick(() => {
        resetHeight(true);
      });
    }
  } else if (length === 2) {
    const index = _.findIndex(topVehiclesList.value, (item) => {
      return item.vehicleId === vehicle.vehicleId;
    });
    if (index === -1) {
      topVehiclesList.value.pop();
      topVehiclesList.value.unshift(vehicle);
    }
  }
};


// 取消置顶
const cancelTop = (vehicleId) => {
  topVehiclesList.value = topVehiclesList.value.filter((vehicle) => {
    return vehicle.vehicleId !== vehicleId;
  });
  nextTick(() => {
    resetHeight(false);
  });
};

// 更新置顶车辆信息
const updateUpTopVehicleInfo = () => {
  const list = [];
  if (topVehiclesList.value.length > 0) {
    topVehiclesList.value.forEach((item) => {
      vehicleInfoList.value.forEach((vehicle) => {
        if (vehicle.vehicleId === item.vehicleId) {
          list.push(vehicle);
        }
      });
    });
    topVehiclesList.value = list;
  }
};

// 关闭详情显示
const closeDetails = () => {
  clickedVehicleId.value = '';
  ifShowDetails.value = false;
  nextTick(() => {
    resetHeight(false);
  });
};

// 点击显示当前列菜单操作栏
const showNowMenuList = (vehicleId) => {
  clickedMenuId.value = vehicleId === clickedMenuId.value ? '' : vehicleId;
};

// 点击关闭当前列菜单操作栏
const closeNowMenuList = () => {
  clickedMenuId.value = '';
};

// 选择/取消选择当前列
const seledNowList = (obj) => {
  if (clickedVehicleId.value === '') {
    nextTick(() => {
      resetHeight(true);
    });
  }
  emit('changeVehicle', obj);
  clickedVehicleId.value = obj.vehicleId;
  getClickedVehicleInfo();
};

// 获取点击车辆详情
const getClickedVehicleInfo = () => {
  if (clickedVehicleId.value !== '') {
    const topNowVehicle = topVehiclesList.value.find((item) => {
      return item.vehicleId === clickedVehicleId.value;
    });
    ifShowDetails.value = !topNowVehicle;

    nextTick(() => {
      resetHeight(true);
    });

    const nowVehicle = vehicleInfoList.value.find(
      (item) => item.vehicleId === clickedVehicleId.value
    );
    if (nowVehicle) {
      lastVehicleObj.value = { ...nowVehicle };
      nowVehicleObj.value = nowVehicle;
      faultList.value =
        nowVehicle.vehicleFaultDetail && nowVehicle.vehicleFaultDetail.length > 0
          ? nowVehicle.vehicleFaultDetail
          : [];
    } else {
      ifShowDetails.value = false;
    }
  }
};

// 获取各种状态车辆数量
const getVehicleStateNum = () => {
  const allNum = vehicleInfoList.value.length;
  let runningNum = 0;
  let runFaultNum = 0;
  let stopRuningNum = 0;
  let stopFaultNum = 0;
  let chargingNum = 0;
  let chargeFaultNum = 0;
  let offlineNum = 0;
  let offlineFaultNum = 0;
  let faultNum = 0;
  vehicleInfoList.value.forEach((item) => {
    item.alarmStatus2 - 0 === 1 && faultNum++;
    switch (item.vehicleState) {
      case 4:
        offlineNum++;
        item.alarmStatus2 - 0 === 1 && offlineFaultNum++;
        break;
      case 3:
        chargingNum++;
        item.alarmStatus2 - 0 === 1 && chargeFaultNum++;
        break;
      case 2:
        stopRuningNum++;
        item.alarmStatus2 - 0 === 1 && stopFaultNum++;
        break;
      case 1:
        runningNum++;
        item.alarmStatus2 - 0 === 1 && runFaultNum++;
        break;
    }
  });
  const stateNumArr = [
    allNum,
    runningNum,
    stopRuningNum,
    chargingNum,
    offlineNum,
    faultNum,
  ];
  const stateFaultNumArr = [
    faultNum,
    runFaultNum,
    stopFaultNum,
    chargeFaultNum,
    offlineFaultNum,
    faultNum,
  ];
  stateList.value.forEach((state, index) => {
    state.num = stateNumArr[index];
    state.faultNum = stateFaultNumArr[index];
    const radio = stateNumArr[index] ? (stateNumArr[index] / allNum) * 100 : 0;
    const isDecimalPoint = String(radio).indexOf('.') > -1;
    state.ratio = (!isDecimalPoint ? radio : radio.toFixed(2)) + '%';
  });
  setEcharts();
};

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Service from './your-service-path'; // 请替换成你的服务路径

// 数据
const statusCode = ref('noData');
const vehicleInfoList = ref([]);
const dataList = ref([]);
const sortWords = ref('');

// 获取车辆基本信息
const getVehicleInfoData = (obj) => {
  if (obj.ifResetHeight) {
    if (clickedVehicleId.value !== '') {
      $('.operatePane_content_box_out').height(vehicleListHeight.value);
    }
    clickedVehicleId.value = '';
    ifShowDetails.value = false;
  }
  statusCode.value = 'loading';
  if (!obj.listIds) {
    setTimeout(() => {
      vehicleInfoList.value = [];
      dataList.value = [];
      getVehicleStateNum();
      statusCode.value = 'noData';
    }, 1000);
    return false;
  }
  const params = {
    vehicleIds: obj.listIds,
    orderBy: sortWords.value,
  };
  Service.requestApi('getV2VehicleListByIds', params)
    .then((res) => {
      if (res.code === 1 && res.data && res.data.length > 0) {
        const data = res.data;
        data.forEach((item) => {
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
          item.vehicleName = item.vehicleName ? item.vehicleName : '-';
          item.energyLeft = item.energyLeft ? item.energyLeft : '-';
        });
        vehicleInfoList.value = data;
        statusCode.value = 'loaded';
        getVehicleStateNum();
        changeState(nowState);
        getClickedVehicleInfo();
        updateUpTopVehicleInfo();
        nextTick(() => {
          resetHeight(true);
        });
      } else {
        vehicleInfoList.value = [];
        dataList.value = [];
        statusCode.value = 'noData';
      }
    })
    .catch(() => {
      vehicleInfoList.value = [];
      dataList.value = [];
      statusCode.value = 'noData';
    });
};

// 数据
const nowState = ref('all');
const dataList = ref([]);
const ifShowDetails = ref(false);
const clickedVehicleId = ref('');
const vehicleTitleList = ref([]);
const faultTitleList = ref([]);
const topVehiclesList = ref([]);

// 切换下方显示的车辆列表
const changeState = (val) => {
  nowState.value = val;
  const newList = vehicleInfoList.value;
  let list = [];
  changeTabWidth();
  if (val === 'fault') {
    list = newList.filter((vehicle) => vehicle.alarmStatus2 - 0 === 1);
    tabTitleList.value = faultTitleList.value;
  } else {
    switch (val) {
      case 'all':
        list = newList;
        break;
      case 'driving':
        list = newList.filter((vehicle) => vehicle.vehicleState === 1);
        break;
      case 'stopDriving':
        list = newList.filter((vehicle) => vehicle.vehicleState === 2);
        break;
      case 'charging':
        list = newList.filter((vehicle) => vehicle.vehicleState === 3);
        break;
      case 'offline':
        list = newList.filter((vehicle) => vehicle.vehicleState === 4);
        break;
    }
    tabTitleList.value = vehicleTitleList.value;
  }
  if (list.length === 0) {
    statusCode.value = 'noData';
  } else {
    statusCode.value = 'loaded';
  }
  dataList.value = list;
};

// 置顶或点击详情重新计算车辆列表高度
const resetHeight = (ifShow) => {
  // ifShow: 是显示详情、置顶还是隐藏详情、取消置顶
  const listHeight =
    $('.vehicle_monitoring_box .monitoring_map_out_box .vehile_list_box').height() - 76;
  let length = topVehiclesList.value.length;
  if (ifShowDetails.value) {
    length++;
  }
  let heightInfo = 0;
  if (ifShow) {
    heightInfo = 143;
  } else {
    heightInfo = -143;
  }
  const sumHeight = heightInfo * length;
  const realHeight = listHeight - sumHeight;
  $('.operatePane_content_box_out').height(realHeight);
};

onBeforeUnmount(() => {
  sortable.destroy();
  window.removeEventListener('resize', handleResizeNew);
});
</script>
<style lang="less">
  .vehicle_monitor_operatePane_box {
    position: relative;
    .download-btn {
      position: absolute;
      right: 10px;
      top: -40px;
      cursor: pointer;
      &:hover {
        background: rgba($color: #828ca3, $alpha: 0.2);
      }
    }

    .ml-20 {
      margin-left: 20px;
    }
    .icon-driving {
      color: #026ae3;
    }
    .icon-stop {
      color: #ff9b00;
    }
    .icon-charging {
      color: #8cc63f;
    }
    .icon-offline {
      color: #828ca3;
    }

    .pie-chart-box {
      position: absolute;
      z-index: 99;
      width: 900px;
      height: 100%;
      top: 0;
      right: 0;
      border-radius: 0 6px 6px 0;
      .chart-title {
        height: 40px;
        line-height: 40px;
        text-indent: 15px;
        .svg-icon {
          margin-top: 10px;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .chart-box-out {
        padding: 0 20px 20px;
        height: calc(100% - 40px);
      }
      .chart-box {
        height: 100%;
      }
      .border-all {
        border: 1px solid rgba($color: #828ca3, $alpha: 0.5);
      }
      .border-bottom {
        border-bottom: 1px solid rgba($color: #828ca3, $alpha: 0.5);
      }
      .chart-tab {
        width: calc(100% - 420px);
        margin-right: 20px;
      }
      .tab-ul {
        overflow: hidden;
      }
      .tit-item {
        height: 40px;
        width: 25%;
        line-height: 40px;
        text-indent: 10px;
      }
      .color-box {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: 16px 5px 16px 10px;
      }
    }
    .normal_words {
      font-size: 12px;
      line-height: 20px;
    }
    .show_icon {
      display: block;
    }
    .vehicle_details_info_box {
      width: 100%;
      padding: 10px 20px 0 25px;
      box-sizing: border-box;
      .fault_list_box {
        width: 100%;
        margin-top: 10px;
        .progress_bar_box {
          margin-top: 10px;
          width: 100%;
        }
        .fault_list_item_box {
          width: 100%;
          overflow-y: auto;
          position: relative;
          height: 230px;
          .fault_list_item {
            width: 100%;
            margin-bottom: 10px;
            overflow: hidden;
            .list_item {
              float: left;
              height: 20px;
              width: 30%;
              padding-right: 10px;
              box-sizing: border-box;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &:nth-of-type(1) {
                width: 10%;
              }
            }
          }
        }
      }
    }
    .vehicle_state_fault_box {
      margin-top: 10px;
      width: 100%;
      padding-right: 20px;
      padding-left: 25px;
      box-sizing: border-box;
      overflow: hidden;
      .veicle_state {
        width: calc(16.5% - 10px);
        height: 20px;
        float: left;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 12px;
        border-radius: 2px;
        cursor: pointer;
        &:last-of-type {
          margin-right: 0;
        }
        .veicle_state_icon {
          float: left;
          font-size: 20px;
          margin-right: 5px;
        }
        .veicle_state_img {
          float: left;
          display: block;
          width: 20px;
          margin-right: 5px;
        }
        .veicle_state_num {
          float: left;
        }
        &:hover {
          background: rgba(130, 140, 163, 0.2);
        }
      }
    }
    .monitor_operatePane_tit_box {
      width: 100%;
      height: 42px;
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      margin-bottom: 5px;
      padding: 0 40px 5px 25px;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(130, 140, 163, 0.4);
      .monitor_operatePane_tit_list {
        width: 20%;
        float: left;
        overflow: hidden;
        padding: 0 10px;
        box-sizing: border-box;
        position: relative;
        .sort_btn_box {
          height: 16px;
          width: 16px;
          display: none;
        }
        .content_titName {
          margin-top: 16px;
          overflow: hidden;
          .content_title_name {
            display: block;
            float: left;
            font-weight: bolder;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        &:hover {
          .sort_btn_box {
            display: block;
          }
          .content_titName {
            margin-top: 0px;
          }
        }
      }
    }
    .operatePane_content_box_out {
      width: 100%;
      height: calc(100% - 76px);
      padding-left: 25px;
      box-sizing: border-box;
      position: relative;
    }
    .operatePane_content_box {
      width: 100%;
      padding-right: 20px;
      height: 100%;
      overflow-y: auto;
      .list_single {
        width: 100%;
        padding-right: 20px;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 10px;
        cursor: pointer;
        &:hover {
          background: rgba(130, 140, 163, 0.2);
        }
        .vehicle_base_info_box {
          width: 100%;
          height: 20px;
          overflow: hidden;
          white-space: nowrap;
          .vehicle_base_info {
            width: 20%;
            padding-left: 10px;
            box-sizing: border-box;
            float: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .progress_bar_box_list {
          width: 100%;
          margin-top: 3px;
        }
        .operat_menu_out_box {
          position: relative;
          z-index: 9;
          .operat_menu_box {
            height: 30px;
            position: absolute;
            top: 6px;
            right: 10px;
            padding: 0 5px;
            overflow: hidden;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
            border-radius: 3px;
            .operat_menu {
              float: left;
              width: 80px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-top: 3px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              &:hover {
                background: rgba(130, 140, 163, 0.3);
              }
            }
            .operat_menu_line {
              float: left;
              width: 1px;
              height: 20px;
              background: #828ca3;
              margin: 5px 5px;
            }
            .operat_menu_btn {
              width: 24px;
              height: 24px;
              margin-top: 3px;
              float: left;
              text-align: center;
              &:hover {
                background: rgba(130, 140, 163, 0.3);
              }
              .up_top_btn {
                line-height: 24px;
              }
            }
          }
        }
      }
      .active_list {
        background: rgba(130, 140, 163, 0.2);
      }
    }
    .fold_expand_btn {
      position: absolute;
      width: 16px;
      height: 16px;
      line-height: 16px;
      cursor: pointer;
      &:hover {
        background: rgba(130, 140, 163, 0.2);
      }
    }
    .handle_column_box {
      position: absolute;
      top: 16px;
      right: 20px;
    }
  }
</style>
