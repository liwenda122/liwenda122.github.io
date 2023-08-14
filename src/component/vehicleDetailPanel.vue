<template>
  <!-- 当前车辆详细信息 -->
  <div class="vehicle_details_pane_box">
    <div class="details_top_box">
      <span class="normal_words"
        >{{ nowVehicleObj.vehicleName + '('
        }}{{ nowVehicleObj.energyType | formatType }}{{ ')' }}</span
      >
      <div
        v-if="ifIsTopDetails"
        class="cancel_icon_box"
        @click="cancelTop(nowVehicleObj.vehicleId)"
      >
        <svg-icon icon-class="iconpin-unpin" class="show_icon"></svg-icon>
      </div>
      <div v-else class="cancel_icon_box" @click="closeDetails">
        <svg-icon icon-class="iconcloseoriginal" class="show_icon"></svg-icon>
      </div>
    </div>
    <progress-bar
      :percentage="nowVehicleObj.energyLeft"
      class="progress_bar_box"
    ></progress-bar>
    <div class="details_info_box">
      <div class="info_box_left">
        <div class="box_left_item">
          <div class="vehicle_info_gprs">
            <div
              class="vehicle_info_gprs_bgk"
              :style="{
                width:
                  nowVehicleObj.onlineState == 'Online'
                    ? (nowVehicleObj.gprsSignal / 5) * 100 + '%'
                    : 0,
              }"
            ></div>
          </div>
        </div>
        <div class="box_left_item gprs_strong">{{ gprsStrong }}</div>
        <div class="box_left_item">
          <svg-icon
            v-if="
              ((nowVehicleObj.energyType === 'Electric' &&
                nowVehicleObj.onState == 1) ||
                (nowVehicleObj.energyType !== 'Electric' &&
                  nowVehicleObj.accState == 1)) &&
              nowVehicleObj.onlineState == 'Online'
            "
            icon-class="iconon"
            :title="
              nowVehicleObj.energyType === 'Electric'
                ? $t('mainPage.switchOn')
                : $t('mainPage.accOn')
            "
            :style="{ 'color': '#026AE3', 'font-size': '22px' }"
            class="show_icon"
          ></svg-icon>
          <svg-icon
            v-else
            icon-class="iconoff"
            :title="
              nowVehicleObj.energyType === 'Electric'
                ? $t('mainPage.switchOff')
                : $t('mainPage.accOff')
            "
            style="font-size: 22px"
            class="show_icon"
          ></svg-icon>
        </div>
        <div v-for="mark in markList" :key="mark.id" class="box_left_item">
          <svg-icon
            :icon-class="mark.icon"
            class="show_icon"
            :title="
              nowVehicleObj[mark.id] === 1 &&
              nowVehicleObj.onlineState === 'Online'
                ? $t(mark.nameOne)
                : $t(mark.nameTwo)
            "
            :style="{
              'color':
                nowVehicleObj[mark.id] === 1 &&
                nowVehicleObj.onlineState === 'Online'
                  ? '#026AE3'
                  : '#828CA3',
              'font-size': mark.id === 'gpsSignal' ? '28px' : '16px',
            }"
          ></svg-icon>
        </div>
      </div>
      <div class="info_box_right">
        <div v-for="info in infoList" :key="info.id" class="box_right_item">
          <svg-icon
            :icon-class="info.icon"
            :title="$t(info.name)"
            class="details_icon"
          ></svg-icon>
          <span
            v-if="info.id === 'acPanelSettingTemp'"
            class="normal_words"
            :title="nowVehicleObj[info.id] + info.unit"
          >
            {{
              nowVehicleObj[info.id] === $t('mainPage.switchOff')
                ? nowVehicleObj[info.id]
                : nowVehicleObj[info.id] + info.unit
            }}
          </span>
          <span
            v-else
            class="normal_words"
            :title="nowVehicleObj[info.id] + info.unit"
          >
            {{ nowVehicleObj[info.id] }}{{ info.unit }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import progressBar from '@/components/ProgressBar';
  import { formatVehicleEnergyType } from '@/utils';
  // 拖拽插件
  export default {
    name: 'VehicleDetailsPane', // 车辆基本详情pane
    components: { progressBar },
    filters: {
      formatType(val) {
        return formatVehicleEnergyType(val);
      },
    },
    props: {
      seledVehicleObj: {
        type: Object,
        default() {
          return {};
        },
      },
      ifIsTopDetails: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        nowVehicleObj: {}, // 当前点击的车辆对象
        markList: [
          {
            id: 'gpsSignal',
            icon: 'icongps',
            nameOne: 'mainPage.gpsFind',
            nameTwo: 'mainPage.gpsLose',
          },
          {
            id: 'accoolingswitch',
            icon: 'iconac',
            nameOne: 'mainPage.airCoolOn',
            nameTwo: 'mainPage.airCoolOff',
          },
          {
            id: 'acheatingswitch',
            icon: 'iconheating',
            nameOne: 'mainPage.airHeatOn',
            nameTwo: 'mainPage.airHeatOff',
          },
        ], // 车辆信号markList
        infoList: [
          {
            id: 'vehicleSpeed', // TODO  2023 02 28 改为平均车速  3月3日 又改回来 曹
            // id: 'vehicleAvgSpeed', // TODO  2023 02 28 改为平均车速  3月3日 又改回来 曹
            icon: 'iconspeed',
            name: 'mainPage.vehicleSpeed',
            unit: 'km/h',
          },
          {
            id: 'drivingRange', // 续驶里程
            icon: 'iconcanrunmileage',
            name: 'mainPage.continueMileage',
            unit: 'km',
          },
          {
            id: 'dailySecond', // 当日行驶时间
            icon: 'icondayruningtime',
            name: 'mainPage.timeOfTheDay',
            unit: '',
          },
          {
            id: 'totalMileageDayCount', // 当日行驶里程
            icon: 'icondaymileage',
            name: 'mainPage.mileageOfTheDay',
            unit: 'km',
          },
          {
            id: 'direction', // 方向
            icon: 'iconvehicledirection',
            name: 'mainPage.direction',
            unit: '',
          },
          {
            id: 'totalMiles', // 累计里程
            icon: 'iconodo',
            name: 'mainPage.distanceMileage',
            unit: 'km',
          },
          {
            id: 'acPanelSettingTemp', // 空调温度
            icon: 'iconaircontrol',
            name: 'mainPage.ACTemperature',
            unit: '℃',
          },
          {
            id: 'acIntsideTemp', // 车内温度
            icon: 'iconintemprerature',
            name: 'mainPage.inVehicleTwo',
            unit: '℃',
          },
        ], // 车辆信息infoList
        gprsStrong: '', // GPRS信号强度
      };
    },
    watch: {
      seledVehicleObj(nv, ov) {
        this.nowVehicleObj = nv;
        this.formatVehicleObj();
      },
    },
    created() {
      this.nowVehicleObj = this.seledVehicleObj;
      this.formatVehicleObj();
    },
    mounted() {},
    methods: {
      // 取消置顶
      cancelTop(vehicleId) {
        this.$emit('cancelTop', vehicleId);
      },
      closeDetails() {
        this.$emit('closeDetails');
      },
      // 格式化车辆对象
      formatVehicleObj() {
        const newObj = this.nowVehicleObj;
        if (newObj.vehicleState === 4) {
          newObj.acPanelSettingTemp = '-';
          newObj.acIntsideTemp = '-';
          newObj.direction = '-';
          newObj.vehicleSpeed = '-';
          newObj.totalMileageDayCount = newObj.totalMileageDayCount
            ? newObj.totalMileageDayCount
            : '-';
          newObj.drivingRange = newObj.drivingRange ? newObj.drivingRange : '-';
          newObj.totalMiles = newObj.totalMiles;
        } else {
          newObj.acPanelSettingTemp =
            newObj.acSystemSwitch === 1
              ? newObj.acPanelSettingTemp
              : this.$t('mainPage.switchOff');
          newObj.totalMileageDayCount = newObj.totalMileageDayCount
            ? newObj.totalMileageDayCount
            : '-';
          newObj.drivingRange = newObj.drivingRange ? newObj.drivingRange : '-';
          newObj.vehicleSpeed = newObj.vehicleSpeed ? newObj.vehicleSpeed : '-';
          newObj.totalMiles = newObj.totalMiles;
          newObj.acIntsideTemp = newObj.acIntsideTemp;
        }
        if (newObj.onlineState === 'Online') {
          if (newObj.gprsSignal <= 1) {
            this.gprsStrong = this.$t('mainPage.gprsWeak');
          } else if (newObj.gprsSignal > 1 && newObj.gprsSignal < 4) {
            this.gprsStrong = this.$t('mainPage.gprsCommon');
          } else if (newObj.gprsSignal >= 4) {
            this.gprsStrong = this.$t('mainPage.gprsStrong');
          }
        } else {
          this.gprsStrong = this.$t('mainPage.gprsWeak');
        }
        this.nowVehicleObj = newObj;
      },
    },
  };
