<template>
  <Navbar />
  <Container>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </Container>
</template>

<script>
  import Navbar from "../components/Navbar.vue";
  import Container from "../components/Container.vue";

  export default {
    components: { Navbar, Container },
  };
</script>

<style></style>
