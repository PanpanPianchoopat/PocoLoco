<template>
  <button class="add-button">
    <span :style="{ color: 'white' }">
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
    background: var(--button-blue);
    outline: none;
    border: none;
    align-items: center;
  }
  .add-button:hover {
    cursor: pointer;
    opacity: 0.7;
  }
</style>
