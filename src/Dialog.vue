<template>
  <transition name="vivid" :duration="600">
    <div v-if="visible" class="vivid-dialog__wrap" :style="wrapStyle">
      <div
        class="vivid-dialog__overlay"
        :style="overlayStyle"
        @click="onClickOverlay"
      ></div>

      <div ref="dialog" class="vivid-dialog" :style="dialogStyle">
        <div class="vivid-dialog__header">
          <slot name="header">
            <h3 class="vivid-dialog__title">{{ title }}</h3>
          </slot>
        </div>
        <div class="vivid-dialog__content">
          <slot>{{ content }}</slot>
        </div>

        <div v-if="footer" class="vivid-dialog__footer">
          <slot name="footer">
            <component
              v-if="footer.cancel"
              v-bind:is="btnComponent"
              @click="handleCancel"
              >取消</component
            >
            <component
              v-if="footer.ok"
              primary
              :loading="okLoading"
              :disabled="okLoading ? 'disabled' : undefined"
              v-bind:is="btnComponent"
              @click="handleOK"
              >确定</component
            >
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Button from "./Button";

export default {
  name: "vivid-dialog",
  components: {
    "vivid-dialog-btn": Button
  },
  props: {
    btnComponent: {
      type: [String, Object],
      default: "vivid-dialog-btn"
    },
    content: {
      type: String,
      default: ""
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    destoryOnClosed: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Object,
      default: () => ({ ok: true, cancel: true })
    },
    maxWidth: {
      type: String,
      default: "400px"
    },
    overlay: {
      type: Boolean,
      default: true
    },
    onOK: {
      type: Function,
      default: undefined
    },
    onCancel: {
      type: Function,
      default: undefined
    },
    title: {
      type: String,
      default: ""
    },
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "400px"
    },
    zIndex: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      okLoading: false,
      visible: false
    };
  },
  watch: {
    value(value) {
      this.clearAnimation();
      this.visible = value;
    }
  },
  computed: {
    wrapStyle() {
      return {
        zIndex: this.zIndex,
        textAlign: "left"
      };
    },
    dialogStyle() {
      return {
        width: this.width,
        maxWidth: this.maxWidth
      };
    },
    overlayStyle() {
      return {
        backgroundColor: this.overlay ? undefined : "transparent"
      };
    }
  },
  methods: {
    close() {
      this.clearAnimation();
      this.visible = false;
      this.$emit("input", false);

      if (this.destoryOnClosed) {
        this.$nextTick(this.$destroy);
      }
    },
    clearAnimation() {
      this.$refs.dialog &&
        this.$refs.dialog.getAnimations().forEach((animation) => {
          animation.cancel();
        });
    },
    onClickOverlay() {
      this.closeOnClickOverlay && this.close();

      if (!this.closeOnClickOverlay && this.visible) {
        const el = this.$refs.dialog;
        el.classList.add("headShake");
        el.addEventListener(
          "animationend",
          () => {
            el && el.classList.remove("headShake");
          },
          { once: true }
        );
      }
    },
    handleCancel() {
      if (typeof this.onCancel !== "function") {
        this.close();
        return;
      }

      this.onCancel(this.close);
    },
    async handleOK() {
      if (typeof this.onOK !== "function") {
        this.close();
        return;
      }

      this.okLoading = true;
      try {
        await this.onOK(this.close);
      } catch (error) {
        console.error(error);
      } finally {
        this.okLoading = false;
      }
    }
  }
};
</script>

<style lang="scss">
.vivid-dialog__wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.vivid-dialog__overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba($color: #000000, $alpha: 0.2);
}
.vivid-dialog {
  position: relative;
  background-color: #fff;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0px 1px 11px rgba(72, 72, 72, 0.2),
    0px 1px 20px rgba(152, 152, 152, 0.2);
}

.vivid-dialog__header {
  padding: 20px 20px 10px;
}
.vivid-dialog__title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  padding: 0;
}
.vivid-dialog__content {
  padding: 10px 20px 20px;
  font-size: 14px;
}
.vivid-dialog__footer {
  padding: 0 20px 20px;
  display: flex;
  justify-content: center;
}
.vivid-dialog-btn {
  height: 40px;
  width: 100%;
  display: inline-block;
}
.vivid-dialog-btn + .vivid-dialog-btn {
  margin-left: 10px;
}

.vivid-enter-active {
  .vivid-dialog__overlay {
    transition: all 0.5s;
  }
  .vivid-dialog {
    transition: all 0.4s cubic-bezier(0.44, 0.03, 0.33, 1.76);
  }
  .vivid-dialog__header,
  .vivid-dialog__content,
  .vivid-dialog__footer > *:first-child,
  .vivid-dialog__footer > *:nth-child(2) {
    transition: all 0.4s cubic-bezier(0.44, 0.03, 0.33, 1.6);
  }

  .vivid-dialog__header {
    transition-delay: 0.05s;
  }
  .vivid-dialog__content {
    transition-delay: 0.1s;
  }
  .vivid-dialog__footer > *:first-child {
    transition-delay: 0.2s;
  }
  .vivid-dialog__footer > *:nth-child(2) {
    transition-delay: 0.25s;
  }
}

.vivid-leave-active {
  .vivid-dialog__overlay {
    transition: all 0.2s 0.4s;
  }
  .vivid-dialog {
    transition: all 0.4s 0.2s cubic-bezier(0.62, -0.66, 0.53, 1.13);
  }
  .vivid-dialog__header,
  .vivid-dialog__content,
  .vivid-dialog__footer > *:first-child,
  .vivid-dialog__footer > *:nth-child(2) {
    transition: all 0.4s cubic-bezier(0.62, -0.66, 0.53, 1.13);
  }

  .vivid-dialog__header {
    transition-delay: 0.09s;
  }
  .vivid-dialog__content {
    transition-delay: 0.06s;
  }
  .vivid-dialog__footer > *:first-child {
    transition-delay: 0.03s;
  }
  .vivid-dialog__footer > *:nth-child(2) {
  }
}

.vivid-enter,
.vivid-leave-to {
  .vivid-dialog__overlay {
    opacity: 0;
  }
  .vivid-dialog {
    opacity: 0;
    transform: scale(0.5);
  }
  .vivid-dialog__header,
  .vivid-dialog__content,
  .vivid-dialog__footer > *:first-child,
  .vivid-dialog__footer > *:nth-child(2) {
    opacity: 0;
    transform: scale(0.6);
  }
}

@keyframes headShake {
  0% {
    transform: translateX(0);
  }

  6.5% {
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    transform: translateX(0);
  }
}

.headShake {
  animation-timing-function: ease-in-out;
  animation-name: headShake;
  animation-duration: 0.6s;
  animation-fill-mode: both;
}
</style>
