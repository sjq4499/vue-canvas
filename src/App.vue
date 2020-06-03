<!--
 * @Descripttion: 
 * @Author: sjq
 * @Date: 2020-04-28 17:13:54
 * @LastEditors: sjq
 * @LastEditTime: 2020-06-03 14:26:23
 -->
<template>
  <div id="app"></div>
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
</style>
