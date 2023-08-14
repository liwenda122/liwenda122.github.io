<template>
  <div v-if="isShowBox" class="msg-container">
    <div class="info_circle_div fl" :class="infoType"></div>
    <div class="info-con">
      <!-- 使用 v-slot 来定义插槽内容 -->
      <template v-if="isHandle" v-slot:customize></template>
      <span v-else class="info_word fl">{{ content }}</span>
    </div>
    <svg-icon icon-class="iconcloseoriginal" @click="closeBox"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

// 使用 defineProps 来获取外部传入的属性值
const { isShowMsg, content, infoType, isHandle } = defineProps([
  'isShowMsg',    // 是否显示弹窗
  'content',      // 弹窗内容
  'infoType',     // 弹窗类型（警告、成功、错误、常规）
  'isHandle',     // 是否处理弹窗内容
]);

// 使用 ref 创建响应式变量
const isShowBox = ref(false);

// 监听 isShowMsg 属性的变化，更新 isShowBox 的值
watch(isShowMsg, (nv) => {
  isShowBox.value = nv;
});

// 定义关闭弹窗的方法
const closeBox = () => {
  // 使用 defineEmits 来获取 emit 函数，触发更新事件
  const emit = defineEmits();
  emit('update:isShowMsg', false);
};
</script>

<style lang="less" scoped>
/* 样式定义开始 */
.msg-container {
  position: absolute;
  left: 37%;
  transform: translateX(-50%);
  top: 100px;
  padding: 0 10px;
  overflow: hidden;
  border-radius: 10px 2px 2px 10px;

  .info_circle_div {
    float: left;
    width: 6px;
    height: 6px;
    margin-top: 7px;
    border-radius: 50%;
  }

  /* 根据 infoType 显示不同的背景颜色 */
  &.warning {
    background: #ffd200;
  }

  &.success {
    background: #8cc63f;
  }

  &.error {
    background: #ff0000;
  }

  &.common {
    background: #026ae3;
  }

  .info-con {
    max-width: 600px;
    float: left;
    margin: 0 10px;
    font-size: 12px;
    color: #fff;
    line-height: 20px;
    word-break: break-all;
  }

  .svg-icon {
    float: left;
    width: 16px;
    cursor: pointer;
  }
}
/* 样式定义结束 */
</style>
