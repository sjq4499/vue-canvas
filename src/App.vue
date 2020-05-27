<!--
 * @Descripttion: 
 * @Author: sjq
 * @Date: 2020-04-28 17:13:54
 * @LastEditors: sjq
 * @LastEditTime: 2020-05-27 15:21:41
 -->
<template>
  <div id="app">
    <input type="text" v-model="num" />
    {{num/200*100}}%
    <div class="gradual-box">
      <div :style="{width:progressWidth}" class="progress"></div>
      <div class="white-box">
        <span :key="i" class="white-border" v-for="i in 20"></span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      num: '',
    }
  },
  computed: {
    progressWidth () {
      return (this.num / 200 * 100) + 'px'
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
.gradual-box {
  overflow: hidden;
  margin-top: 20px;
  width: 200px;
  height: 20px;
  position: relative;
  background: #000;
}
.progress {
  position: absolute;
  height: 100%;
  max-width: 200px;
  top: 0;
  left: 0;
  background-image: linear-gradient(to right, red, yellow);
}
.white-box {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
}
.white-border {
  flex: 1;
  border-right: solid 1px #fff;
}
</style>
