<template>
  <div class="dash_board_box">
    <query-loading
      :queryConfig="queryStatus"
      style="height: 400px"
    ></query-loading>
    <!-- 第一部分---名称、时间、灯 -->
    <div class="board_one_box" v-show="statusCode === 'loaded'">
      <div class="one_name_time">
        <!-- 名称 -->
        <div class="common_words" :style="{ 'font-weight': 'bold' }">{{
          dashBoardVehicleInfo.vehicleName
        }}</div>
        <!-- 上报时间 -->
        <div class="common_words">{{ reportTime }}</div>
      </div>
      <!-- 灯组 -->
      <div class="light_list_box">
        <div
          class="light_list_item"
          v-for="(light, key) in lightList"
          :key="key"
          :title="light.name"
        >
          <svg-icon
            :icon-class="light.icon"
            :class="light.state && 'active_light'"
            style="font-size: 20px"
          />
          <span v-if="light.value">{{ light.value }}</span>
        </div>
      </div>
      <!-- 故障信号指示灯组 -->
      <div
        class="one_fault_info_box"
        v-show="
          dashBoardVehicleInfo.isShowFaultMessage === 1 &&
          dashBoardVehicleInfo.faultLightDTOS.length > 0
        "
      >
        <div
          class="one_fault_info"
          v-for="fault in faultIconList"
          :key="fault.id"
          v-show="fault.show"
        >
          <svg-icon
            :icon-class="fault.icon"
            class="one_fault_icon"
            :style="{ color: fault.color }"
          ></svg-icon>
          <ul class="one_fault_name_hover common_words">
            <li
              v-for="(name, index) in Array.from(new Set(fault.faultNameList))"
              :key="index"
            >
              <span class="dian"></span>
              {{ name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--第二部分---左转右转、里程、累计能耗、剩余电量/油量-->
    <div class="board_two_box" v-show="statusCode === 'loaded'">
      <!--车速-->
      <div class="board_two_left">
        <!-- 车速 -->
        <echarts
          :options="speedOptions"
          height="250px"
          width="250px"
          :title="$t('mainPage.vehicleSpeed')"
        ></echarts>
        <div class="border_two_value_box">
          <div class="common_words border_two_value_number"
            >{{ dashBoardVehicleInfo.totalMileage }}km</div
          >
          <div
            v-if="judgeVehicleType(dashBoardVehicleInfo.powerType) === 'E'"
            :title="$t('mainPage.allMileage')"
            class="common_words"
            >{{ $t('mainPage.allMileage') }}</div
          >
          <div
            v-if="judgeVehicleType(dashBoardVehicleInfo.powerType) === 'F'"
            :title="$t('mainPage.distanceMileage')"
            class="common_words"
            >{{ $t('mainPage.distanceMileage') }}</div
          >
        </div>
      </div>
      <div class="board_two_middle">
        <div class="board_two_middle_top">
          <span :title="$t('mainPage.trunLeftLight')">
            <svg-icon
              icon-class="iconzuozhuan"
              :class="{
                active_turnleftright_light:
                  dashBoardVehicleInfo.leftTurnLight === 1 && noOffline,
              }"
              style="font-size: 20px"
            ></svg-icon>
          </span>
          <span>{{
            dashBoardVehicleInfo.vehicleState | vehicleStateName
          }}</span>
          <span :title="$t('mainPage.trunRightLight')">
            <svg-icon
              icon-class="iconyouzhuan"
              :class="{
                active_turnleftright_light:
                  dashBoardVehicleInfo.rightTurnLight === 1 && noOffline,
              }"
              style="font-size: 20px"
            ></svg-icon>
          </span>
        </div>
        <div class="board_two_middle_bottom">
          <div
            class="common_words two_middle_energyLeft"
            style="margin-top: 20px"
            >{{ energyLeft + '%' }}</div
          >
          <div
            class="common_words two_middle_energyLeft"
            style="margin-bottom: 20px"
          >
            <span
              v-if="judgeVehicleType(dashBoardVehicleInfo.powerType) === 'E'"
              >{{ 'SOC' }}</span
            >
            <span
              v-if="judgeVehicleType(dashBoardVehicleInfo.powerType) === 'F'"
              >{{ 'Oil' }}</span
            >
          </div>
          <!-- 电车显示 -->
          <div
            class="two_middle_chart_box"
            v-if="judgeVehicleType(dashBoardVehicleInfo.powerType) === 'E'"
          >
            <div class="battery_back_box">
              <div class="two_battery_back_top"></div>
              <div class="two_battery_back_mid"></div>
              <div
                class="two_battery_back_line"
                :style="{
                  height:
                    energyLeft === 0
                      ? '0px'
                      : (energyLeft * 84) / 100 + 3 + 'px',
                }"
              ></div>
              <div
                class="two_battery_back_front"
                :style="{ height: (energyLeft * 84) / 100 + 'px' }"
              ></div>
              <div class="two_battery_back_right common_words">{{
                dashBoardVehicleInfo.gear | formatGear
              }}</div>
            </div>
          </div>
          <!-- 油车显示 -->
          <div
            class="two_middle_chart_box"
            v-if="judgeVehicleType(dashBoardVehicleInfo.powerType) === 'F'"
          >
            <echarts
              :options="oilEchartsOptions"
              height="150px"
              width="150px"
              :title="$t('mainPage.oilLeft')"
            ></echarts>
            <svg-icon icon-class="iconyouliang" class="oil_icon"></svg-icon>
          </div>
        </div>
      </div>
      <div class="board_two_left">
        <!--电车---瞬时电耗-->
        <echarts
          v-if="judgeVehicleType(dashBoardVehicleInfo.powerType) === 'E'"
          :options="insEleConsumOptions"
          height="250px"
          width="250px"
          :title="$t('mainPage.InstantaneEleConsum')"
        ></echarts>
        <el-tooltip
          v-if="judgeVehicleType(dashBoardVehicleInfo.powerType) === 'E'"
          :effect="effectType"
          placement="top"
          :content="$t('mainPage.nounExplainTwo')"
        >
          <svg-icon icon-class="iconinfobeifen dashboardIcon"></svg-icon>
        </el-tooltip>
        <!--油车---发动机转速 -->
        <echarts
          v-if="judgeVehicleType(dashBoardVehicleInfo.powerType) === 'F'"
          :options="engineSpeedOptions"
          height="250px"
          width="250px"
          :title="$t('mainPage.engineRotateSpeed')"
        ></echarts>
        <div class="border_two_value_box">
          <div class="common_words border_two_value_number">{{
            rightChartShowValue
          }}</div>
          <div class="common_words">
            <span :title="rightChartShowName">{{ rightChartShowName }}</span>
            <el-tooltip
              v-if="judgeVehicleType(dashBoardVehicleInfo.powerType) === 'F'"
              :effect="effectType"
              placement="top"
              :content="$t('mainPage.nounExplainThree')"
            >
              <svg-icon icon-class="iconinfobeifen"></svg-icon>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <!--第五部分---故障信息滚动播放----->
    <div
      class="board_five_box"
      v-show="
        dashBoardVehicleInfo.isShowFaultMessage === 1 &&
        suggesstionList.length > 0 &&
        statusCode === 'loaded'
      "
    >
      <div class="five_suggest_box">
        <ul class="five_fault_suggesstion_box">
          <li
            class="five_fault_suggesstion common_words"
            v-for="(suggestion, inx) in suggesstionList"
            :key="inx"
            :title="suggestion"
          >
            <svg-icon
              icon-class="icondot-solid"
              class="five_fault_icon"
            ></svg-icon>
            <span>{{ suggestion }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!--第三部分---前/后制动气压、蓄电池电压、电机温度、主电机转速、冷却液温度、机油压力----->
    <div class="board_three_box" v-show="statusCode === 'loaded'">
      <!-- 前/后制动气压 -->
      <div class="board_three_item">
        <div
          class="board_three_left_chart"
          :title="$t('mainPage.forBackPressure')"
        >
          <echarts
            :options="frontPressureOption"
            class="pressure_chart"
            height="100px"
            width="100px"
          ></echarts>
          <echarts
            :options="backPressureOption"
            class="pressure_chart"
            height="80px"
            width="80px"
          ></echarts>
          <svg-icon
            icon-class="iconzhidongxitongjingshideng"
            class="three_chart_icon"
          ></svg-icon>
        </div>
        <div class="board_three_right_text">
          <div class="common_words three_value_name">
            <span class="three_name_type">{{ 'F' }}</span>
            <span>{{ dashBoardVehicleInfo.frontBrakePressure + 'Kpa' }}</span>
          </div>
          <div class="common_words three_value_name">
            <span class="three_name_type">{{ 'B' }}</span>
            <span>{{ dashBoardVehicleInfo.backBrakePressure + 'Kpa' }}</span>
          </div>
          <div
            class="common_words three_value_name"
            :title="$t('mainPage.forBackPressure')"
            >{{ $t('mainPage.forBackPressure') }}</div
          >
        </div>
      </div>
      <!-- 蓄电池电压、电机温度、主电机转速、冷却液温度、机油压力 -->
      <div class="board_three_item" v-for="chart in chartList" :key="chart.id">
        <div class="board_three_left_chart">
          <echarts
            :options="chart.options"
            height="100px"
            width="100px"
          ></echarts>
          <svg-icon
            :icon-class="chart.icon"
            class="three_chart_icon"
          ></svg-icon>
        </div>
        <div class="board_three_right_text">
          <div class="common_words three_value_name"
            >{{ chart.value }}{{ chart.unit }}</div
          >
          <div class="common_words three_value_name" :title="$t(chart.name)">{{
            $t(chart.name)
          }}</div>
        </div>
      </div>
    </div>
    <!--第四部分---电车独有---车辆状态、电压、电流----->
    <div
      class="board_four_box"
      v-if="
        judgeVehicleType(dashBoardVehicleInfo.powerType) === 'E' &&
        statusCode === 'loaded'
      "
    >
      <div
        class="board_four_item"
        v-for="motor in motorInfoList"
        :key="motor.id"
      >
        <span class="common_words" :title="$t(motor.name)">{{
          $t(motor.name)
        }}</span>
        <span class="common_words">{{
          dashBoardVehicleInfo[motor.id] | filterFormat(motor)
        }}</span>
        <span class="common_words">{{ motor.unit }}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import queryLoading from '@/components/queryLoading';
  import echarts from '@/components/Charts';
  import Service from '@/api/OverseasService';
  import { mainMotorStateName, textFormat } from '@/filters';
  import { judgeVehicleType } from '@/utils';
  export default {
    name: 'DashBoard', // 仪表盘
    components: { echarts, queryLoading },
    props: {
      vehicleId: {
        type: String,
        default: '',
      },
      ifCloseDialog: {
        type: Boolean,
        default: false,
      },
    },
    filters: {
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
    },
    data() {
      return {
        statusCode: 'noData',
        queryStatus: {
          style: {},
          setQueryStatus: function (status) {
            return status;
          },
        },
        faultIconList: [
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
        ], // 故障信号指示灯
        nowVehicleId: '', // 点击仪表盘传进来的车辆id

        energyLeft: 0, // 能源余量--电车、油车通用
        motorInfoList: [
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
        ], // 电车独有的车辆相关信息
        chartList: [
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
        ], // 图表数组--除了前、后制动气压之外的另外三个图表
        rightChartShowValue: 0, // 右侧图表显示值
        rightChartShowName: '', // 右侧图表显示名称
        frontPressureOption: {}, // 前制动气压图表配置
        backPressureOption: {}, // 后制动气压图表配置
        dashBoardVehicleInfo: {}, // 当前车辆获得的仪表盘信息
        speedOptions: {}, // 仪表盘图表-车速
        oilEchartsOptions: {}, // 剩余油量图表数据
        insEleConsumOptions: {}, // 瞬时电耗图表配置
        engineSpeedOptions: {}, // 发动机转速图表配置
        intervalTimer: null, // 定时器
        settingTime: 20 * 1000, // 定时器时间间隔
        reportTime: '', // 当前时间
        suggesstionList: [], // 故障建议列表
        faultNameList: [], // 故障名称列表
        scrollTimer: null, // 定时器名称,
        chartColor: '#fff',
        effectType: 'dark', // el-tooltip 提示语背景色模式--dark/light
      };
    },
    computed: {
      noOffline() {
        const { vehicleState } = this.dashBoardVehicleInfo;
        return vehicleState !== 4;
      },
      lightList() {
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
        } = this.dashBoardVehicleInfo;

        const noOffline = vehicleState !== 4;

        const accCoolName = this.$t(
          (acCoolingSwitch && 'mainPage.airCoolOn') || 'mainPage.airCoolOff'
        );
        const accHeatName = this.$t(
          (acHeatingSwitch && 'mainPage.airHeatOn') || 'mainPage.airHeatOff'
        );

        const acOutValue =
          this._.isNil(acOutsideTemp) || !noOffline
            ? ''
            : `${acOutsideTemp}${this.$t('mainPage.tempUnit')}`;
        const accOutName = `${this.$t('mainPage.outVehicleTwo')}：${
          acOutValue || '-'
        }`;

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
          {
            name: this.$t('mainPage.stortDisLight'),
            icon: 'iconjinguangdeng',
            state: lowBeam === 1 && noOffline,
          },
          {
            name: this.$t('mainPage.frontFogLamp'),
            icon: 'iconqianwudeng',
            state: frontFogLamp === 1 && noOffline,
          },
          {
            name: this.$t('mainPage.backFogLamp'),
            icon: 'iconhouwudeng',
            state: backFogLamp === 1 && noOffline,
          },
          {
            name: this.$t('mainPage.middleDoor'),
            icon: 'iconzhongjianmen',
            state: midDoor === 1 && noOffline,
          },
          {
            name: this.$t('mainPage.parking'),
            icon: 'iconzhuche',
            state: parking === 1 && noOffline,
          },
          {
            name: accCoolName,
            icon: 'iconac',
            state: acCoolingSwitch === 1 && noOffline,
          },
          {
            name: accHeatName,
            icon: 'iconheating',
            state: acHeatingSwitch === 1 && noOffline,
          },
          {
            name: accOutName,
            icon: 'iconwendu',
            state: !this._.isNil(acOutsideTemp) && noOffline,
            value: acOutValue,
          },
          {
            name: accInName,
            icon: 'iconintemprerature',
            state: !this._.isNil(acIntsideTemp) && noOffline,
            value: acInValue,
          },
        ]; // 车辆灯、门、驻车信号灯数组
      },
    },
    watch: {
      vehicleId(nv, ov) {
        this.nowVehicleId = nv;
      },
      statusCode(nv, ov) {
        this.queryStatus.setQueryStatus(nv);
      },
      ifCloseDialog(nv, ov) {
        if (!nv) {
          this.clearTimer();
        } else {
          this.openTimer();
        }
      },
    },
    created() {
      const nowTheme = localStorage.getItem('userTheme');
      if (nowTheme === 'black') {
        this.chartColor = '#ffffff';
      } else {
        this.chartColor = '#17181c';
      }
    },
    mounted() {
      this.effectType = window.effectType;
      if (this.vehicleId) {
        this.nowVehicleId = this.vehicleId;
        this.openTimer();
      }
      this.initChart();
    },
    methods: {
      judgeVehicleType,
      // 清除定时器
      clearTimer() {
        if (this.intervalTimer) {
          clearInterval(this.intervalTimer);
          this.intervalTimer = null;
        }
        this.clearTimerTwo();
      },
      // 清除定时器2
      clearTimerTwo() {
        if (this.scrollTimer) {
          clearInterval(this.scrollTimer);
          this.scrollTimer = null;
        }
      },
      // 开启定时器
      openTimer() {
        this.clearTimer();
        this.getPcVehicleRealTimeInfo();
        this.intervalTimer = setInterval(() => {
          this.getPcVehicleRealTimeInfo();
        }, this.settingTime);
      },
      // 开启定时器2
      openTimerTwo() {
        this.clearTimerTwo();
        this.scrollTimer = setInterval(() => {
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
      },
      initChart() {
        // 车速图表options
        this.speedOptions = {
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
        this.powerSupplyVolt24VChart = {
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
        };
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
      },
      // 处理故障灯信息
      handleFaultLight() {
        this.suggesstionList = [];
        this.faultNameList = [];
        this.faultIconList.forEach((fault) => {
          fault.show = false;
          fault.faultNameList = [];
        });
        const data = this.dashBoardVehicleInfo.faultLightDTOS;
        if (data && data.length > 0) {
          data.forEach((item) => {
            if (item.suggest) {
              this.suggesstionList.push(item.suggest);
            }
            this.faultIconList.forEach((faultIcon) => {
              if (item[faultIcon.id] === 1) {
                faultIcon.show = true;
                if (item.faultName) {
                  faultIcon.faultNameList.push(item.faultName);
                }
              }
            });
          });
          if (this.suggesstionList.length > 1) {
            this.openTimerTwo();
          }
        }
      },
      // 仪表盘接口请求
      getPcVehicleRealTimeInfo() {
        this.statusCode = 'loading';
        this.reportTime = this.$moment().format('YYYY-MM-DD HH:mm:ss');
        Service.requestApi('getPcVehicleRealTimeInfo', {
          vehicleId: this.nowVehicleId,
        })
          .then((res) => {
            if (res.code === 1) {
              const data = res.data;
              if (data.onlineState == 'Offline') {
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
                data.engineWaterTemp = data.engineWaterTemp
                  ? data.engineWaterTemp
                  : 0;
                data.engineOilPressure = data.engineOilPressure
                  ? data.engineOilPressure
                  : 0;
                data.mainMotorTemp = data.mainMotorTemp
                  ? data.mainMotorTemp
                  : 0;
                data.mainMotorRev = data.mainMotorRev ? data.mainMotorRev : 0;
                // 24V蓄电池电压
                let voltageValue = parseFloat(data.powerSupplyVolt24V);
                if (isNaN(voltageValue) || voltageValue == null) {
                  data.powerSupplyVolt24V = '-';
                  voltageValue = 0;
                } else {
                  if (voltageValue < 16) {
                    this.powerSupplyVolt24VChart.series[0].axisLine.lineStyle.color =
                      [
                        [voltageValue / 32, '#ff0000'],
                        [1, '#828ca3'],
                      ];
                  } else if (voltageValue > 32) {
                    voltageValue = 32;
                    this.powerSupplyVolt24VChart.series[0].axisLine.lineStyle.color =
                      [
                        [voltageValue / 32, '#8cc63f'],
                        [1, '#828ca3'],
                      ];
                  } else {
                    voltageValue = Math.round(voltageValue * 10) / 10;
                    this.powerSupplyVolt24VChart.series[0].axisLine.lineStyle.color =
                      [
                        [voltageValue / 32, '#8cc63f'],
                        [1, '#828ca3'],
                      ];
                  }
                  data.powerSupplyVolt24V = voltageValue;
                }
                this.powerSupplyVolt24VChart.series[0].data[0].value =
                  voltageValue;
                // 车速
                let speedValue = parseFloat(data.speed);
                if (isNaN(speedValue) || speedValue < 0) {
                  speedValue = 0;
                } else if (speedValue > 140) {
                  speedValue = 140;
                } else {
                  speedValue = Math.round(speedValue * 10) / 10;
                }
                this.speedOptions.series[0].data[0].value = speedValue;
                this.speedOptions.series[0].axisLine.lineStyle.color =
                  speedValue == 0
                    ? [
                        [speedValue / 140, '#828ca3'],
                        [1, '#828ca3'],
                      ]
                    : [
                        [speedValue / 140, '#8cc63f'],
                        [1, '#828ca3'],
                      ];
              }
              this.chartList[0].options = this.powerSupplyVolt24VChart;
              this.chartList[0].value = data.powerSupplyVolt24V;
              // 前制动气压
              let frontPressureValue = parseFloat(data.frontBrakePressure);
              if (isNaN(frontPressureValue) || frontPressureValue < 0) {
                frontPressureValue = 0;
              } else if (frontPressureValue > 900) {
                frontPressureValue = 900;
              }
              if (frontPressureValue > 600) {
                this.frontPressureOption.series[0].axisLine.lineStyle.color = [
                  [frontPressureValue / 900, '#8cc63f'],
                  [1, '#828CA3'],
                ];
              } else {
                this.frontPressureOption.series[0].axisLine.lineStyle.color = [
                  [frontPressureValue / 900, '#ff0000'],
                  [1, '#828CA3'],
                ];
              }
              // 后制动气压
              let backPressureValue = parseFloat(data.backBrakePressure);
              if (isNaN(backPressureValue) || backPressureValue < 0) {
                backPressureValue = 0;
              } else if (backPressureValue > 900) {
                backPressureValue = 900;
              }
              if (backPressureValue > 600) {
                this.backPressureOption.series[0].axisLine.lineStyle.color = [
                  [backPressureValue / 900, '#8cc63f'],
                  [1, '#828CA3'],
                ];
              } else {
                this.backPressureOption.series[0].axisLine.lineStyle.color = [
                  [backPressureValue / 900, '#ff0000'],
                  [1, '#828CA3'],
                ];
              }
              if (judgeVehicleType(data.powerType) === 'F') {
                this.rightChartShowName = this.$t(
                  'mainPage.instanceFuelConsumption'
                );
                this.energyLeft = data.oilLeft || 0;
                // 瞬时油耗
                data.instantFuelConsumption = data.instantFuelConsumption
                  ? data.instantFuelConsumption.toFixed(2)
                  : 0;
                this.rightChartShowValue = data.instantFuelConsumption + 'L/h';
                // 剩余油量
                let oilVolumeOld = data.oilLeft - 0;
                if (oilVolumeOld < 0 || isNaN(oilVolumeOld)) {
                  oilVolumeOld = 0;
                  this.oilEchartsOptions.series[0].axisLine.lineStyle.color = [
                    [oilVolumeOld / 100, '#828CA3'],
                    [1, '#828CA3'],
                  ];
                } else if (oilVolumeOld >= 20) {
                  this.oilEchartsOptions.series[0].axisLine.lineStyle.color = [
                    [oilVolumeOld / 100, '#8cc63f'],
                    [1, '#828CA3'],
                  ];
                } else {
                  this.oilEchartsOptions.series[0].axisLine.lineStyle.color =
                    oilVolumeOld == 0
                      ? [
                          [0 / 100, '#828ca3'],
                          [1, '#828CA3'],
                        ]
                      : [
                          [oilVolumeOld / 100, '#ff0000'],
                          [1, '#828CA3'],
                        ];
                }
                // 发动机转速
                let engineValue = parseFloat(data.engineSpeed);
                if (isNaN(engineValue) || engineValue < 0) {
                  engineValue = 0;
                } else if (engineValue > 35) {
                  engineValue = 35;
                }
                this.engineSpeedOptions.series[0].axisLine.lineStyle.color =
                  engineValue == 0
                    ? [
                        [0 / 35, '#828CA3'],
                        [1, '#828CA3'],
                      ]
                    : [
                        [engineValue / 35, '#8cc63f'],
                        [1, '#828CA3'],
                      ];
                this.engineSpeedOptions.series[0].data[0].value = engineValue;
                // 冷却液温度
                let coolValue = data.engineWaterTemp;
                if (isNaN(coolValue) || coolValue < 0) {
                  coolValue = 0;
                } else if (coolValue <= 120) {
                  this.coolantTempEcharts.series[0].axisLine.lineStyle.color = [
                    [coolValue / 120, '#8cc63f'],
                    [1, '#828CA3'],
                  ];
                } else {
                  this.coolantTempEcharts.series[0].axisLine.lineStyle.color = [
                    [coolValue / 120, '#ff0000'],
                    [1, '#828CA3'],
                  ];
                }
                this.chartList[1].options = this.coolantTempEcharts;
                this.chartList[1].name = 'mainPage.coolantTemp';
                this.chartList[1].value = coolValue;
                this.chartList[1].unit = '℃';
                // 机油压力
                let pressureValue = data.engineOilPressure;
                if (isNaN(pressureValue) || pressureValue < 0) {
                  pressureValue = 0;
                } else if (pressureValue < 500) {
                  this.OilPressureEcharts.series[0].axisLine.lineStyle.color = [
                    [pressureValue / 1000, '#8cc63f'],
                    [1, '#828CA3'],
                  ];
                } else {
                  this.OilPressureEcharts.series[0].axisLine.lineStyle.color = [
                    [pressureValue / 1000, '#ff0000'],
                    [1, '#828CA3'],
                  ];
                }
                this.chartList[2].options = this.OilPressureEcharts;
                this.chartList[2].name = 'mainPage.engineOilPressure';
                this.chartList[2].value = pressureValue;
                this.chartList[2].unit = 'Kpa';
                this.chartList[2].icon = 'iconjiyouyali';
              } else if (judgeVehicleType(data.powerType) === 'E') {
                this.rightChartShowName = this.$t(
                  'mainPage.totalECElectricity'
                );
                this.rightChartShowValue = data.totalConsumption + 'kW·h';
                this.energyLeft = data.batteryCapacitySOC || 0;
                // 主电机温度
                let tempValue = parseFloat(data.mainMotorTemp);
                if (isNaN(tempValue) || tempValue < -40) {
                  tempValue = 0;
                } else if (tempValue > 150) {
                  tempValue = 150;
                } else {
                  tempValue = Math.round(tempValue * 100) / 100;
                }
                this.mainMotorTempChart.series[0].data[0].value = tempValue;
                if (tempValue <= 100) {
                  this.mainMotorTempChart.series[0].axisLine.lineStyle.color = [
                    [tempValue / 150, '#8cc63f'],
                    [1, '#828CA3'],
                  ];
                } else {
                  this.mainMotorTempChart.series[0].axisLine.lineStyle.color = [
                    [tempValue / 150, '#ff0000'],
                    [1, '#828CA3'],
                  ];
                }
                this.chartList[1].options = this.mainMotorTempChart;
                this.chartList[1].name = 'mainPage.mainMotorTemp';
                this.chartList[1].value = tempValue;
                this.chartList[1].unit = '℃';
                // 主电机转速
                let revValue = parseFloat(data.mainMotorRev * 100);
                if (isNaN(revValue) || revValue < 0) {
                  revValue = 0;
                } else {
                  revValue = Math.round(revValue * 100) / 100;
                }
                this.mainMotorSpeedChart.series[0].data[0].value = revValue;
                this.mainMotorSpeedChart.series[0].axisLine.lineStyle.color = [
                  [revValue / 3500, '#8cc63f'],
                  [1, '#828CA3'],
                ];
                this.chartList[2].options = this.mainMotorSpeedChart;
                this.chartList[2].name = 'mainPage.mainMotorRotate';
                this.chartList[2].value = revValue;
                this.chartList[2].unit = 'r/min';
                this.chartList[2].icon = 'iconengineSpeed';
                // 瞬时电耗
                let powerValue = parseFloat(data.instPowerConsumption);
                if (isNaN(powerValue)) {
                  powerValue = 0;
                } else if (powerValue > 50) {
                  powerValue = 50;
                } else if (powerValue < -50) {
                  powerValue = -50;
                } else {
                  powerValue = Math.round(powerValue * 10) / 10;
                }
                if (powerValue >= 0) {
                  this.insEleConsumOptions.series[1].axisLine.lineStyle.color =
                    [
                      [0, '#8cc63f'],
                      [1, '#828CA3'],
                    ];
                  this.insEleConsumOptions.series[0].axisLine.lineStyle.color =
                    [
                      [powerValue / 50, '#8cc63f'],
                      [1, '#828CA3'],
                    ];
                  this.insEleConsumOptions.series[0].data[0].value = powerValue;
                  this.insEleConsumOptions.series[0].detail.show = true;
                  this.insEleConsumOptions.series[1].detail.show = false;
                } else {
                  this.insEleConsumOptions.series[0].axisLine.lineStyle.color =
                    [
                      [0, '#8cc63f'],
                      [1, '#828CA3'],
                    ];
                  this.insEleConsumOptions.series[1].axisLine.lineStyle.color =
                    [
                      [-powerValue / 50, '#8cc63f'],
                      [1, '#828CA3'],
                    ];
                  this.insEleConsumOptions.series[1].data[0].value = powerValue;
                  this.insEleConsumOptions.series[1].detail.show = true;
                  this.insEleConsumOptions.series[0].detail.show = false;
                }
              }
              this.dashBoardVehicleInfo = data;
              console.log(this.dashBoardVehicleInfo);
              this.handleFaultLight();
              this.statusCode = 'loaded';
            }
          })
          .catch((msg) => {
            this.$messageNew('warning_color', msg.msg);
            this.statusCode = 'noData';
          });
      },
      formatName(name, state) {
        if (Array.isArray(name)) {
          return this.$t(name[state || 0]);
        }
        return this.$t(name);
      },
    },
    beforeDestroy() {
      this.clearTimer();
    },
  };
</script>
