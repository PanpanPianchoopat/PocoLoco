<template>
  <div class="dropdown-container">
    <p>{{ type }}</p>

    <div
      class="dropdown-button"
      @click="showDropdown"
      :style="dropdownVisible ? { borderBottom: '2px solid white' } : {}"
    >
      <div class="button-content">
        <label>{{ label ? label : type }}</label>
        <i class="fa fa-caret-down fa-2x"></i>
      </div>
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
  export default {
    name: "CustomSelect",
    props: ["type", "options"],

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
    position: relative;
  }
  p {
    margin: 0;
  }
  .dropdown-button {
    width: 120px;
    height: 30px;
    background: var(--primary-blue);
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }
  .button-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  label {
    color: white;
    padding-left: 5px;
    z-index: 1;
  }
  i {
    color: white;
    font-size: 24px;
    margin-right: 5px;
  }

  .dropdown-list {
    width: 120px;
    background: var(--primary-blue);
    align-self: flex-start;
    z-index: 10;
    position: absolute;
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
      width: 100px;
    }
    label {
      font-size: 14px;
    }
    i {
      font-size: 18px;
      margin-right: 5px;
    }
    .dropdown-list {
      width: 100px;
    }
    .option-item {
      font-size: 14px;
    }
  }
</style>
