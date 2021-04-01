<template>
  <FormContainer>
    <div class="form-header">
      <h2>Add New Promotion</h2>
    </div>

    <InnerFormContainer>
      <div class="input-group">
        <div>
          <h4>Season</h4>
          <select></select>
        </div>
        <div>
          <h4>Room Type</h4>
          <select></select>
        </div>
      </div>

      <h4>Promotion Name</h4>
      <input type="text" />

      <div class="input-group">
        <div>
          <h4>Start Date</h4>
          <div class="flex x-full">
            <v-date-picker
              v-model="startDate"
              :masks="{ input: ['YYYY-MM-DD'] }"
              mode="single"
              class="flex-grow"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <div :style="{ display: 'flex', flexDirection: 'row' }">
                  <input
                    :value="inputValue"
                    v-on="inputEvents"
                    :style="{ width: '150px', marginRight: '10px' }"
                  />
                  <i
                    class="fa fa-calendar fa-2x"
                    :style="{ marginTop: '5px', paddingRight: '200px' }"
                  ></i>
                </div>
              </template>
            </v-date-picker>
          </div>
        </div>
        <div>
          <h4>End Date</h4>
          <div class="flex x-full">
            <v-date-picker
              v-model="startDate"
              :masks="{ input: ['YYYY-MM-DD'] }"
              mode="single"
              class="flex-grow"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <div :style="{ display: 'flex', flexDirection: 'row' }">
                  <input
                    :value="inputValue"
                    v-on="inputEvents"
                    :style="{ width: '150px', marginRight: '10px' }"
                  />
                  <i
                    class="fa fa-calendar fa-2x"
                    :style="{ marginTop: '5px' }"
                  ></i>
                </div>
              </template>
            </v-date-picker>
          </div>
        </div>
      </div>

      <h4>Discount</h4>
      <input type="number" :style="{ width: '200px' }" />
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
    name: "AddPromo",
    components: { FormContainer, DefaultButton, InnerFormContainer },
  };
</script>

<style></style>
