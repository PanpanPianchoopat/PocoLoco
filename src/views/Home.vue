<template>
  <Navbar />
  <Container>
    <h1>Home Page</h1>
  </Container>
</template>

<script>
  import Navbar from "../components/Navbar.vue";
  import Container from "../components/Container.vue";
  export default {
    name: "Home",
    components: { Navbar, Container },
  };
</script>
