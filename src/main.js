import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

require('typeface-open-sans')
import '@/assets/css/tailwind.css'

Vue.config.productionTip = false

new Vue({
	render: function(h) {
		return h(App)
	}
}).$mount('#app')
