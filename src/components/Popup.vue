<template>
  <div class="background" v-bind:style="visible ? {} : { display: 'none' }">
    <div class="box">
      <slot></slot>
      <div class="buttons">
        <DefaultButton
          :style="{
            height: '40px',
            width: '110px',
            background: 'none',
            marginRight: '40px',
            border: '3px solid #777777',
            color: '#777777',
          }"
          @click="visible = !visible"
          >CANCEL</DefaultButton
        >
        <DefaultButton
          :style="{
            height: '40px',
            width: '110px',
            background: 'var(--primary-yellow)',
          }"
          >SAVE</DefaultButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import DefaultButton from "../components/DefaultButton.vue";
export default {
  name: "Popup",
  props: ["visible"],
  components: { DefaultButton },
  data() {
    return {};
  },
};
</script>

<style scoped>
.background {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 100;
  margin-left: -60px;
}
.box {
  width: 420px;
  margin-left: -200px;
  background-color: white;
  z-index: 10;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 45px 0;
}
</style>
