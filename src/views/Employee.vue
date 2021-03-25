<template>
  <Navbar />
  <Container>
    <div>
      <h1>Employees</h1>

      <p v-for="employee in employees" :key="employee.id">
        {{ employee.name }} {{ employee.position }}
      </p>
    </div>
  </Container>
</template>

<script>
  import DefaultButton from "../components/DefaultButton.vue";
  import Navbar from "../components/Navbar.vue";
  import Container from "../components/Container.vue";

  export default {
    components: { DefaultButton, Navbar, Container },
    data() {
      return {
        employees: [
          { id: 1, name: "Ying", position: "Manager" },
          { id: 2, name: "Panpan", position: "Maid" },
          { id: 3, name: "Pungjung", position: "Chef" },
          { id: 4, name: "Mew", position: "Receptionist" },
          { id: 5, name: "Beam", position: "Business Owner" },
        ],
      };
    },
  };
</script>

<style></style>
