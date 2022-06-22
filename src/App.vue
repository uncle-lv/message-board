<template>
  <v-app>
    <div class="background"></div>
    <div class="main-div">
      <!-- <aplayer mini
               float
               mutex
               autoplay
               class="player"
               :music="{
    title: '水星记',
    artist: '郭顶',
    src: 'http://music.163.com/song/media/outer/url?id=441491828.mp3',
    pic: 'http://p1.music.126.net/wSMfGvFzOAYRU_yVIfquAA==/2946691248081599.jpg?param=130y130'
  }" /> -->
      <app-header :initData="initData"
                  :items="items"
                  class="mb-5"></app-header>
      <message-waterfall :initData="initData"
                         :items="items"></message-waterfall>
    </div>
  </v-app>
</template>

<script>
// import Aplayer from 'vue-aplayer'

import MessageWaterfall from './components/MessageWaterfall';
import AppHeader from './components/AppHeader';

export default {
  name: 'App',

  components: {
    AppHeader,
    MessageWaterfall
    // Aplayer
  },

  data () {
    return {
      items: []
    }
  },

  computed: {
    isLogin () {
      return ((localStorage.getItem('access_token') === null) || (localStorage.getItem('access_token') === undefined)) ? false : true;
    }
  },

  methods: {
    initData () {
      let social_uid = '';
      if (this.isLogin) {
        social_uid = JSON.parse(localStorage.getItem('userInfo')).social_uid;
      }

      this.axios.get(`/messages?social_uid=${social_uid}`).then((response) => {
        this.items = response.data
      })
    }
  }
};
</script>

<style scoped>
.player {
  position: fixed;
  top: 9%;
  opacity: 0.7;
}

.background {
  background: url("./static/logo.svg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

.main-div {
  margin: 5px;
  font-family: Helvetica, sans-serif;
}
</style>
