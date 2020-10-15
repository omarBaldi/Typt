<template>
  <v-container fluid fill-height class="ma-0 pa-0">
    
    <Menu/>

    <!-- Difficulty levels -->
    <v-row style="height: 100%;" class="justify-center align-center text-center">
        <v-col
        cols="4"
        v-for="(level, i) in levels"
        :key="i"
        class="containerLevelDifficulty"
        @click="chooseLevel(level)"
        >
          <div class="levelDifficulty">
            <h2 class="mb-3">{{level.difficulty}}</h2>
            <div class="levelStats">
              <div v-if="totalStarsAcquired < level.starsToUnlock">
                <h6>{{level.starsToUnlock}}<v-icon small class="mr-3 ml-2" color="white">mdi-star</v-icon>to unclock this level</h6>
                 <hr class="mt-6 mb-6">
                <h6>{{level.starsToUnlock - totalStarsAcquired}} stars left</h6>
              </div>
            </div>
          </div>

        </v-col>
    </v-row>
   
  </v-container>
</template>

<script>
import axios from 'axios'
import Menu from '../components/Menu'

export default {
  name: 'Dashboard',
  components: {
    Menu
  },
  data() {
    return {
      levels: null,
      totalStarsAcquired: 0
    }
  },
  created() {
    this.retrieveLevels();
  },
  methods: {
    async retrieveLevels() {

      const currentUser = JSON.parse(localStorage.currentUser);

      try {
        const response = await axios.get('/api/game/levels', { params: { ID: currentUser.ID }});
        const { levels, totalStarsAcquired } = response.data;
        this.levels = levels;
        this.totalStarsAcquired = totalStarsAcquired;
      } 
      catch(err) {
        console.log(`Error occuring during updating sentence: ${err}`);
      }
      
    },
    chooseLevel(currentLevel) {
      if (this.totalStarsAcquired < currentLevel.starsToUnlock) return 
      this.$router.push(`/game/${currentLevel.difficulty}`);
    }
  }
}
</script>

<style scoped>
  .containerLevelDifficulty {
    position: relative; 
    border-right: 1px solid #636e72; 
    height: 100%;
    background-color: #2d3436;
    color: #ffffff;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
  .containerLevelDifficulty:hover {
    background-color: #1e272e;
  }
  .levelDifficulty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    letter-spacing: 6px;
    text-transform: uppercase;
    font-size: 1.2em;
  }
  .levelStats {
    margin-top: 10%;
    line-height: 35px;
  }
  .containerLevelDifficulty .levelDifficulty h2 {
    transition: all 0.6s ease-in-out;
  }
</style>
