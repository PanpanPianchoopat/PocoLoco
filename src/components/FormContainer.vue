<template>
  <div class="form-container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "FormContainer",
  };
</script>

<style>
  .form-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    flex-wrap: wrap;
    overflow: auto;
    padding: 45px auto;
    background: #0a96b7;
  }
</style>
