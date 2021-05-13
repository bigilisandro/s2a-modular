<template>
  <div>
    <profile-modal :is-active="isProfileModalActive" @cancel="trashCancel" />
    <nav
      class="navbar py-4 is-flex is-justify-content-space-between is-align-items-center"
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
            <nuxt-link to="/">
              <strong class="is-size-7-mobile">BROWSE HOMES</strong>
            </nuxt-link>
            <span class="mx-5 mx-2-mobile"> | </span>
            <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
              <template #trigger>
                <a>
                  <img
                    src="~assets/images/icon_profile.svg"
                    alt="s2a-modular"
                    class="image is-24x24"
                  />
                </a>
              </template>

              <b-dropdown-item
                aria-role="listitem"
                @click="$router.push('/dashboard')"
                >MY HOMES</b-dropdown-item
              >
              <!-- <b-dropdown-item
                aria-role="listitem"
                @click="$router.push('/admin')"
                >ADMIN</b-dropdown-item
              > -->
              <b-dropdown-item aria-role="listitem" @click="profileModal()"
                >PROFILE</b-dropdown-item
              >
              <b-dropdown-item aria-role="listitem" @click="logout"
                >SIGN OUT</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </b-navbar-item>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileModal from '@/components/ProfileModal.vue'
export default {
  components: { ProfileModal },
  data() {
    return {
      isProfileModalActive: false,
      firstName: '',
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  mounted() {
    this.firstName = this.loggedInUser.firstName
  },
  methods: {
    profileModal() {
      this.isProfileModalActive = true
    },
    trashCancel() {
      this.isProfileModalActive = false
    },
    async logout() {
      await this.$auth.logout()
      this.$buefy.toast.open({
        message: 'You have successfully logged out ' + this.firstName + '!',
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
