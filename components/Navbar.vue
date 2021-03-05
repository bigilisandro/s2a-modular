<template>
  <div>
    <b-navbar spaced>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="~assets/images/logo_s2a.svg"
            alt="s2a-modular"
            class="image is-fullheight is-fullwidth"
          />
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div" class="mr-4">
          <div class="buttons">
            <nuxt-link to="/">
              <strong>BROWSE HOMES</strong>
            </nuxt-link>
            <span class="mx-5"> | </span>
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
              <b-dropdown-item aria-role="listitem">PROFILE</b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="logout"
                >SIGN OUT</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('./login')
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
