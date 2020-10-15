<template>
  <v-container fill-height>
    <v-row class="d-flex align-end">
      <v-col cols="6">
        <h1 class="text-uppercase">
          be
          <br> 
          a
          faster 
          <br> 
          typer.
        </h1>
      </v-col>
      <v-col cols="6" class="text-sm-left">
        <h2 class="font-weight-light">
          Challenge yourself and improve your typing skills with 3 different level of difficulties
          and gaining stars in order to access the most advanced levels.
        </h2>
        <v-btn class="mt-6" color="white" rounded large to="/register">
          Try it now!
          <v-icon class="ml-3">mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Homepage'
}
</script>

<style scoped>
  h1 {
    font-size: 7em;
    line-height: 120px;
    position: relative;
  }
  h1::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 5px;
    height: 80%;
    background-color: white;
  }
</style>