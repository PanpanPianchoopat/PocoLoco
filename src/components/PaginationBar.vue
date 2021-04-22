<template>
  <div
    class="pagination-container"
    :style="paginationVisible ? {} : { display: 'none' }"
  >
    <div class="pagination-row">
      <button class="pagination-button" @click="prev">
        <i class="fa fa-chevron-left fa-1x"></i>
      </button>
      <span v-for="(item, i) in new Array(pageCount)" :key="i">
        <button
          @click="setCurrentPage(i + 1)"
          class="pagination-button"
          v-bind:style="
            currentPage === i + 1
              ? { background: 'var(--primary-blue)', color: 'white' }
              : {}
          "
        >
          {{ i + 1 }}
        </button>
      </span>
      <button class="pagination-button" @click="next">
        <i class="fa fa-chevron-right fa-1x"></i>
      </button>
    </div>
    <slot />
  </div>
</template>

<script>
  export default {
    name: "PaginationBar",
    props: ["pageCount", "paginationVisible"],
    data() {
      return {
        currentPage: 1,
      };
    },
    methods: {
      prev() {
        if (this.currentPage > 1) {
          this.currentPage = this.currentPage - 1;
          this.$emit("pageReturn", this.currentPage);
          console.log(this.currentPage);
        }
      },
      next() {
        if (this.currentPage != this.pageCount) {
          this.currentPage = this.currentPage + 1;
          this.$emit("pageReturn", this.currentPage);
          console.log(this.currentPage);
        }
      },
      setCurrentPage(page) {
        this.currentPage = page;
        this.$emit("pageReturn", this.currentPage);
        console.log(this.currentPage);
      },
    },
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
  .pagination-button:hover {
    background: #e2f2ff;
  }
  i {
    color: var(--primary-blue);
  }
  *:focus {
    outline: 0;
  }
</style>
