<template>
  <div class="container">
    <div id="loginForm" class="col-md-12 order-md-1">
      <form class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <div class="row justify-content-around">
          <div class="col-md-4 mb-3">
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
          </div>
        </div>
        <div class="row justify-content-around">
          <div class="col-md-4 mb-3">
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>
        </div>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <div class="row justify-content-around">
          <div class="col-md-2 mb-3">
            <button
              class="btn btn-lg btn-primary btn-block"
              type="button"
              @click="handle()"
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

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
          alert(
            `There is an error in the user name or password.\r\n${err.response.data.message}`
          );
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
