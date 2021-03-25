<template>
  <button class="default-button-style">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "DefaultButton",
  };
</script>

<style>
  .default-button-style {
    height: 60px;
    width: fit-content;
    padding: 10px 80px;
    margin: 50px;
    font-size: 30px;
    background: #fda462;
    color: white;
    border: none;
    outline: none;
  }
  .default-button-style:hover {
    cursor: pointer;
    opacity: 0.7;
  }
</style>
