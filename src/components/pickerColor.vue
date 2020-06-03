<!--
 * @Descripttion: 
 * @Author: sjq
 * @Date: 2020-06-03 17:02:04
 * @LastEditors: sjq
 * @LastEditTime: 2020-06-03 18:34:38
-->
<template>
  <div>
    <photoshop-picker v-if="type === 'photoshop'" v-model="colors"></photoshop-picker>
    <material-picker v-if="type === 'material'" v-model="colors"></material-picker>
    <compact-picker v-if="type === 'compact'" v-model="colors"></compact-picker>
    <swatches-picker v-if="type === 'swatches'" v-model="colors"></swatches-picker>
    <slider-picker v-if="type === 'slider'" v-model="colors"></slider-picker>
    <sketch-picker v-if="type === 'sketch'" v-model="colors"></sketch-picker>
    <chrome-picker v-if="type === 'chrome'" v-model="colors"></chrome-picker>
  </div>
</template>

<script>
import {
  Photoshop,
  Material,
  Compact,
  Swatches,
  Slider,
  Sketch,
  Chrome,
} from "vue-color";

export default {
  name: "pickerColor",
  props: {
    "color": String,
    type: {
      default: "photoshop",
    },
  },
  components: {
    "photoshop-picker": Photoshop,
    "material-picker": Material,
    "compact-picker": Compact,
    "swatches-picker": Swatches,
    "slider-picker": Slider,
    "sketch-picker": Sketch,
    "chrome-picker": Chrome,
  },
  data () {
    return {
      colors: "",
    };
  },
  methods: {},
  watch: {
    colors () {
      this.$emit("update:color", this.colors.hex);
    },
  },
};
</script>

<style></style>
