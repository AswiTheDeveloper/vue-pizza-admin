<template>
  <div class="login-wrapper">
    <v-img src="@/assets/home-bg.jpg" class="background-image" cover></v-img>

    <div class="login-overlay">
      <v-card class="login-card" elevation="10">
        <LoginForm />
      </v-card>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "LoginView",
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login-wrapper {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 1;
  opacity: 0.8;
}

.login-overlay {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 80px;
}

.login-card {
  max-width: 400px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9); /* soft white */
  border-radius: 12px;
  padding: 32px;
  font-family: "Poppins", sans-serif;
}
</style>
