<template>
  <div class="container">
        <div class="py-5 text-center">
      <h2>User Added</h2>
      <p class="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
    </div>

    <div class="row">
      <div class="order-md-1">
        <h4 class="mb-3">Add User</h4>
        <form class="needs-validation" novalidate>
          <div class="mb-3">
            <label for="username">Username</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">@</span>
              </div>
              <input
                type="text"
                class="form-control"
                id="username"
                placeholder="Username"
                v-model="userName"
                required
              />
              <div class="invalid-feedback" style="width: 100%">
                Your username is required.
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">First name</label>
              <input
                type="text"
                class="form-control"
                id="firstName"
                placeholder=""
                v-model="firstName"
                required
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Last name</label>
              <input
                type="text"
                class="form-control"
                id="lastName"
                placeholder=""
                v-model="familyName"
                required
              />
              <div class="invalid-feedback">Valid last name is required.</div>
            </div>
          </div>

          <div class="mb-3">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="password"
              required
            />
            <div class="invalid-feedback">Valid passwrd is required.</div>
          </div>

          <hr class="mb-4" />
          <label>User role</label>
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="role-admin"
              v-model="isAdmin"
            />
            <label class="custom-control-label" for="role-admin"
              >Administrator</label
            >
          </div>
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="role-corp"
              v-model="isCorp"
            />
            <label class="custom-control-label" for="role-corp"
              >Corporation</label
            >
          </div>
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="role-gene"
              v-model="isGene"
            />
            <label class="custom-control-label" for="role-gene">General</label>
          </div>
          <hr class="mb-4" />

          <hr class="mb-4" />
          <button
            class="btn btn-primary btn-lg btn-block"
            type="button"
            @click="handle()"
          >
            Continue to checkout
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import usersApi from "@/api/users";

export default defineComponent({
  name: "AddUserView",
  data() {
    return {
      userName: "",
      firstName: "",
      familyName: "",
      password: "",
      isAdmin: false,
      isCorp: false,
      isGene: false,
    };
  },
  methods: {
    handle() {
      const roles = Array();
      if (this.isAdmin) {
        roles.push("ADMIN");
      }
      if (this.isCorp) {
        roles.push("CORP");
      }
      if (this.isGene) {
        roles.push("GENE");
      }

      usersApi
        .post(
          {
            id: this.userName,
            first_name: this.firstName,
            family_name: this.familyName,
            password: this.password,
            roles: roles,
          },
          this.$store.state.auth.token
        )
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          if (err.response.status == 409) {
            alert(err.response.data.message);
          } else {
            alert("Internal server error:" + err.response.data.message);
          }
          this.$router.push({ path: "/" });
        });
    },
  },
});
</script>

<style scoped></style>
