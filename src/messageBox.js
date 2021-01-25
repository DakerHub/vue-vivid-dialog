import Vue from "vue";
import Dialog from "./Dialog.vue";

const DialogConstructor = Vue.extend(Dialog);

const MessageBox = function(options) {
  if (Vue.prototype.$isServer) return;

  const _options = Object.assign({}, options, { destoryOnClosed: true });

  const instance = new DialogConstructor({
    el: document.createElement("div"),
    propsData: _options
  });

  document.body.appendChild(instance.$el);

  Vue.nextTick(() => {
    instance.visible = true;
  });
};

export default MessageBox;
