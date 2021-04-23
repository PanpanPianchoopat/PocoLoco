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
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100%;
    margin: 0 auto;
    padding: 0 100px;
    flex-wrap: wrap;
    background: #f8f8f8;
  }
  @media (max-width: 700px) {
    .container {
      padding: 0 80px;
    }
  }
</style>
