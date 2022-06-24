<!-- 留言瀑布流 -->
<template>
  <div class="waterfall-div">
    <Waterfall class="my-waterfall">
      <WaterfallItem v-for="item in items"
                     :key="item.id">
        <v-card class="ma-5"
                v-bind:class="{ 'card-pink': item.color === '#F488A8', 'card-green': item.color === '#9CF0E3', 'card-red': item.color === '#EF5564'}"
                dark
                min-width="350"
                max-width="350">
          <v-card-title>

          </v-card-title>

          <v-card-text class="headline">
            <span class="content">{{ item.message }}</span>
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img class="elevation-6"
                       :src="item.faceimg"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.nickname }}</v-list-item-title>
              </v-list-item-content>

              <v-row align="center"
                     justify="end">
                <v-btn icon
                       v-bind:class="[item.is_liked ? 'icon-liked' : '', 'icon']"
                       @click="like(item)">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <span class="subheading mr-2">{{ item.like_count }}</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </WaterfallItem>
    </Waterfall>
    <!-- <div class="item"
             :style="item.style"
             :index="item.index"></div> -->
  </div>
</template>

<script>
import { Waterfall, WaterfallItem } from 'vue2-waterfall';

export default {

  components: {
    Waterfall,
    WaterfallItem
  },

  props: {
    initData: {
      type: Function,
      default: function () {
        return undefined;
      }
    },

    items: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },

  computed: {
    isLogin () {
      return ((localStorage.getItem('access_token') === null) || (localStorage.getItem('access_token') === undefined)) ? false : true;
    }
  },

  data () {
    return {

    }
  },

  mounted: function () {
    this.initData();
  },

  methods: {
    like (item) {
      if (!this.isLogin) {
        this.$message.warning('请先登录');
        return;
      }

      if (item.is_liked) {
        this.$message.warning('请勿重复点赞');
        return;
      }

      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.axios.post('http://localhost:8000/like', {
        message_id: item.id,
        social_uid: userInfo.social_uid
      }).then((response) => {
        if (response.status === 200) {
          this.$message.success('点赞成功');
          this.initData();
        }
      })
    }
  }

}
</script>

<style scoped>
.waterfall-div {
  margin: 0 auto;
}

.my-waterfall {
  width: 95%;
  margin: 0 auto;
}

.card-red {
  background: rgba(239, 85, 100, 0.7) !important;
}

.card-pink {
  background: rgba(244, 136, 168, 0.8) !important;
}

.card-green {
  background: rgba(37, 120, 137, 0.6) !important;
}

.content {
  font-size: 1rem !important;
}

.icon:hover {
  color: #e91e63 !important;
}

.icon-liked {
  color: #e91e63 !important;
}
</style>