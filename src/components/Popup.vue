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
            fontSize: '15px',
          }"
          @click="returnPop()"
          >CANCEL</DefaultButton
        >
        <DefaultButton
          :style="{
            height: '40px',
            width: '110px',
            background: 'var(--primary-yellow)',
            fontSize: '15px',
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
    methods: {
      returnPop() {
        this.$emit("popReturn", false);
      },
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
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 100;
  }
  .box {
    width: 415px;
    background-color: white;
    z-index: 10;
    border-radius: 24px;
    padding: 40px 50px;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 75px;
  }
</style>