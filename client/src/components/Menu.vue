<template>
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
      <button
        id="button-two"
        class="collegeFilter"
        onclick="buttonToggle(this, true);"
        value="Eastbourne"
      >Eastbourne</button>
      <button
        id="button-three"
        class="collegeFilter"
        onclick="buttonToggle(this, true);"
        value="Lewes"
      >Lewes</button>
      <button
        id="button-four"
        class="collegeFilter"
        onclick="buttonToggle(this, true);"
        value="Hastings"
      >Hastings</button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Menu",
  props: ["filters"],
  mounted() {
    // resets all filter visuals to "none"
    const menus = document.getElementsByTagName("select");
    Object.values(menus).forEach(e => {
      e.value = "none";
    });
  }
});
</script>

<style scoped lang="sass">
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
