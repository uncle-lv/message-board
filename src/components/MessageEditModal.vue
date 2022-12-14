<template>
  <v-dialog v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            class="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon
             v-bind="attrs"
             v-on="on">
        <v-icon>mdi-comment-edit</v-icon>
      </v-btn>
    </template>
    <v-card class="card">
      <v-toolbar dark
                 color="rgba(239, 85, 100, 0.7)">
        <v-btn icon
               dark
               @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>编辑留言</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text
                 @click="submit">
            <v-icon class="icon"
                    left
                    dark>mdi-send</v-icon><span class="text">发送</span>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div class="wrapper">
        <textarea class="regular-input"
                  v-model="message"></textarea>

        <emoji-picker @emoji="append"
                      :search="search">
          <div class="emoji-invoker"
               slot="emoji-invoker"
               slot-scope="{ events: { click: clickEvent } }"
               @click.stop="clickEvent">
            <svg height="24"
                 viewBox="0 0 24 24"
                 width="24"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z"
                    fill="none" />
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </div>
          <div slot="emoji-picker"
               slot-scope="{ emojis, insert, display }">
            <div class="emoji-picker"
                 :style="{ top: display.y + 'px', left: display.x + 'px' }">
              <div class="emoji-picker__search">
                <input type="text"
                       v-model="search"
                       v-focus>
              </div>
              <div>
                <div v-for="(emojiGroup, category) in emojis"
                     :key="category">
                  <h5>{{ category }}</h5>
                  <div class="emojis">
                    <span v-for="(emoji, emojiName) in emojiGroup"
                          :key="emojiName"
                          @click="insert(emoji)"
                          :title="emojiName">{{ emoji }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </emoji-picker>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { EmojiPicker } from 'vue-emoji-picker'

export default {

  components: {
    EmojiPicker
  },

  props: {
    initData: {
      type: Function,
      default: function () {
        return undefined;
      }
    }
  },

  data () {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      search: '',
      message: ''
    }
  },

  methods: {
    submit () {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.axios.post('http://localhost:8000/messages', {
        nickname: userInfo.nickname,
        faceimg: userInfo.faceimg,
        gender: userInfo.gender,
        social_uid: userInfo.social_uid,
        ip: userInfo.ip,
        message: this.message
      }).then((response) => {
        if (response.status === 201) {
          this.$message.success('发送成功');
          this.dialog = false;
          this.initData();
          this.message = '';
        }
      });
    },

    append (emoji) {
      this.message += emoji
    },
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      },
    },
  }
}
</script>

<style scoped>
.card {
  width: 100%;
  text-align: center;
}

.icon {
  color: white !important;
}

.text {
  color: white;
}

.wrapper {
  position: relative;
  display: inline-block;
  width: 61%;
  height: 500px;
  margin: 5% 0;
}

.regular-input {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid #ccc;
  width: 100%;
  min-height: 80%;
  outline: none;
}

.regular-input:focus {
  box-shadow: 0 0 0 3px rgba(244, 136, 168, 0.5);
}

.emoji-invoker {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.emoji-invoker:hover {
  transform: scale(1.1);
}

.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  position: fixed;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 15rem;
  height: 20rem;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}

.emoji-picker__search {
  display: flex;
}

.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}

.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}

.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}

.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}

.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>