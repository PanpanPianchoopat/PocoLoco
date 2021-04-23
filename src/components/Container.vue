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
  width: 100%;
  height: 100%;
  margin: 0 60px 0 200px;
  padding: 0 60px;
  flex-wrap: wrap;
  background: #f8f8f8;
}
</style>
