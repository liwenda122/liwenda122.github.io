<template>
  <div class="hw_base_filter_box">
    <!-- 车辆树 -->
    <a-popover
      ref="popover-filter-tree"
      placement="bottom-start"
      trigger="click"
      overlayClassName="tree-popper-bottom"
      v-model:visible="showVehicleTree"
    >
      <!-- 车辆树 -->
      <HwSyncVehicleTree
        v-if="ifVehicleTree && haveTree && !ifChargeStationTree"
        :isAllVehicle="isAllVehicle"
        :propId="propId"
        @getVehiclesArr="getTreeIds"
        @closeTreeJumpBox="showVehicleTree = false"
        @noCloseTreeJump="noCloseTreeJump"
        @saveVehicleGroup="setVehicleChargerGroupObj"
      />
      <!-- 充电机树 -->
      <HwSyncChargerTree
        v-if="haveTree && !ifVehicleTree && !ifChargeStationTree"
        @getChargersArr="getTreeIds"
        @closeTreeJumpBox="showVehicleTree = false"
        @noCloseTreeJump="noCloseTreeJump"
        @saveChargerGroup="setVehicleChargerGroupObj"
      />
      <!-- 充电站树 -->
      <HwSyncStationTree
        v-if="ifChargeStationTree"
        @getStationsArr="getTreeIds"
        @closeTreeJumpBox="showVehicleTree = false"
        @noCloseTreeJump="noCloseTreeJump"
        @saveStationGroup="setVehicleChargerGroupObj"
      />
    </a-popover>
    <div class="hw_base_filter">
      <!-- 日期类型选择框 -->
      <div class="date_type_list_group" v-if="ifShowDateTypeBtnGroup">
        <div
          class="date_type_item"
          @click="changeDateType(item.id)"
          v-for="item in dataTypeList"
          :key="item.id"
          :class="{ actice_type: nowSeledDateType === item.id }"
        >
          {{ $t(item.name) }}
        </div>
      </div>

      <a-date-picker
        size="small"
        :clearIcon="false"
        :format="formatType"
        v-if="ifShowDateTypeBtnGroup"
        class="base_filter_date_sel circle-date"
        :clearable="false"
        v-model="nowSeledDateTypeDefaultValue"
        :type="nowSeledDateType"
        @change="getSelDate"
        :key="nowSeledDateType"
        :pickerOptions="pickerOptions"
      />
      
      <!-- 结束日期选择框 -->
      <a-date-picker
        size="small"
        :clearIcon="false"
        :format="formatTypeNew"
        :clearable="false"
        v-if="dateConfig.ifShowDateSel && !ifShowDateTypeBtnGroup"
        class="base_filter_date_sel"
        overlayClassName="datetimerange_popper"
        v-model="dateConfig.dateValue"
        :type="dateConfig.dateType"
        :rangeSeparator="$t('mainPage.to')"
        :startPlaceholder="$t('mainPage.beginDate')"
        :endPlaceholder="$t('mainPage.endDate')"
        @change="getSelDate"
        :pickerOptions="dateConfig.pickerOptions"
        :defaultTime="defaultTime"
      />

      <!-- 树结构 -->
      <div
        class="show_vehicle_jump_box"
        v-popper="'popover-filter-tree'"
        @click="showTreeJumpBox"
        v-if="haveTree"
      >
        <span class="show_vehicle_jump_word">
          {{
            ifChargeStationTree
              ? $t('mainPage.chargerStationSelect')
              : ifVehicleTree
              ? $t('mainPage.fleetSelect')
              : $t('mainPage.chargerSelect')
          }}
        </span>
        <a-icon
          class="show_vehicle_jump_btn"
          :class="{ reverse: showVehicleTree }"
          type="icondropdownoriginal"
        />
      </div>

      <!-- 自定义条件 -->
      <div v-if="filterConfig" class="diy-fliter">
        <div
          style="margin-left: 4px; float: left"
          v-for="(val, index) in filterConfig"
          :key="index"
        >
          <keep-alive>
            <component
              v-if="val.component !== 'a-button'"
              :ref="val.ref"
              v-model="val.value"
              :is="val.component"
              v-bind="val.filterProps"
              :placeholder="val.filterProps.placeholder"
              @change="selectChange(val)"
            >
              <!-- 下拉选择 -->
              <template v-if="val.component === 'a-select'">
                <a-select-option
                  v-for="item in val.items"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value"
                />
              </template>
            </component>
          </keep-alive>
        </div>
      </div>

      <!-- 分组 -->
      <ul class="vehicle_group_list" v-if="haveTree && !isAllVehicle">
        <li
          v-for="fleet in groupList"
          :key="fleet.id"
          v-show="fleet.ifShow"
          :title="fleet.id === 'FULLFLEET' ? $t(fleet.name) : fleet.name"
          class="vehicle_group_list_item"
          :class="{
            vehicle_group_list_item_active: nowActiveFleetId === fleet.id,
          }"
          @click="changeVehicleGroup(fleet.id, true)"
        >
          <div
            class="group_header_name single-row-ellipsis"
            :style="{ 'max-width': maxGroupItemWidth - 46 + 'px' }"
          >
            {{ fleet.id === 'FULLFLEET' ? $t(fleet.name) : fleet.name }}
          </div>
          <div
            class="group_close_btn_box"
            @click.stop="deleteNowGroup(fleet.id)"
            v-show="fleet.id !== 'FULLFLEET'"
          >
            <a-icon
              class="group_close_btn"
              type="iconcloseoriginal"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  defineProps,
  defineEmits,
} from 'vue';
import { Popover, Icon, Select, DatePicker } from 'arco-design';
import HwSyncVehicleTree from '@/components/HwSyncVehicleTree';
import HwSyncChargerTree from '@/components/HwSyncChargerTree';
import HwSyncStationTree from '@/components/HwSyncChargerStationMultipleTree';
import BaseSelect from '@/components/OCPP/BaseSelect';

