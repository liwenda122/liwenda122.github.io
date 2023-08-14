<template>
  <div class="hw_base_filter_box">
    <!-- 车辆树 -->
    <el-popover
      :ref="'popover-filter-tree'"
      placement="bottom-start"
      trigger="click"
      transition
      popper-class="tree-popper-bottom"
      v-model="showVehicleTree"
    >
      <!-- 车辆树 -->
      <hw-sync-vehicle-tree
        v-if="ifVehicleTree && haveTree && !ifChargeStationTree"
        :isAllVehicle="isAllVehicle"
        :propId="propId"
        @getVehiclesArr="getTreeIds"
        @closeTreeJumpBox="showVehicleTree = false"
        @noCloseTreeJump="noCloseTreeJump"
        @saveVehicleGroup="setVehicleChargerGroupObj"
      ></hw-sync-vehicle-tree>
      <!-- 充电机树 -->
      <hw-sync-charger-tree
        v-if="haveTree && !ifVehicleTree && !ifChargeStationTree"
        @getChargersArr="getTreeIds"
        @closeTreeJumpBox="showVehicleTree = false"
        @noCloseTreeJump="noCloseTreeJump"
        @saveChargerGroup="setVehicleChargerGroupObj"
      ></hw-sync-charger-tree>
      <!-- 充电站树 -->
      <hw-sync-station-tree
        v-if="ifChargeStationTree"
        @getStationsArr="getTreeIds"
        @closeTreeJumpBox="showVehicleTree = false"
        @noCloseTreeJump="noCloseTreeJump"
        @saveStationGroup="setVehicleChargerGroupObj"
      ></hw-sync-station-tree>
    </el-popover>
    <div class="hw_base_filter">
      <!-- 通过日期类型选择框配置日期显示，
      该日期选择框只有在ifShowDateTypeBtnGroup为true时才显示默认是false，
      页面需要这种类型的日期选择框时传入改参数，一般不用传 -->
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

      <el-date-picker
        size="small"
        :have-data-icon="false"
        :format="formatType"
        v-if="ifShowDateTypeBtnGroup"
        class="base_filter_date_sel circle-date"
        :clearable="false"
        v-model="nowSeledDateTypeDefaultValue"
        :type="nowSeledDateType"
        @change="getSelDate"
        :key="nowSeledDateType"
        :picker-options="pickerOptions"
      >
      </el-date-picker>

      <!-- 结束 -->
      <el-date-picker
        size="small"
        :have-data-icon="false"
        :format="formatTypeNew"
        :clearable="false"
        v-if="dateConfig.ifShowDateSel && !ifShowDateTypeBtnGroup"
        class="base_filter_date_sel"
        popper-class="datetimerange_popper"
        v-model="dateConfig.dateValue"
        :type="dateConfig.dateType"
        :range-separator="$t('mainPage.to')"
        :start-placeholder="$t('mainPage.beginDate')"
        :end-placeholder="$t('mainPage.endDate')"
        @change="getSelDate"
        :picker-options="dateConfig.pickerOptions"
        :default-time="defaultTime"
      >
      </el-date-picker>

      <!-- 树结构 -->
      <div
        class="show_vehicle_jump_box"
        v-popover="'popover-filter-tree'"
        @click="showTreeJumpBox"
        v-if="haveTree"
      >
        <span class="show_vehicle_jump_word">{{
          ifChargeStationTree
            ? $t('mainPage.chargerStationSelect')
            : ifVehicleTree
            ? $t('mainPage.fleetSelect')
            : $t('mainPage.chargerSelect')
        }}</span>
        <svg-icon
          icon-class="icondropdownoriginal"
          class="show_vehicle_jump_btn"
          :class="{ reverse: showVehicleTree }"
        ></svg-icon>
      </div>

      <!-- 自定义条件---根据传入的数组进行渲染 -->
      <div v-if="filterConfig" class="diy-fliter">
        <div
          style="margin-left: 4px; float: left"
          v-for="(val, index) in filterConfig"
          :key="index"
        >
          <keep-alive>
            <componment
              v-if="val.component !== 'elButton'"
              :ref="val.ref"
              v-model="val.value"
              :is="val.component"
              v-bind="val.filterProps"
              :placeholder="val.filterProps.placeholder"
              @change="selectChange(val)"
            >
              <!--下拉选择-->
              <template v-if="val.component === 'elSelect'">
                <el-option
                  v-for="item in val.items"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value"
                >
                </el-option>
              </template>
            </componment>
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
            <svg-icon
              icon-class="iconcloseoriginal"
              class="group_close_btn"
            ></svg-icon>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import hwSyncVehicleTree from '@/components/HwSyncVehicleTree';
  import hwSyncChargerTree from '@/components/HwSyncChargerTree';
  import hwSyncStationTree from '@/components/HwSyncChargerStationMultipleTree';
  import BaseSelect from '@/components/OCPP/BaseSelect';

  export default {
    name: 'HwBaseFilter',
    components: {
      hwSyncVehicleTree,
      hwSyncChargerTree,
      hwSyncStationTree,
      BaseSelect,
    },
    props: {
      isAllVehicle: {
        // 是否是全量树--主要是用于特殊页面（智能限速和车辆服务到期提醒页）查看所有车辆使用
        type: Boolean,
        default: false,
      },
      // 日期配置
      dateConfig: {
        type: Object,
        default() {
          return {};
        },
      },
      ifShowDateTypeBtnGroup: {
        type: Boolean,
        default: false,
      },
      // 搜索配置
      filterConfig: null,
      // 是否有树
      haveTree: {
        type: Boolean,
        default: true,
      },
      // 是否是车辆树
      ifVehicleTree: {
        type: Boolean,
        default: true,
      },
      // 是否是充电站树--多选--主要是充电机监控页面
      ifChargeStationTree: {
        type: Boolean,
        default: false,
      },
      // 缓存取值字段是车辆组/充电机组/充电站组
      groupName: {
        type: String,
        default: 'VEHICLEGROUP',
      },
      // 当前选取的组是车辆组/充电机组/充电站组
      seledGroup: {
        type: String,
        default: 'selected_vehicle_group',
      },
      defaultTime: {
        type: Array,
        default() {
          return [];
        },
      },
      /** 页面接收来自其它页面的车辆，然后回显到车辆树上 */
      propId: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        showVehicleTree: false,
        dataTypeList: [
          {
            id: 'date',
            name: 'mainPage.day',
          },
          {
            id: 'week',
            name: 'mainPage.week',
          },
          {
            id: 'month',
            name: 'mainPage.month',
          },
        ],
        nowSeledDateType: 'date',
        formatType: 'month,dd',
        formatTypeNew: '',
        nowSeledDateTypeDefaultValue: '',
        pickerOptions: {},
        groupList: [
          {
            id: 'FULLFLEET',
            name: 'mainPage.fullFleet',
            ifShow: false,
            seledTreeNode: [],
          },
          {
            id: 'FLEETONE',
            name: 'fleetOne',
            ifShow: false,
            seledTreeNode: [],
          },
          {
            id: 'FLEETTWO',
            name: 'fleetTwo',
            ifShow: false,
            seledTreeNode: [],
          },
          {
            id: 'FLEETTHREE',
            name: 'fleetThree',
            ifShow: false,
            seledTreeNode: [],
          },
          {
            id: 'FLEETFOUR',
            name: 'fleetFour',
            ifShow: false,
            seledTreeNode: [],
          },
          {
            id: 'FLEETFIVE',
            name: 'fleetFive',
            ifShow: false,
            seledTreeNode: [],
          },
          {
            id: 'FLEETSIX',
            name: 'fleetSix',
            ifShow: false,
            seledTreeNode: [],
          },
          {
            id: 'FLEETSEVEN',
            name: 'fleetSeven',
            ifShow: false,
            seledTreeNode: [],
          },
          {
            id: 'FLEETEIGHT',
            name: 'fleetEight',
            ifShow: false,
            seledTreeNode: [],
          },
          {
            id: 'FLEETNINE',
            name: 'fleetNine',
            ifShow: false,
            seledTreeNode: [],
          },
          {
            id: 'FLEETTEN',
            name: 'fleetTen',
            ifShow: false,
            seledTreeNode: [],
          },
        ],
        nowActiveFleetId: '',
        ifCloseVehicleTree: true,
        maxGroupItemWidth: 0,
      };
    },
    created() {
      this.formatTypeNew = this.dateConfig.formatType
        ? this.dateConfig.formatType
        : 'month,dd';
      this.nowSeledDateTypeDefaultValue = this.$moment()
        .startOf('day')
        .add(-1, 'day')
        .toDate();
      this.pickerOptions = {
        disableFuture: this.$moment().startOf('day').add(-1, 'day').toDate(),
        disablePast: this.$moment().startOf('day').add(-12, 'month').toDate(),
      };
      // 初始化组，缓存中有则取缓存，没有则为空
      const group = localStorage.getItem(this.groupName);
      if (group && group !== 'undefined') {
        this.mergeDeduplicationGroupList(group);
        const seledId = localStorage.getItem(this.seledGroup);
        if (!this.propId && seledId && seledId !== 'undefined') {
          this.nowActiveFleetId = seledId;
        }
      } else {
        // 增加是否是否手动清空缓存的判断，一旦手动清空缓存再打开新的页面会走这里再次请求接口重新缓存
        this.$store.dispatch('getUserConfigurationInfo').then((res) => {
          let name = '';
          let nameId = '';
          switch (this.groupName) {
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
            this.mergeDeduplicationGroupList(res.data[name]);
            if (res.data[nameId]) {
              this.nowActiveFleetId = res.data[nameId];
            }
          }
        });
      }
    },
    mounted() {
      this.$nextTick(() => this.computedGroupWidth());
      window.onresize = () => this.computedGroupWidth();
    },
    methods: {
      computedGroupWidth() /** 响应窗口变化自动计算groupList每一项宽度 */ {
        const widthDateType = this.ifShowDateTypeBtnGroup
          ? $('.date_type_list_group').outerWidth(true)
          : 0;
        const widthDate =
          this.ifShowDateTypeBtnGroup || this.dateConfig.ifShowDateSel
            ? $('.base_filter_date_sel').outerWidth(true)
            : 0;
        const widthTree = this.haveTree
          ? $('.show_vehicle_jump_box').width()
          : 0;
        const widthSelect = this.filterConfig
          ? $('.el-select').width() * this.filterConfig.length
          : 0;
        const widthGroup =
          $('.hw_base_filter_box').width() -
          widthDateType -
          widthDate -
          widthTree -
          widthSelect -
          20;

        if (this.haveTree) {
          this.maxGroupItemWidth = widthGroup / this.groupList.length;
        }
      },
      mergeDeduplicationGroupList(newData) /** 合并去重groupList */ {
        if (this.groupName === 'VEHICLEGROUP') {
          this.groupList = this._.uniqBy(
            [...JSON.parse(newData), ...this.groupList],
            'id'
          );
        } else {
          this.groupList = JSON.parse(newData);
          this.groupList = this.groupList.slice(0, 6);
        }
        const row = this.groupList.find((item) => item.id === 'FULLFLEET');
        if (row) {
          row.name = 'mainPage.fullFleet';
        }
      },
      // 点击日期类型按钮切换日期选择框
      changeDateType(val) {
        this.nowSeledDateType = val;
        if (val === 'date') {
          this.nowSeledDateTypeDefaultValue = this.$moment()
            .startOf('day')
            .add(-1, 'day')
            .toDate();
          this.formatType = 'month,dd';
          this.pickerOptions = {
            disableFuture: this.$moment()
              .startOf('day')
              .add(-1, 'day')
              .toDate(),
            disablePast: this.$moment().startOf('day').add(-1, 'year').toDate(),
          };
        } else if (val === 'week') {
          this.nowSeledDateTypeDefaultValue = this.$moment()
            .startOf('isoWeek')
            .add(-1, 'week')
            .toDate();
          this.formatType = this.$t('mainPage.weekformats');
          this.pickerOptions = {
            disableFuture: this.$moment()
              .endOf('isoWeek')
              .add(-1, 'week')
              .toDate(),
            disablePast: this.$moment().endOf('week').add(-1, 'year').toDate(),
          };
        } else if (val === 'month') {
          this.nowSeledDateTypeDefaultValue = this.$moment()
            .startOf('month')
            .add(-1, 'month')
            .toDate();
          this.formatType = 'yyyy-MM';
          this.pickerOptions = {
            disableFuture: this.$moment()
              .add(-1, 'month')
              .endOf('month')
              .toDate(),
            disablePast: this.$moment()
              .add(-1, 'year')
              .startOf('month')
              .toDate(),
          };
        }
        this.$emit('changeType', val);
      },
      // 点击分组输入框取消按钮时不关闭树弹窗--由于点击取消按钮这个动作触发了closeBox()这个事件，所以导致会同时关闭树弹窗
      // 为了避免关闭这个树弹窗添加一个变量用来控制
      noCloseTreeJump() {
        this.ifCloseVehicleTree = false;
      },
      // 点击元素外部关闭树弹窗
      closeBox() {
        if (!this.showVehicleTree) {
          return false;
        }
        // 由于该事件触发时机在最前面，所以为了能够点击“车辆组选择/充电机组选择”按钮实现开启/关闭的功能，
        // 此事件改变树弹窗状态是--延时10ms执行
        // 执行完毕后为了能够正常关闭树弹窗需要把变量恢复至原始值--10ms延时处理
        setTimeout(() => {
          this.showVehicleTree = !this.ifCloseVehicleTree;
          setTimeout(() => {
            this.ifCloseVehicleTree = true;
          }, 10);
        }, 10);
      },
      // 打开或者关闭树弹窗
      showTreeJumpBox() {
        this.showVehicleTree = !this.showVehicleTree;
      },
      // 切换选中的车辆组/充电机组/充电站组
      changeVehicleGroup(fleetId, isGroup) {
        // isGroup:是否点击的分组，是：true，否：false，主要是为了区分是分组还是手动选择
        this.nowActiveFleetId = fleetId;
        if (isGroup) {
          this.$emit('changeGroupIdChange', fleetId);
        }
        localStorage.setItem(this.seledGroup, fleetId);
        if (this.seledGroup === 'selected_vehicle_group') {
          this.$store.commit('SET_GROUPVEHICLEID', fleetId);
          this.$store.commit('SET_PARAMS_NAME', 'vehicleGroupId');
        } else if (this.seledGroup === 'selected_charger_group') {
          this.$store.commit('SET_GROUPCHARGERID', fleetId);
          this.$store.commit('SET_PARAMS_NAME', 'chargerGroupId');
        } else {
          this.$store.commit('SET_GROUPSTATIONID', fleetId);
          this.$store.commit('SET_PARAMS_NAME', 'stationGroupId');
        }
        this.$store.commit('SET_PAREMS_VALUE', fleetId);
        this.$store.dispatch('setUserConfigurationInfo');
      },
      // 获取选中的日期
      getSelDate(val) {
        this.$emit('datePickedValue', val);
      },
      // 获取选中的车辆/充电机/充电站
      getTreeIds(val) {
        this.$emit('changeTreeSeled', val);
        // 如果是车辆到期服务查询、智能限速页面则省略后面逻辑，因为这两个页面查询条件独立，不与其它页面共用。
        if (!this.isAllVehicle) {
          if (this.seledGroup === 'selected_vehicle_group') {
            this.$store.commit('SET_PARAMS_NAME', 'handleVehicleTree');
            localStorage.setItem('handleSelVehicleTree', JSON.stringify(val));
          } else if (this.seledGroup === 'selected_charger_group') {
            this.$store.commit('SET_PARAMS_NAME', 'handleChargerTree');
            localStorage.setItem('handleSelChargerTree', JSON.stringify(val));
          } else {
            this.$store.commit('SET_PARAMS_NAME', 'handleStationTree');
            localStorage.setItem('handleSelStationTree', JSON.stringify(val));
          }
          this.$store.commit('SET_PAREMS_VALUE', JSON.stringify(val));
          this.$store.dispatch('setUserConfigurationInfo');
          this.changeVehicleGroup('tree', false);
        }
      },
      // 设置车辆/充电机分组
      setVehicleChargerGroupObj(obj) {
        this.classificationGroup(obj);
      },
      // 添加缓存及回传后端保存
      setLocalAndToBackSave(data) {
        localStorage.setItem(this.groupName, JSON.stringify(data));
        if (this.groupName === 'VEHICLEGROUP') {
          this.$store.commit('SET_PARAMS_NAME', 'vehicleGroup');
        } else if (this.groupName === 'CHARGERGROUP') {
          this.$store.commit('SET_PARAMS_NAME', 'chargerGroup');
        } else {
          this.$store.commit('SET_PARAMS_NAME', 'stationGroup');
        }
        this.$store.commit('SET_PAREMS_VALUE', JSON.stringify(data));
        this.$store.dispatch('setUserConfigurationInfo');
      },
      // 设置车辆分组归类方法
      classificationGroup(obj) {
        const data = this.groupList;
        const indexFalse = this._.findIndex(data, (item) => {
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
        this.groupList = data;
        this.setLocalAndToBackSave(data);
      },
      // 删除分组
      deleteNowGroup(id) {
        this.groupList.forEach((item) => {
          if (item.id === id) {
            item.ifShow = false;
            item.name = '';
            item.seledTreeNode = [];
          }
        });
        this.setLocalAndToBackSave(this.groupList);
      },
      // 选择框change事件
      selectChange(item) {
        this.$emit('selectChange', item);
      },
    },
    beforeDestroy() {
      window.removeEventListener('onresize', () => {
        this.computedGroupWidth();
      });
    },
  };
</script>

<style lang="scss" scoped>
  .diy-fliter {
    overflow: hidden;
    float: left;
  }
  .circle-date {
    width: 160px;
  }
</style>
