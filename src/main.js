import { createApp } from 'vue'
import App from './App.vue'
import MISAButton from './components/base/Button/MISAButton.vue'
import MISAInput from './components/base/Input/MISAInput.vue'
import router from '@/router/router.js'
import emitter from 'tiny-emitter/instance'
import MISAResource from './helpers/resources'
import MISAEnum from './helpers/enums'
import axios from 'axios'
import MISACombobox from './components/base/Combobox/MISACombobox.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);

app.component("MISAButton", MISAButton);
app.component("MISAInput", MISAInput)
app.component("MISACombobox", MISACombobox);

app.config.globalProperties.$_emitter = emitter;
app.config.globalProperties.$_MISAResource = MISAResource;
app.config.globalProperties.$_MISAEnum = MISAEnum;
app.config.globalProperties.$_axios = axios;
app.use(router);
app.use(vuetify);
app.mount('#app')
