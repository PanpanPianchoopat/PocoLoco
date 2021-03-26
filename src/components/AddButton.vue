<template>
  <button class="add-button">
    <span style="color: white;">
      <i class="fa fa-plus fa-3x"></i>
    </span>
  </button>
</template>

<script>
  export default {
    name: "AddButton",
  };
</script>

<style>
  .add-button {
    width: 60px;
    height: 60px;
    border-radius: 50px;
    background: #54cfd6;
    outline: none;
    border: none;
  }
  .add-button:hover {
    cursor: pointer;
    opacity: 0.7;
  }
</style>
