<template>
  <div>
    <v-app-bar color="rgba(239, 85, 100, 0.7)"
               dense
               dark>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>AIChannel中国绊爱</v-toolbar-title>

      <v-spacer></v-spacer>

      <span class="total">共有<span class="font-weight-bold count">{{ total }}</span>条留言</span>

      <input-modal></input-modal>
    </v-app-bar>
  </div>
</template>

<script>
import InputModal from './InputModal';

export default {

  data () {
    return {
      total: 0
    }
  },

  mounted: function () {
    this.axios.get('/api/total').then((response) => {
      console.log(response.data)
      this.total = response.data
    })
  },

  components: {
    InputModal
  }
}

</script>


<style scoped>
.total {
  margin: 0 10px;
}

.count {
  margin: 0 3px;
}
</style>