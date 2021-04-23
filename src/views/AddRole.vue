<template>
  <FormContainer>
    <div class="form-header">
      <h2>Add New Role</h2>
    </div>

    <InnerFormContainer>
      <h4>Department</h4>
      <select :style="{ width: '300px', marginRight: '180px' }"></select>

      <h4>Role Name</h4>
      <input type="text" />

      <div class="input-group">
        <div>
          <h4>Salary</h4>
          <div class="input-row">
            <div :style="{ display: 'flex', flexDirection: 'row' }">
              <input type="text" :style="{ marginRight: '10px' }" />
              <p class="unit">Baht/month</p>
            </div>
          </div>
        </div>
        <div>
          <h4>Bonus Rate</h4>
          <input type="text" :style="{ width: '150px' }" />
        </div>
      </div>
    </InnerFormContainer>
    <div class="buttons">
      <DefaultButton
        :style="{
          background: 'none',
          marginRight: '110px',
          border: '3px solid white',
        }"
        @click="backToRolePage"
        >CANCEL</DefaultButton
      >
      <DefaultButton>ADD</DefaultButton>
    </div>
  </FormContainer>
</template>

<script>
  import FormContainer from "../components/FormContainer.vue";
  import DefaultButton from "../components/DefaultButton.vue";
  import InnerFormContainer from "../components/InnerFormContainer.vue";
  export default {
    name: "AddRole",
    components: { FormContainer, DefaultButton, InnerFormContainer },
    methods: {
      backToRolePage() {
        this.$router.push("/Role");
      },
    },
  };
</script>

<style scoped>
  .form-header {
    padding: 90px 0 10px 10%;
  }
  h2 {
    color: white;
    font-size: 36px;
    margin-bottom: 10px;
  }
  .input-group {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  input {
    width: 300px;
    height: 35px;
    margin: 0 80px 40px 0;
    padding-left: 10px;
  }
  select {
    width: 220px;
    height: 40px;
    margin: 0 180px 30px 0;
    padding-left: 10px;
  }
  .unit {
    margin-right: 80px;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 45px 0;
  }
  i {
    color: var(--primary-blue);
    margin: 5px 0 0 -35px;
    padding-right: 240px;
  }
  *:focus {
    outline: 0;
  }
  @media (max-width: 1000px) {
    .input-group {
      flex-direction: column;
    }
    .form-header {
      padding: 20px 0 10px 10%;
    }
    .unit {
      margin-right: 0;
    }
  }
</style>