// 定义组件接收的 props
const props = defineProps({
  isAllVehicle: Boolean,
  dateConfig: Object,
  ifShowDateTypeBtnGroup: Boolean,
  filterConfig: null,
  haveTree: Boolean,
  ifVehicleTree: Boolean,
  ifChargeStationTree: Boolean,
  groupName: String,
  seledGroup: String,
  defaultTime: Array,
  propId: String,
});

// 定义组件发射的事件
const emits = defineEmits();

// 定义响应式数据
const showVehicleTree = ref(false);
const dataTypeList = ref([
  { id: 'date', name: 'mainPage.day' },
  { id: 'week', name: 'mainPage.week' },
  { id: 'month', name: 'mainPage.month' },
]);
const nowSeledDateType = ref('date');
const formatType = ref('month,dd');
const formatTypeNew = ref('');
const nowSeledDateTypeDefaultValue = ref('');
const pickerOptions = ref({});
const groupList = ref([
  // ... 你的分组列表数据 ...
]);
const nowActiveFleetId = ref('');
const ifCloseVehicleTree = ref(true);
const maxGroupItemWidth = ref(0);

// 在 created 钩子中执行初始化逻辑
onCreated(() => {
  formatTypeNew.value = dateConfig.formatType ? dateConfig.formatType : 'month,dd';
  nowSeledDateTypeDefaultValue.value = dayjs().startOf('day').subtract(1, 'day').toDate();
  pickerOptions.value = {
    disableFuture: dayjs().startOf('day').subtract(1, 'day').toDate(),
    disablePast: dayjs().startOf('day').subtract(12, 'month').toDate(),
  };

  // 初始化组，从缓存或后端获取
  const group = localStorage.getItem(groupName.value);
  if (group && group !== 'undefined') {
    mergeDeduplicationGroupList(group);
    const seledId = localStorage.getItem(seledGroup.value);
    if (!propId.value && seledId && seledId !== 'undefined') {
      nowActiveFleetId.value = seledId;
    }
  } else {
    store.dispatch('getUserConfigurationInfo').then((res: any) => {
      let name = '';
      let nameId = '';
      switch (groupName.value) {
        case 'VEHICLEGROUP':
          name = 'vehicleGroup';
          nameId = 'vehicleGroupId';
          break;
        case 'CHARGERGROUP':
          name = 'chargerGroup';
          nameId = 'chargerGroupId';
          break;
        case 'STATIONGROUP':
          name = 'stationGroup';
          nameId = 'stationGroupId';
          break;
      }

      if (res.data && res.data[name]) {
        mergeDeduplicationGroupList(res.data[name]);
        if (res.data[nameId]) {
          nowActiveFleetId.value = res.data[nameId];
        }
      }
    });
  }
});

