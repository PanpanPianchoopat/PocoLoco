<template>
  <div>
    <div class="pagination-row">
      <button class="pagination-button">
        <i class="fa fa-chevron-left fa-1x"></i>
      </button>
      <span v-for="(item, i) in new Array(10)" :key="i">
        <button class="pagination-button">{{ i + 1 }}</button>
      </span>
      <button class="pagination-button">
        <i class="fa fa-chevron-right fa-1x"></i>
      </button>
    </div>
    <slot />
  </div>
</template>

<script>
  export default {
    name: "PaginationBar",
  };
</script>

<style scoped>
  .pagination-row {
    display: flex;
    justify-content: center;
  }
  .pagination-button {
    width: 25px;
    height: 25px;
    background: none;
    border: none;
    outline: none;
    border-radius: 50px;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    margin: 15px 3px;
    cursor: pointer;
    color: #989898;
  }
  i {
    color: var(--primary-blue);
  }
  *:focus {
    outline: 0;
  }
</style>
