import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "@/store/index";

import Amplify, * as AmplifyModules from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifyPlugin } from "aws-amplify-vue";

import LottieVuePlayer from "@lottiefiles/vue-lottie-player";

Vue.config.productionTip = false;
Vue.use(AmplifyPlugin, AmplifyModules);
Vue.use(LottieVuePlayer);

Amplify.configure(awsconfig);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
