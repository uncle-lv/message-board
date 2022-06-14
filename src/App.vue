<template>
  <v-app class="app">
    <app-header class="mb-5"></app-header>
    <message-waterfall></message-waterfall>
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
.app {
  margin: 5px;
  font-family: Helvetica, sans-serif;
}
</style>