// 组件挂载时计算分组宽度
onMounted(() => {
  computedGroupWidth();
  window.addEventListener('resize', computedGroupWidth);
});

// 组件销毁前移除事件监听
onBeforeUnmount(() => {
  window.removeEventListener('resize', computedGroupWidth);
});

// 计算分组宽度
function computedGroupWidth() {
  nextTick(() => {
    const widthDateType = ifShowDateTypeBtnGroup.value
      ? document.querySelector('.date_type_list_group')?.clientWidth || 0
      : 0;
    const widthDate = (ifShowDateTypeBtnGroup.value || dateConfig.ifShowDateSel)
      ? document.querySelector('.base_filter_date_sel')?.clientWidth || 0
      : 0;
    const widthTree = haveTree.value
      ? document.querySelector('.show_vehicle_jump_box')?.clientWidth || 0
      : 0;
    const widthSelect = filterConfig
      ? document.querySelector('.el-select')?.clientWidth * filterConfig.length || 0
      : 0;
    const widthGroup = document.querySelector('.hw_base_filter_box')?.clientWidth || 0;
    const maxWidth = widthGroup - widthDateType - widthDate - widthTree - widthSelect - 20;

    if (haveTree.value) {
      maxGroupItemWidth.value = maxWidth / groupList.value.length;
    }
  });
}

// 切换日期类型
function changeDateType(val: string) {
  nowSeledDateType.value = val;
  if (val === 'date') {
    nowSeledDateTypeDefaultValue.value = new Date();
    formatType.value = 'month,dd';
    pickerOptions.value = {
      disableFuture: new Date(),
      disablePast: new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000),
    };
  } else if (val === 'week') {
    nowSeledDateTypeDefaultValue.value = new Date();
    formatType.value = 'yyyy-MM-dd';
    pickerOptions.value = {
      disableFuture: new Date(),
      disablePast: new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000),
    };
  } else if (val === 'month') {
    nowSeledDateTypeDefaultValue.value = new Date();
    formatType.value = 'yyyy-MM';
    pickerOptions.value = {
      disableFuture: new Date(),
      disablePast: new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000),
    };
  }
  emits('changeType', val);
}

// 不关闭树弹窗的标志
const ifCloseVehicleTree = ref(true);

// 关闭树弹窗
function closeBox() {
  if (!showVehicleTree.value) {
    return false;
  }

  // 在下一次 DOM 更新后设置弹窗状态
  nextTick(() => {
    showVehicleTree.value = !ifCloseVehicleTree.value;

    // 延迟一段时间后再次设置标志位，确保关闭逻辑正常
    setTimeout(() => {
      ifCloseVehicleTree.value = true;
    }, 10);
  });
}

// 打开或关闭树弹窗
function showTreeJumpBox() {
  showVehicleTree.value = !showVehicleTree.value;
}

// 合并去重groupList
function mergeDeduplicationGroupList(newData: any) {
  if (groupName.value === 'VEHICLEGROUP') {
    groupList.value = _.uniqBy([...JSON.parse(newData), ...groupList.value], 'id');
  } else {
    groupList.value = JSON.parse(newData).slice(0, 6);
  }
  const fullFleetRow = groupList.value.find((item: any) => item.id === 'FULLFLEET');
  if (fullFleetRow) {
    fullFleetRow.name = 'mainPage.fullFleet';
  }
}

