<template>
  <div>
    <v-app-bar color="rgba(239, 85, 100, 0.7)"
               dense
               dark>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>AIChannel中国绊爱</v-toolbar-title>

      <v-spacer></v-spacer>

      <span class="total">共有<span class="font-weight-bold count">{{ total }}</span>条留言</span>

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

      <div v-else>
        <v-avatar size="28">
          <img :src="userInfo.faceimg"
               :title="userInfo.nickname">
        </v-avatar>
        <message-edit-modal title="编辑留言"></message-edit-modal>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import MessageEditModal from './MessageEditModal';
import * as types from "../store/types";

export default {
  components: {
    MessageEditModal
  },

  data () {
    return {
      total: 0,
      userInfo: null
    }
  },

  computed: {
    isLogin () {
      return ((localStorage.getItem('access_token') === null) || (localStorage.getItem('access_token') === undefined)) ? false : true;
    }
  },

  mounted: function () {
    this.axios.get('/api/total').then((response) => {
      console.log(response.data)
      this.total = response.data
    });

    console.log('userInfo', JSON.parse(localStorage.getItem('userInfo')));

    if (!this.isLogin) {
      const code = this.getCode();
      if (code) {
        this.axios.get(`/getUserInfo?code=${code}`).then((response) => {
          this.$store.commit(types.LOGIN, response.data);
        })
      }
    } else {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
  },

  methods: {
    thirdLogin (type) {
      this.axios.get(`/login?type=${type}`).then((response) => {
        const url = response.data.url;
        window.location.href = url;
      })
    },

    getCode () {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      return code;
    }
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