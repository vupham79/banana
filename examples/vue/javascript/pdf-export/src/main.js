/**
 * @author Saki
 * @date 2019-03-29 22:00:22
 * @Last Modified by: Saki
 * @Last Modified time: 2019-03-29 22:01:34
 *
 * Main file
 */
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// this instance handles buttons and slider events
export const eventBus = new Vue();

new Vue({
    render: h => h(App),
}).$mount('#app');

// eof
