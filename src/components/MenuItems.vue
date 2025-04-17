<template>
  <v-navigation-drawer app>
    <v-col cols="12" class="sidebar">
      <div class="d-flex flex-column align-center pt-3">
        <v-avatar size="80" class="mx-auto mb-4">
          <img src="@/assets/user-profile.avif" alt="Admin Profile" />
        </v-avatar>

        <v-btn block small color="primary" class="mb-2" @click="goToProfile"
          >Profile</v-btn
        >
        <v-btn block small color="error" @click="logout">Logout</v-btn>
      </div>

      <!-- Menu Items -->
      <v-list dense nav class="mt-4">
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.route"
          router
          exact
          active-class="menu-active"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { name: "Pizza Menu", route: "/pizza-menu" },
        { name: "Orders", route: "/dashboard" },
        { name: "Customers", route: "/customers" },
        { name: "Reports", route: "/reports" },
        { name: "Settings", route: "/settings" },
      ],
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    goToProfile() {
      this.$router.push("/profile");
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.v-navigation-drawer {
  width: 250px;
}

.v-card {
  text-align: center;
}
</style>
