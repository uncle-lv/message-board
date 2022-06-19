<!-- 留言瀑布流 -->
<template>
  <div>
    <Waterfall class="waterfall">
      <WaterfallItem v-for="item in items"
                     :key="item.id"
                     class="item">
        <v-card class="ma-3"
                v-bind:class="{ 'card-pink': item.color === '#F488A8', 'card-green': item.color === '#9CF0E3', 'card-red': item.color === '#EF5564'}"
                :color="item.color"
                dark
                max-width="400">
          <v-card-title>

          </v-card-title>

          <v-card-text class="headline">
            <span class="content">{{ item.content }}</span>
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img class="elevation-6"
                       :src="item.avatar_url"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.nickname }}</v-list-item-title>
              </v-list-item-content>

              <v-row align="center"
                     justify="end">
                <v-btn icon
                       class="icon">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <span class="subheading mr-2">{{ item.like }}</span>
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

  data () {
    return {
      items: []
    }
  },

  mounted: function () {
    this.axios.get('/api/messages').then((response) => {
      console.log(response.data)
      this.items = response.data
    })
  },

  methods: {

  }

}
</script>

<style scoped>
.waterfall {
  margin: 0 3%;
}

.card-red {
  background: rgba(239, 85, 100, 0.7) !important;
}

.card-pink {
  background: rgba(244, 136, 168, 0.8) !important;
}

.card-green {
  color: white !important;
  background: rgba(37, 120, 137, 0.6) !important;
}

.content {
  font-size: 1rem !important;
}

.icon:hover {
  color: #e91e63 !important;
}
</style>