// 切换选中的车辆组/充电机组/充电站组
function changeVehicleGroup(fleetId: string, isGroup: boolean) {
  nowActiveFleetId.value = fleetId;
  if (isGroup) {
    emits('changeGroupIdChange', fleetId);
  }
  localStorage.setItem(seledGroup.value, fleetId);
  if (seledGroup.value === 'selected_vehicle_group') {
    store.commit('SET_GROUPVEHICLEID', fleetId);
    store.commit('SET_PARAMS_NAME', 'vehicleGroupId');
  } else if (seledGroup.value === 'selected_charger_group') {
    store.commit('SET_GROUPCHARGERID', fleetId);
    store.commit('SET_PARAMS_NAME', 'chargerGroupId');
  } else {
    store.commit('SET_GROUPSTATIONID', fleetId);
    store.commit('SET_PARAMS_NAME', 'stationGroupId');
  }
  store.commit('SET_PAREMS_VALUE', fleetId);
  store.dispatch('setUserConfigurationInfo');
}

// 获取选中的日期
function getSelDate(val: any) {
  emits('datePickedValue', val);
}

// 获取选中的车辆/充电机/充电站
function getTreeIds(val: any) {
  emits('changeTreeSeled', val);

  // 如果不是全量车辆，执行一些操作
  if (!isAllVehicle.value) {
    // 根据不同的组类型进行设置
    if (seledGroup.value === 'selected_vehicle_group') {
      store.commit('SET_PARAMS_NAME', 'handleVehicleTree');
      localStorage.setItem('handleSelVehicleTree', JSON.stringify(val));
    } else if (seledGroup.value === 'selected_charger_group') {
      store.commit('SET_PARAMS_NAME', 'handleChargerTree');
      localStorage.setItem('handleSelChargerTree', JSON.stringify(val));
    } else {
      store.commit('SET_PARAMS_NAME', 'handleStationTree');
      localStorage.setItem('handleSelStationTree', JSON.stringify(val));
    }

    store.commit('SET_PAREMS_VALUE', JSON.stringify(val));
    store.dispatch('setUserConfigurationInfo');
    changeVehicleGroup('tree', false);
  }
}

// 设置车辆/充电机分组
function setVehicleChargerGroupObj(obj: any) {
  classificationGroup(obj);
}

// 添加缓存并保存至后端
function setLocalAndToBackSave(data: any) {
  localStorage.setItem(groupName.value, JSON.stringify(data));
  if (groupName.value === 'VEHICLEGROUP') {
    store.commit('SET_PARAMS_NAME', 'vehicleGroup');
  } else if (groupName.value === 'CHARGERGROUP') {
    store.commit('SET_PARAMS_NAME', 'chargerGroup');
  } else {
    store.commit('SET_PARAMS_NAME', 'stationGroup');
  }
  store.commit('SET_PAREMS_VALUE', JSON.stringify(data));
  store.dispatch('setUserConfigurationInfo');
}

// 设置车辆分组分类方法
function classificationGroup(obj: any) {
  const data = groupList.value;
  const indexFalse = _.findIndex(data, (item: any) => {
    return !item.ifShow;
  });

  if (indexFalse > -1 && indexFalse !== 0) {
    data[0].seledTreeNode = obj.allSeledArr;
    data[indexFalse].ifShow = true;
    data[indexFalse].name = obj.name;
    data[indexFalse].seledTreeNode = obj.seledArr;
  } else if (indexFalse === 0) {
    data[0].ifShow = true;
    data[1].ifShow = true;
    data[1].name = obj.name;
    data[0].seledTreeNode = obj.allSeledArr;
    data[1].seledTreeNode = obj.seledArr;
  } else {
    data[0].seledTreeNode = obj.allSeledArr;
    data[1].name = obj.name;
    data[1].seledTreeNode = obj.seledArr;
    const firstGroup = data.splice(1, 1);
    data.push(firstGroup[0]);
  }

  groupList.value = data;
  setLocalAndToBackSave(data);
}

// 删除分组
function deleteNowGroup(id: string) {
  groupList.value.forEach((item: any) => {
    if (item.id === id) {
      item.ifShow = false;
      item.name = '';
      item.seledTreeNode = [];
    }
  });

  setLocalAndToBackSave(groupList.value);
}

// 选择框change事件
function selectChange(item: any) {
  emits('selectChange', item);
}

// ... 其他方法 ...

</script>
