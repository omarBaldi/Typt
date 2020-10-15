<template>
  <v-card
    class="mx-auto cardsChallenge"
    max-width="90%"
    flat
    >

    <v-card-text class="white--text text-start">

      <v-card-title class="ml-n4">
        <v-icon medium left class="white--text" v-if="challenge.isCompleted" color="orange">mdi-checkbox-marked-circle-outline</v-icon>
        <v-icon medium left class="white--text" v-else color="orange">mdi-checkbox-blank-circle-outline</v-icon>
        <span class="title font-weight-light">challenge #{{index}}</span>
      </v-card-title>

      <p class="display-1">{{challenge.sentence.slice(0, 10) + '...'}}</p>

      <div>
        well meaning and kindly.<br>
        "a benevolent smile"
      </div>

    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">

        <v-btn
          color="orange"
          class="ml-n3 buttonChallenge"
          text
          >
            Start!
        </v-btn>
      
        <v-row
          align="center"
          justify="end"
          class="white--text"
          >
            <v-rating
              medium
              readonly
              v-model="challenge.starsAcquired" 
              :length="3" 
              color="orange"
              background-color="white"
              >
            </v-rating>
        </v-row>

      </v-list-item>
    </v-card-actions>

  </v-card>
</template>

<script>

export default {
  name: 'Challenge',
  props: {
    challenge: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      scores: new Array()
    }
  }
}
</script>

<style scoped>
  .v-sheet.v-card:not(.v-sheet--outlined) {
    background-color: #2d3436;
    color: #ffffff;
  }
  .cardsChallenge {
    border-top: 2px solid #636e72;
    border-right: 2px solid #636e72;
  }
  .v-sheet.v-card:not(.v-sheet--outlined):hover .buttonChallenge {
    transform: scale(1.7);
  }
</style>