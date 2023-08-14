<template>
  <div class="dash_board_box">
    <query-loading :queryConfig="queryStatus" style="height: 400px"></query-loading>

    <!-- 第一部分 -->
    <div class="board_one_box" v-if="statusCode === 'loaded'">
      <div class="one_name_time">
        <div class="common_words" :style="{ 'font-weight': 'bold' }">{{ dashBoardVehicleInfo.vehicleName }}</div>
        <div class="common_words">{{ reportTime }}</div>
      </div>

      <div class="light_list_box">
        <div class="light_list_item" v-for="(light, key) in lightList" :key="key" :title="light.name">
          <svg-icon :icon-class="light.icon" :class="light.state && 'active_light'" style="font-size: 20px" />
          <span v-if="light.value">{{ light.value }}</span>
        </div>
      </div>

      <div class="one_fault_info_box" v-if="dashBoardVehicleInfo.isShowFaultMessage === 1 && dashBoardVehicleInfo.faultLightDTOS.length > 0">
        <div class="one_fault_info" v-for="fault in faultIconList" :key="fault.id" v-if="fault.show">
          <svg-icon :icon-class="fault.icon" class="one_fault_icon" :style="{ color: fault.color }" />
          <ul class="one_fault_name_hover common_words">
            <li v-for="(name, index) in Array.from(new Set(fault.faultNameList))" :key="index">
              <span class="dian"></span>
              {{ name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 第二部分 -->
    <div class="board_two_box" v-if="statusCode === 'loaded'">
      <div class="board_two_left">
        <echarts :options="speedOptions" height="250px" width="250px" :title="$t('mainPage.vehicleSpeed')" />
        <!-- ...其他内容 ... -->
      </div>
      <div class="board_two_middle">
        <!-- ...其他内容 ... -->
      </div>
      <div class="board_two_left">
        <echarts v-if="judgeVehicleType(dashBoardVehicleInfo.powerType) === 'E'" :options="insEleConsumOptions" height="250px" width="250px" :title="$t('mainPage.InstantaneEleConsum')" />
        <!-- ...其他内容 ... -->
      </div>
    </div>

    <!-- 第五部分 -->
    <div class="board_five_box" v-if="dashBoardVehicleInfo.isShowFaultMessage === 1 && suggesstionList.length > 0 && statusCode === 'loaded'">
      <div class="five_suggest_box">
        <ul class="five_fault_suggesstion_box">
          <li class="five_fault_suggesstion common_words" v-for="(suggestion, inx) in suggesstionList" :key="inx" :title="suggestion">
            <svg-icon icon-class="icondot-solid" class="five_fault_icon" />
            <span>{{ suggestion }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 第三部分 -->
    <div class="board_three_box" v-if="statusCode === 'loaded'">
      <div class="board_three_item" v-for="chart in chartList" :key="chart.id">
        <div class="board_three_left_chart">
          <echarts :options="chart.options" height="100px" width="100px" />
          <svg-icon :icon-class="chart.icon" class="three_chart_icon" />
        </div>
        <div class="board_three_right_text">
          <div class="common_words three_value_name">{{ chart.value }}{{ chart.unit }}</div>
          <div class="common_words three_value_name" :title="$t(chart.name)">{{ $t(chart.name) }}</div>
        </div>
      </div>
    </div>

    <!-- 第四部分 -->
    <div class="board_four_box" v-if="judgeVehicleType(dashBoardVehicleInfo.powerType) === 'E' && statusCode === 'loaded'">
      <div class="board_four_item" v-for="motor in motorInfoList" :key="motor.id">
        <span class="common_words" :title="$t(motor.name)">{{ $t(motor.name) }}</span>
        <span class="common_words">{{ dashBoardVehicleInfo[motor.id] | filterFormat(motor) }}</span>
        <span class="common_words">{{ motor.unit }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted, onBeforeUnmount } from 'vue'; // 导入Vue 3相关库
import queryLoading from '@/components/queryLoading.vue'; // 导入查询加载组件
import echarts from '@/components/Charts.vue'; // 导入echarts组件
import Service from '@/api/OverseasService.ts'; // 导入服务
import { mainMotorStateName, textFormat } from '@/filters'; // 导入过滤器
import { judgeVehicleType } from '@/utils'; // 导入工具函数

// 定义组件属性
const props = defineProps({
  vehicleId: {
    type: String,
    default: '',
  },
  ifCloseDialog: {
    type: Boolean,
    default: false,
  },
});

// 数据响应式定义
const statusCode = ref('noData'); // 响应式状态：查询状态码
const queryStatus = {
  style: {}, // 查询状态样式对象
  setQueryStatus(status) {
    return status;
  },
};

// 故障信号指示灯数据数组
const faultIconList = [
  {
            id: 'ecasRedLight',
            icon: 'iconECAS',
            color: '#FF0000',
            show: true,
            faultNameList: [],
          },
          {
            id: 'ecasYellowLight',
            icon: 'iconECAS',
            color: '#FFD100',
            show: true,
            faultNameList: [],
          },
          {
            id: 'ebsRedLight',
            icon: 'iconEBs',
            color: '#FF0000',
            show: true,
            faultNameList: [],
          },
          {
            id: 'ebsYellowLight',
            icon: 'iconEBs',
            color: '#FFD100',
            show: true,
            faultNameList: [],
          },
          {
            id: 'escLight',
            icon: 'iconESC',
            color: '#FFD100',
            show: true,
            faultNameList: [],
          },
];

const nowVehicleId = ref(''); // 当前车辆id

const energyLeft = ref(0); // 能源余量
const motorInfoList = [
  {
            id: 'mainMotorState',
            name: 'mainPage.motorState',
            unit: '',
            filter: (val) => {
              return mainMotorStateName(val);
            },
          },
          {
            id: 'mainMotorVoltage',
            name: 'mainPage.motorVoltage',
            unit: 'V',
          },
          {
            id: 'mainMotorCurrent',
            name: 'mainPage.motorCurrent',
            unit: 'A',
          },
];

const chartList = [
  {
            id: 'one_chart',
            name: 'mainPage.voltage24V',
            value: 0,
            unit: 'V',
            icon: 'iconxudianchidianya',
            options: {},
          },
          {
            id: 'two_chart',
            name: 'mainPage.mainMotorTemp',
            value: 0,
            unit: '℃',
            icon: 'iconlengqueyewendu',
            options: {},
          },
          {
            id: 'three_chart',
            name: 'mainPage.mainMotorRotate',
            value: 0,
            unit: 'r/min',
            icon: 'iconengineSpeed',
            options: {},
          },
];

const rightChartShowValue = ref(0); // 右侧图表显示值
const rightChartShowName = ref(''); // 右侧图表显示名称
const frontPressureOption = ref({}); // 前制动气压图表配置
const backPressureOption = ref({}); // 后制动气压图表配置
const dashBoardVehicleInfo = ref({}); // 仪表盘车辆信息
const speedOptions = ref({}); // 车速图表配置
const oilEchartsOptions = ref({}); // 剩余油量图表配置
const insEleConsumOptions = ref({}); // 瞬时电耗图表配置
const engineSpeedOptions = ref({}); // 发动机转速图表配置
const intervalTimer = ref(null); // 定时器
const settingTime = 20 * 1000; // 定时器时间间隔
const reportTime = ref(''); // 当前时间
const suggesstionList = ref([]); // 故障建议列表
const faultNameList = ref([]); // 故障名称列表
const scrollTimer = ref(null); // 滚动定时器
const chartColor = '#fff'; // 图表颜色
const effectType = 'dark'; // el-tooltip提示语背景色模式--dark/light

// 定义车辆信息过滤器
const vehicleInfoFilters = {
  filterFormat(val, obj) {
    let newVal = '';
    const filter = obj.filter;
    if (filter && typeof filter === 'function') {
      newVal = filter(val);
    } else {
      if (val) {
        newVal = val;
      } else {
        newVal = '-';
      }
    }
    return newVal;
  },
  formatGear(val) {
        val = val === 0 ? 0 : val || -1;
        let newVal = '';
        switch (val) {
          case 0:
            newVal = 'N';
            break;
          case 1:
            newVal = 'D';
            break;
          case 2:
            newVal = 'R';
            break;
          case 3:
            newVal = 'L';
            break;
          case -1:
            newVal = '';
            break;
        }
        return newVal;
      },
};

// 定义计算属性
const noOffline = computed(() => {
  const { vehicleState } = dashBoardVehicleInfo.value;
  return vehicleState !== 4;
});

const lightList = computed(() => {
  // 解构对象属性
  const {
    highBeam,
    lowBeam,
    frontFogLamp,
    backFogLamp,
    midDoor,
    parking,
    acCoolingSwitch,
    acHeatingSwitch,
    acOutsideTemp,
    acIntsideTemp,
    vehicleState,
  } = dashBoardVehicleInfo.value;

  // 判断车辆状态是否为非离线状态
  const noOffline = vehicleState !== 4;

  // 获取对应的国际化字符串
  const accCoolName = this.$t(
    (acCoolingSwitch && 'mainPage.airCoolOn') || 'mainPage.airCoolOff'
  );
  const accHeatName = this.$t(
    (acHeatingSwitch && 'mainPage.airHeatOn') || 'mainPage.airHeatOff'
  );

  // 处理室外温度值
  const acOutValue =
    this._.isNil(acOutsideTemp) || !noOffline
      ? ''
      : `${acOutsideTemp}${this.$t('mainPage.tempUnit')}`;
  const accOutName = `${this.$t('mainPage.outVehicleTwo')}：${
    acOutValue || '-'
  }`;

  // 处理室内温度值
  const acInValue =
    this._.isNil(acIntsideTemp) || !noOffline
      ? ''
      : `${textFormat(acIntsideTemp)}${this.$t('mainPage.tempUnit')}`;
  const accInName = `${this.$t('mainPage.inVehicleTwo')}：${
    acInValue || '-'
  }`;

  return [
    {
      name: this.$t('mainPage.longDisLight'),
      icon: 'iconyuanguangdeng',
      state: highBeam === 1 && noOffline,
    },
    // ... 其他车辆灯、门、驻车信号灯项
  ];
});

// 定义监视器
watch(
  () => vehicleId,
  (nv, ov) => {
    nowVehicleId.value = nv;
  }
);

watch(
  () => statusCode,
  (nv, ov) => {
    queryStatus.setQueryStatus(nv);
  }
);

watch(
  () => ifCloseDialog,
  (nv, ov) => {
    if (!nv) {
      clearTimer();
    } else {
      openTimer();
    }
  }
);

// 合并created和mounted逻辑到onMounted
onMounted(() => {
  const nowTheme = localStorage.getItem('userTheme');
  if (nowTheme === 'black') {
    chartColor.value = '#ffffff';
  } else {
    chartColor.value = '#17181c';
  }

  effectType.value = window.effectType;
  if (vehicleId.value) {
    nowVehicleId.value = vehicleId.value;
    openTimer();
  }
  initChart(); // 假设initChart是一个初始化图表的函数
});

// 清除定时器
const clearTimer = () => {
  if (intervalTimer.value) {
    clearInterval(intervalTimer.value);
    intervalTimer.value = null;
  }
  clearTimerTwo();
};

// 清除定时器2
const clearTimerTwo = () => {
  if (scrollTimer.value) {
    clearInterval(scrollTimer.value);
    scrollTimer.value = null;
  }
};

// 开启定时器
const openTimer = () => {
  clearTimer();
  getPcVehicleRealTimeInfo();
  intervalTimer.value = setInterval(() => {
    getPcVehicleRealTimeInfo();
  }, settingTime.value);
};

// 开启定时器2
const openTimerTwo = () => {
  clearTimerTwo();
  scrollTimer.value = setInterval(() => {
    $('.five_fault_suggesstion_box').animate(
      {
        top: '-20px',
      },
      500,
      function () {
        $('.five_fault_suggesstion_box').css({ top: '0px' });
        const li = $('.five_fault_suggesstion_box')
          .children()
          .first()
          .clone();
        $('.five_fault_suggesstion_box').append(li);
        $('.five_fault_suggesstion_box li:first').remove();
      }
    );
  }, 2000);
};

// 初始化图表
const initChart = () => {
  // 车速图表options
  speedOptions.value = {
    series: [
            {
              name: '仪表圈',
              type: 'gauge',
              pointer: {
                show: false,
              },
              radius: '100%',
              min: 0,
              max: 140,
              splitNumber: 10,
              splitLine: {
                // 分隔线样式
                length: 15,
                // lineStyle: {
                //   color: '#828CA3'
                // },
                distance: 15,
                show: true,
              },
              axisLabel: {
                // 刻度标签
                show: true,
                color: '#828CA3',
                distance: 15,
              },
              axisTick: {
                // 刻度样式
                show: false,
                splitNumber: 2,
                lineStyle: {
                  color: '#828CA3',
                },
              },
              detail: {
                fontFamily: 'Montserrat-Regular',
                fontSize: 60,
                color: this.chartColor,
                offsetCenter: [0, 0],
              },
              title: {
                fontSize: 12,
                color: '#828CA3',
                // fontFamily: 'Heebo-Medium',
                offsetCenter: [0, '35%'],
              },
              axisLine: {
                lineStyle: {
                  color: [
                    [0 / 140, '#828CA3'],
                    [1, '#828CA3'],
                  ],
                  width: 4,
                },
              },
              data: [
                {
                  value: 0,
                  name: 'km/h',
                },
              ],
            },
          ],
  };

  // 蓄电池电压图表options
  powerSupplyVolt24VChart.value = {
   series: [
            {
              name: '背景圈',
              type: 'gauge',
              min: 0,
              max: 32,
              pointer: {
                show: false,
              },
              itemStyle: {
                color: '#8cc63f',
              },
              radius: '100%',
              startAngle: 270,
              endAngle: -89.9,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: [
                    [0, '#8cc63f'],
                    [1, '#828ca3'],
                  ],
                  width: 5,
                },
              },
              splitLine: {
                // 分隔线样式
                show: false,
              },
              axisLabel: {
                // 刻度标签
                show: false,
              },
              axisTick: {
                // 刻度样式
                show: false,
              },
              detail: {
                show: false,
                // fontFamily: 'Heebo-Medium',
                fontSize: 12,
                color: '#37394C',
                offsetCenter: [0, '0%'],
              },
              data: [
                {
                  value: 0,
                  name: '',
                },
              ],
            },
          ],
		  // 发动机转速图表options
        this.engineSpeedOptions = {
          series: [
            {
              name: '电力仪表圈',
              type: 'gauge',
              pointer: {
                show: false,
              },
              radius: '100%',
              min: 0,
              max: 35,
              splitNumber: 7,
              startAngle: 225,
              endAngle: -45,
              splitLine: {
                length: 15,
                // 分隔线样式
                // lineStyle: {
                //   color: '#828CA3'
                // }
              },
              axisLabel: {
                // 刻度标签
                color: '#828CA3',
              },
              axisTick: {
                // 刻度样式
                splitNumber: 1,
              },
              title: {
                fontSize: 12,
                color: '#828CA3',
                // fontFamily: 'Heebo-Medium',
                offsetCenter: [0, '35%'],
              },
              detail: {
                fontFamily: 'Montserrat-Regular',
                fontSize: 60,
                color: this.chartColor,
                offsetCenter: [0, 0],
              },
              axisLine: {
                lineStyle: {
                  color: [
                    [0 / 35, '#8cc63f'],
                    [1, '#828CA3'],
                  ],
                  width: 4,
                },
              },
              data: [
                {
                  value: 0,
                  name: '×100r/min',
                },
              ],
            },
          ],
        };
        // 前制动气压
        this.frontPressureOption = {
          series: [
            {
              name: '背景圈',
              type: 'gauge',
              min: 0,
              max: 900,
              pointer: {
                show: false,
              },
              itemStyle: {
                color: '#8cc63f',
              },
              radius: '100%',
              startAngle: 270,
              endAngle: -89.9,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: [
                    [0, '#8cc63f'],
                    [1, '#828CA3'],
                  ],
                  width: 4,
                },
              },
              splitLine: {
                // 分隔线样式
                show: false,
              },
              axisLabel: {
                // 刻度标签
                show: false,
              },
              axisTick: {
                // 刻度样式
                show: false,
              },
              detail: {
                show: false,
              },
            },
          ],
        };
        // 后制动气压
        this.backPressureOption = {
          series: [
            {
              name: '背景圈',
              type: 'gauge',
              min: 0,
              max: 900,
              pointer: {
                show: false,
              },
              itemStyle: {
                color: '#8cc63f',
              },
              radius: '100%',
              startAngle: 270,
              endAngle: -89.9,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: [
                    [0, '#8cc63f'],
                    [1, '#828CA3'],
                  ],
                  width: 4,
                },
              },
              splitLine: {
                // 分隔线样式
                show: false,
              },
              axisLabel: {
                // 刻度标签
                show: false,
              },
              axisTick: {
                // 刻度样式
                show: false,
              },
              detail: {
                show: false,
              },
            },
          ],
        };
        // 冷却液温度图表options
        this.coolantTempEcharts = {
          series: [
            {
              name: '背景圈',
              type: 'gauge',
              min: 0,
              max: 120,
              pointer: {
                show: false,
              },
              itemStyle: {
                color: '#8cc63f',
              },
              radius: '100%',
              startAngle: 270,
              endAngle: -89.9,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: [
                    [0, '#8cc63f'],
                    [1, '#828CA3'],
                  ],
                  width: 4,
                },
              },
              splitLine: {
                // 分隔线样式
                show: false,
              },
              axisLabel: {
                // 刻度标签
                show: false,
              },
              axisTick: {
                // 刻度样式
                show: false,
              },
              detail: {
                show: false,
              },
            },
          ],
        };
        // 机油压力图表options
        this.OilPressureEcharts = {
          series: [
            {
              name: '背景圈',
              type: 'gauge',
              min: 0,
              max: 1000,
              pointer: {
                show: false,
              },
              itemStyle: {
                color: '#8cc63f',
              },
              radius: '100%',
              startAngle: 270,
              endAngle: -89.9,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: [
                    [0, '#8cc63f'],
                    [1, '#828CA3'],
                  ],
                  width: 4,
                },
              },
              splitLine: {
                // 分隔线样式
                show: false,
              },
              axisLabel: {
                // 刻度标签
                show: false,
              },
              axisTick: {
                // 刻度样式
                show: false,
              },
              detail: {
                show: false,
              },
            },
          ],
        };
        // 剩余油量图表options
        this.oilEchartsOptions = {
          series: [
            {
              name: '仪表圈',
              type: 'gauge',
              pointer: {
                show: false,
              },
              radius: '100%',
              min: 0,
              max: 1,
              startAngle: 125,
              endAngle: 55,
              splitNumber: 2,
              splitLine: {
                // 分隔线样式
                length: 15,
                show: true,
                // lineStyle: {
                //   color: '#828CA3'
                // }
              },
              axisLine: {
                lineStyle: {
                  color: [
                    [0, '#8cc63F'],
                    [1, '#828CA3'],
                  ],
                  width: 4,
                },
              },
              axisLabel: {
                // 刻度标签
                color: '#828CA3',
              },
              axisTick: {
                // 刻度样式
                show: true,
                splitNumber: 2,
                lineStyle: {
                  color: '#828CA3',
                },
              },
              detail: {
                show: false,
              },
            },
          ],
        };
        // 瞬时电耗图表Optioins
        this.insEleConsumOptions = {
          series: [
            {
              name: '电力仪表圈',
              type: 'gauge',
              pointer: {
                show: false,
              },
              radius: '100%',
              min: 0,
              max: 50,
              splitNumber: 5,
              startAngle: 90,
              splitLine: {
                length: 15,
              },
              axisLabel: {
                // 刻度标签
                color: '#828CA3',
              },
              axisTick: {
                // 刻度样式
                show: false,
              },
              title: {
                fontSize: 12,
                color: '#828CA3',
                // fontFamily: 'Heebo-Medium',
                offsetCenter: [0, '35%'],
              },
              detail: {
                fontFamily: 'Montserrat-Regular',
                fontSize: 60,
                show: true,
                color: this.chartColor,
                offsetCenter: [0, 0],
              },
              axisLine: {
                lineStyle: {
                  color: [
                    [0 / 50, '#8cc63f'],
                    [1, '#828CA3'],
                  ],
                  width: 4,
                },
              },
              data: [
                {
                  value: 0,
                  name: 'kW·h/km',
                },
              ],
            },
            {
              name: '电力仪表圈',
              type: 'gauge',
              pointer: {
                show: false,
              },
              radius: '100%',
              min: -50,
              max: 0,
              splitNumber: 5,
              startAngle: 90,
              endAngle: 225,
              clockwise: false,
              splitLine: {
                length: 15,
                // 分隔线样式
                // lineStyle: {
                //   color: '#828CA3'
                // }
              },
              axisLabel: {
                // 刻度标签
                color: '#828CA3',
              },
              axisTick: {
                // 刻度样式
                show: false,
              },
              title: {
                fontSize: 12,
                color: '#828CA3',
                // fontFamily: 'Heebo-Medium',
                offsetCenter: [0, '30%'],
              },
              detail: {
                fontFamily: 'Montserrat-Regular',
                fontSize: 60,
                color: this.chartColor,
                offsetCenter: [0, 0],
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: [
                    [0 / 50, '#8cc63f'],
                    [1, '#828CA3'],
                  ],
                  width: 4,
                },
              },
              data: [
                {
                  value: 0,
                  name: '',
                },
              ],
            },
          ],
        };
        // 主电机温度图表options
        this.mainMotorTempChart = {
          series: [
            {
              name: '背景圈',
              type: 'gauge',
              min: 0,
              max: 150,
              pointer: {
                show: false,
              },
              itemStyle: {
                color: '#8cc63f',
              },
              radius: '100%',
              startAngle: 270,
              endAngle: -89.9,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: [
                    [0, '#8cc63f'],
                    [1, '#828CA3'],
                  ],
                  width: 4,
                },
              },
              splitLine: {
                // 分隔线样式
                show: false,
              },
              axisLabel: {
                // 刻度标签
                show: false,
              },
              axisTick: {
                // 刻度样式
                show: false,
              },
              detail: {
                show: false,
                // fontFamily: 'Heebo-Medium',
                fontSize: 12,
                color: '#828CA3',
                offsetCenter: [0, '0%'],
              },
              data: [
                {
                  value: 0,
                  name: '',
                },
              ],
            },
          ],
        };
        // 主电机转速图表options
        this.mainMotorSpeedChart = {
          series: [
            {
              name: '仪表圈',
              type: 'gauge',
              min: 0,
              max: 3500,
              pointer: {
                show: false,
              },
              itemStyle: {
                color: '#8cc63f',
              },
              radius: '100%',
              startAngle: 270,
              endAngle: -89.9,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: [
                    [0, '#8cc63f'],
                    [1, '#828CA3'],
                  ],
                  width: 4,
                },
              },
              splitLine: {
                // 分隔线样式
                show: false,
              },
              axisLabel: {
                // 刻度标签
                show: false,
              },
              axisTick: {
                // 刻度样式
                show: false,
              },
              detail: {
                show: false,
                // fontFamily: 'Heebo-Medium',
                fontSize: 12,
                color: '#828CA3',
                offsetCenter: [0, '0%'],
              },
              data: [
                {
                  value: 0,
                  name: '',
                },
              ],
            },
          ],
        };
  };
};

