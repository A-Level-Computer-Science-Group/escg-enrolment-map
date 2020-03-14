<template>
  <div id="app">
    <Map></Map>
    <Menu></Menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { init } from "./scripts/main";
import Map from "./components/Map.vue";
import Menu from "./components/Menu.vue";

export default Vue.extend({
  name: "App",
  components: {
    Map,
    Menu
  },
  async mounted() {
    init();
    const data = (
      await fetch(
        process.env.NODE_ENV === "production"
          ? "unimpl"
          : "http://localhost:3000/student-data/outcodes"
      )
    ).json();
  }
});
</script>

<style lang="sass">
body
  margin: 0
  padding: 0

#app
  display: flex
  justify-content: flex-end

#map
  width: 100vw
  height: 100vh
  position: absolute
  z-index: -1
</style>
