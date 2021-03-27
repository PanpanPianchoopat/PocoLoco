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
    width: 90%;
    height: 100%;
    flex-wrap: wrap;
    overflow: hidden;
    padding: 95px 70px 0 70px;
    background: #0a96b7;
  }
</style>
