<template>
  <div>
    <nav
      class="navbar py-4 px-5 is-flex is-justify-content-space-between is-align-items-center"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <figure class="image width-17bh-mobile">
            <img src="~assets/images/logo_s2a.svg" alt="s2a-modular" />
          </figure>
        </b-navbar-item>
      </div>

      <div class="navbar-end">
        <b-navbar-item tag="div" class="mr-4">
          <div class="buttons">
            <a @click="logout">
              <strong class="is-size-7-mobile">Log Out</strong>
            </a>
          </div>
        </b-navbar-item>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      firstName: '',
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  mounted() {
    this.firstName = this.loggedInUser[0].username
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$buefy.toast.open({
        message:
          'You have successfully logged out from the Admin panel ' +
          this.firstName +
          '!',
        type: 'is-success',
      })
      // this.$router.push('./login')
    },
  },
}
</script>

<style scoped>
.bg-hover:hover {
  background: none !important;
  color: #363636 !important;
}
</style>
