<template>
  <!-- 当前车辆详细信息 -->
  <div class="vehicle_details_pane_box">
    <div class="details_top_box">
      <span class="normal_words">{{ formattedVehicleName }}</span>
      <div v-if="ifIsTopDetails" class="cancel_icon_box" @click="cancelTop(nowVehicleObj.vehicleId)">
        <svg-icon icon-class="iconpin-unpin" class="show_icon"></svg-icon>
      </div>
      <div v-else class="cancel_icon_box" @click="closeDetails">
        <svg-icon icon-class="iconcloseoriginal" class="show_icon"></svg-icon>
      </div>
    </div>
    <progress-bar :percentage="nowVehicleObj.energyLeft" class="progress_bar_box"></progress-bar>
    <div class="details_info_box">
      <div class="info_box_left">
        <div class="box_left_item">
          <div class="vehicle_info_gprs">
            <div
              class="vehicle_info_gprs_bgk"
              :style="{
                width: nowVehicleObj.onlineState === 'Online' ? (nowVehicleObj.gprsSignal / 5) * 100 + '%' : 0,
              }"
            ></div>
          </div>
        </div>
        <div class="box_left_item gprs_strong">{{ gprsStrong }}</div>
        <div class="box_left_item">
          <svg-icon
            v-if="isOn(nowVehicleObj)"
            icon-class="iconon"
            :title="getTitleOnOff(nowVehicleObj)"
            :style="{ color: '#026AE3', 'font-size': '22px' }"
            class="show_icon"
          ></svg-icon>
          <svg-icon
            v-else
            icon-class="iconoff"
            :title="getTitleOnOff(nowVehicleObj, false)"
            style="font-size: 22px"
            class="show_icon"
          ></svg-icon>
        </div>
        <div v-for="mark in markList" :key="mark.id" class="box_left_item">
          <svg-icon
            :icon-class="mark.icon"
            class="show_icon"
            :title="getTitleMark(mark, nowVehicleObj)"
            :style="{ color: getColorMark(mark, nowVehicleObj), 'font-size': getSizeMark(mark.id) }"
          ></svg-icon>
        </div>
      </div>
      <div class="info_box_right">
        <div v-for="info in infoList" :key="info.id" class="box_right_item">
          <svg-icon :icon-class="info.icon" :title="$t(info.name)" class="details_icon"></svg-icon>
          <span :class="getInfoClass(info)" :title="getInfoTitle(info)">
            {{ getInfoText(info) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import ProgressBar from '@/components/ProgressBar';
import { formatVehicleEnergyType } from '@/utils';

// 使用 defineProps 获取外部传入的属性
const { seledVehicleObj, ifIsTopDetails } = defineProps({
  seledVehicleObj: Object,
  ifIsTopDetails: Boolean,
});

// 使用 ref 创建响应式变量
const nowVehicleObj = ref({});
const gprsStrong = ref('');

// 车辆信号 mark 列表
const markList = [
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
];

// 车辆信息 info 列表
const infoList = [
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
];

// 获取格式化后的车辆名称
const formattedVehicleName = `${nowVehicleObj.value.vehicleName}(${formatVehicleEnergyType(nowVehicleObj.value.energyType)})`;

// 监听外部传入的车辆对象变化
watch(seledVehicleObj, (newValue) => {
  nowVehicleObj.value = newValue;
  formatVehicleObj();
});

// 判断车辆是否处于开启状态
const isOn = (vehicle: any): boolean => {
  if (vehicle.energyType === 'Electric') {
    return vehicle.onState === 1 && vehicle.onlineState === 'Online';
  } else {
    return vehicle.accState === 1 && vehicle.onlineState === 'Online';
  }
};

// 获取开关图标的标题
const getTitleOnOff = (vehicle: any, isOn: boolean): string => {
  if (vehicle.energyType === 'Electric') {
    return isOn ? $t('mainPage.switchOn') : $t('mainPage.switchOff');
  } else {
    return isOn ? $t('mainPage.accOn') : $t('mainPage.accOff');
  }
};

// 获取车辆信号 mark 的标题
const getTitleMark = (mark: any, vehicle: any): string => {
  if (vehicle[mark.id] === 1 && vehicle.onlineState === 'Online') {
    return $t(mark.nameOne);
  } else {
    return $t(mark.nameTwo);
  }
};

// 获取车辆信号 mark 的颜色
const getColorMark = (mark: any, vehicle: any): string => {
  if (vehicle[mark.id] === 1 && vehicle.onlineState === 'Online') {
    return '#026AE3'; // 在线且信号开启的颜色
  } else {
    return '#828CA3'; // 其他情况的颜色
  }
};


// 获取车辆信号 mark 的字体大小
const getSizeMark = (markId: string): string => {
  return markId === 'gpsSignal' ? '28px' : '16px';
};


// 获取车辆信息的 class
const getInfoClass = (info: any): string => {
  return info.id === 'acPanelSettingTemp' ? 'normal_words' : 'normal_words'; // 根据条件返回不同的 class
};


// 获取车辆信息的标题
const getInfoTitle = (info: any): string => {
  return $t(info.name); // 返回根据 info.name 获取的标题
};


// 获取车辆信息的显示文本
const getInfoText = (info: any): string => {
  const value = nowVehicleObj.value[info.id];
  if (info.id === 'acPanelSettingTemp' || info.id === 'acIntsideTemp') {
    return value !== '-' ? value + info.unit : value;
  } else {
    return value + info.unit;
  }
};


// 取消置顶
const cancelTop = (vehicleId) => {
  const emit = defineEmits();
  emit('cancelTop', vehicleId);
};

// 关闭详情面板
const closeDetails = () => {
  const emit = defineEmits();
  emit('closeDetails');
};

// 格式化车辆对象
const formatVehicleObj = (): void => {
  const newObj = nowVehicleObj.value;

  if (newObj.vehicleState === 4) {
    newObj.acPanelSettingTemp = '-';
    newObj.acIntsideTemp = '-';
    newObj.direction = '-';
    newObj.vehicleSpeed = '-';
    newObj.totalMileageDayCount = newObj.totalMileageDayCount ? newObj.totalMileageDayCount : '-';
    newObj.drivingRange = newObj.drivingRange ? newObj.drivingRange : '-';
    newObj.totalMiles = newObj.totalMiles;
  } else {
    newObj.acPanelSettingTemp = newObj.acSystemSwitch === 1 ? newObj.acPanelSettingTemp : $t('mainPage.switchOff');
    newObj.totalMileageDayCount = newObj.totalMileageDayCount ? newObj.totalMileageDayCount : '-';
    newObj.drivingRange = newObj.drivingRange ? newObj.drivingRange : '-';
    newObj.vehicleSpeed = newObj.vehicleSpeed ? newObj.vehicleSpeed : '-';
    newObj.totalMiles = newObj.totalMiles;
    newObj.acIntsideTemp = newObj.acIntsideTemp;
  }

  if (newObj.onlineState === 'Online') {
    if (newObj.gprsSignal <= 1) {
      gprsStrong.value = $t('mainPage.gprsWeak');
    } else if (newObj.gprsSignal > 1 && newObj.gprsSignal < 4) {
      gprsStrong.value = $t('mainPage.gprsCommon');
    } else if (newObj.gprsSignal >= 4) {
      gprsStrong.value = $t('mainPage.gprsStrong');
    }
  } else {
    gprsStrong.value = $t('mainPage.gprsWeak');
  }

  nowVehicleObj.value = newObj;
};


</script>

<style lang="less">
/* 样式定义 */
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
