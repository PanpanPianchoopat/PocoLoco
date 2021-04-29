<template>
  <div
    class="card-container"
    :style="type == 'active' ? { border: '2px solid black' } : {}"
  >
    <b><slot></slot></b>
  </div>
</template>

<script>
  export default {
    name: "RoomCard",
    props: ["type"],
  };
</script>

<style scoped>
  .card-container {
    width: 95px;
    height: 95px;
    display: flex;
    background: #d6e7ea;
    justify-content: center;
  }
  b {
    margin-top: 10px;
  }
</style>
