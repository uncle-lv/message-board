<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon
             v-bind="attrs"
             v-on="on">
        <v-icon>mdi-comment-edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-form>
        <v-textarea solo
                    name="input-7-4"></v-textarea>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed
               @click="dialog = false">
          <v-icon left
                  dark>mdi-close-circle</v-icon>取消
        </v-btn>
        <v-btn depressed
               color="rgba(239, 85, 100, 0.7)"
               @click="dialog = false">
          <v-icon class="icon"
                  left
                  dark>mdi-send</v-icon><span class="text">发送</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
    }
  },
}
</script>

<style scoped>
.icon {
  color: white !important;
}

.text {
  color: white;
}
</style>