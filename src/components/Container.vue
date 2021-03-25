<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Container",
  };
</script>

<style>
  .container {
    display: flex;
    width: 100%;
    max-width: 1024px;
    margin: 0 60px 0 260px;
    flex-wrap: wrap;
    background: white;
  }
</style>
