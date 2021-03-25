<template>
  <div id="nav">
    <div class="circle">
      <img src="../assets/logo.png" />
    </div>
    <div class="info">
      <b>Role Name</b>
      <b>Employee ID</b>
    </div>
    <div class="menu">
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
  };
</script>

<style>
  #nav {
    width: 200px;
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    display: flex;
    padding-top: 60px;
    flex-direction: column;
    background-color: #0a96b7;
  }

  #nav a {
    font-weight: bold;
    color: #fcfcfc;
    text-decoration: none;
    font-size: 18px;
    padding: 10px 0;
    padding-left: 40px;
  }

  #nav a.router-link-exact-active {
    color: #0b2e4f;
    background: white;
    border-radius: 50px;
  }
  .circle {
    width: 90px;
    height: 90px;
    background: white;
    display: flex;
    justify-content: center;
    align-self: center;
    border-radius: 50%;
  }
  img {
    width: 40px;
    align-self: center;
    background: white;
  }
  .info {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }
  b {
    font-size: 18px;
    color: white;
    align-self: center;
  }
  .menu {
    display: flex;
    flex-direction: column;
    padding: 45px 0 0 20px;
    margin-right: -20px;
  }
</style>
