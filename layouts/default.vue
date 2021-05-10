<template>
  <div>
    <NavbarS2A v-if="isAuthenticated && isStrategy === 'local'" />
    <NavbarLogin v-else />

    <div>
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavbarLogin from '@/components/NavbarLogin.vue'
import NavbarS2A from '../components/NavbarS2A'
export default {
  components: NavbarS2A,
  NavbarLogin,
  computed: {
    ...mapGetters(['isAuthenticated', 'isStrategy', 'loggedInUser']),
  },
}
</script>