// 处理故障灯信息
const handleFaultLight = () => {
  suggesstionList.value = [];
  faultNameList.value = [];
  faultIconList.value.forEach((fault) => {
    fault.show = false;
    fault.faultNameList = [];
  });

  const data = dashBoardVehicleInfo.value.faultLightDTOS;

  if (data && data.length > 0) {
    data.forEach((item) => {
      if (item.suggest) {
        suggesstionList.value.push(item.suggest);
      }

      faultIconList.value.forEach((faultIcon) => {
        if (item[faultIcon.id] === 1) {
          faultIcon.show = true;

          if (item.faultName) {
            faultIcon.faultNameList.push(item.faultName);
          }
        }
      });
    });

    if (suggesstionList.value.length > 1) {
      openTimerTwo();
    }
  }
};

// 仪表盘接口请求
const getPcVehicleRealTimeInfo = async () => {
  statusCode.value = 'loading';
  reportTime.value = moment().format('YYYY-MM-DD HH:mm:ss');

  try {
    const res = await Service.requestApi('getPcVehicleRealTimeInfo', {
      vehicleId: nowVehicleId.value,
    });

    if (res.code === 1) {
      const data = res.data;

      if (data.onlineState === 'Offline') {
		  data.speed = 0;
		  data.engineSpeed = 0;
		  data.instantFuelConsumption = 0;
		  data.instPowerConsumption = 0;
		  data.frontBrakePressure = '-';
		  data.backBrakePressure = '-';
		  data.powerSupplyVolt24V = '-';
		  data.mainMotorTemp = '-';
		  data.mainMotorRev = '-';
		  data.engineWaterTemp = '-';
		  data.engineOilPressure = '-';
		  data.mainMotorVoltage = '-';
		  data.mainMotorCurrent = '-';
		} else {
		  // 在线状态下的处理
		  data.engineWaterTemp = data.engineWaterTemp ?? 0;
		  data.engineOilPressure = data.engineOilPressure ?? 0;
		  data.mainMotorTemp = data.mainMotorTemp ?? 0;
		  data.mainMotorRev = data.mainMotorRev ?? 0;

		  // 处理24V蓄电池电压
		  let voltageValue = parseFloat(data.powerSupplyVolt24V);
		  if (isNaN(voltageValue) || voltageValue == null) {
			voltageValue = 0;
			data.powerSupplyVolt24V = '-';
		  } else {
			// 根据电压值设置颜色
			// ...
		  }
		  powerSupplyVolt24VChartOptions.series[0].data[0].value = voltageValue;
		  // ...

		  // 处理车速
		  let speedValue = parseFloat(data.speed);
		  if (isNaN(speedValue) || speedValue < 0) {
			speedValue = 0;
		  } else if (speedValue > 140) {
			speedValue = 140;
		  } else {
			speedValue = Math.round(speedValue * 10) / 10;
		  }
		  speedOptions.series[0].data[0].value = speedValue;
		  // ...
		}

      // 更新数据和图表
      dashBoardVehicleInfo.value = data;
      handleFaultLight();
      statusCode.value = 'loaded';
    }
  } catch (error) {
    // 处理请求错误
    $messageNew('warning_color', error.msg);
    statusCode.value = 'noData';
  }
};

const formatName = (name: any, state: any):string => {
        if (Array.isArray(name)) {
          return this.$t(name[state || 0]);
        }
        return this.$t(name);
      },

// 在组件设置函数内使用 onBeforeUnmount 钩子
onBeforeUnmount(() => {
  clearTimer();
});
</script>
