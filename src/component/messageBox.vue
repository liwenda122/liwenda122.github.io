<!-- 特殊提示 -->
<template>
  <div v-if="isShowBox" class="msg-container">
    <div class="info_circle_div fl warning"></div>
    <div class="info-con">
      <slot v-if="isHandle" name="customize"> </slot>
      <span v-else class="info_word fl">{{ content }}</span>
    </div>
    <svg-icon
      icon-class="iconcloseoriginal"
      @click="closeBox"
    ></svg-icon>
  </div>
</template>

<script>
  export default {
    name: 'Msg',
    props: {
      isShowMsg: {
        type: Boolean,
        default: false,
      },
      content: {
        type: String,
        default: '',
      },
      infoType: {
        type: String,
        default: 'warning',
      },
      isHandle: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isShowBox: false,
      };
    },
    watch: {
      isShowMsg(nv) {
        this.isShowBox = nv;
      },
    },
    methods: {
      closeBox() /** 关闭弹窗 */ {
        this.$emit('update:isShowMsg', false);
      },
    },
  };
</script>

<style lang="scss" scoped>
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
    .warning {
      background: #ffd200;
    }
    .success {
      background: #8cc63f;
    }
    .error {
      background: #ff0000;
    }
    .common {
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
</style>
