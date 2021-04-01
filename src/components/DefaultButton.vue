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
    height: 50px;
    width: 190px;
    font-size: 20px;
    background: #fda462;
    color: white;
    border: none;
    outline: none;
  }
  .default-button-style:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  @media (max-width: 768px) {
    .default-button-style {
      height: 40px;
      width: 120px;
      font-size: 16px;
    }
  }
</style>
