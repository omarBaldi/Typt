<template>
  <v-container fluid fill-height class="ma-0 pa-0" id="mainGame">

    <Menu/>

    <!-- Message -->
    <v-alert
      v-model="alert"
      :color="messageObj.color"
      border="left"
      elevation="2"
      colored-border
      :icon="messageObj.icon"
      id="messageGame"
      transition="scale-transition"
      >
      {{messageObj.message}}
    </v-alert>

    <!-- Challenges -->
    <v-row style="height: 100%;" class="justify-center align-center mr-6 ml-6">
      <v-col 
        cols="4" 
        v-for="(challenge, index) in challenges" 
        :key="index"
        class="mt-12 mb-12"
        >

          <Challenge 
            :challenge="challenge" 
            :index="index" 
            @openBlackBoardEmit="openBlackBoard"
          />  

      </v-col>
    </v-row>

    <!-- Blackboard -->
    <BlackBoard 
      :showBlackBoard="showBlackBoard"
      @closeBlackBoardEmit="closeBlackBoard"
      @updateMessageGameEmit="updateMessageGame"
    />

  </v-container>
</template>

<script>
import axios from 'axios'
import Menu from '../components/Menu'
import Challenge from '../components/Challenge'
import BlackBoard from '../components/BlackBoard'

export default {
  name: 'Game',
  components: {
    Menu,
    Challenge,
    BlackBoard
  },
  data() {
    return {
      alert: false,
      challenges: null,
      showBlackBoard: false,
      messageObj: {
        message: null,
        icon: null,
        color: null
      }
    }
  },
  created() {
    this.retrieveChallenges(this.$route.params.difficulty);
  },
  methods: {
    async retrieveChallenges(currentLevel) {

      const currentUser = JSON.parse(localStorage.currentUser);

      try {
        const response = await axios.get(`/api/game/${currentLevel}`, { params: { ID: currentUser.ID }});
        this.challenges = response.data.arrayChallenges;
        console.log(this.challenges)
      } catch(err) {
        console.log(`Error occuring during retrive sentences: ${err}`);
      }
    },
    openBlackBoard() {
      this.showBlackBoard = true;
    },
    closeBlackBoard() {
      this.showBlackBoard = false
    },
    updateMessageGame(value) {
      if (value === 'W') {
        this.messageObj.message = 'Congratulations, you WON! Refresh to see the changes!'
        this.messageObj.icon = 'mdi-thumb-up'
        this.messageObj.color = 'green'
      } else {
        this.messageObj.message = 'You have been too SLOW! Try it again!'
        this.messageObj.icon = 'mdi-thumb-down'
        this.messageObj.color = 'red'
      }

      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 2500);
    }
  }
}
</script>

<style>
  #messageGame {
    position: fixed;
    top: 10%; 
    left: 50%;
    transform: translate(-50%, -10%);
    z-index: 9999;
  }
</style>