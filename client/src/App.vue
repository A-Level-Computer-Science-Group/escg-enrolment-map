<template>
  <div id="app">
    <div id="map"></div>
    <section>
      <details>
        <summary id="summary-one">
          <span>Gender</span>
        </summary>
        <select onchange="setFilter('gender', this.value)" id="gender">
          <option value="none">None</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </details>
      <details>
        <summary>
          <span>Course</span>
        </summary>
        <select onchange="setFilter('course', this.value)" id="course">
          <option value="none">None</option>
          <option value="alevel">A-level</option>
          <option value="vocational">Vocational</option>
          <option value="appgeneral">Applied General</option>
        </select>
      </details>
      <div>
        <button id="button-two" onclick="buttonToggle(this, true);" value="Eastbourne">Eastbourne</button>
        <button id="button-three" onclick="buttonToggle(this, true);" value="Lewes">Lewes</button>
        <button id="button-four" onclick="buttonToggle(this, true);" value="Hastings">Hastings</button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {init} from "./scripts/main";

export default Vue.extend({
  name: "App",
  components: {},
  mounted() {
    init();

    console.log("hi");
    // resets all filter visuals to "none"
    const menus = document.getElementsByTagName("select");
    Object.values(menus).forEach(e => {
      e.value = "none";
    });

    // // makes this button tick / untick
    // // has an optional override
    // const toggleTick = (e, forceUntick) => {
    //   if (forceUntick) {
    //     if (e.classList.contains("tick")) {
    //       e.classList.remove("tick");
    //     }
    //   } else {
    //     e.classList.toggle("tick");
    //   }
    // };
    // // make this button grey / not grey
    // // has an optional override
    // const toggleGrey = (e, forceGrey) => {
    //   // if ticked, make grey. else make purple
    //   if ((e.classList.contains("tick") && forceGrey !== false) || forceGrey) {
    //     e.style.backgroundColor = "#DDDDDD";
    //     e.style.color = "black";
    //   } else {
    //     e.style.backgroundColor = "rgb(155,0,155)";
    //     e.style.color = "white";
    //   }
    // };
    // // when a button is clicked it toggles ticked and grey and set specific filter
    // // if any other buttons are ticked, they are unticked
    // const buttonToggle = (e: any, filter) => {
    //   toggleTick(e);
    //   toggleGrey(e);
    //   if (filter) {
    //     updateFilter(e);
    //   }
    //   removeTicks(e);
    // };

    // // removes ticks of all but the supplied element
    // const removeTicks = e => {
    //   document.querySelectorAll("button").forEach(elem => {
    //     if (elem !== e) {
    //       toggleTick(elem, true);
    //       toggleGrey(elem, false);
    //     }
    //   });
    // };

    // // sets this buttons filter based on whether it was ticked / unticked
    // const updateFilter = e => {
    //   if (e.classList.contains("tick")) {
    //     setFilter("college", e.value.toLowerCase());
    //   } else {
    //     setFilter("college", "none");
    //   }
    // };
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

section
  position: absolute
  z-index: 4
  width: 180px
  right: 25px
  top: 25px
  summary
    border-color: rgb(150, 0, 150)
    border-style: solid
    border-width: 10px
    border-radius: 3px 3px 0px 0px
    cursor: pointer
    border-bottom-color: rgba(0, 0, 0, 0.3)
    border-bottom-style: solid
    border-bottom-width: 0.5px
    font-family: Arial, Helvetica, sans-serif
    font-size: 20px
    height: 65px
    background-color: rgb(150, 0, 150)
    color: white
    &:hover
      color: rgba(0, 0, 0, 0.61)

    div
      display: flex
      flex-direction: column

  details:last-child
    summary
      border-radius: 0px 0px 3px 3px

  details:nth-child(2)
    summary
      border-radius: 0px

#map
  width: 100vw
  height: 100vh
  position: absolute
  z-index: -1

select
  font-family: Arial, Helvetica, sans-serif
  width: 100%
  height: 50px
  background-color: white

label
  display: none

a
  display: none

option
  border-width: 2px
  border-style: solid
  border-color: auto
  border-radius: 5px

section div
  display: flex
  flex-direction: column
  height: 100px
  margin-top: 5px

button
  padding: 0px
  background-color: rgb(155, 0, 155)
  border: rgb(155, 0, 155) 2px solid
  color: white
  border-bottom-color: rgba(0, 0, 0, 0.3)
  border-bottom-style: solid
  border-bottom-width: 0.5px
  cursor: pointer
  height: 60px
  &:last-child
    border-bottom: none

  &:hover
    color: rgba(0, 0, 0, 0.61)

.tick::before
  content: "✔"
  color: green
  float: left
  padding-left: 3px
</style>
