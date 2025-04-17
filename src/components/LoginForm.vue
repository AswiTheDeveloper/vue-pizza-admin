<template>
  <v-form
    ref="form"
    v-model="formValid"
    lazy-validation
    @submit.prevent="submit"
  >
    <div class="text-center mb-5">
      <h2 class="form-title">Vue Pizza Admin</h2>
      <p class="form-subtitle mt-2">
        Welcome Back 👋,Please login in to continue
      </p>
    </div>
    <v-text-field
      v-model="username"
      label="Username"
      :rules="usernameRules"
      required
    />

    <v-text-field
      v-model="password"
      label="Password"
      :rules="passwordRules"
      type="password"
      required
    />

    <v-btn color="secondary" class="mt-4" @click="submit">Login</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      formValid: false,
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) => v.length >= 3 || "Minimum 3 characters",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Minimum 6 characters",
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("login", {
            username: this.username,
            password: this.password,
          })
          .then((success) => {
            if (success) {
              this.$router.push({ name: "dashboard" });
            } else {
              alert("Invalid username or password");
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
.form-title {
  color: #619d6a;
  font-family: cursive;
}
.form-subtitle {
  font-size: 12px;
}
</style>
