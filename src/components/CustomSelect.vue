<template>
  <div class="dropdown-container">
    <p>{{ type }}</p>
    <div
      class="dropdown-button"
      @click="showDropdown"
      :style="dropdownVisible ? { borderBottom: '2px solid white' } : {}"
    >
      <label>{{ label ? label : type }}</label>
      <i class="fa fa-caret-down fa-2x"></i>
    </div>
    <div class="dropdown-list" v-if="dropdownVisible">
      <div
        class="option-item"
        v-for="(option, i) in options"
        :key="i"
        @click="handleSelect(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
  import { useScreenWidth } from "../composables/useScreenWidth";

  export default {
    name: "CustomSelect",
    props: ["type", "options"],
    setup() {
      const { width } = useScreenWidth();
      return width;
    },
    data() {
      return {
        dropdownVisible: false,
        selection: null,
        label: null,
      };
    },
    methods: {
      showDropdown() {
        this.dropdownVisible = !this.dropdownVisible;
      },
      handleSelect(selected) {
        this.selection = selected;
        this.label = selected;
        this.dropdownVisible = !this.dropdownVisible;
      },
    },
  };
</script>

<style scoped>
  .dropdown-container {
    margin-top: -22px;
  }
  p {
    margin: 0;
  }
  .dropdown-button {
    width: 100px;
    height: 30px;
    background: var(--primary-blue);
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  label {
    color: white;
    padding-left: 5px;
  }
  i {
    color: white;
    padding-left: 75px;
    position: fixed;
  }
  .dropdown-list {
    width: 100px;
    background: var(--primary-blue);
    position: fixed;
    z-index: 10;
  }
  .option-item {
    height: 30px;
    display: flex;
    align-items: center;
    color: white;
    padding-left: 5px;
    cursor: pointer;
  }
  .option-item:hover {
    background: var(--button-blue);
  }
  @media (max-width: 700px) {
    .dropdown-button {
      width: 80px;
    }
    label {
      font-size: 14px;
    }
    i {
      padding-left: 65px;
      font-size: 18px;
    }
    .dropdown-list {
      width: 80px;
    }
    .option-item {
      font-size: 14px;
    }
  }
</style>
