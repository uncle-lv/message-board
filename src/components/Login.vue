<template>
  <div v-if="!isLogin">
    <v-btn icon
           title="使用QQ登录"
           @click="thirdLogin('qq')">
      <v-icon>mdi-qqchat</v-icon>
    </v-btn>

    <!-- <v-btn icon
               title="使用微信登录">
          <v-icon>mdi-wechat</v-icon>
        </v-btn> -->
  </div>
</template>

<script>

</script>

<style scoped>
</style>
