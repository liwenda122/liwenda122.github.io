<template>
  <div class="hw_vehicle_details">
    <div class="vehicle_details_top gradient_div">
      <div class="details_top_box">
        <div class="details_top_svg_box">
          <svg-icon icon-class="iconmonitoring" class="details_top_svg"></svg-icon>
        </div>
        <div class="details_top_word">{{vehicleName}}({{vehicleType | formatType}})</div>
      </div>
      <div class="details_top_box">
        <div class="details_top_word">{{$t('mainPage.basicInformation')}}</div>
        <ul class="details_top_basic_info_list">
          <li v-for="(basicInfo, index) in basicInfoList" :key="index" class="details_top_basic_info_item">
            <div class="details_top_basic_info_name" :title="$t(basicInfo.name)">{{ $t(basicInfo.name) + ':' }}</div>
            <div class="details_top_basic_info_value" :title="basicInfo.value">{{ basicInfo.value }}</div>
          </li>
        </ul>
      </div>
      <div class="details_top_box">
        <div class="details_top_real_info_title_box">
          <div class="details_top_word">{{ getDataTime | dateFormat('LLLL') }}</div>
          <!-- 仪表盘按钮 -->
          <!-- <div class="details_top_real_info_map_btn">{{ $t('mainPage.instrumentPanel') }}</div> -->
        </div>
        <div class="details_top_real_info_soc_box">
          <progress-bar :percentage="energyLeft"></progress-bar>
        </div>
        <ul class="details_top_real_info_list">
          <li class="details_top_real_info_item"
            v-for="(realInfo, index) in realInfoList"
            :key="index"
            v-show="realInfo.show"
          >
            <div class="details_top_real_info_name" :title="$t(realInfo.name)">{{ $t(realInfo.name) + ':' }}</div>
            <div class="details_top_real_info_value" :title="realInfo.value + ' ' + realInfo.unit">{{ realInfo.value + ' ' + realInfo.unit }}</div>
          </li>
        </ul>
      </div>
      <div class="details_top_box">
        <div class="details_top_word">{{ tabName }}</div>
        <ul class="details_top_basic_info_list">
          <li class="details_top_basic_info_item" v-for="(batteryFault, index) in batteryFaultList" :key="index">
            <div class="details_top_battery_fault_name" :title="$t(batteryFault.name)">{{ $t(batteryFault.name) + ':' }}</div>
            <div class="details_top_battery_fault_value" :title="batteryFault.value">{{ batteryFault.value }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="vehicle_details_bottom">
      <echartsOption
        :tapSetting="tapSetting"
        :chart-data="chartData"
        :code="statusCode"
      ></echartsOption>
    </div>
  </div>
</template>
<script>
import Service from '@/api/OverseasService'
import echartsOption from '@/components/echartsOption'
import progressBar from '@/components/ProgressBar'
import { formatVehicleEnergyType } from '@/utils'
export default {
  name: 'hwVehicleDetail', // 车辆档案
  components: { echartsOption, progressBar },
  data() {
    return {
      basicInfoList: [
        {
          name: 'mainPage.vehicleLn',
          value: ''
        },
        {
          name: 'mainPage.vehicleSn',
          value: ''
        },
        {
          name: 'mainPage.vehicleCode',
          value: ''
        },
        {
          name: 'mainPage.terminalNo',
          value: ''
        },
        {
          name: 'mainPage.vehicleVin',
          value: ''
        },
        {
          name: 'mainPage.treeOrg',
          value: ''
        },
        {
          name: 'mainPage.vehicleModel',
          value: ''
        }
      ],
      realInfoList: [
        {
          name: 'mainPage.vehicleSpeed',
          value: '',
          unit: 'km/h',
          show: true,
          id: 'ElecFuel'
        },
        {
          name: 'mainPage.SOC',
          value: '',
          show: false,
          unit: '%',
          id: 'Electric'
        },
        {
          name: 'mainPage.oilLeft',
          value: '',
          show: false,
          unit: '%',
          id: 'Fuel'
        },
        {
          name: 'mainPage.newUImileageOfTheDay',
          value: '',
          unit: 'km',
          show: true,
          id: 'ElecFuel'
        },
        {
          name: 'mainPage.timeOfTheDay',
          value: '',
          unit: '',
          show: true,
          id: 'ElecFuel'
        },
        {
          name: 'mainPage.distanceMileage',
          value: '',
          unit: 'km',
          show: true,
          id: 'ElecFuel'
        },
        {
          name: 'mainPage.mainMotorVoltage',
          value: '',
          show: false,
          unit: 'V',
          id: 'Electric'
        },
        {
          name: 'mainPage.mainMotorCurrent',
          value: '',
          show: false,
          unit: 'A',
          id: 'Electric'
        },
        {
          name: 'mainPage.mainMotorTemp',
          value: '',
          show: false,
          unit: '℃',
          id: 'Electric'
        },
        {
          name: 'mainPage.mainMotorRotate',
          value: '',
          show: false,
          unit: 'r/min',
          id: 'Electric'
        },
        {
          name: 'mainPage.engineOilPressure',
          value: '',
          show: false,
          unit: 'Kpa',
          id: 'Fuel'
        },
        {
          name: 'mainPage.engineWaterTemp',
          value: '',
          show: false,
          unit: '℃',
          id: 'Fuel'
        },
        {
          name: 'mainPage.instanceFuelConsumption',
          value: '',
          show: false,
          unit: 'L/h',
          id: 'Fuel'
        },
        {
          name: 'mainPage.averageOil',
          value: '',
          show: false,
          unit: 'L/100km',
          id: 'Fuel'
        }
      ],
      batteryFaultList: [],
      batteryListL: [
        {
          name: 'mainPage.batteryLife',
          value: ''
        },
        {
          name: 'mainPage.batteryTypeInfo',
          value: ''
        },
        {
          name: 'mainPage.batteryLevel',
          value: ''
        }
      ],
      faultList: [
        {
          name: 'mainPage.seriousFault',
          value: 0
        },
        {
          name: 'mainPage.importantFault',
          value: 0
        },
        {
          name: 'mainPage.commontFault',
          value: 0
        }
      ],
      vehicleId: '',
      vehicleName: '',
      vehicleType: '',
      intervalTimer: null,
      settingTime: 10 * 1000,
      energyLeft: 0,
      tapSetting: {
        ifShowFoldExpandBtn: true,
        tabTitle: 'mainPage.consumptionStatTitle',
        type: 'VehicleDetails',
        height: '450px',
        legendTitle: 'mainPage.eleConsumption',
        getDataType: 'electronic'
      },
      chartData: [],
      statusCode: 'noData',
      getDataTime: '',
      tabName: this.$t('mainPage.batteryReport')
    }
  },
  filters: {
    formatType(val) {
      return formatVehicleEnergyType(val)
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == 'hwVehicleDetail' && this.$route.query.vehicleId !== this.vehicleId) {
        if (!this.$route.query.vehicleId) return
        this.vehicleId = this.$route.query.vehicleId
      }
    }
  },
  mounted() {
    this.vehicleId = this.$route.query.vehicleId
  },
  methods: {
    // 清除定时器
    clearTimer() {
      if (this.intervalTimer) {
        clearInterval(this.intervalTimer)
        this.intervalTimer = null
      }
    },
    // 开启定时器
    openTimer() {
      this.clearTimer()
      this.getVehicleInfo(true)
      this.intervalTimer = setInterval(() => {
        this.getVehicleInfo()
      }, this.settingTime)
    },
    // 获取车辆基本信息--实时信息--车型动参
    getVehicleInfo(ifRefresh = false) {
      // this.realInfoList.forEach(item => {
      //   if (item.id !== 'ElecFuel') {
      //     item.show = false
      //   }
      // })
      Service
        .requestApi('getPcVehicleRealTimeInfo', { vehicleId: this.$route.query.vehicleId })
        .then(res => {
          const data = res.data
          this.vehicleName = data.vehicleName
          this.vehicleType = data.powerType
          this.getDataTime = data.terminalTime
          this.realInfoList[3].value = data.totalMileageDayCount || '-' // 当日行驶里程
          this.realInfoList[4].value = data.dailySecond || '-' // 当日行驶时间
          this.realInfoList[5].value = data.totalMileage || 0 // 累计里程
          const staticInfo = res.data.statticVehicleInfo[0]
          this.basicInfoList[0].value = staticInfo.vehicleLn || '-' // 车牌号
          this.basicInfoList[1].value = staticInfo.vehicleSn || '-' // 车工号
          this.basicInfoList[2].value = staticInfo.vehicleCode || '-' // 自编码
          this.basicInfoList[3].value = staticInfo.terminalNo || '-' // 终端号
          this.basicInfoList[4].value = staticInfo.vehicleVin || '-' // vin 号
          this.basicInfoList[5].value = staticInfo.belongToName || '-' // 组织
          this.basicInfoList[6].value = staticInfo.vehicleModelName || '-' // 车型
          if (data.onlineState === 'Offline') {
            this.realInfoList[0].value = 0 // 车速
            this.realInfoList[6].value = '-' // 主电动机电压
            this.realInfoList[7].value = '-'// 主电机电流
            this.realInfoList[8].value = '-' // 主电机温度
            this.realInfoList[9].value = '-' // 主电机转速
            this.realInfoList[10].value = '-'// 机油压力
            this.realInfoList[11].value = '-' // 发动机水温
            this.realInfoList[12].value = '-' // 瞬时油耗
            this.realInfoList[13].value = '-' // 平均油耗
          } else {
            this.realInfoList[0].value = data.speed || 0 // 车速
            if (data.powerType === 'Fuel' || data.powerType === 'FuelAndElectric') {
              this.realInfoList[10].value = data.engineOilPressure || '-' // 机油压力
              this.realInfoList[11].value = data.engineWaterTemp || '-' // 发动机水温
              this.realInfoList[12].value = data.instantFuelConsumption || '-' // 瞬时油耗
              this.realInfoList[13].value = data.evergyFuelConsumption || '-' // 平均油耗
            } else if (data.powerType === 'Electric' || data.powerType === 'TrolleyBus') {
              this.realInfoList[6].value = data.mainMotorVoltage || '-' // 主电机电压
              this.realInfoList[7].value = data.mainMotorCurrent || 0 // 主电机电流
              this.realInfoList[8].value = data.mainMotorTemp || 0 // 主电机温度
              this.realInfoList[9].value = data.mainMotorRev ? (data.mainMotorRev * 100).toFixed(0) : 0 // 主电机转速
            }
          }
          if (data.powerType === 'Fuel' || data.powerType === 'FuelAndElectric') {
            this.realInfoList[2].value = data.oilLeft || 0 // 剩余油量
            this.tapSetting.legendTitle = 'mainPage.dieselConsumption'
            this.tapSetting.getDataType = 'diesel'
            this.energyLeft = data.oilLeft || 0
            this.realInfoList.forEach(item => {
              if (item.id === 'Fuel') {
                item.show = true
              }
            })
            if (ifRefresh) {
              this.getVehicleFaultData()
            }
          } else if (data.powerType === 'Electric' || data.powerType === 'TrolleyBus') {
            this.realInfoList[1].value = data.batteryCapacitySOC || 0 // 电池soc
            this.tapSetting.legendTitle = 'mainPage.eleConsumption'
            this.tapSetting.getDataType = 'electronic'
            this.energyLeft = data.batteryCapacitySOC || 0
            this.realInfoList.forEach(item => {
              if (item.id === 'Electric') {
                item.show = true
              }
            })
            if (ifRefresh) {
              this.getBatteryData()
            }
          }
          if (ifRefresh) {
            this.getConsumptionIndicator()
          }
        })
        .catch(() => {})
    },
    // 获取Electric类型车辆电池数据
    getBatteryData() {
      this.tabName = this.$t('mainPage.batteryReport')
      Service
        .requestApi('getBatteryInfo', { vehicleId: this.$route.query.vehicleId })
        .then(res => {
          const batteryInfo = res.data
          if (batteryInfo && batteryInfo !== '{}') {
            this.batteryListL[0].value = batteryInfo.batteryUseTime + ' h' // 电池使用时长
            this.batteryListL[1].value = batteryInfo.batteryType || '-' // 电池类型信息
            this.batteryListL[2].value = batteryInfo.btySysRatedConsumption + ' kW·h' // 电池额定电量
          } else {
            this.batteryListL[0].value = '-'
            this.batteryListL[1].value = '-'
            this.batteryListL[2].value = '-'
          }
          this.batteryFaultList = this.batteryListL
        })
        .catch(err => {
          this.batteryListL[0].value = '-'
          this.batteryListL[1].value = '-'
          this.batteryListL[2].value = '-'
          this.batteryFaultList = this.batteryListL
          console.log(err)
        })
    },
    // 获取Fuel类型车辆故障数据
    getVehicleFaultData() {
      this.tabName = this.$t('route.hwVehicleFault')
      const beginTime = this.$moment()
        .add(-2, 'day')
        .startOf('day')
        .format('YYYYMMDDHHmmss')
      const endTime = this.$moment().format('YYYYMMDDHHmmss')
      const params = {
        vehicleIds: this.$route.query.vehicleId,
        beginTime: beginTime,
        endTime: endTime
      }
      Service
        .requestApi('getFaultMonitorList', params)
        .then(res => {
          if (res.code == 1) {
            const countMap = res.data.countMap
            this.faultList[0].value = countMap.faultLevel1 // 严重故障
            this.faultList[1].value = countMap.faultLevel2 // 重要故障
            this.faultList[2].value = countMap.faultLevel3 // 一般故障
            this.batteryFaultList = this.faultList
          }
        })
        .catch(() => {
          this.faultList[0].value = 0
          this.faultList[1].value = 0
          this.faultList[2].value = 0
          this.batteryFaultList = this.faultList
        })
    },
    // 获取车辆百公里能耗数据
    getConsumptionIndicator() {
      this.statusCode = 'loading'
      const paramas = {
        dimension: 'time',
        endTime: this.$moment().add(-1, 'day').format('YYYYMMDD'),
        periodType: 'day',
        startTime: this.$moment().add(-30, 'day').format('YYYYMMDD'),
        statObjId: this.vehicleId,
        statObjType: 'Vehicle',
        statRangeType: 'single'
      }
      Service
        .requestApi('getConsumptionIndicator', paramas)
        .then(res => {
          if (res.code === 1 && res.data && res.data.length > 0) {
            this.chartData = res.data
            this.statusCode = 'loaded'
          } else {
            this.chartData = []
            this.statusCode = 'noData'
          }
        })
        .catch(() => {
          this.statusCode = 'noData'
        })
    }
  },
  activated() {
    this.openTimer()
  },
  deactivated() {
    this.clearTimer()
  },
  beforeDestroy() {
    this.clearTimer()
  }
}
</script>
