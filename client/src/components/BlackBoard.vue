<template>
   <v-dialog
      v-model="showBlackBoard"
      fullscreen
      hide-overlay
      scrollable
      transition="dialog-bottom-transition"
      id="blackBoard"
      >
        
        <v-container fluid fill-height id="containerChallenge" class="justify-center align-center">

          <!-- Close blackboard -->
          <v-btn
            absolute
            dark
            fab
            top
            right
            color="white"
            class="mt-12 mr-2"
            small
            @click="close"
            >
              <v-icon class="black--text">mdi-close</v-icon>
          </v-btn>

          <!-- Rating Scoreboard -->
          <v-card
            class="mx-auto"
            flat
            id="scoreBoard"
            >
             <v-list color="transparent" dense>
              <v-list-item-group>
                <v-list-item
                  v-for="(score, i) in scoresBoard"
                  :key="i"
                >

                  <v-list-item-content>
                    <v-list-item-title class="white--text" v-html="`${score.timeLimit} seconds`"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-icon>
                     <v-rating 
                     :length="score.ratingStarNumber"
                     v-model="score.ratingStarNumber"
                     readonly 
                     color="orange"
                     small
                    ></v-rating>
                  </v-list-item-icon>

                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>

          <!-- Timer -->
          <div id="timer" class="text-center white--text"></div>

          <!-- Phrase -->
          <v-card
            class="mx-auto"
            dark
            flat
            max-width="900"
            >
            <v-card-text class="headline font-weight-bold containerTextBlackboard"></v-card-text>

          </v-card>

        </v-container>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'BlackBoard',
  props: {
    showBlackBoard: {
      type: Boolean,
    }
  },
  mounted() {
    document.addEventListener('keyup', this.startGame);
  },
  computed: {
    ...mapGetters(['scoresBoard', 'isUserWon', 'showTimeLeft', 'challengeInfo'])
  },
  watch: {
    isUserWon(value) {
      if (value) {
        this.close();
        const timeSpent = this.challengeInfo.maxTime - this.showTimeLeft;
        this.updateScoreChallenge(timeSpent);
        this.$emit('updateMessageGameEmit', 'W')
      }
    },
    showTimeLeft(value) {
      if (value <= 0) {
        this.close();
        this.$emit('updateMessageGameEmit', 'L')
      }
    }
  },
  methods: {
    ...mapActions(['startPlaying']),
    startGame(e) {
      if (this.showBlackBoard) this.startPlaying(e);
    },
    async updateScoreChallenge(timeSpent) {
      try {
        const starsWon = this.checkRange(timeSpent);
        await axios.patch('/api/game/challenge', {challengeData: this.challengeInfo, starsWon});
      } catch(err) {
        console.log(`Error occuring when attempting update challange score for user: ${err}`);
      }
    },
    checkRange(timeSpent) {
      let start = 0;
      this.scoresBoard.reverse();

      for (let i = 0; i <= this.scoresBoard.length; i++) {
        if (timeSpent > start && timeSpent <= this.scoresBoard[i].timeLimit) {
          return this.scoresBoard[i].ratingStarNumber;
        }
        start = this.scoresBoard[i].timeLimit
      }
    },
    close() {
      this.$emit('closeBlackBoardEmit')
    }
  }
}
</script>

<style scoped>
  #containerChallenge {
    background-color: #2d3436;
    color: #ffffff;
  }
  .containerTextBlackboard {
    background-color: #2d3436;
    font-size: 1.5em;
    letter-spacing: 10px;
    text-transform: uppercase;
    color: lightgrey;
    line-height: 60px;
  }
  #timer {
    position: fixed;
    top: 5%;
    left: 50%;
    transform: translate(-50%, -5%);
    font-size: 3em;
  }
  #scoreBoard {
    background-color: #2d3436;
    position: fixed;
    top: 2%;
    left: 1%;
  }
</style>