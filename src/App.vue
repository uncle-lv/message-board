<template>
  <v-app>
    <div class="background"></div>
    <div class="main-div">
      <app-header class="mb-5"></app-header>
      <message-waterfall></message-waterfall>
    </div>
  </v-app>
</template>

<script>
import MessageWaterfall from './components/MessageWaterfall';
import AppHeader from './components/AppHeader';

export default {
  name: 'App',

  components: {
    AppHeader,
    MessageWaterfall
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
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
