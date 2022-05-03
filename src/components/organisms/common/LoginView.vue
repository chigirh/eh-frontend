<template>
  <div id="loginForm">
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputUserName" class="sr-only">User Name</label>
      <input
        type="text"
        id="inputUserName"
        class="form-control"
        placeholder="User name"
        v-model="userName"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        v-model="password"
        required
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button
        class="btn btn-lg btn-primary btn-block"
        type="button"
        @click="handle()"
      >
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import "bootstrap/dist/css/bootstrap.min.css";

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
    handle() {
      return this.$store
        .dispatch("login", {
          userName: this.userName,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          alert(err.response.data.message)
          this.$router.push({ path: "/" });
        });
    },
  },
});
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
