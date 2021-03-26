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
    height: 100%;
    margin: 0 65px 0 65px;
    flex-wrap: wrap;
    background: #0a96b7;
  }
</style>
