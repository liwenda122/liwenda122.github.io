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
