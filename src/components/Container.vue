<template>
  <div
    class="container"
    :style="windowWidth > 1000 ? { padding: '0 100px 0 250px' } : {}"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Container",
    data() {
      return {
        windowWidth: self.windowWidth,
      };
    },
    mounted() {
      this.$nextTick(() => {
        self.addEventListener("resize", this.onResize);
      });
    },
    beforeDestroy() {
      self.removeEventListener("resize", this.onResize);
    },
    methods: {
      onResize() {
        this.windowWidth = self.innerWidth;
      },
    },
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
