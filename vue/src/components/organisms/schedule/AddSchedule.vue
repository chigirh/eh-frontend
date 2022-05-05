<template>
  <div class="container">
    <div class="col-md-8 order-md-1">
      <div class="py-5 text-center">
        <h2>Schedule regist</h2>
        <p class="lead">Register a free schedule.</p>
      </div>
      <form>
        <div class="col-3 mx-auto" style="width: 250px">
          <datepicker
            class="form-control"
            format="yyyy-MM-dd"
            v-model="picked"
          />
        </div>
      </form>
      <form class="needs-validation" novalidate>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="period-from">From</label>
            <select
              class="custom-select d-block w-100"
              id="period-from"
              v-model="fromSelected"
              required
            >
              <option
                v-for="option in fromOptions"
                v-bind:value="option.value"
                :key="option.value"
              >
                {{ option.text }}
              </option>
            </select>
            <div class="invalid-feedback">Please select a valid from.</div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="period-to">To</label>
            <select
              class="custom-select d-block w-100"
              id="period-to"
              v-model="toSelected"
              required
            >
              <option
                v-for="option in toOptions"
                v-bind:value="option.value"
                :key="option.value"
              >
                {{ option.text }}
              </option>
            </select>
            <div class="invalid-feedback">Please provide a valid to.</div>
          </div>
        </div>
        <hr class="mb-4" />
        <button
          class="btn btn-primary btn-lg btn-block"
          type="button"
          @click="handle()"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import Datepicker from "vue3-datepicker";

import commons from "@/common/commons";
import schedulsApi from "@/api/schedule";
import store from "@/store/index";
import router from "@/router/index";

export default defineComponent({
  name: "AddScheduleView",
  data() {
    return {
      picked: new Date(),
      fromSelected: 1,
      toSelected: 1,
      fromOptions: this.$store.state.periods.map((e) => {
        return {
          text: `${("00" + e.hour_from).slice(-2)}:${(
            "00" + e.minute_from
          ).slice(-2)}～`,
          value: e.period,
        };
      }),
      toOptions: this.$store.state.periods.map((e) => {
        return {
          text: `～${("00" + e.hour_to).slice(-2)}:${("00" + e.minute_to).slice(
            -2
          )}`,
          value: e.period,
        };
      }),
    };
  },
  methods: {
    handle() {
      let periods = [];
      for (let i = this.fromSelected; i <= this.toSelected; i++) {
        periods.push(i);
      }

      let formatted = commons.dateToString(this.picked);

      schedulsApi
        .singlePost(
          {
            date: formatted,
            periods: periods,
          },
          this.$store.state.auth.token
        )
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          if (err.response.status == 403) {
            alert(err.response.data.message);
          } else {
            alert("Internal server error:" + err.response.data.message);
          }
          this.$router.push({ path: "/" });
        });
    },
  },
  setup() {
    schedulsApi
      .getPeriods(store.state.auth.token)
      .then((res) => {
        store.state.periods = res.data.periods;
      })
      .catch((err) => {
        if (err.response.status == 401) {
          alert(err.response.data.message);
        } else {
          alert("Internal server error:" + err.response.data.message);
        }
        router.push({ path: "/" });
      });
  },
  components: {
    Datepicker,
  },
});
</script>

<style scoped></style>
