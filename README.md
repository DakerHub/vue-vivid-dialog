# vue-vivid-dialog

![demo]('./static/vivid-dialog-example.gif')

生动活泼的 vue2.x 模态框组件，让用户因弹框爱上你的页面！

## 开始

在你的 vue 项目下

```sh
$ npm install vue-vivid-dialog
# yarn add vue-vivid-dialog
```

### 使用组件形式

```js
import VividDialog from "vue-vivid-dialog";

export default {
  components: {
    VividDialog
  },
  data() {
    return {
      visible: false
    };
  }
};
```

```html
<dialog
  v-model="visible"
  width="80vw"
  title="Handsup"
  content="BiuBiuBiu!"
  :closeOnClickOverlay="false"
  :onOK="onOK"
></dialog>
```

然后控制`visible`来展示弹框吧！

### 方法调用

```js
import { MessageBox } from "vue-vivid-dialog";

MessageBox({
  title: "DAKER",
  content: "THIS IS VUE!",
  width: "80vw",
  overlay: true,
  closeOnClickOverlay: false,
  onOK: close => {
    return new Promise(r => {
      setTimeout(() => {
        r();
        close();
      }, 1000);
    });
  }
});
```

### 自定义按钮组件

`vue-vivid-dialog`提供了默认的基础按钮，如果你觉得需要替换为你自己的按钮组件，只需要传入`btnComponent`即可。

你可以传入一个全局组件名，

```html
<dialog btnComponent="my-button"></dialog>
```

或者之间传入组件

```html
<dialog :btnComponent="getMyButton()"></dialog>
```

```js
import MyButton from "./MyButton.vue";

export default {
  methods: {
    getMyButton() {
      return MyButton;
    }
  }
};
```

## 选项

| 参数名              | 描述                 | 类型          | 默认值                |
| ------------------- | -------------------- | ------------- | --------------------- |
| value/v-model       | 是否显示弹框         | Boolean       | false                 |
| btnComponent        | 按钮组件             | String,Object | "vivid-dialog-btn"    |
| content             | 弹框内容             | String        | ""                    |
| closeOnClickOverlay | 点击遮罩是否关闭弹窗 | Boolean       | true                  |
| footer              | 弹窗底部组件         | Object,null   | {ok:true,cancel:true} |
| overlay             | 是否显示遮罩层       | Boolean       | true                  |
| onOK                | 点击确认回调         | Function      | undefined             |
| onCancel            | 点击取消回调         | Function      | undefined             |
| title               | 弹框标题             | String        | ""                    |
| width               | 弹框宽度             | String        | "400px"               |
| zIndex              | 弹框 z-index 属性    | Number        | 1000                  |

## 许可

MIT
