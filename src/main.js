import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate";
import store from './store'
import router from './router'
import dateFilter from './filters/date.filters'
import currencyFilter from './filters/currency.filter'
import Loader from "./components/app/Loader";
import './registerServiceWorker'
import messagePlugin from './utils/message.plugin'
import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
// import {initializeApp} from "firebase";


Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader',Loader)

firebase.initializeApp ({
  apiKey: "AIzaSyBsldHOQrTP9hIuNK-sqJ_3I6sUpTV02tw",
  authDomain: "vue-crm-project-new.firebaseapp.com",
  databaseURL: "https://vue-crm-project-new.firebaseio.com",
  projectId: "vue-crm-project-new",
  storageBucket: "vue-crm-project-new.appspot.com",
  messagingSenderId: "375152807281",
  appId: "1:375152807281:web:bc6c302e0247bf27f5fad0",
  measurementId: "G-HYMX20RW16"
})

let app

firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

