<template>
  <div id="app">
    <div>Hi</div>
    <div>
      <button @click="visible = true">OPEN</button>
      <button @click="open">OPEN&CLOSE</button>
      <br />
      <br />
      <button @click="openMsg">OPEN MSG</button>
    </div>
    <Dialog
      v-model="visible"
      width="80vw"
      title="DAKER"
      content="WELCOME TO MY LAB!!"
      :closeOnClickOverlay="false"
      :onOK="onOK"
      :btnComponent="getMyButton()"
    >
    </Dialog>
  </div>
</template>

<script>
import MyButton from "./MyButton.vue";
import Dialog from "./../src/Dialog.vue";
import MessageBox from "./../src/messageBox.js";

export default {
  name: "App",
  components: {
    Dialog
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    open() {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 1000);
    },
    onOK(close) {
      close();
    },
    openMsg() {
      MessageBox({
        title: "DAKER",
        content: "THIS IS VUE!",
        width: "80vw",
        overlay: false,
        closeOnClickOverlay: false,
        onOK: (close) => {
          return new Promise((r) => {
            setTimeout(() => {
              r();
              close();
            }, 1000);
          });
        },
        onCancel: (close) => {
          console.log("cancel");
          close();
        }
      });
    },
    getMyButton() {
      return MyButton;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn {
  width: 100% !important;
  background-color: royalblue;
  border: none;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
}
</style>
