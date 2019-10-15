// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import { codemirror } from 'vue-codemirror'
import './assets/style/index.less';
import 'codemirror/lib/codemirror.css'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui'

Vue.use(Element)
Vue.use(codemirror)
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
