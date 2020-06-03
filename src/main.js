/*
 * @Descripttion:
 * @Author: sjq
 * @Date: 2020-04-28 17:13:54
 * @LastEditors: sjq
 * @LastEditTime: 2020-06-03 18:52:14
 */
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
