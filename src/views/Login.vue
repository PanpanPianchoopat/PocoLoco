<template>
  <div class="login">
    <h1>{{ title }}</h1>
    <div>
      <span
        style="position: absolute; z-index: 0; padding: 40px 60px; color: #0a96b7;"
      >
        <i class="fa fa-user fa-3x"></i>
      </span>

      <input class="login-input" type="text" placeholder="Username" />
    </div>

    <div class="input-icons">
      <span
        style="position: absolute; z-index: 0; padding: 40px 60px; color: #0a96b7;"
      >
        <i class="fa fa-lock fa-3x"></i>
      </span>
      <input class="login-input" type="password" placeholder="Password" />
    </div>
    <DefaultButton
      :style="{ background: '#0a96b7', alignSelf: 'center' }"
      @click="this.$router.push({ name: 'Home' })"
      >LOGIN
    </DefaultButton>
  </div>
</template>

<script>
  import DefaultButton from "../components/DefaultButton.vue";

  export default {
    name: "Login",
    components: { DefaultButton },
    data() {
      return {
        title: "Login",
      };
    },
  };
</script>

<style>
  .login {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    text-align: center;
    background: aliceblue;
  }
  h1 {
    font-size: 100px;
    line-height: 117px;
  }
  .login-input {
    width: 440px;
    height: 65px;
    padding: 0 100px;
    margin: 30px;
    font-size: 30px;
    outline: none;
    z-index: 1;
  }
</style>
