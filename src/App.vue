<!--
 * @Descripttion: 
 * @Author: sjq
 * @Date: 2020-04-28 17:13:54
 * @LastEditors: sjq
 * @LastEditTime: 2020-06-03 18:42:20
 -->
<template>
  <div id="app">
    <canvas
      @mousedown="mouseDown"
      @mousemove="mouseMove"
      @mouseup="mouseUp"
      @touchend="touchEnd"
      @touchmove="touchMove"
      @touchstart="touchStart"
      height="570"
      id="canvas"
      ref="canvas"
      width="940"
    ></canvas>
    <br />
    <div class="fn-box">
      <button @click="getPicker">取色</button>
      <button @click="overwrite">重写</button>
      <button @click="back">后退一步</button>
      <button @click="downImage">下载图片</button>
    </div>
    <pickerColor :color.sync="color" :type="'sketch'" class="picker-color" v-if="pickerVisible"></pickerColor>
  </div>
</template>

<script>
import pickerColor from '@/components/pickerColor'

export default {
  name: 'App',
  components: {
    pickerColor
  },
  data () {
    return {
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,
      color: "#f0f",
      linewidth: 3,
      isDraw: false, //签名标记,
      img: '',//图片
      pickerVisible: false,//取色器显示隐藏
    }
  },
  mounted () {
    const canvas = document.getElementById("canvas");
    clearInterval()
    const context = canvas.getContext('2d')
    this.canvasTxt = context

    let img = new Image()
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = 'http://cdn.puxinonline.com//dfkt/M00/22/DD/PaDqM1hQ3uiAAPrwAABfHb4f-ng003.jpg'
    img.onload = () => {
      if (img.complete) {
        canvas.setAttribute('width', img.width)
        canvas.setAttribute('height', img.height)
        context.drawImage(img, 0, 0, img.width, img.height)
        this.canvasTxt.strokeStyle = this.color;
        this.canvasTxt.lineWidth = this.linewidth;
        this.img = img
      }
    }

  },
  computed: {

  },
  watch: {
    color () {
      this.canvasTxt.strokeStyle = this.color;
      this.pickerVisible = false//颜色改变后消失
    }
  },
  methods: {
    // 取色
    getPicker () {
      this.pickerVisible = true
    },
    // 下载
    downImage () {
      let canvas = document.getElementById('canvas')
      var save_url = canvas.toDataURL("image/png");
      var a = document.createElement('a')
      document.body.appendChild(a)
      a.href = save_url
      a.download = "签名"
      a.click()
    },
    //电脑设备事件
    mouseDown (ev) {
      ev = ev || event;
      ev.preventDefault();

      let obj = {
        x: ev.offsetX,
        y: ev.offsetY
      };
      this.startX = obj.x;
      this.startY = obj.y;

      this.canvasTxt.beginPath();//开始作画
      this.points.push(obj);//记录点
      this.isDown = true;
    },
    //电脑设备事件
    mouseMove (ev) {
      ev = ev || event;
      ev.preventDefault();
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.moveTo(this.startX, this.startY);//移动画笔
        this.canvasTxt.lineTo(obj.x, obj.y);//创建线条
        this.canvasTxt.stroke();//画线
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);//记录点
      }
    },
    //电脑设备事件
    mouseUp (ev) {
      ev = ev || event;
      ev.preventDefault();
      if (this.color) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.canvasTxt.closePath();//收笔
        this.points.push(obj);//记录点
        this.points.push({ x: -1, y: -1 });
        this.isDown = false;
      }
    },

    //移动设备事件
    touchStart (ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        this.isDraw = true; //签名标记
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvas.offsetHeight * 0.1)
        }; //y的计算值中：document.body.offsetHeight*0.5代表的是除了整个画板signatureBox剩余的高，this.$refs.canvas.offsetHeight*0.1是画板中标题的高
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();//开始作画
        this.points.push(obj);//记录点
      }
    },
    //移动设备事件
    touchMove (ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvas.offsetHeight * 0.1)
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.moveTo(this.startX, this.startY);//移动画笔
        this.canvasTxt.lineTo(obj.x, obj.y);//创建线条
        this.canvasTxt.stroke();//画线
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);//记录点
      }
    },
    //移动设备事件
    touchEnd (ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvas.offsetHeight * 0.1)
        };
        this.canvasTxt.closePath();//收笔
        this.points.push(obj);//记录点
        this.points.push({ x: -1, y: -1 });//记录点
      }
    },
    //重写
    overwrite () {
      this.canvasTxt.drawImage(
        this.img,
        0,
        0,
        this.$refs.canvas.width,
        this.$refs.canvas.height
      );
      this.points = [];
      this.isDraw = false; //签名标记
    },
    // 后退一步
    back () {
      this.points.splice(this.points.length - 3, 2)
      this.points.push({ x: -1, y: -1 })
    }
  }

};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#canvas {
  border: solid 1px #000;
}
.fn-box button {
  margin-right: 10px;
}
</style>