</script>

<style lang="scss">
  .vehicle_details_pane_box {
    overflow: hidden;
    .normal_words {
      font-size: 12px;
      line-height: 20px;
    }
    .show_icon {
      display: block;
      margin-top: 2px;
    }
    .details_top_box {
      width: 100%;
      overflow: hidden;
      .cancel_icon_box {
        float: right;
        width: 20px;
        height: 20px;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          background: rgba(130, 140, 163, 0.2);
        }
        .show_icon {
          line-height: 20px;
          margin-left: 2px;
        }
      }
    }
    .progress_bar_box {
      margin-top: 5px;
      width: 100%;
    }
    .details_info_box {
      width: 100%;
      overflow: hidden;
      margin-top: 5px;
      display: flex;
      .info_box_left {
        width: 30%;
        overflow: hidden;
        .box_left_item {
          width: 50%;
          float: left;
          height: 20px;
          margin-bottom: 10px;
          .vehicle_info_gprs {
            width: 16px;
            height: 16px;
            background-image: url('./../../../assets/page_imgs/gprs_off.png');
            background-repeat: no-repeat;
            background-size: 16px;
            margin-top: 2px;
            .vehicle_info_gprs_bgk {
              height: 16px;
              background-image: url('./../../../assets/page_imgs/gprs_on.png');
              background-repeat: no-repeat;
              background-size: 16px;
            }
          }
        }
        .gprs_strong {
          font-size: 12px;
          line-height: 20px;
        }
      }
      .info_box_right {
        width: 70%;
        overflow: hidden;
        .box_right_item {
          width: 50%;
          float: left;
          overflow: hidden;
          margin-bottom: 5px;
          .details_icon {
            float: left;
          }
          span {
            display: block;
            float: left;
            width: calc(100% - 16px);
            padding: 0 10px;
            box-sizing: border-box;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
