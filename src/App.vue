<template>
  <v-app class="app">
    <message-waterfall></message-waterfall>
  </v-app>
</template>

<script>
import MessageWaterfall from './components/MessageWaterfall';

export default {
  name: 'App',

  components: {
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
