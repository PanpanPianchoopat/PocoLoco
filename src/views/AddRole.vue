<template>
  <FormContainer>
    <div class="form-header">
      <h2>Add New Role</h2>
    </div>

    <InnerFormContainer>
      <div class="input-row">
        <div>
          <h4>Department</h4>
          <select :style="{ width: '300px', marginRight: '180px' }"></select>
        </div>
        <div>
          <h4>Role Name</h4>
          <input type="text" />
        </div>
      </div>

      <div class="input-row">
        <div>
          <h4>Salary</h4>
          <div class="input-row">
            <input type="text" :style="{ marginRight: '10px' }" />
            <p :style="{ marginRight: '80px' }">Baht/month</p>
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
        >CANCEL</DefaultButton
      >
      <DefaultButton :style="{ background: '#54CFD6' }">ADD</DefaultButton>
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
  };
</script>

<style>
  @media (max-width: 1240px) {
    .input-row {
      flex-direction: column;
    }
  }
</style>
