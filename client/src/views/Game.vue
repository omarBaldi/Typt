<template>
  <v-container fluid fill-height class="ma-0 pa-0" id="mainGame">

    <Menu/>

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
      challenges: null,
      showBlackBoard: false
    }
  },
  created() {
    this.retrieveChallenges(this.$route.params.difficulty);
  },
  methods: {
    async retrieveChallenges(currentLevel) {

      const currentUser = JSON.parse(localStorage.currentUser);

      try {
        const response = await axios.get(`http://localhost:3000/api/game/${currentLevel}`, { params: { ID: currentUser.ID }});
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
  }
}
</script>